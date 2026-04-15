import { useState, useEffect } from 'react'
import Modal from '../base/Modal'
import { useAuth } from '../../../context/AuthContext'
import { updateProfile } from '../../../api/directus'

function EditPersonalDataModal({ isOpen, onClose, initialData = {} }) {
  const { user, updateUser } = useAuth()

  const [formData, setFormData] = useState({
    phone: '',
    firstName: '',
    lastName: '',
    email: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      setFormData({
        phone: initialData.phone || '',
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        email: initialData.email || '',
      })
      setSuccess(false)
      setError('')
    }
  }, [
    initialData.email,
    initialData.firstName,
    initialData.lastName,
    initialData.phone,
    isOpen,
  ])

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess(false)

    try {
      setLoading(true)
      const response = await updateProfile(user?.id, formData)

      if (response.success) {
        updateUser(response.data)
        setSuccess(true)
        setTimeout(() => onClose?.(), 1500)
      } else {
        setError('Не вдалося зберегти зміни. Спробуйте ще раз.')
      }
    } catch (err) {
      console.error(err)
      setError('Сталася помилка. Спробуйте пізніше.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-card modal-card--profile">
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

        <h2 className="modal-title--simple">Персональні дані</h2>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="input-wrapper input-wrapper--profile">
            <input
              type="tel"
              className="line-input"
              placeholder="Номер телефона"
              required
              value={formData.phone}
              onChange={(event) => handleChange('phone', event.target.value)}
            />
          </div>

          <div className="input-wrapper input-wrapper--profile">
            <input
              type="text"
              className="line-input"
              placeholder="Ім'я"
              required
              value={formData.firstName}
              onChange={(event) => handleChange('firstName', event.target.value)}
            />
          </div>

          <div className="input-wrapper input-wrapper--profile">
            <input
              type="text"
              className="line-input"
              placeholder="Прізвище"
              required
              value={formData.lastName}
              onChange={(event) => handleChange('lastName', event.target.value)}
            />
          </div>

          <div className="input-wrapper input-wrapper--profile-spaced">
            <input
              type="email"
              className="line-input"
              placeholder="Електронна пошта"
              required
              value={formData.email}
              onChange={(event) => handleChange('email', event.target.value)}
            />
          </div>

          {error && <p className="modal-error">{error}</p>}

          {success && (
            <p className="success-message">Зміни успішно збережено!</p>
          )}

          <button type="submit" className="btn-submit-form" disabled={loading}>
            {loading ? 'Зберігаємо...' : 'Зберегти зміни'}
          </button>
        </form>
      </div>
    </Modal>
  )
}

export default EditPersonalDataModal
