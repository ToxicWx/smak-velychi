import { useNavigate } from 'react-router-dom'
import Button from '../shared/button/Button'

function AccountOrdersSection({ orders = [] }) {
  const hasOrders = orders.length > 0
  const navigate = useNavigate()

  return (
    <section className="account-card account-card--full">
      <h2 className="account-card__title">Історія замовлень</h2>

      {!hasOrders ? (
        <div className="account-empty">
          <p className="account-empty__text">
            У вас ще немає замовлень.
            <br />
            Почніть покупки, щоб побачити тут свою історію.
          </p>

          <Button
            type="button"
            variant="light"
            preset="long"
            onClick={() => navigate('/assortment')}
          >
            Переглянути весь Асортимент
          </Button>
        </div>
      ) : (
        <>
          <div className="orders-grid">
            {orders.map((order) => (
              <div className="order-item" key={order.id}>
                <h3 className="order-item__title">Замовлення №{order.id}</h3>

                <ul className="order-item__details">
                  <li>Дата: {order.date}</li>
                  <li>Статус: {order.status}</li>
                  <li>Сума замовлення: {order.total}</li>
                </ul>

                <Button
                  type="button"
                  variant="outline-dark"
                  preset="outline-wide"
                  fullWidth
                  onClick={() => navigate('/orders')}
                >
                  Деталі замовлення
                </Button>
              </div>
            ))}
          </div>

          <div className="account-card__action">
            <Button
              type="button"
              variant="light"
              preset="long"
              onClick={() => navigate('/orders')}
            >
              Усі замовлення
            </Button>
          </div>
        </>
      )}
    </section>
  )
}

export default AccountOrdersSection
