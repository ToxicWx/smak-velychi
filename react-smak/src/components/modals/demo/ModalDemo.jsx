import { useState } from 'react'
import LoginPhoneModal from '../auth/LoginPhoneModal'
import LoginCodeModal from '../auth/LoginCodeModal'
import OrderTastingModal from '../tasting/OrderTastingModal'
import OrderTastingSuccessModal from '../tasting/OrderTastingSuccessModal'
import RegisterTastingModal from '../tasting/RegisterTastingModal'
import RegisterTastingSuccessModal from '../tasting/RegisterTastingSuccessModal'
import EditPersonalDataModal from '../profile/EditPersonalDataModal'

function ModalDemo() {
  const [activeModal, setActiveModal] = useState(null)

  const openModal = (modalName) => {
    setActiveModal(modalName)
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  return (
    <>
      <section className="container" style={{ paddingTop: '40px' }}>
        <h2 style={{ marginBottom: '24px' }}>Демо модалок</h2>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <button type="button" className="header__login" onClick={() => openModal('login-phone')}>
            Login phone
          </button>

          <button type="button" className="header__login" onClick={() => openModal('login-code')}>
            Login code
          </button>

          <button type="button" className="header__login" onClick={() => openModal('order-tasting')}>
            Order tasting
          </button>

          <button
            type="button"
            className="header__login"
            onClick={() => openModal('order-tasting-success')}
          >
            Order success
          </button>

          <button
            type="button"
            className="header__login"
            onClick={() => openModal('register-tasting')}
          >
            Register tasting
          </button>

          <button
            type="button"
            className="header__login"
            onClick={() => openModal('register-tasting-success')}
          >
            Register success
          </button>

          <button type="button" className="header__login" onClick={() => openModal('edit-profile')}>
            Edit profile
          </button>
        </div>
      </section>

      <LoginPhoneModal
        isOpen={activeModal === 'login-phone'}
        onClose={closeModal}
      />

      <LoginCodeModal
        isOpen={activeModal === 'login-code'}
        onClose={closeModal}
        onBack={() => openModal('login-phone')}
      />

      <OrderTastingModal
        isOpen={activeModal === 'order-tasting'}
        onClose={closeModal}
      />

      <OrderTastingSuccessModal
        isOpen={activeModal === 'order-tasting-success'}
        onClose={closeModal}
      />

      <RegisterTastingModal
        isOpen={activeModal === 'register-tasting'}
        onClose={closeModal}
      />

      <RegisterTastingSuccessModal
        isOpen={activeModal === 'register-tasting-success'}
        onClose={closeModal}
      />

      <EditPersonalDataModal
        isOpen={activeModal === 'edit-profile'}
        onClose={closeModal}
      />
    </>
  )
}

export default ModalDemo