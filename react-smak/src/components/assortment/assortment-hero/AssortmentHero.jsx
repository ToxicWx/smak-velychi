import { Link } from 'react-router-dom'
import './assortment-hero.css'

function AssortmentHero() {
  return (
    <section className="assortment-hero">
      <h1 className="assortment-hero__title">Весь Асортимент</h1>

      <div className="assortment-hero__grid">
        <Link to="#" className="assortment-banner">
          <img
            className="assortment-banner__image"
            src="/assets/images/assortment-banner.png"
            alt="Банер асортименту"
          />
          <p className="assortment-banner__text">
            Запрошуємо вас у наш магазин вінтажних ласощів у PILLI DreamTown у Києві
          </p>
        </Link>

        <div className="assortment-categories">
          <Link
            to="/stories"
            className="assortment-category assortment-category--recipes"
          >
            <p className="assortment-category__text">
              “Історії Смаку”
              <br />– Рецепти
            </p>

            <span
              className="assortment-category__icon assortment-category__icon--paper"
              aria-hidden="true"
            />
          </Link>

          <Link
            to="/discounts"
            className="assortment-category assortment-category--sale"
          >
            <p className="assortment-category__text">Акції</p>

            <span
              className="assortment-category__icon assortment-category__icon--honey"
              aria-hidden="true"
            />
          </Link>

          <Link
            to="/special-offers"
            className="assortment-category assortment-category--special"
          >
            <p className="assortment-category__text">
              Спеціальні
              <br />
              пропозиції
            </p>

            <img
              className="assortment-category__icon"
              src="/assets/icons/key.svg"
              alt=""
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AssortmentHero
