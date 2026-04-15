import './home-about.css'

function HomeAbout() {
  return (
    <section className="container about">
      <div className="about__header">
        <h2 className="about__title">Про</h2>
        <h2 className="about__title-right">“Смак Величі”</h2>
      </div>

      <div className="about__images">
        <img
          src="/assets/images/main-interior.png"
          alt=""
          className="about__img-blur"
        />
        <img
          src="/assets/images/main-fasad.png"
          alt=""
          className="about__img-main"
        />
      </div>

      <p className="about__location">ТРЦ "Dream Town", м. Київ</p>

      <p className="about__quote">
        <span>“Смак Величі”</span> - це преміум-маркет,
        <br /> що відроджує дух княжих бенкетів у сучасній формі
      </p>

      <div className="about__texts">
        <p className="about__text-left">
          {' '}
          Ми надихаємось історією
          <br />
          <em>Київської Русі,</em>
        </p>

        <p className="about__text-right">
          де кожна трапеза була символом
          <br />
          <span>гостинності, щедрості та честі</span>
        </p>
      </div>

      <div className="about__cards">
        <div className="about__card about__card--dark">
          <img
            src="/assets/icons/key-home.svg"
            alt=""
            className="about__card-icon"
          />
          <div className="about__card-content">
            <h4>Традиції минулого — технології сьогодення</h4>
            <p>
              Наші продукти — це поєднання давніх кулінарних традицій і сучасних
              стандартів якості, щоб вони відтворювали справжню атмосферу
              княжих застіль.
            </p>
          </div>
        </div>

        <div className="about__card about__card--light">
          <img
            src="/assets/icons/honey-icon.svg"
            alt=""
            className="about__card-icon"
          />
          <div className="about__card-content">
            <h4>Кожен відділ — сторінка гастрономічної історії</h4>
            <p>
              Кожен зал знайомить із унікальною частиною української кулінарної
              історії. Від «Хлібних Традицій» до «Медової Світлиці» —
              знайомтесь із різними гранями української кухні.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeAbout