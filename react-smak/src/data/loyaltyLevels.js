const FALLBACK_LOYALTY_LEVELS = [
  {
    id: 'fallback-druzhynnyk',
    name: 'Дружинник',
    slug: 'druzhynnyk',
    min_total_spent: 1500,
    discount_percent: 3,
    description:
      '3% кешбек на всі покупки\nДоступ до спеціальних пропозицій\nСпеціальна святкова знижка 7% у ваш день народження\nЕксклюзивні рецепти та комбінації смаків від шефа',
  },
  {
    id: 'fallback-boyaryn',
    name: 'Боярин',
    slug: 'boyaryn',
    min_total_spent: 25000,
    discount_percent: 7,
    description:
      '7% кешбек на всі покупки\nСпеціальні ціни на вибрані товари\nІндивідуальна святкова пропозиція + знижка 10% у ваш день народження\nЗнижка на перше замовлення персональної дегустації\nЗапрошення на сезонні події',
  },
  {
    id: 'fallback-knyaz',
    name: 'Князь',
    slug: 'knyaz',
    min_total_spent: 100000,
    discount_percent: 10,
    description:
      '10% кешбек на всі покупки\nПодарунки до свят і при релізах нових продуктів\nІндивідуальний святковий подарунок + знижка 12% у ваш день народження\nЩорічна знижка на персональну дегустацію\nЕксклюзивний доступ до спеціальних подій',
  },
]

const LOYALTY_IMAGES = {
  druzhynnyk: '/assets/images/loyalty-druzh.png',
  boyaryn: '/assets/images/loyalty-boyaryn.png',
  knyaz: '/assets/images/loyalty-knyaz.png',
}

const LOYALTY_COPY = {
  druzhynnyk: {
    title: 'Дружинник',
    howToGet: 'реєстрація + перша покупка (від 1500 грн)',
    bonuses: [
      '3% кешбек на всі покупки',
      'Доступ до спеціальних пропозицій',
      'Спеціальна святкова знижка 7% у ваш день народження',
      'Ексклюзивні рецепти та комбінації смаків від шефа в застосунку',
    ],
  },
  boyaryn: {
    title: 'Боярин',
    howToGet: 'накопичена сума покупок – 25 000 грн',
    bonuses: [
      '7% кешбек на всі покупки',
      'Спеціальні ціни на вибрані товари',
      'Індивідуальна святкова пропозиція + знижка 10% у ваш день народження',
      'Знижка на перше замовлення персональної дегустації',
      'Запрошення на сезонні події',
    ],
  },
  knyaz: {
    title: 'Князь',
    howToGet: 'накопичена сума покупок – 100 000 грн',
    bonuses: [
      '10% кешбек на всі покупки',
      'Подарунки до свят і при релізах нових продуктів',
      'Індивідуальний святковий подарунок + знижка 12% у ваш день народження',
      'Щорічна знижка на персональну дегустацію',
      'Ексклюзивний доступ до спеціальних подій',
    ],
  },
}

function stripHtml(value = '') {
  return String(value).replace(/<[^>]*>/g, '\n')
}

function parseDescriptionToBonuses(description = '') {
  return stripHtml(description)
    .split('\n')
    .map((item) => item.replace(/^[\s•\-–—]+/, '').trim())
    .filter(Boolean)
}

function formatMoney(value) {
  return new Intl.NumberFormat('uk-UA').format(Number(value || 0))
}

function normalizeLookupValue(value = '') {
  return String(value || '').trim().toLowerCase()
}

function resolveLoyaltyKey(levelOrSlug) {
  if (levelOrSlug && typeof levelOrSlug === 'object') {
    const spent = Number(levelOrSlug.min_total_spent || 0)
    const discount = Number(levelOrSlug.discount_percent || 0)

    if (spent >= 100000 || discount >= 10) return 'knyaz'
    if (spent >= 25000 || discount >= 7) return 'boyaryn'
    if (spent > 0 || discount > 0) return 'druzhynnyk'
  }

  const rawSlug =
    typeof levelOrSlug === 'string' ? levelOrSlug : levelOrSlug?.slug || levelOrSlug?.name || ''

  const normalized = normalizeLookupValue(rawSlug)

  if (LOYALTY_IMAGES[normalized] || LOYALTY_COPY[normalized]) {
    return normalized
  }

  if (normalized.includes('друж')) return 'druzhynnyk'
  if (normalized.includes('бояр')) return 'boyaryn'
  if (normalized.includes('княз')) return 'knyaz'

  return 'druzhynnyk'
}

function getImageBySlug(levelOrSlug = '') {
  return LOYALTY_IMAGES[resolveLoyaltyKey(levelOrSlug)] || '/assets/images/loyalty-druzh.png'
}

function buildHowToGet(minTotalSpent, index) {
  if (index === 0) {
    return `реєстрація + перша покупка (від ${formatMoney(minTotalSpent)} грн)`
  }

  return `накопичена сума покупок від ${formatMoney(minTotalSpent)} грн`
}

export function getFallbackLoyaltyLevels() {
  return FALLBACK_LOYALTY_LEVELS.map((level, index) => ({
    ...level,
    image: getImageBySlug(level),
    howToGet:
      LOYALTY_COPY[resolveLoyaltyKey(level)]?.howToGet ||
      buildHowToGet(level.min_total_spent, index),
    bonuses:
      LOYALTY_COPY[resolveLoyaltyKey(level)]?.bonuses ||
      parseDescriptionToBonuses(level.description),
    showPreviousLevelNote: index > 0,
  }))
}

export function normalizeLoyaltyLevels(levels = []) {
  const source = levels.length > 0 ? levels : getFallbackLoyaltyLevels()
  const sortedLevels = [...source].sort(
    (left, right) => Number(left.min_total_spent || 0) - Number(right.min_total_spent || 0)
  )

  return sortedLevels.map((level, index) => ({
    ...level,
    slug: level.slug || resolveLoyaltyKey(level),
    title: LOYALTY_COPY[resolveLoyaltyKey(level)]?.title || level.name,
    image: getImageBySlug(level),
    howToGet:
      LOYALTY_COPY[resolveLoyaltyKey(level)]?.howToGet ||
      buildHowToGet(level.min_total_spent, index),
    bonuses:
      LOYALTY_COPY[resolveLoyaltyKey(level)]?.bonuses ||
      (Array.isArray(level.bonuses) && level.bonuses.length > 0
        ? level.bonuses
        : parseDescriptionToBonuses(level.description)),
    showPreviousLevelNote: index > 0,
  }))
}

export function buildUserLoyaltySummary(user, levels = []) {
  const normalizedLevels = normalizeLoyaltyLevels(levels)
  const spent = Number(user?.lifetime_spent || 0)
  const explicitSlug = user?.loyalty_level_id?.slug || null
  const explicitLevel = normalizedLevels.find((level) => level.slug === explicitSlug) || null

  let currentLevel =
    (explicitLevel && spent >= Number(explicitLevel.min_total_spent || 0)
      ? explicitLevel
      : null) ||
    normalizedLevels
      .filter((level) => spent >= Number(level.min_total_spent || 0))
      .at(-1) ||
    null

  const currentIndex = currentLevel
    ? normalizedLevels.findIndex((level) => level.slug === currentLevel.slug)
    : -1

  const nextLevel =
    currentIndex >= 0 ? normalizedLevels[currentIndex + 1] || null : normalizedLevels[0] || null

  const progressWidth = (() => {
    if (!normalizedLevels.length) return '0%'
    if (!currentLevel) return '0%'
    if (!nextLevel) return '100%'

    const segmentsCount = Math.max(normalizedLevels.length - 1, 1)
    const start = Number(currentLevel.min_total_spent || 0)
    const end = Number(nextLevel.min_total_spent || 0)
    const span = Math.max(end - start, 1)
    const ratio = Math.max(0, Math.min((spent - start) / span, 1))
    const overallRatio = Math.max(0, Math.min((currentIndex + ratio) / segmentsCount, 1))
    return `${Math.round(overallRatio * 100)}%`
  })()

  return {
    levels: normalizedLevels,
    currentLevel,
    nextLevel,
    spent,
    hasLoyaltyStatus: Boolean(currentLevel),
    loyaltyStatus: currentLevel
      ? `${currentLevel.name}${currentLevel.discount_percent ? ` • ${currentLevel.discount_percent}%` : ''}`
      : null,
    nextLevelAmount: nextLevel
      ? `${formatMoney(Math.max(Number(nextLevel.min_total_spent || 0) - spent, 0))} грн`
      : 'Максимальний рівень досягнуто',
    progressWidth,
    activeLevelSlugs: normalizedLevels
      .filter((level) => spent >= Number(level.min_total_spent || 0))
      .map((level) => level.slug),
  }
}
