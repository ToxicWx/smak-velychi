import { Link } from 'react-router-dom'
import Button from '../button/Button'
import { normalizeUnitLabel } from '../../../utils/unit'
import './product-card.css'

function ProductCard({
  title,
  image,
  price,
  oldPrice,
  unit,
  href = '#',
  onAddToCart,
}) {
  const normalizedUnit = normalizeUnitLabel(unit)

  const handlePlusClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    onAddToCart?.()
  }

  const formatPrice = (value) => {
    if (value === null || value === undefined || value === '') return null
    return normalizedUnit ? `${value} грн / ${normalizedUnit}` : `${value} грн`
  }

  const formattedPrice = formatPrice(price)
  const formattedOldPrice = formatPrice(oldPrice)

  return (
    <article className="product-card">
      <Link to={href} className="product-card__image-wrapper" aria-label={title}>
        {oldPrice && (
          <div className="product-card__discount">
            <img src="/assets/icons/iconamoon_discount.svg" alt="Знижка" />
          </div>
        )}

        <img className="product-card__image" src={image} alt={title} />
      </Link>

      <div className="product-card__content">
        <h3 className="product-card__title">
          <Link to={href} className="product-card__title-link">
            {title}
          </Link>
        </h3>

        <div className="product-card__prices">
          {formattedPrice && (
            <p className="product-card__price">{formattedPrice}</p>
          )}

          {formattedOldPrice && (
            <p className="product-card__old-price">{formattedOldPrice}</p>
          )}
        </div>
      </div>

      <div className="product-card__actions">
        <button
          type="button"
          className="product-card__plus-button"
          aria-label={`Додати товар ${title}`}
          onClick={handlePlusClick}
        >
          <span aria-hidden="true">+</span>
        </button>

        <Button
          to={href}
          variant="outline-dark"
          preset="product-details"
          className="product-card__details-button"
        >
          Більше про товар
        </Button>
      </div>
    </article>
  )
}

export default ProductCard
