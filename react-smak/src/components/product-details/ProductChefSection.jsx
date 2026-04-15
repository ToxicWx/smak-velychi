import RichText from '../shared/rich-text/RichText'

function ProductChefSection({ title, cards = [] }) {
  if (!cards.length) {
    return null
  }

  return (
    <section className="product-chef-section">
      {title ? <h2 className="product-chef-section__title">{title}</h2> : null}

      <div className="product-chef-section__grid">
        {cards.map((card, index) => (
          <article className="product-chef-card" key={`${card.title || 'chef'}-${index}`}>
            <div className="product-chef-card__content">
              {card.title ? <h3 className="product-chef-card__title">{card.title}</h3> : null}
              <RichText
                className="product-section-text product-section-text--html"
                html={card.textHtml}
              />
            </div>

            {card.image ? (
              <img className="product-chef-card__image" src={card.image} alt={card.title || ''} />
            ) : null}
          </article>
        ))}
      </div>
    </section>
  )
}

export default ProductChefSection
