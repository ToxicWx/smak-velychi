import CartQuantityControl from '../CartQuantityControl/CartQuantityControl'
import './cart-item-card.css'
import { Link } from 'react-router-dom'

function CartItemCard({
  item,
  showCheckbox = false,
  onToggleSelect,
  onRemove,
  onDecrease,
  onIncrease,
}) {
  return (
    <article className="cart-item-card-wrapper">
      {showCheckbox && (
        <label className="cart-item-card__checkbox">
          <input
            type="checkbox"
            checked={!!item.selected}
            onChange={() => onToggleSelect?.(item.id)}
          />
          <span className="cart-item-card__checkbox-ui" />
        </label>
      )}

      <article className="cart-item-card">
        <Link to="#" className="cart-item-card__image-link">
          <img
            src={item.image}
            alt={item.title}
            className="cart-item-card__image"
          />
        </Link>

        <div className="cart-item-card__content">
          <div className="cart-item-card__top">
            <h3 className="cart-item-card__title">{item.title}</h3>

            <button
              type="button"
              className="cart-item-card__remove"
              onClick={() => onRemove?.(item.id)}
              aria-label="Видалити товар"
            >
              <img src="/assets/icons/trash.svg" alt="" />
            </button>
          </div>

          <div className="cart-item-card__bottom">
            <div className="cart-item-card__prices">
              <p className="cart-item-card__price">
                {item.price} грн / {item.unit}
              </p>

              {item.oldPrice && (
                <p className="cart-item-card__old-price">
                  {item.oldPrice} грн / {item.unit}
                </p>
              )}
            </div>

            <CartQuantityControl
              quantity={item.quantity}
              onDecrease={() => onDecrease?.(item.id)}
              onIncrease={() => onIncrease?.(item.id)}
            />
          </div>
        </div>
      </article>
    </article>
  )
}

export default CartItemCard