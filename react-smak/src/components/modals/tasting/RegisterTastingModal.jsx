import { useEffect, useState } from 'react'
import Modal from '../base/Modal'
import { createTastingRequest } from '../../../api/directus'
import { useAuth } from '../../../context/AuthContext'
import { tastingEvents } from '../../../data/tastingEvents'

function RegisterTastingModal({ isOpen, onClose }) {
  const { user } = useAuth()
  const defaultEventId = tastingEvents[0]?.id || ''
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    event_id: defaultEventId,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isOpen) return

    setForm({
      name: `${user?.first_name || ''} ${user?.last_name || ''}`.trim(),
      phone: user?.phone || '',
      email: user?.email || '',
      event_id: defaultEventId,
    })
    setLoading(false)
    setError('')
  }, [defaultEventId, isOpen, user])

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
        comment: `Тип дегустації: відкрита подія. Подія: ${form.event_id}`,
      })

      if (response.success) {
        onClose?.()
      }
    } catch (submitError) {
      console.error(submitError)
      setError('Не вдалося зареєструватися. Спробуйте ще раз.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-card modal-card--tasting">
        <button className="modal-close" aria-label="Закрити" onClick={onClose}>
          ×
        </button>

        <h2 className="modal-title--accent">Реєстрація на дегустацію</h2>

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
              value={form.event_id}
              onChange={(event) => handleChange('event_id', event.target.value)}
            >
              {tastingEvents.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title.replace(/[“”"]/g, '')}
                </option>
              ))}
            </select>
          </div>

          {error ? <p className="modal-error">{error}</p> : null}

          <button type="submit" className="btn-submit-form" disabled={loading}>
            {loading ? 'Надсилаємо...' : 'Зареєструватися'}
          </button>
        </form>
      </div>
    </Modal>
  )
}

export default RegisterTastingModal
