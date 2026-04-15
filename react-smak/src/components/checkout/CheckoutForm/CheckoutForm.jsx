import { useEffect, useState } from 'react'
import Button from '../../shared/button/Button'
import { useCart } from '../../../context/CartContext'
import { useAuth } from '../../../context/AuthContext'
import { createOrder } from '../../../api/directus'
import './checkout-form.css'

const deliveryOptions = ['Нова пошта', 'Укрпошта', 'Meest', 'Glovo', 'BoltFood']
const paymentOptions = ['LiqPay', 'PayPal', 'Apple Pay', 'Google Pay']

const initialFormData = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  address: '',
  delivery: '',
  payment: '',
}

const emptyErrors = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  address: '',
  delivery: '',
  payment: '',
}

function CheckoutForm() {
  const { selectedItems, items, hasSelectionUi, total, clear } = useCart()
  const { user } = useAuth()

  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState(emptyErrors)
  const [isDirty, setIsDirty] = useState(false)
  const [loading, setLoading] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [serverError, setServerError] = useState('')

  useEffect(() => {
    if (!user) return

    setFormData((prev) => ({
      ...prev,
      firstName: prev.firstName || user.first_name || '',
      lastName: prev.lastName || user.last_name || '',
      phone: prev.phone || user.phone || '',
      email: prev.email || user.email || '',
    }))
  }, [user])

  const validatePhone = (phone) => {
    const cleaned = phone.replace(/[^\d+]/g, '')
    return /^(\+380|380|0)\d{9}$/.test(cleaned)
  }

  const validateForm = () => {
    const newErrors = { ...emptyErrors }

    if (!formData.firstName.trim()) newErrors.firstName = "Введіть ім'я"
    if (!formData.lastName.trim()) newErrors.lastName = 'Введіть прізвище'

    if (!formData.phone.trim()) {
      newErrors.phone = 'Введіть номер телефону'
    } else if (!validatePhone(formData.phone.trim())) {
      newErrors.phone = 'Введіть коректний номер телефону'
    }

    if (!formData.delivery) newErrors.delivery = 'Оберіть спосіб доставки'
    if (!formData.address.trim()) newErrors.address = 'Введіть адресу або номер відділення'
    if (!formData.payment) newErrors.payment = 'Оберіть спосіб оплати'

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Введіть коректну електронну пошту'
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some(Boolean)
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (isDirty && errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsDirty(true)
    setServerError('')

    if (!validateForm()) return

    const orderItems = hasSelectionUi ? selectedItems : items
    if (orderItems.length === 0) {
      setServerError('Кошик порожній або жоден товар не вибрано')
      return
    }

    try {
      setLoading(true)

      const payload = {
        userId: user?.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        delivery: formData.delivery,
        address: formData.address,
        payment: formData.payment,
        items: orderItems.map((item) => ({
          productId: item.id,
          title: item.title,
          slug: item.slug,
          price: item.price,
          oldPrice: item.oldPrice,
          quantity: item.quantity,
          unit: item.unit,
        })),
        total,
      }

      const response = await createOrder(payload)

      if (response.success) {
        clear()
        setOrderSuccess(true)
      } else {
        setServerError('Не вдалося оформити замовлення. Спробуйте ще раз.')
      }
    } catch (error) {
      console.error(error)
      setServerError('Сталася помилка. Спробуйте пізніше.')
    } finally {
      setLoading(false)
    }
  }

  if (orderSuccess) {
    return (
      <div className="checkout-form checkout-form--success">
        <h2 className="checkout-form__title">Дякуємо за замовлення!</h2>
        <p>Ми зв&apos;яжемося з вами найближчим часом для підтвердження.</p>
      </div>
    )
  }

  return (
    <form className="checkout-form" onSubmit={handleSubmit} noValidate>
      <div className="checkout-form__group">
        <h2 className="checkout-form__title">Вкажіть персональні дані</h2>
        <div className="checkout-form__fields">
          <div className="checkout-form__field">
            <input
              type="text"
              placeholder="Ім'я"
              className={`checkout-form__input ${errors.firstName ? 'checkout-form__input--error' : ''}`}
              value={formData.firstName}
              onChange={(event) => handleChange('firstName', event.target.value)}
            />
            {errors.firstName && <p className="checkout-form__error">{errors.firstName}</p>}
          </div>

          <div className="checkout-form__field">
            <input
              type="text"
              placeholder="Прізвище"
              className={`checkout-form__input ${errors.lastName ? 'checkout-form__input--error' : ''}`}
              value={formData.lastName}
              onChange={(event) => handleChange('lastName', event.target.value)}
            />
            {errors.lastName && <p className="checkout-form__error">{errors.lastName}</p>}
          </div>

          <div className="checkout-form__field">
            <input
              type="tel"
              placeholder="Номер телефону"
              className={`checkout-form__input ${errors.phone ? 'checkout-form__input--error' : ''}`}
              value={formData.phone}
              onChange={(event) => handleChange('phone', event.target.value)}
            />
            {errors.phone && <p className="checkout-form__error">{errors.phone}</p>}
          </div>

          <div className="checkout-form__field">
            <input
              type="email"
              placeholder="Електронна пошта"
              className={`checkout-form__input ${errors.email ? 'checkout-form__input--error' : ''}`}
              value={formData.email}
              onChange={(event) => handleChange('email', event.target.value)}
            />
            {errors.email && <p className="checkout-form__error">{errors.email}</p>}
          </div>
        </div>
      </div>

      <div className="checkout-form__group">
        <h2 className="checkout-form__title">Оберіть доставку</h2>
        <div className="checkout-form__options">
          {deliveryOptions.map((option) => (
            <label key={option} className="checkout-form__option">
              <input
                type="radio"
                name="delivery"
                checked={formData.delivery === option}
                onChange={() => handleChange('delivery', option)}
              />
              <span className="checkout-form__checkmark" />
              <span>{option}</span>
            </label>
          ))}
        </div>

        {errors.delivery && (
          <p className="checkout-form__error checkout-form__error--group">{errors.delivery}</p>
        )}
      </div>

      <div className="checkout-form__group">
        <h2 className="checkout-form__title">
          Введіть власну адресу / номер відділення / номер поштомата
        </h2>
        <div className="checkout-form__field">
          <input
            type="text"
            placeholder="Введіть адресу"
            className={`checkout-form__input ${errors.address ? 'checkout-form__input--error' : ''}`}
            value={formData.address}
            onChange={(event) => handleChange('address', event.target.value)}
          />
          {errors.address && <p className="checkout-form__error">{errors.address}</p>}
        </div>
      </div>

      <div className="checkout-form__group">
        <h2 className="checkout-form__title">Оберіть спосіб оплати</h2>
        <div className="checkout-form__options">
          {paymentOptions.map((option) => (
            <label key={option} className="checkout-form__option">
              <input
                type="radio"
                name="payment"
                checked={formData.payment === option}
                onChange={() => handleChange('payment', option)}
              />
              <span className="checkout-form__checkmark" />
              <span>{option}</span>
            </label>
          ))}
        </div>

        {errors.payment && (
          <p className="checkout-form__error checkout-form__error--group">{errors.payment}</p>
        )}
      </div>

      {serverError && (
        <p className="checkout-form__error checkout-form__error--server">{serverError}</p>
      )}

      <Button variant="primary" preset="dark-cta" type="submit" disabled={loading}>
        {loading ? 'Оформлюємо...' : 'Перейти до Оплати'}
      </Button>
    </form>
  )
}

export default CheckoutForm
