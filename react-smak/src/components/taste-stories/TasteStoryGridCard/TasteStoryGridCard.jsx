import { Link } from 'react-router-dom'
import './taste-story-grid-card.css'

function TasteStoryGridCard({
  title,
  image,
  time,
  portions,
  featuredProduct,
  productNote,
  href = '#',
}) {
  const footerNote = featuredProduct || productNote

  return (
    <article className="taste-story-grid-card">
      <Link to={href} className="taste-story-grid-card__image-link">
        <img src={image} alt={title} className="taste-story-grid-card__image" />
      </Link>

      <div className="taste-story-grid-card__content">
        <h3 className="taste-story-grid-card__title">
          <Link to={href} className="taste-story-grid-card__title-link">
            {title}
          </Link>
        </h3>

        {(time || portions) ? (
          <div className="taste-story-grid-card__meta">
            {time ? (
              <span className="taste-story-grid-card__meta-item">
                <img src="/assets/icons/time-icon.svg" alt="" />
                {time}
              </span>
            ) : null}

            {portions ? (
              <span className="taste-story-grid-card__meta-item">
                <img src="/assets/icons/portions.svg" alt="" />
                {portions}
              </span>
            ) : null}
          </div>
        ) : null}

        {footerNote ? (
          <p className="taste-story-grid-card__product">
            {featuredProduct ? `Фірмовий продукт - ${featuredProduct}` : footerNote}
          </p>
        ) : null}
      </div>
    </article>
  )
}

export default TasteStoryGridCard
