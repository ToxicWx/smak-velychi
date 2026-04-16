import { normalizeUnitLabel } from './unit'

export function resolvePrice(item) {
  const base = Number(item?.base_price || 0)
  const type = item?.discount_type
  const value = Number(item?.discount_value || 0)
  const explicitOldPrice = Number(item?.old_price || 0)

  // Якщо old_price уже задана в CMS і вона більша за базову,
  // вважаємо, що це готова "стара ціна".
  if (explicitOldPrice > base) {
    return {
      price: base,
      oldPrice: explicitOldPrice,
    }
  }

  // Відсоткова знижка.
  if (type === 'percentage' && value > 0) {
    const discounted = +(base * (1 - value / 100)).toFixed(2)
    return {
      price: Math.max(0, discounted),
      oldPrice: base,
    }
  }

  // Фіксована знижка.
  if (type === 'fixed' && value > 0) {
    const discounted = +(base - value).toFixed(2)
    return {
      price: Math.max(0, discounted),
      oldPrice: base,
    }
  }

  // Без знижки.
  return {
    price: base,
    oldPrice: null,
  }
}

export function formatPrice(price, unit = '') {
  if (price === null || price === undefined || price === '') return ''
  const normalizedUnit = normalizeUnitLabel(unit)
  return normalizedUnit ? `${price} грн / ${normalizedUnit}` : `${price} грн`
}
