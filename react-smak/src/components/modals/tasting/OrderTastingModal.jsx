import { useEffect, useState } from 'react'
import Modal from '../base/Modal'
import { createTastingRequest } from '../../../api/directus'
import { useAuth } from '../../../context/AuthContext'

function OrderTastingModal({ isOpen, onClose }) {
  const { user } = useAuth()
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    preferred_time: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isOpen) return

    setForm({
      name: `${user?.first_name || ''} ${user?.last_name || ''}`.trim(),
      phone: user?.phone || '',
      email: user?.email || '',
      preferred_time: '',
    })
    setLoading(false)
    setError('')
  }, [isOpen, user])

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      setLoading(true)

      const response = await createTastingRequest({
        userId: user?.id ?? null,
        name: form.name,
        phone: form.phone,
        email: form.email,
        comment: `Тип дегустації: приватна. Бажаний час: ${form.preferred_time}`,
      })

      if (response.success) {
        onClose?.()
      }
    } catch (submitError) {
      console.error(submitError)
      setError('Не вдалося надіслати заявку. Спробуйте ще раз.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-card modal-card--tasting">
        <button className="modal-close" aria-label="Закрити" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <h2 className="modal-title--accent">Замовити Дегустацію</h2>

        <p className="modal-desc">
          Заповніть форму нижче, і наш менеджер зв&apos;яжеться з вами, щоб
          узгодити деталі дегустації.
        </p>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              type="text"
              className="line-input"
              placeholder="Ім'я"
              required
              value={form.name}
              onChange={(event) => handleChange('name', event.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <input
              type="tel"
              className="line-input"
              placeholder="Номер телефона"
              required
              value={form.phone}
              onChange={(event) => handleChange('phone', event.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <input
              type="email"
              className="line-input"
              placeholder="Електронна пошта"
              required
              value={form.email}
              onChange={(event) => handleChange('email', event.target.value)}
            />
          </div>

          <div className="input-wrapper input-wrapper--spaced">
            <select
              className="line-input select-input"
              value={form.preferred_time}
              onChange={(event) =>
                handleChange('preferred_time', event.target.value)
              }
              required
            >
              <option value="" disabled>
                Оберіть зручний час
              </option>
              <option value="10:00-12:00">З 10:00 до 12:00</option>
              <option value="12:00-15:00">З 12:00 до 15:00</option>
              <option value="15:00-18:00">З 15:00 до 18:00</option>
            </select>

            <svg
              className="select-arrow"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {error ? <p className="modal-error">{error}</p> : null}

          <button type="submit" className="btn-submit-form" disabled={loading}>
            {loading ? 'Надсилаємо...' : 'Заповнити форму'}
          </button>
        </form>
      </div>
    </Modal>
  )
}

export default OrderTastingModal
