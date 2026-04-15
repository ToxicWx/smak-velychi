import { useEffect, useState } from 'react'
import Modal from '../base/Modal'
import { verifyLoginCode } from '../../../api/directus'
import { useAuth } from '../../../context/AuthContext'

function LoginCodeModal({ isOpen, onClose, phone, onSuccess }) {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const auth = useAuth()

  // Скидаємо стан форми щоразу, коли модалка закривається.
  // Без цього при повторному відкритті залишається старий код і стара помилка.
  useEffect(() => {
    if (!isOpen) {
      setCode('')
      setError('')
      setLoading(false)
    }
  }, [isOpen])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      setLoading(true)

      const response = await verifyLoginCode({ phone, code })

      if (response.success) {
        // Зберігаємо токен і юзера в AuthContext (і в localStorage).
        // Після цього isAuthorized стане true у всьому дереві — хедер,
        // кошик, сторінка акаунту оновляться автоматично.
        auth.login({ token: response.token, user: response.user })
        onSuccess?.(response.user)
        return
      }

      setError('Невірний код. Спробуйте ще раз.')
    } catch (err) {
      console.error(err)
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

        <h2 className="modal-title">Введіть код</h2>

        <p className="modal-subtitle modal-subtitle--muted">
          Ми надіслали код на номер:
          <br />
          <strong>{phone || '—'}</strong>
        </p>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="modal-input"
              placeholder="Введіть код"
              required
              value={code}
              onChange={(event) => setCode(event.target.value)}
            />
          </div>

          {error ? <p className="modal-error">{error}</p> : null}

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Перевіряємо...' : 'Підтвердити'}
          </button>
        </form>
      </div>
    </Modal>
  )
}

export default LoginCodeModal
