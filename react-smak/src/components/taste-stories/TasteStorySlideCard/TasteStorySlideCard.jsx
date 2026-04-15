import { Link } from 'react-router-dom'
import './taste-story-slide-card.css'

function TasteStorySlideCard({
  title,
  image,
  time,
  portions,
  featuredProduct,
  productNote,
  description,
  href = '#',
}) {
  const footerNote = featuredProduct || productNote

  return (
    <article className="taste-story-slide-card">
      <Link to={href} className="taste-story-slide-card__link">
        <img src={image} alt={title} className="taste-story-slide-card__image" />

        <div className="taste-story-slide-card__overlay" />

        <div className="taste-story-slide-card__content">
          <h3 className="taste-story-slide-card__title">{title}</h3>

          {(time || portions) ? (
            <div className="taste-story-slide-card__meta">
              {time ? (
                <span className="taste-story-slide-card__meta-item">
                  <img src="/assets/icons/time-icon.svg" alt="" />
                  {time}
                </span>
              ) : null}

              {portions ? (
                <span className="taste-story-slide-card__meta-item">
                  <img src="/assets/icons/portions.svg" alt="" />
                  {portions}
                </span>
              ) : null}
            </div>
          ) : null}

          {description ? (
            <p className="taste-story-slide-card__description">{description}</p>
          ) : null}

          {footerNote ? (
            <p className="taste-story-slide-card__product">
              {featuredProduct ? `Фірмовий продукт - ${featuredProduct}` : footerNote}
            </p>
          ) : null}
        </div>
      </Link>
    </article>
  )
}

export default TasteStorySlideCard
