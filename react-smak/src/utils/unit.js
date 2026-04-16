const UNIT_LABEL_MAP = {
  pcs: 'шт',
  kg: 'кг',
  g: 'г',
  pkg: 'уп',
  '100g': '100г',
}

export function normalizeUnitLabel(unit) {
  const normalizedUnit = String(unit || '').trim()

  if (!normalizedUnit) {
    return ''
  }

  return UNIT_LABEL_MAP[normalizedUnit] || normalizedUnit
}
