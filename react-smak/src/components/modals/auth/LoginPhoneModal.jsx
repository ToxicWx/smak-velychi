import { useEffect, useState } from 'react'
import Modal from '../base/Modal'
import { requestLoginCode } from '../../../api/directus'

function normalizePhone(value = '') {
  return value.replace(/[^\d+]/g, '').trim()
}

function isValidPhone(value = '') {
  const normalized = normalizePhone(value)
  const digits = normalized.replace(/\D/g, '')

  if (normalized.startsWith('+')) {
    return /^\+380\d{9}$/.test(normalized)
  }

  return /^380\d{9}$/.test(digits) || /^0\d{9}$/.test(digits)
}

function LoginPhoneModal({ isOpen, onClose, onSuccess }) {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isOpen) {
      setPhone('')
      setLoading(false)
      setError('')
    }
  }, [isOpen])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!isValidPhone(phone)) {
      setError('Введіть коректний номер телефону у форматі +380XXXXXXXXX або 0XXXXXXXXX.')
      return
    }

    const normalizedPhone = normalizePhone(phone)

    try {
      setLoading(true)

      const response = await requestLoginCode({ phone: normalizedPhone })

      if (response.success) {
        onSuccess?.(normalizedPhone)
        return
      }

      setError('Не вдалося надіслати код. Спробуйте ще раз.')
    } catch (requestError) {
      console.error(requestError)
      setError('Сталася помилка. Спробуйте ще раз.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-card modal-card--login">
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

        <h2 className="modal-title">Вхід в особистий кабінет</h2>

        <p className="modal-subtitle modal-subtitle--muted">
          Введіть свій номер телефона.
          <br />
          Тимчасово використовуйте тестовий код: <strong>1234</strong>
        </p>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="tel"
              className="modal-input"
              placeholder="Вкажіть номер телефона"
              required
              inputMode="tel"
              maxLength={13}
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>

          {error ? <p className="modal-error">{error}</p> : null}

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Надсилаємо...' : 'Отримати код'}
          </button>
        </form>
      </div>
    </Modal>
  )
}

export default LoginPhoneModal
