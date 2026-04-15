const BASE_URL = import.meta.env.VITE_DIRECTUS_URL || '/directus'
const TOKEN_KEY = 'smak_auth_token'
const GUEST_CART_TOKEN_KEY = 'smak_guest_cart_token'
const SERVICE_EMAIL = import.meta.env.VITE_DIRECTUS_SERVICE_EMAIL
const SERVICE_PASSWORD = import.meta.env.VITE_DIRECTUS_SERVICE_PASSWORD

const LOCAL_SESSION_PREFIXES = ['temp-session-', 'local-session-']
const LOGIN_CODE_TTL_MINUTES = 10
const SESSION_TTL_DAYS = 30
const TEST_LOGIN_CODE = '1234'

const CARD_FIELDS = [
  'id',
  'title',
  'slug',
  'base_price',
  'old_price',
  'unit_label',
  'discount_type',
  'discount_value',
  'og_image_file_id',
  'category_id',
].join(',')

const DETAIL_FIELDS = [
  'id',
  'title',
  'slug',
  'slogan',
  'description',
  'ingredients_title',
  'ingredients',
  'info_block_1_title',
  'info_block_1_text',
  'info_block_2_title',
  'info_block_2_text',
  'story_title',
  'story_text',
  'chef_section_title',
  'chef_1_title',
  'chef_1_text',
  'chef_1_image_file_id',
  'chef_2_title',
  'chef_2_text',
  'chef_2_image_file_id',
  'chef_3_title',
  'chef_3_text',
  'chef_3_image_file_id',
  'base_price',
  'old_price',
  'unit_label',
  'discount_type',
  'discount_value',
  'discount_start_at',
  'discount_end_at',
  'og_image_file_id',
  'category_id.id',
  'category_id.name',
  'category_id.slug',
  'stock_status',
].join(',')

const USER_FIELDS = [
  'id',
  'first_name',
  'last_name',
  'email',
  'phone',
  'email_verified',
  'phone_verified',
  'status',
  'lifetime_spent',
  'loyalty_level_id.id',
  'loyalty_level_id.name',
  'loyalty_level_id.slug',
  'loyalty_level_id.min_total_spent',
  'loyalty_level_id.discount_percent',
].join(',')

const POST_LIST_FIELDS = [
  'id',
  'title',
  'slug',
  'excerpt',
  'published_at',
  'cover_image_file_id',
  'og_image_file_id',
  'post_category_id.id',
  'post_category_id.name',
  'post_category_id.slug',
  'prep_time_minutes',
  'servings_label',
  'product_note',
  'related_product_id.id',
  'related_product_id.title',
  'related_product_id.slug',
].join(',')

const POST_DETAIL_FIELDS = [
  'id',
  'title',
  'slug',
  'excerpt',
  'content',
  'published_at',
  'cover_image_file_id',
  'og_image_file_id',
  'seo_title',
  'seo_description',
  'post_category_id.id',
  'post_category_id.name',
  'post_category_id.slug',
  'prep_time_minutes',
  'servings_label',
  'ingredients_text',
  'secret_title',
  'product_note',
  'cta_button_text',
  'related_product_id.id',
  'related_product_id.title',
  'related_product_id.slug',
  'step_1_text',
  'step_1_image_file_id',
  'step_2_text',
  'step_2_image_file_id',
  'step_3_text',
  'step_3_image_file_id',
  'step_4_text',
  'step_4_image_file_id',
  'step_5_text',
  'step_5_image_file_id',
].join(',')

const BLOG_EXCLUDED_CATEGORY_SLUGS = ['retsepti-vid-shefa', 'istoriya-smaku']
const TASTE_STORY_CATEGORY_SLUGS = ['retsepti-vid-shefa', 'istoriya-smaku']

let serviceToken = null
let serviceTokenExpiresAt = 0
let serviceLoginPromise = null

function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY)
}

function isLocalSessionToken(token) {
  return (
    typeof token === 'string' &&
    LOCAL_SESSION_PREFIXES.some((prefix) => token.startsWith(prefix))
  )
}

function resolveAuthHeader(authMode = 'auto') {
  const token = getStoredToken()

  if (!token || authMode === 'public') {
    return {}
  }

  if (authMode === 'require') {
    return { Authorization: `Bearer ${token}` }
  }

  if (isLocalSessionToken(token)) {
    return {}
  }

  return { Authorization: `Bearer ${token}` }
}

async function directusRequest(path, options = {}) {
  const { authMode = 'auto', headers: customHeaders, ...fetchOptions } = options

  const headers = {
    'Content-Type': 'application/json',
    ...resolveAuthHeader(authMode),
    ...(customHeaders || {}),
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...fetchOptions,
    headers,
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text || `HTTP ${response.status}`)
  }

  return response.json()
}

async function getServiceAccessToken() {
  const now = Date.now()

  if (serviceToken && now < serviceTokenExpiresAt) {
    return serviceToken
  }

  if (serviceLoginPromise) {
    return serviceLoginPromise
  }

  if (!SERVICE_EMAIL || !SERVICE_PASSWORD) {
    throw new Error('Directus service credentials are missing.')
  }

  serviceLoginPromise = fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: SERVICE_EMAIL,
      password: SERVICE_PASSWORD,
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        const text = await response.text()
        throw new Error(text || `HTTP ${response.status}`)
      }

      return response.json()
    })
    .then((payload) => {
      serviceToken = payload.data.access_token
      serviceTokenExpiresAt = Date.now() + Number(payload.data.expires || 0) - 5000
      return serviceToken
    })
    .finally(() => {
      serviceLoginPromise = null
    })

  return serviceLoginPromise
}

async function directusServiceRequest(path, options = {}) {
  const token = await getServiceAccessToken()

  return directusRequest(path, {
    ...options,
    authMode: 'public',
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  })
}

function formatPhone(phone = '') {
  return phone.replace(/\s+/g, '').trim()
}

function buildCustomerName(firstName = '', lastName = '', fallback = '') {
  const fullName = `${firstName} ${lastName}`.trim()
  return fullName || fallback || 'Гість'
}

function generateOrderNumber() {
  return `TMP-${Date.now()}`
}

function formatOrderNumber(orderId) {
  const normalizedId = String(orderId || '').replace(/\D+/g, '')
  const paddedId = normalizedId.padStart(6, '0')
  return `SM-${paddedId}`
}

function generateSessionToken(userId) {
  return `local-session-${userId}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)}`
}

function generateGuestCartToken() {
  return `guest-cart-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60 * 1000)
}

function addDays(date, days) {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000)
}

function stripHtml(html = '') {
  return String(html).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

async function sha256(value) {
  const data = new TextEncoder().encode(value)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

async function createUserSessionRecord(userId, token) {
  if (!userId || !token) {
    return null
  }

  const sessionTokenHash = await sha256(token)
  const now = new Date()
  const expiresAt = addDays(now, SESSION_TTL_DAYS)

  return directusServiceRequest('/items/user_sessions', {
    method: 'POST',
    body: JSON.stringify({
      user_id: userId,
      session_token_hash: sessionTokenHash,
      ip_address: null,
      user_agent: navigator.userAgent || 'unknown',
      expires_at: expiresAt.toISOString(),
    }),
  })
}

function readGuestCartToken() {
  try {
    return localStorage.getItem(GUEST_CART_TOKEN_KEY)
  } catch {
    return null
  }
}

function getGuestCartToken() {
  const existingToken = readGuestCartToken()

  if (existingToken) {
    return existingToken
  }

  const nextToken = generateGuestCartToken()

  try {
    localStorage.setItem(GUEST_CART_TOKEN_KEY, nextToken)
  } catch {
    return nextToken
  }

  return nextToken
}

function clearGuestCartToken() {
  try {
    localStorage.removeItem(GUEST_CART_TOKEN_KEY)
  } catch {
    // ignore storage cleanup errors
  }
}

async function getActiveCartByUserId(userId) {
  if (!userId) {
    return null
  }

  const response = await directusServiceRequest(
    `/items/carts?filter[user_id][id][_eq]=${userId}&sort=-updated_at,-id&limit=1`
  )

  return response.data?.[0] || null
}

async function getActiveCartByGuestToken(guestToken) {
  if (!guestToken) {
    return null
  }

  const response = await directusServiceRequest(
    `/items/carts?filter[guest_token][_eq]=${encodeURIComponent(
      guestToken
    )}&sort=-updated_at,-id&limit=1`
  )

  return response.data?.[0] || null
}

async function createCartRecord({ userId, guestToken }) {
  const payload = {
    status: 'active',
    user_id: userId || null,
    guest_token: userId ? null : guestToken || null,
  }

  const response = await directusServiceRequest('/items/carts', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  return response.data
}

async function updateCartRecord(cartId, payload) {
  if (!cartId) {
    return null
  }

  const response = await directusServiceRequest(`/items/carts/${cartId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })

  return response.data
}

async function getOrCreateCartRecord({ userId, guestToken, hasItems }) {
  const existingCart = userId
    ? await getActiveCartByUserId(userId)
    : await getActiveCartByGuestToken(guestToken)

  if (existingCart) {
    return existingCart
  }

  if (!hasItems) {
    return null
  }

  return createCartRecord({ userId, guestToken })
}

async function replaceCartItems(cartId, items) {
  const existingItemsResponse = await directusServiceRequest(
    `/items/cart_items?filter[cart_id][id][_eq]=${cartId}&fields=id&limit=-1`
  )

  const existingItemIds = (existingItemsResponse.data || []).map((item) => item.id)

  if (existingItemIds.length) {
    await Promise.all(
      existingItemIds.map((itemId) =>
        directusServiceRequest(`/items/cart_items/${itemId}`, {
          method: 'DELETE',
        })
      )
    )
  }

  if (!items.length) {
    return
  }

  await Promise.all(
    items.map((item) =>
      directusServiceRequest('/items/cart_items', {
        method: 'POST',
        body: JSON.stringify({
          cart_id: cartId,
          product_id: item.id,
          quantity: Number(item.quantity) || 1,
        }),
      })
    )
  )
}

async function getCartItemsSnapshot(cartId) {
  if (!cartId) {
    return []
  }

  const response = await directusServiceRequest(
    `/items/cart_items?filter[cart_id][id][_eq]=${cartId}&fields=product_id,quantity&limit=-1`
  )

  return (response.data || [])
    .map((item) => ({
      id:
        item?.product_id && typeof item.product_id === 'object'
          ? item.product_id.id
          : item?.product_id,
      quantity: Number(item?.quantity) || 1,
    }))
    .filter((item) => item.id != null)
}

function normalizeCartItemsForMerge(items = []) {
  return items
    .map((item) => ({
      ...item,
      id: item?.id ?? item?.productId ?? null,
      quantity: Number(item?.quantity) || 1,
    }))
    .filter((item) => item.id != null)
}

function mergeCartItemLists(primaryItems = [], secondaryItems = []) {
  const merged = new Map()

  for (const item of normalizeCartItemsForMerge(primaryItems)) {
    merged.set(String(item.id), { ...item })
  }

  for (const item of normalizeCartItemsForMerge(secondaryItems)) {
    const key = String(item.id)
    const existing = merged.get(key)

    if (existing) {
      merged.set(key, {
        ...existing,
        quantity: Number(existing.quantity || 0) + Number(item.quantity || 0),
      })
      continue
    }

    merged.set(key, { ...item, selected: item.selected ?? true })
  }

  return Array.from(merged.values())
}

async function deleteCartRecord(cartId) {
  if (!cartId) {
    return
  }

  await replaceCartItems(cartId, [])
  await directusServiceRequest(`/items/carts/${cartId}`, {
    method: 'DELETE',
  })
}

async function revokeUserSessionRecord(token) {
  if (!token) {
    return null
  }

  const sessionTokenHash = await sha256(token)
  const response = await directusServiceRequest(
    `/items/user_sessions?filter[session_token_hash][_eq]=${encodeURIComponent(
      sessionTokenHash
    )}&sort=-created_at&limit=1`
  )

  const sessionId = response.data?.[0]?.id

  if (!sessionId) {
    return null
  }

  return directusServiceRequest(`/items/user_sessions/${sessionId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      revoked_at: new Date().toISOString(),
    }),
  })
}

async function registerUserSession(userId, token) {
  try {
    await createUserSessionRecord(userId, token)
  } catch (error) {
    console.warn('Failed to create user session record:', error)
  }
}

function buildLoyaltyStatus(user) {
  const loyaltyLevel = user.loyalty_level_id

  if (!loyaltyLevel || typeof loyaltyLevel !== 'object') {
    return null
  }

  const discount = loyaltyLevel.discount_percent
    ? `${loyaltyLevel.discount_percent}%`
    : null

  return discount ? `${loyaltyLevel.name} • ${discount}` : loyaltyLevel.name
}

function mapUser(user) {
  if (!user) return null

  return {
    ...user,
    firstName: user.first_name || '',
    lastName: user.last_name || '',
    loyalty_status: buildLoyaltyStatus(user),
    next_level_amount: null,
  }
}

function formatDate(dateValue) {
  if (!dateValue) return ''

  return new Intl.DateTimeFormat('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(dateValue))
}

function formatCurrency(value) {
  const number = Number(value || 0)
  return `${number.toFixed(0)} грн`
}

function mapOrderStatus(status) {
  const labels = {
    new: 'Нове',
    processing: 'В роботі',
    shipped: 'Відправлено',
    delivered: 'Доставлено',
    cancelled: 'Скасовано',
  }

  return labels[status] || status || 'Невідомо'
}

function mapPost(post) {
  return {
    ...post,
    excerpt_plain: stripHtml(post.excerpt || ''),
    content_plain: stripHtml(post.content || ''),
    image: getAssetUrl(post.cover_image_file_id || post.og_image_file_id),
    category: post.post_category_id || null,
  }
}

function mapTasteStory(post) {
  if (!post) return null

  const relatedProduct =
    post.related_product_id && typeof post.related_product_id === 'object'
      ? {
          id: post.related_product_id.id,
          title: post.related_product_id.title,
          slug: post.related_product_id.slug,
        }
      : null

  const steps = [1, 2, 3, 4, 5]
    .map((index) => {
      const html = post[`step_${index}_text`] || ''
      const image = getAssetUrl(post[`step_${index}_image_file_id`])

      if (!html && !image) {
        return null
      }

      return {
        id: `${post.id}-step-${index}`,
        stepNumber: index,
        html,
        image,
      }
    })
    .filter(Boolean)

  return {
    ...mapPost(post),
    prepTimeMinutes: Number(post.prep_time_minutes || 0) || null,
    prepTimeLabel: post.prep_time_minutes
      ? `${post.prep_time_minutes} хвилин`
      : '',
    servingsLabel: post.servings_label || '',
    ingredientsHtml: post.ingredients_text || '',
    secretTitle: post.secret_title || '',
    productNote: post.product_note || '',
    ctaButtonText: post.cta_button_text || '',
    relatedProduct,
    steps,
  }
}

function normalizeCategorySlugs(categorySlugs) {
  if (Array.isArray(categorySlugs)) {
    return categorySlugs.filter(Boolean)
  }

  return categorySlugs ? [categorySlugs] : []
}

function matchesCategorySlugs(post, categorySlugs) {
  const slugs = normalizeCategorySlugs(categorySlugs)

  if (!slugs.length) {
    return true
  }

  return slugs.includes(post?.category?.slug)
}

function isRecipeLikePost(post) {
  if (!post) {
    return false
  }

  const hasPrepMeta = Boolean(
    post.prep_time_minutes ||
      post.prepTimeMinutes ||
      post.prepTimeLabel ||
      post.servings_label ||
      post.servingsLabel
  )
  const hasIngredients = Boolean(post.ingredients_text || post.ingredientsHtml)
  const hasRelatedProduct = Boolean(post.related_product_id || post.relatedProduct)
  const hasSteps = Boolean(post.steps?.length) || [1, 2, 3, 4, 5].some(
    (index) => post[`step_${index}_text`] || post[`step_${index}_image_file_id`]
  )

  return hasPrepMeta || hasIngredients || hasRelatedProduct || hasSteps
}

async function findUserByPhone(phone) {
  const response = await directusServiceRequest(
    `/items/users?filter[phone][_eq]=${encodeURIComponent(phone)}&limit=1&fields=${USER_FIELDS}`
  )

  return mapUser(response.data?.[0] || null)
}

async function getUserById(userId) {
  const response = await directusServiceRequest(
    `/items/users/${userId}?fields=${USER_FIELDS}`
  )

  return mapUser(response.data)
}

async function createUserByPhone(phone) {
  const payload = {
    first_name: 'Новий',
    last_name: 'Користувач',
    phone,
    phone_verified: true,
    email_verified: false,
    status: 'active',
  }

  const response = await directusServiceRequest('/items/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  return getUserById(response.data.id)
}

async function findOrCreateUserByPhone(phone) {
  const existingUser = await findUserByPhone(phone)
  if (existingUser) return existingUser

  return createUserByPhone(phone)
}

async function getLatestLoginCode(targetPhone) {
  const response = await directusServiceRequest(
    `/items/auth_verification_codes?filter[target][_eq]=${encodeURIComponent(
      targetPhone
    )}&filter[purpose][_eq]=login&filter[channel][_eq]=sms&sort=-created_at&limit=1`
  )

  return response.data?.[0] || null
}

async function getOrderItems(orderId) {
  const fields = [
    'id',
    'product_name_snapshot',
    'product_slug_snapshot',
    'price_snapshot',
    'unit_label_snapshot',
    'quantity',
    'product_id.id',
    'product_id.og_image_file_id',
  ].join(',')

  const response = await directusServiceRequest(
    `/items/order_items?filter[order_id][_eq]=${orderId}&fields=${fields}&sort=id`
  )

  return (response.data || []).map((item) => {
    const productRelation =
      item.product_id && typeof item.product_id === 'object' ? item.product_id : null

    return {
      id: item.id,
      title: item.product_name_snapshot,
      price: formatCurrency(item.price_snapshot),
      image: getAssetUrl(productRelation?.og_image_file_id),
      href: item.product_slug_snapshot ? `/product/${item.product_slug_snapshot}` : '#',
    }
  })
}

async function getRawUserOrders(userId) {
  const response = await directusServiceRequest(
    `/items/orders?filter[user_id][_eq]=${userId}&sort=-created_at`
  )

  return response.data || []
}

async function fetchOrdersWithItems(userId) {
  const orders = await getRawUserOrders(userId)

  return Promise.all(
    orders.map(async (order) => ({
      id: order.order_number || order.id,
      date: formatDate(order.created_at),
      status: mapOrderStatus(order.status),
      total: formatCurrency(order.total_amount),
      createdAt: order.created_at,
      products: await getOrderItems(order.id),
    }))
  )
}

async function getPublishedPosts() {
  const response = await directusRequest(
    `/items/posts?filter[status][_eq]=published&sort=-published_at&fields=${POST_LIST_FIELDS}`,
    { authMode: 'public' }
  )

  return (response.data || []).map(mapPost)
}

async function getPublishedPostBySlugInternal(slug) {
  const response = await directusRequest(
    `/items/posts?filter[status][_eq]=published&filter[slug][_eq]=${encodeURIComponent(
      slug
    )}&limit=1&fields=${POST_DETAIL_FIELDS}`,
    { authMode: 'public' }
  )

  return mapPost(response.data?.[0] || null)
}

async function getPublishedTasteStoriesByCategorySlug(categorySlugs) {
  const response = await directusRequest(
    `/items/posts?filter[status][_eq]=published&sort=-published_at&fields=${POST_LIST_FIELDS}`,
    { authMode: 'public' }
  )

  return (response.data || [])
    .map(mapTasteStory)
    .filter((post) => matchesCategorySlugs(post, categorySlugs))
}

async function getPublishedTasteStoryBySlugInternal(slug, categorySlugs) {
  const response = await directusRequest(
    `/items/posts?filter[status][_eq]=published&filter[slug][_eq]=${encodeURIComponent(
      slug
    )}&limit=1&fields=${POST_DETAIL_FIELDS}`,
    { authMode: 'public' }
  )

  const story = mapTasteStory(response.data?.[0] || null)

  return matchesCategorySlugs(story, categorySlugs) ? story : null
}

export async function requestLoginCode(payload) {
  const normalizedPhone = formatPhone(payload.phone)

  if (!normalizedPhone) {
    throw new Error('Phone is required.')
  }

  const user = await findOrCreateUserByPhone(normalizedPhone)
  const expiresAt = addMinutes(new Date(), LOGIN_CODE_TTL_MINUTES)

  await directusServiceRequest('/items/auth_verification_codes', {
    method: 'POST',
    body: JSON.stringify({
      user_id: user.id,
      channel: 'sms',
      target: normalizedPhone,
      code_hash: await sha256(TEST_LOGIN_CODE),
      purpose: 'login',
      attempts_count: 0,
      expires_at: expiresAt.toISOString(),
    }),
  })

  return {
    success: true,
    phone: normalizedPhone,
    debugCode: TEST_LOGIN_CODE,
  }
}

export async function verifyLoginCode(payload) {
  const normalizedPhone = formatPhone(payload.phone)
  const normalizedCode = String(payload.code || '').trim()
  const isTestCode = normalizedCode === TEST_LOGIN_CODE

  if (isTestCode) {
    const latestCode = await getLatestLoginCode(normalizedPhone)

    if (latestCode?.id && !latestCode.used_at) {
      await directusServiceRequest(`/items/auth_verification_codes/${latestCode.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          used_at: new Date().toISOString(),
        }),
      })
    }

    const user = latestCode?.user_id
      ? await getUserById(latestCode.user_id)
      : await findOrCreateUserByPhone(normalizedPhone)

    const token = generateSessionToken(user.id)
    await registerUserSession(user.id, token)

    return {
      success: true,
      token,
      user,
    }
  }

  const latestCode = await getLatestLoginCode(normalizedPhone)

  if (!latestCode) {
    return { success: false }
  }

  const hashedCode = await sha256(normalizedCode)
  const isExpired = new Date(latestCode.expires_at).getTime() < Date.now()
  const isCodeValid = latestCode.code_hash === hashedCode

  if (isExpired || latestCode.used_at || !isCodeValid) {
    if (latestCode.id && !isCodeValid) {
      await directusServiceRequest(`/items/auth_verification_codes/${latestCode.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          attempts_count: Number(latestCode.attempts_count || 0) + 1,
        }),
      })
    }

    return { success: false }
  }

  await directusServiceRequest(`/items/auth_verification_codes/${latestCode.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      used_at: new Date().toISOString(),
    }),
  })

  const user = latestCode.user_id
    ? await getUserById(latestCode.user_id)
    : await findOrCreateUserByPhone(normalizedPhone)

  const token = generateSessionToken(user.id)
  await registerUserSession(user.id, token)

  return {
    success: true,
    token,
    user,
  }
}

export async function revokeCurrentSession(token) {
  try {
    await revokeUserSessionRecord(token)
  } catch (error) {
    console.warn('Failed to revoke user session record:', error)
  }
}

export async function syncCartSnapshot(payload = {}) {
  const items = Array.isArray(payload.items) ? payload.items : []
  const userId = payload.userId || null
  const guestToken = userId
    ? null
    : payload.guestToken || readGuestCartToken() || (items.length ? getGuestCartToken() : null)

  if (!userId && !guestToken) {
    return null
  }

  try {
    const cart = await getOrCreateCartRecord({
      userId,
      guestToken,
      hasItems: items.length > 0,
    })

    if (!cart) {
      return null
    }

    await replaceCartItems(cart.id, items)

    return {
      success: true,
      cartId: cart.id,
      guestToken,
    }
  } catch (error) {
    console.warn('Failed to sync cart snapshot:', error)
    return {
      success: false,
      guestToken,
      error,
    }
  }
}

export async function mergeGuestCartIntoUserCart(payload = {}) {
  const userId = payload.userId || null
  const guestToken = readGuestCartToken()

  if (!userId || !guestToken) {
    return { merged: false, items: normalizeCartItemsForMerge(payload.items) }
  }

  const guestCart = await getActiveCartByGuestToken(guestToken)

  if (!guestCart) {
    clearGuestCartToken()
    return { merged: false, items: normalizeCartItemsForMerge(payload.items) }
  }

  const guestItems = normalizeCartItemsForMerge(payload.items).length
    ? normalizeCartItemsForMerge(payload.items)
    : await getCartItemsSnapshot(guestCart.id)

  const userCart = await getActiveCartByUserId(userId)

  if (!userCart) {
    const updatedCart = await updateCartRecord(guestCart.id, {
      user_id: userId,
      guest_token: null,
    })

    await replaceCartItems(guestCart.id, guestItems)
    clearGuestCartToken()

    return {
      merged: true,
      cartId: updatedCart?.id || guestCart.id,
      items: guestItems,
    }
  }

  const userItems = await getCartItemsSnapshot(userCart.id)
  const mergedItems = mergeCartItemLists(userItems, guestItems)

  await replaceCartItems(userCart.id, mergedItems)
  await deleteCartRecord(guestCart.id)
  clearGuestCartToken()

  return {
    merged: true,
    cartId: userCart.id,
    items: mergedItems,
  }
}

export async function getUserProfile(userId) {
  return getUserById(userId)
}

export async function updateProfile(userId, payload) {
  const normalizedPhone = formatPhone(payload.phone)

  const response = await directusServiceRequest(`/items/users/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      first_name: payload.firstName?.trim() || '',
      last_name: payload.lastName?.trim() || '',
      phone: normalizedPhone || null,
      email: payload.email?.trim() || null,
      phone_verified: Boolean(normalizedPhone),
    }),
  })

  return {
    success: true,
    data: mapUser(response.data),
  }
}

export async function getUserOrders(userId) {
  return fetchOrdersWithItems(userId)
}

export async function getUserTastingRequests(userId) {
  const response = await directusServiceRequest(
    `/items/tasting_requests?filter[user_id][_eq]=${userId}&sort=-created_at`
  )

  return response.data || []
}

export async function getCategories() {
  return directusRequest(
    '/items/categories?filter[is_active][_eq]=true&sort=sort_order',
    { authMode: 'public' }
  )
}

export async function getLoyaltyLevels() {
  return directusRequest(
    '/items/loyalty_levels?sort=min_total_spent',
    { authMode: 'public' }
  )
}

export async function getCategoryBySlug(slug) {
  return directusRequest(
    `/items/categories?filter[slug][_eq]=${encodeURIComponent(slug)}&limit=1`,
    { authMode: 'public' }
  )
}

export async function getProducts() {
  return directusRequest(
    `/items/products?filter[is_active][_eq]=true&fields=${CARD_FIELDS}`,
    { authMode: 'public' }
  )
}

export async function searchProducts(query, limit = 6) {
  const normalizedQuery = String(query || '').trim()

  if (!normalizedQuery) {
    return { data: [] }
  }

  return directusRequest(
    `/items/products?filter[is_active][_eq]=true&filter[_or][0][title][_icontains]=${encodeURIComponent(
      normalizedQuery
    )}&filter[_or][1][slug][_icontains]=${encodeURIComponent(
      normalizedQuery
    )}&fields=${CARD_FIELDS}&limit=${limit}`,
    { authMode: 'public' }
  )
}

export async function getProductsByCategory(categoryId) {
  return directusRequest(
    `/items/products?filter[is_active][_eq]=true&filter[category_id][_eq]=${categoryId}&fields=${CARD_FIELDS}`,
    { authMode: 'public' }
  )
}

export async function getProductImages(productId) {
  return directusRequest(
    `/items/product_images?filter[product_id][_eq]=${productId}&fields=id,file_id,sort_order,is_main,alt_text&sort=-is_main,sort_order,id`,
    { authMode: 'public' }
  )
}

export async function getProductBySlug(slug) {
  return directusRequest(
    `/items/products?filter[slug][_eq]=${encodeURIComponent(slug)}&limit=1&fields=${DETAIL_FIELDS}`,
    { authMode: 'public' }
  )
}

export async function getPosts(options = {}) {
  const { excludeCategorySlug, excludeCategorySlugs } = options
  const posts = await getPublishedPosts()
  const excludedSlugs = normalizeCategorySlugs(excludeCategorySlugs || excludeCategorySlug)

  return {
    data: excludedSlugs.length
      ? posts.filter((post) => !excludedSlugs.includes(post.category?.slug))
      : posts,
  }
}

export async function getPostBySlug(slug, options = {}) {
  const { excludeCategorySlug, excludeCategorySlugs } = options
  const excludedSlugs = normalizeCategorySlugs(excludeCategorySlugs || excludeCategorySlug)
  const post = await getPublishedPostBySlugInternal(slug)

  return {
    data: [post].filter(
      (item) => item && !excludedSlugs.includes(item.category?.slug)
    ),
  }
}

export async function getPostsByCategorySlug(categorySlug) {
  const posts = await getPublishedPosts()

  return posts.filter((post) => matchesCategorySlugs(post, categorySlug))
}

export async function getTasteStories(categorySlugs = TASTE_STORY_CATEGORY_SLUGS) {
  return {
    data: await getPublishedTasteStoriesByCategorySlug(categorySlugs),
  }
}

export async function getTasteStoryBySlug(slug, categorySlugs = TASTE_STORY_CATEGORY_SLUGS) {
  return {
    data: [await getPublishedTasteStoryBySlugInternal(slug, categorySlugs)].filter(Boolean),
  }
}

export { BLOG_EXCLUDED_CATEGORY_SLUGS, TASTE_STORY_CATEGORY_SLUGS, isRecipeLikePost }

export async function createTastingRequest(payload) {
  const normalizedPhone = formatPhone(payload.phone)
  const resolvedUserId =
    payload.userId ??
    (normalizedPhone ? (await findUserByPhone(normalizedPhone))?.id ?? null : null)

  const directusPayload = {
    user_id: resolvedUserId,
    name:
      payload.name?.trim() ||
      buildCustomerName(payload.firstName, payload.lastName, normalizedPhone),
    phone: normalizedPhone,
    email: payload.email?.trim() || null,
    preferred_date: payload.preferredDate || null,
    guests_count: payload.guestsCount || null,
    comment: payload.comment?.trim() || null,
    status: 'new',
  }

  const response = await directusServiceRequest('/items/tasting_requests', {
    method: 'POST',
    body: JSON.stringify(directusPayload),
  })

  return {
    success: true,
    data: response.data,
  }
}

export async function createOrder(payload) {
  if (!payload.userId) {
    throw new Error('Authorized user is required to create an order.')
  }

  const normalizedPhone = formatPhone(payload.phone)
  const customerName = buildCustomerName(
    payload.firstName,
    payload.lastName,
    payload.phone
  )

  const subtotalAmount = payload.items.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  )

  const orderResponse = await directusServiceRequest('/items/orders', {
    method: 'POST',
    body: JSON.stringify({
      user_id: payload.userId,
      order_number: generateOrderNumber(),
      status: 'new',
      payment_status: 'pending',
      payment_method: payload.payment || null,
      delivery_method: payload.delivery || null,
      delivery_city: payload.deliveryCity || null,
      delivery_address: payload.address || null,
      customer_name: customerName,
      customer_phone: normalizedPhone,
      customer_email: payload.email?.trim() || null,
      subtotal_amount: Number(subtotalAmount.toFixed(2)),
      discount_amount: 0,
      loyalty_discount_amount: 0,
      delivery_amount: 0,
      total_amount: Number(payload.total.toFixed(2)),
      comment: payload.comment?.trim() || null,
    }),
  })

  const order = orderResponse.data
  const orderNumber = formatOrderNumber(order.id)

  await directusServiceRequest(`/items/orders/${order.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      order_number: orderNumber,
    }),
  })

  const orderItemsPayload = payload.items.map((item) => {
    const quantity = Number(item.quantity)
    const price = Number(item.price)
    const oldPrice = item.oldPrice == null ? null : Number(item.oldPrice)

    return {
      order_id: order.id,
      product_id: item.productId,
      product_name_snapshot: item.title,
      product_slug_snapshot: item.slug || null,
      unit_label_snapshot: item.unit || null,
      price_snapshot: price,
      old_price_snapshot: oldPrice,
      quantity,
      line_total: Number((price * quantity).toFixed(2)),
    }
  })

  await directusServiceRequest('/items/order_items', {
    method: 'POST',
    body: JSON.stringify(orderItemsPayload),
  })

  return {
    success: true,
    orderId: order.id,
    orderNumber,
    data: {
      ...order,
      order_number: orderNumber,
    },
  }
}

export function getAssetUrl(fileId, transforms) {
  if (!fileId) return ''

  const base = `${BASE_URL}/assets/${fileId}`
  if (!transforms) return base

  const params = new URLSearchParams()
  if (transforms.width) params.set('width', transforms.width)
  if (transforms.height) params.set('height', transforms.height)
  if (transforms.fit) params.set('fit', transforms.fit)
  if (transforms.format) params.set('format', transforms.format)
  if (transforms.quality) params.set('quality', transforms.quality)

  return `${base}?${params.toString()}`
}
