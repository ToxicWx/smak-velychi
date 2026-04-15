import './cart-quantity-control.css'

function CartQuantityControl({
  quantity = 1,
  onDecrease,
  onIncrease,
}) {
  return (
    <div className="cart-quantity-control">
      <button
        type="button"
        className="cart-quantity-control__btn"
        onClick={onDecrease}
        aria-label="Зменшити кількість"
      >
        −
      </button>

      <div className="cart-quantity-control__value">{quantity}</div>

      <button
        type="button"
        className="cart-quantity-control__btn"
        onClick={onIncrease}
        aria-label="Збільшити кількість"
      >
        +
      </button>
    </div>
  )
}

export default CartQuantityControl