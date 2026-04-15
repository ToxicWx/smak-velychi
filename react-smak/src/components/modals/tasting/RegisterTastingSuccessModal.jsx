import Modal from '../base/Modal'

function RegisterTastingSuccessModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-card modal-card--success">
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

        <h2 className="modal-title--success">Дякуємо за реєстрацію!</h2>

        <p className="modal-subtitle-success">
          Ваше місце на дегустації заброньовано.
          <br />
          Запрошення та деталі події надійдуть
          <br />
          на вказану електронну пошту.
          <br />
          Чекаємо на вас у "Смак Величі"!
        </p>

        <button className="btn-return-black" type="button" onClick={onClose}>
          Повернутись до сторінки
        </button>
      </div>
    </Modal>
  )
}

export default RegisterTastingSuccessModal