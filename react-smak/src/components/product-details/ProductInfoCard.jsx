function ProductInfoCard({ title, price, oldPrice, onAddToCart }) {
  return (
    <section className="product-info-card">
      <div className="product-info-card__top">
        <h1 className="product-info-card__title">{title}</h1>
      </div>

      <div className="product-info-card__bottom">
        <div className="product-info-card__prices">
          <p className="product-info-card__price">{price}</p>
          {oldPrice ? (
            <p className="product-info-card__old-price">{oldPrice}</p>
          ) : null}
        </div>

        <button
          type="button"
          className="product-info-card__cart-btn"
          onClick={onAddToCart}
        >
          <img src="/assets/icons/cart-icon.svg" alt="" aria-hidden="true" />
          <span>До Кошика</span>
        </button>
      </div>
    </section>
  )
}

export default ProductInfoCard