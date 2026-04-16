import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../shared/button/Button'
import CartItemCard from '../CartItemCard/CartItemCard'
import CartEmptyState from '../CartEmptyState/CartEmptyState'
import { useCart } from '../../../context/CartContext'
import './cart-modal.css'

function CartModal({ isOpen = false, onClose }) {
  const [isVisible, setIsVisible] = useState(isOpen)
  const [isRendered, setIsRendered] = useState(isOpen)
  const navigate = useNavigate()

  const {
    items,
    total,
    hasSelectionUi,
    removeItem,
    changeQty,
    toggleSelect,
    toggleSelectAll,
  } = useCart()

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true)

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true)
        })
      })
    } else if (isRendered) {
      setIsVisible(false)

      const timer = setTimeout(() => {
        setIsRendered(false)
      }, 350)

      return () => clearTimeout(timer)
    }
  }, [isOpen, isRendered])

  if (!isRendered) return null

  const isEmpty = items.length === 0
  const allSelected = items.length > 0 && items.every((item) => item.selected === true)

  const handleSelectAll = () => {
    toggleSelectAll(!allSelected)
  }

  return (
    <div className={`cart-modal ${isVisible ? 'cart-modal--open' : ''}`}>
      <div className="cart-modal__overlay" onClick={onClose} aria-hidden="true" />

      <aside
        className="cart-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-label="Кошик"
      >
        <div className="cart-modal__header">
          <h2 className="cart-modal__title">Кошик</h2>

          <button
            type="button"
            className="cart-modal__close"
            onClick={onClose}
            aria-label="Закрити кошик"
          >
            ×
          </button>
        </div>

        <div className="cart-modal__divider" />

        {hasSelectionUi && !isEmpty && (
          <div className="cart-modal__select-all">
            <button
              type="button"
              className="cart-modal__select-all-btn"
              onClick={handleSelectAll}
            >
              Вибрати всі
            </button>
          </div>
        )}

        <div className="cart-modal__body">
          {isEmpty && <CartEmptyState />}

          {!isEmpty && (
            <div className="cart-modal__items">
              {items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  showCheckbox={hasSelectionUi}
                  onToggleSelect={toggleSelect}
                  onRemove={removeItem}
                  onDecrease={(id) => changeQty(id, -1)}
                  onIncrease={(id) => changeQty(id, +1)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="cart-modal__footer">
          {isEmpty ? (
            <Button
              variant="light"
              preset="cart-wide"
              type="button"
              onClick={() => {
                onClose?.()
                navigate('/assortment')
              }}
            >
              Переглянути весь Асортимент
            </Button>
          ) : (
            <Button
              variant="light"
              preset="cart-wide"
              type="button"
              onClick={() => {
                onClose?.()
                navigate('/checkout')
              }}
            >
              Продовжити • {total} грн
            </Button>
          )}
        </div>
      </aside>
    </div>
  )
}

export default CartModal
