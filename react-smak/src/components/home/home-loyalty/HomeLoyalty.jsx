import './home-loyalty.css'

const HOME_LOYALTY_LEVELS = [
  {
    id: 'druzhynnyk',
    title: 'Дружинник',
    image: '/assets/images/loyalty-druzh.png',
    howToGet: 'реєстрація + перша покупка (від 1500 грн)',
    bonuses: [
      '3% кешбек на всі покупки',
      'Доступ до спеціальних пропозицій',
      'Спеціальна святкова знижка 7% у ваш день народження',
      'Ексклюзивні рецепти та комбінації смаків від шефа в застосунку',
    ],
    showPreviousLevelNote: false,
  },
  {
    id: 'boyaryn',
    title: 'Боярин',
    image: '/assets/images/loyalty-boyaryn.png',
    howToGet: 'накопичена сума покупок – 25 000 грн',
    bonuses: [
      '7% кешбек на всі покупки',
      'Спеціальні ціни на вибрані товари',
      'Індивідуальна святкова пропозиція + знижка 10% у ваш день народження',
      'Знижка на перше замовлення персональної дегустації',
      'Запрошення на сезонні події',
    ],
    showPreviousLevelNote: true,
  },
  {
    id: 'knyaz',
    title: 'Князь',
    image: '/assets/images/loyalty-knyaz.png',
    howToGet: 'накопичена сума покупок – 100 000 грн',
    bonuses: [
      '10% кешбек на всі покупки',
      'Подарунки до свят і при релізах нових продуктів',
      'Індивідуальний святковий подарунок + знижка 12% у ваш день народження',
      'Щорічна знижка на персональну дегустацію',
      'Ексклюзивний доступ до спеціальних подій',
    ],
    showPreviousLevelNote: true,
  },
]

function HomeLoyalty() {
  return (
    <section className="loyalty container">
      <div className="loyalty__header">
        <div className="loyalty__header-left">
          <h2 className="loyalty__title">Програма лояльності</h2>
          <p className="loyalty__desc">
            Накопичуйте кешбек, отримуйте бонуси до дня народження й відкривайте
            доступ до спеціальних пропозицій та привілеїв.
          </p>
        </div>

        <div className="loyalty__header-right">
          <h2 className="loyalty__title-right">“Княжий Двір”</h2>
          <p className="loyalty__desc-right">
            Програма лояльності "Смак Величі" — вигідніше й зручніше з кожною
            покупкою.
          </p>
        </div>
      </div>

      <div className="loyalty__cards">
        {HOME_LOYALTY_LEVELS.map((level) => (
          <div className="loyalty__card" key={level.id}>
            <p className="loyalty__card-title">{level.title}</p>
            <img src={level.image} alt={level.title} className="loyalty__card-img" />

            <div className="loyalty__card-hover">
              <p className="loyalty__card-hover-how">Як отримати: {level.howToGet}</p>
              <p className="loyalty__card-hover-title">Бонуси</p>

              <ul className="loyalty__card-hover-list">
                {level.bonuses.map((bonus, index) => (
                  <li key={`${level.id}-${index}`}>
                    <img src="/assets/icons/key.svg" alt="" />
                    {bonus}
                  </li>
                ))}
              </ul>

              {level.showPreviousLevelNote ? (
                <p className="loyalty__card-hover-extra">
                  + бонуси з попереднього рівня
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HomeLoyalty
