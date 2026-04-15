import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { mergeGuestCartIntoUserCart, syncCartSnapshot } from '../api/directus'
import { useAuth } from './AuthContext'

// ─── Структура одного елементу кошика ─────────────────────────────────────────
// {
//   id:       string | number   — id продукту з Directus
//   slug:     string            — для посилання на сторінку продукту
//   title:    string
//   image:    string            — URL картинки (getAssetUrl)
//   price:    number            — фінальна ціна (вже з урахуванням знижки)
//   oldPrice: number | null
//   unit:     string            — '100 г', '1 л', etc.
//   quantity: number            — кількість
//   selected: boolean           — чекбокс "вибрати для замовлення"
// }

const CART_KEY = 'smak_cart'

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveCart(items) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  } catch {
    // localStorage недоступний — мовчки ігноруємо
  }
}

const CartContext = createContext(null)

// ─── Provider ─────────────────────────────────────────────────────────────────
export function CartProvider({ children }) {
  const { user, isAuthorized } = useAuth()
  const [items, setItems] = useState(readCart)
  const syncItemsToServer = useCallback(
    async (nextItems) => {
      const response = await syncCartSnapshot({
        userId: isAuthorized ? user?.id : null,
        items: nextItems,
      })

      if (!response) return

      if (response.success === false) {
        console.warn('Cart sync failed:', response.error)
        return
      }

      if (import.meta.env.DEV) {
        console.info('Cart synced:', {
          cartId: response.cartId,
          itemCount: nextItems.length,
          mode: isAuthorized ? 'user' : 'guest',
        })
      }
    },
    [isAuthorized, user?.id]
  )

  // Внутрішній хелпер: оновлює стейт і одразу синхронізує localStorage
  const update = useCallback((updater) => {
    setItems((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      saveCart(next)
      void syncItemsToServer(next)
      return next
    })
  }, [syncItemsToServer])

  // ── Додати товар ────────────────────────────────────────────────────────────
  // Якщо товар вже є — збільшуємо quantity на 1.
  // product: { id, slug, title, image, price, oldPrice, unit }
  const addItem = useCallback((product) => {
    update((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [
        ...prev,
        { ...product, quantity: 1, selected: true },
      ]
    })
  }, [update])

  // ── Видалити товар ──────────────────────────────────────────────────────────
  const removeItem = useCallback((id) => {
    update((prev) => prev.filter((item) => item.id !== id))
  }, [update])

  // ── Змінити кількість ───────────────────────────────────────────────────────
  // Якщо quantity стає 0 — видаляємо товар.
  const changeQty = useCallback((id, delta) => {
    update((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }, [update])

  // ── Встановити конкретну кількість ──────────────────────────────────────────
  const setQty = useCallback((id, qty) => {
    const safeQty = Math.max(1, qty)
    update((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: safeQty } : item
      )
    )
  }, [update])

  // ── Тогл "вибрати" ──────────────────────────────────────────────────────────
  const toggleSelect = useCallback((id) => {
    update((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    )
  }, [update])

  // ── Вибрати/зняти всі ──────────────────────────────────────────────────────
  const toggleSelectAll = useCallback((value) => {
    update((prev) => prev.map((item) => ({ ...item, selected: value })))
  }, [update])

  // ── Очистити кошик ──────────────────────────────────────────────────────────
  const clear = useCallback(() => update([]), [update])

  // ── Похідні значення ────────────────────────────────────────────────────────
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const selectedItems = items.filter((item) => item.selected)

  // Якщо товарів > 1 — показуємо чекбокси і рахуємо тільки вибрані.
  // Якщо товар один — рахуємо його без чекбокса.
  const hasSelectionUi = items.length > 1
  const itemsForTotal = hasSelectionUi ? selectedItems : items
  const total = itemsForTotal.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  useEffect(() => {
    let isCancelled = false

    async function syncCartScope() {
      if (isAuthorized && user?.id) {
        const mergeResult = await mergeGuestCartIntoUserCart({
          userId: user.id,
          items,
        })

        if (mergeResult?.merged) {
          if (!isCancelled) {
            saveCart(mergeResult.items)
            setItems(mergeResult.items)
          }
          return
        }
      }

      if (!isCancelled) {
        await syncItemsToServer(items)
      }
    }

    void syncCartScope()

    return () => {
      isCancelled = true
    }
  }, [isAuthorized, syncItemsToServer, user?.id])

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        selectedItems,
        total,
        hasSelectionUi,
        addItem,
        removeItem,
        changeQty,
        setQty,
        toggleSelect,
        toggleSelectAll,
        clear,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
// Використання: const { items, addItem, totalCount } = useCart()
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
