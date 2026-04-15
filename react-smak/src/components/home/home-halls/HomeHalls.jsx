import './home-halls.css'

function HomeHalls() {
  return (
    <section className="container halls">
      <h2 className="halls__title">Палати Смаку</h2>

      <img
        src="/assets/images/wheat.png"
        alt=""
        className="halls__icon"
      />

      <div className="halls__grid">
        <div className="halls__card halls__card--empty">
          <p className="halls__card-label">КОЖЕН ЗАЛ МАЄ СВІЙ</p>

          <p className="halls__card-bottom">
            ХАРАКТЕР, АРОМАТ
            <br />
            І НАСТРІЙ
          </p>
        </div>

        <div
          className="halls__card halls__card--image"
          style={{ backgroundImage: "url('/assets/images/main-halls-bread.png')" }}
        >
          <div className="halls__card-content">
            <h4>Хлібні Традиції</h4>
            <p>житній, пшеничний та зерновий хліб на натуральній заквасці</p>
          </div>
        </div>

        <div
          className="halls__card halls__card--image"
          style={{ backgroundImage: "url('/assets/images/main-halls-honey.png')" }}
        >
          <div className="halls__card-content">
            <h4>Медова Світлиця</h4>
            <p>
              різновиди натурального меду, паст та медових локацій з українських
              пасік
            </p>
          </div>
        </div>

        <div
          className="halls__card halls__card--image"
          style={{ backgroundImage: "url('/assets/images/main-halls-fish.png')" }}
        >
          <div className="halls__card-content">
            <h4>Риба Князів</h4>
            <p>свіжа та копчена риба, маринована за авторськими рецептами</p>
          </div>
        </div>

        <div className="halls__card halls__card--empty halls__card--middle">
          <p>
            Ми запрошуємо вас на дегустації, де можна спробувати продукти в
            поєднанні з давніми рецептами та сучасними способами подачі.
          </p>
          <p>
            І це лише частина нашого асортименту — на вас чекає ще багато інших
            делікатесів та дійсно несподіваних смакових відкриттів.
          </p>
        </div>

        <div
          className="halls__card halls__card--image"
          style={{ backgroundImage: "url('/assets/images/main-halls-meat.png')" }}
        >
          <div className="halls__card-content">
            <h4>М'ясні Делікатеси</h4>
            <p>добірне м'ясо, ковбаси та бастурма преміум-якості</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeHalls