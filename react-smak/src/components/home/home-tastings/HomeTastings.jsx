import './home-tastings.css'
import Button from '../../shared/button/Button'
import { tastingEvents } from '../../../data/tastingEvents'

function HomeTastings({ onOrderClick, onRegisterClick }) {
  return (
    <section className="container tastings">
      <h2 className="tastings__title">Дегустаційні Зали та Події</h2>

      <div className="tastings__grid">
        <div className="tastings__cell">
          <h3 className="tastings__subtitle">СМАК, ЯКИЙ ОБ'ЄДНУЄ</h3>
          <p>
            У наших дегустаційних залах зустрічаються кулінарні традиції й
            сучасна гастрономічна культура.
          </p>
          <p>
            Ми запрошуємо інфлюенсерів, сомельє, шефів і справжніх поціновувачів
            гастрономії, щоб разом відкрити нові грані знайомих смаків — меду,
            сиру, м'яса, випічки та напоїв з усього краю.
          </p>
        </div>

        <div className="tastings__cell tastings__cell--empty" />

        <div className="tastings__cell tastings__cell--right">
          <p>
            Ми влаштовуємо як закриті дегустації для партнерів і гостей, так і
            відкриті події для всіх охочих.
          </p>
          <p className="tastings__highlight">
            <em>
              Ви можете забронювати власну дегустацію для компанії чи колективу
              — просто зв'яжіться з нами.
            </em>
          </p>
        </div>


        <div className="tastings__cell tastings__cell--button">
          <Button 
          type="button"
          variant="dark"
          preset="dark-cta"
          className="tastings__button-order" 
          onClick={onOrderClick}
          >
            Замовити Дегустацію
          </Button>
        </div>

        <div
          className="tastings__cell tastings__cell--image"
          style={{
            backgroundImage:
              "url('/assets/animations/cooking-process.gif')",
          }}
        />

        <div
          className="tastings__cell tastings__cell--image"
          style={{
            backgroundImage:
              "url('/assets/animations/slow-motion-honey.gif')",
          }}
        />
      </div>

      <h3 className="tastings__soon">Дегустації зовсім скоро</h3>

      <div className="tastings__events">
        <img
          src="/assets/animations/cinematic-food.gif"
          alt=""
          className="tastings__events-bg"
        />

        {tastingEvents.map((event) => (
          <div className="tastings__event" key={event.id}>
            <h4>
              {event.date}
              <em>{event.title}</em>
            </h4>
            <p className="tastings__event-desc">{event.subtitle}</p>
            <p className="tastings__event-text">{event.description}</p>
            <p className="tastings__event-time">{event.homeTime || event.time}</p>
          </div>
        ))}
      </div>

      <div className="tastings__info">
        <p className="tastings__info-left">
          Події відкриті для всіх охочих і безкоштовні, однак
          <em> кількість місць обмежена — до 50 гостей.</em>
        </p>

        <p className="tastings__info-right">
          Щоб долучитися, заповніть форму нижче, вказавши своє ім'я, номер
          телефону та електронну пошту. На вказану адресу ми надішлемо
          персональне запрошення з підтвердженням участі та деталями події.
        </p>
      </div>

      <Button 
      className="tastings__register-button" 
      type="button"
      variant="dark"
      preset="dark-cta"
      onClick={onRegisterClick}
      >
        Зареєструватись
      </Button>
    </section>
  )
}

export default HomeTastings
