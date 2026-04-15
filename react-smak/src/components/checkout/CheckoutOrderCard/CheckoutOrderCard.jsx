import './checkout-order-card.css'
import { Link } from 'react-router-dom'

function CheckoutOrderCard({ item, onEdit }) {
  return (
    <article className="checkout-order-card">
      <Link to="#" className="checkout-order-card__image-link">
        <img
          src={item.image}
          alt={item.title}
          className="checkout-order-card__image"
        />
      </Link>

      <div className="checkout-order-card__content">
        <div className="checkout-order-card__top">
          <h3 className="checkout-order-card__title">{item.title}</h3>

          <button
            type="button"
            className="checkout-order-card__edit"
            onClick={onEdit}
          >
            Редагувати
          </button>
        </div>

        <div className="checkout-order-card__bottom">
          <p className="checkout-order-card__price">
            {item.price} грн / {item.unit}
          </p>

          {item.oldPrice && (
            <p className="checkout-order-card__old-price">
              {item.oldPrice} грн / {item.unit}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}

export default CheckoutOrderCard