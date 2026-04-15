import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import Breadcrumbs from '../../components/shared/breadcrumbs/Breadcrumbs'
import CheckoutOrderSummary from '../../components/checkout/CheckoutOrderSummary/CheckoutOrderSummary'
import CheckoutForm from '../../components/checkout/CheckoutForm/CheckoutForm'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import './checkout-page.css'

const breadcrumbs = [
  { label: 'Головна', href: '/' },
  { label: 'Весь Асортимент', href: '/assortment' },
  { label: 'Кошик', href: '#' },
  { label: 'Оформлення замовлення', href: '#' },
]

function CheckoutPage() {
  const { openCart, openLogin } = useOutletContext()
  // Беремо реальні дані з CartContext замість хардкоду
  const { items, selectedItems, hasSelectionUi, total } = useCart()
  const { isAuthorized } = useAuth()
  const orderItems = hasSelectionUi ? selectedItems : items

  useEffect(() => {
    if (!isAuthorized) {
      openLogin()
    }
  }, [isAuthorized, openLogin])

  return (
    <div className="checkout-page">
      <h1 className="checkout-page__title container">Оформлення замовлення</h1>

      <Breadcrumbs items={breadcrumbs} />

      <div className="container">
        <div className="checkout-page__content">
          <CheckoutOrderSummary
            items={orderItems}
            total={total}
            onEditItem={openCart}
          />
          {isAuthorized ? (
            <CheckoutForm />
          ) : (
            <div className="checkout-form checkout-form--success">
              <h2 className="checkout-form__title">Потрібен вхід</h2>
              <p>Щоб оформити замовлення, увійдіть в акаунт. Після входу ви залишитеся на цьому екрані.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
