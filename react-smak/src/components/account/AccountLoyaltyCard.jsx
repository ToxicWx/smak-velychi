import Button from '../shared/button/Button'

function AccountLoyaltyCard({
  hasLoyaltyStatus,
  status,
  nextLevelAmount,
  progressWidth = '0%',
  levels = [],
  activeLevelSlugs = [],
}) {
  if (!hasLoyaltyStatus) {
    return (
      <section className="account-card">
        <h2 className="account-card__title">Програма лояльності</h2>

        <p className="account-card__text">
          Зробіть перше замовлення на сайті чи покупку у фізичному магазині, щоб
          отримати свій перший рівень і розблокувати бонуси програми.
        </p>

        <div className="account-card__action">
          <Button
            type="button"
            variant="light"
            preset="long"
            to="/loyalty"
          >
            Більше про Програму Лояльності
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="account-card">
      <h2 className="account-card__title">Програма лояльності</h2>

      <div className="loyalty-info">
        <p>Статус: {status}</p>
        <p>До наступного рівня залишилось: {nextLevelAmount}</p>
      </div>

      <div className="loyalty-progress">
        <div className="loyalty-progress__line">
          <div
            className="loyalty-progress__fill"
            style={{ width: progressWidth }}
          />
        </div>

        <div className="loyalty-progress__steps">
          {levels.map((level) => (
            <div
              key={level.slug || level.id}
              className={`loyalty-step ${
                activeLevelSlugs.includes(level.slug) ? 'active' : ''
              }`}
            >
              <div className="loyalty-step__dot" />
              <span className="loyalty-step__label">{level.name || level.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="account-card__action">
        <Button
          type="button"
          variant="light"
          preset="long"
          to="/loyalty"
        >
          Більше про Програму Лояльності
        </Button>
      </div>
    </section>
  )
}

export default AccountLoyaltyCard
