function OrderSummaryCard({ image, title, price }) {
  return (
    <article className="order-product-card">
      <div className="order-product-card__image-wrap">
        <img
          className="order-product-card__image"
          src={image}
          alt={title}
        />
      </div>

      <div className="order-product-card__content">
        <h3 className="order-product-card__title">{title}</h3>
        <p className="order-product-card__price">{price}</p>
      </div>
    </article>
  )
}

export default OrderSummaryCard