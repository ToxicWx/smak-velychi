import { Link } from 'react-router-dom'
import { normalizeUnitLabel } from '../../../utils/unit'
import './checkout-order-card.css'

function CheckoutOrderCard({ item, onEdit }) {
  const normalizedUnit = normalizeUnitLabel(item.unit)
  const priceLabel = normalizedUnit
    ? `${item.price} грн / ${normalizedUnit}`
    : `${item.price} грн`
  const oldPriceLabel = normalizedUnit
    ? `${item.oldPrice} грн / ${normalizedUnit}`
    : `${item.oldPrice} грн`

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
          <p className="checkout-order-card__price">{priceLabel}</p>

          {item.oldPrice && (
            <p className="checkout-order-card__old-price">{oldPriceLabel}</p>
          )}
        </div>
      </div>
    </article>
  )
}

export default CheckoutOrderCard
