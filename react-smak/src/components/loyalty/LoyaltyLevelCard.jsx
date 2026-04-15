function LoyaltyLevelCard({
  title,
  image,
  howToGet,
  bonuses = [],
  showPreviousLevelNote = false,
}) {
  return (
    <article className="loyalty-card">
      <div className="loyalty-card__image-wrap">
        <h2 className="loyalty-card__title">{title}</h2>
        <img className="loyalty-card__image" src={image} alt={title} />
      </div>

      <div className="loyalty-card__content">
        <p className="loyalty-card__how">
          <span className="loyalty-card__label">Як отримати:</span> {howToGet}
        </p>

        <div className="loyalty-card__bonuses-block">
          <h3 className="loyalty-card__subtitle">Бонуси</h3>

          <ul className="loyalty-card__bonus-list">
            {bonuses.map((bonus, index) => (
              <li className="loyalty-card__bonus-item" key={`${title}-${index}`}>
                <img
                  className="loyalty-card__bonus-icon"
                  src="/assets/icons/loyalty-key.svg"
                  alt=""
                  aria-hidden="true"
                />
                <span>{bonus}</span>
              </li>
            ))}
          </ul>

          {showPreviousLevelNote ? (
            <p className="loyalty-card__note">+ бонуси з попереднього рівня</p>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default LoyaltyLevelCard