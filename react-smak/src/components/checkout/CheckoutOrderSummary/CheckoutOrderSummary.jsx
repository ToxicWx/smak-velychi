import CheckoutOrderCard from '../CheckoutOrderCard/CheckoutOrderCard'
import './checkout-order-summary.css'

function CheckoutOrderSummary({ items = [], total = 0, onEditItem }) {
  return (
    <section className="checkout-order-summary">
      <h2 className="checkout-order-summary__title">Деталі замовлення</h2>

      <div className="checkout-order-summary__list">
        {items.map((item) => (
          <CheckoutOrderCard
            key={item.id}
            item={item}
            onEdit={onEditItem}
          />
        ))}
      </div>

      <p className="checkout-order-summary__total">
        Сума замовлення: <span>{total} грн</span>
      </p>

      <p className="checkout-order-summary__delivery-note">
        Доставка: розраховується за тарифами перевізника
      </p>

      <div className="checkout-order-summary__divider" />
    </section>
  )
}

export default CheckoutOrderSummary