import { Outlet, useLocation } from 'react-router-dom'
import { useCallback, useState } from 'react'
import Header from '../components/layout/header/Header'
import Footer from '../components/layout/footer/Footer'
import CartModal from '../components/cart/CartModal/CartModal'
import LoginPhoneModal from '../components/modals/auth/LoginPhoneModal'
import LoginCodeModal from '../components/modals/auth/LoginCodeModal'
import OrderTastingModal from '../components/modals/tasting/OrderTastingModal'
import RegisterTastingModal from '../components/modals/tasting/RegisterTastingModal'
import EditPersonalDataModal from '../components/modals/profile/EditPersonalDataModal'
import ScrollToTopButton from '../components/shared/scroll-to-top/ScrollToTopButton'
import './main-layout.css'

function isProfileIncomplete(user) {
  const firstName = String(user?.first_name || user?.firstName || '').trim()
  const lastName = String(user?.last_name || user?.lastName || '').trim()
  const email = String(user?.email || '').trim()

  return (
    !firstName ||
    !lastName ||
    !email ||
    (firstName === 'Новий' && lastName === 'Користувач')
  )
}

function MainLayout() {
  const location = useLocation()
  const [activeModal, setActiveModal] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [authPhone, setAuthPhone] = useState('')
  const [afterLoginAction, setAfterLoginAction] = useState(null)
  const [profileInitialData, setProfileInitialData] = useState({
    phone: '',
    firstName: '',
    lastName: '',
    email: '',
  })

  const openLogin = useCallback((options = {}) => {
    setAfterLoginAction(() => options.onSuccess || null)
    setActiveModal('login-phone')
  }, [])

  const openLoginCode = useCallback((phone) => {
    setAuthPhone(phone)
    setActiveModal('login-code')
  }, [])

  const closeModal = useCallback(() => {
    setActiveModal(null)
    setAfterLoginAction(null)
  }, [])

  const handleLoginSuccess = useCallback((user) => {
    const resumeAction = afterLoginAction

    if (isProfileIncomplete(user)) {
      setProfileInitialData({
        phone: user?.phone || authPhone || '',
        firstName: user?.first_name || user?.firstName || '',
        lastName: user?.last_name || user?.lastName || '',
        email: user?.email || '',
      })
      setActiveModal('complete-profile')
      return
    }

    setActiveModal(null)
    setAfterLoginAction(null)
    resumeAction?.()
  }, [afterLoginAction, authPhone])

  const handleCompleteProfileClose = useCallback(() => {
    const resumeAction = afterLoginAction
    setActiveModal(null)
    setAfterLoginAction(null)
    resumeAction?.()
  }, [afterLoginAction])

  const openOrderTasting = useCallback(() => setActiveModal('order-tasting'), [])
  const openRegisterTasting = useCallback(() => setActiveModal('register-tasting'), [])

  return (
    <>
      <Header
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLogin={openLogin}
        onOpenOrderTasting={openOrderTasting}
      />

      <main className="page">
        <Outlet
          context={{
            openLogin,
            openLoginCode,
            openOrderTasting,
            openRegisterTasting,
            openCart: () => setIsCartOpen(true),
          }}
        />
      </main>

      <div className="layout-footer-area">
        {location.pathname === '/' && <ScrollToTopButton />}
        <Footer onOpenOrderTasting={openOrderTasting} />
      </div>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOpenLogin={() =>
          openLogin({
            onSuccess: () => setIsCartOpen(true),
          })
        }
      />

      <LoginPhoneModal
        isOpen={activeModal === 'login-phone'}
        onClose={closeModal}
        onSuccess={openLoginCode}
      />

      <LoginCodeModal
        isOpen={activeModal === 'login-code'}
        onClose={closeModal}
        phone={authPhone}
        onSuccess={handleLoginSuccess}
      />

      <OrderTastingModal
        isOpen={activeModal === 'order-tasting'}
        onClose={closeModal}
      />

      <RegisterTastingModal
        isOpen={activeModal === 'register-tasting'}
        onClose={closeModal}
      />

      <EditPersonalDataModal
        isOpen={activeModal === 'complete-profile'}
        onClose={handleCompleteProfileClose}
        initialData={profileInitialData}
      />
    </>
  )
}

export default MainLayout
