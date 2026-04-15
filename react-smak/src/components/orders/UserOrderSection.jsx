import OrderSummaryCard from './OrderSummaryCard'

function UserOrderSection({ order }) {
  return (
    <section className="user-order-section">
      <h2 className="user-order-section__title">Замовлення №{order.id}</h2>

      <div className="user-order-section__meta">
        <p>Дата: {order.date}</p>
        <p>Статус: {order.status}</p>
        <p>Сума замовлення: {order.total}</p>
      </div>

      <div className="user-order-section__products">
        {order.products.map((product) => (
          <OrderSummaryCard
            key={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
          />
        ))}
      </div>
    </section>
  )
}

export default UserOrderSection