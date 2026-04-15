import Modal from '../base/Modal'

function OrderTastingSuccessModal({ isOpen, onClose }) {
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

        <h2 className="modal-title--success">Дякуємо!</h2>

        <p className="modal-subtitle-success">
          Ми отримали вашу заявку й
          <br />
          невдовзі зв&apos;яжемось із вами для
          <br />
          уточнення деталей.
        </p>

        <button className="btn-return-black" type="button" onClick={onClose}>
          Повернутись до сторінки
        </button>
      </div>
    </Modal>
  )
}

export default OrderTastingSuccessModal