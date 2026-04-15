import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Breadcrumbs from '../../components/shared/breadcrumbs/Breadcrumbs'
import UserOrderSection from '../../components/orders/UserOrderSection'
import { useAuth } from '../../context/AuthContext'
import { getUserOrders } from '../../api/directus'
import '../../components/orders/orders.css'

function OrdersPage() {
  const { user, isAuthorized } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isCancelled = false

    if (!isAuthorized || !user?.id) {
      setLoading(false)
      return undefined
    }

    const loadOrders = async () => {
      try {
        setLoading(true)
        const nextOrders = await getUserOrders(user.id)
        if (!isCancelled) {
          setOrders(nextOrders)
        }
      } catch (error) {
        console.error('Помилка завантаження замовлень:', error)
      } finally {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    }

    loadOrders()

    return () => {
      isCancelled = true
    }
  }, [isAuthorized, user?.id])

  if (!isAuthorized || !user) {
    return <Navigate to="/" replace />
  }

  return (
    <section className="orders-page">
      <Breadcrumbs
        items={[
          { label: 'Головна', href: '/' },
          { label: 'Особистий кабінет', href: '/account' },
          { label: 'Усі замовлення' },
        ]}
      />

      <div className="container">
        <div className="orders-page__content">
          {loading ? (
            <p>Завантаження...</p>
          ) : orders.length > 0 ? (
            <div className="orders-list">
              {orders.map((order) => (
                <UserOrderSection key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <p>У вас ще немає замовлень.</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default OrdersPage
