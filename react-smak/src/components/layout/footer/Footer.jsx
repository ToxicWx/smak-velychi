import { Link } from 'react-router-dom'
import './footer.css'

function Footer({ onOpenOrderTasting }) {
  const handleOpenTastings = () => {
    // тут потім буде відкриття попапа дегустацій
    // наприклад: setIsTastingsModalOpen(true)
  }

  return (
    <footer className="footer container">
      <div className="footer__logo">
        <Link to="/" aria-label="Smak Velychi">
          <img src="/assets/icons/logo-new.png" alt="Smak Velychi logo" />
        </Link>
      </div>

      <nav className="footer__grid" aria-label="Навігація у футері">
        <div className="footer__column">
          <h3 className="footer__title">Світ “Смаку Величі”</h3>
          <ul className="footer__list">
            <li className="footer__item">
              <Link className="footer__link" to="/">Головна</Link>
            </li>
            <li className="footer__item">
              <Link className="footer__link" to="/about">Про “Смак Величі”</Link>
            </li>
            <li className="footer__item">
              <button
                type="button"
                className="footer__link footer__link-button"
                onClick={onOpenOrderTasting}
              >
                Дегустації
              </button>
            </li>
          </ul>
        </div>

        <div className="footer__column">
          <h3 className="footer__title">Наші Продукти</h3>
          <ul className="footer__list">
            <li className="footer__item">
              <Link className="footer__link" to="/assortment">Весь Асортимент</Link>
            </li>
            <li className="footer__item">
              <Link className="footer__link" to="/discounts">Акції</Link>
            </li>
          </ul>
        </div>

        <div className="footer__column">
          <h3 className="footer__title">Читати та дивитись</h3>
          <ul className="footer__list">
            <li className="footer__item">
              <Link className="footer__link" to="/blog">Блог</Link>
            </li>
            <li className="footer__item">
              <Link className="footer__link" to="/stories">Історії Смаку</Link>
            </li>
          </ul>
        </div>

        <div className="footer__column">
          <h3 className="footer__title">Центр Гостя</h3>
          <ul className="footer__list">
            <li className="footer__item">
              <Link className="footer__link" to="/account">Акаунт</Link>
            </li>
            <li className="footer__item">
              <Link className="footer__link" to="/loyalty">Програма лояльності</Link>
            </li>
            <li className="footer__item">
              <Link className="footer__link" to="/contacts">Контакти</Link>
            </li>
            <li className="footer__item">
              <Link className="footer__link" to="/vacancies">Вакансії</Link>
            </li>
          </ul>
        </div>

        <div className="footer__column">
          <h3 className="footer__title">Правила та безпека</h3>
          <ul className="footer__list">
            <li className="footer__item">
              <Link className="footer__link" to="/privacy">Політика конфіденційності</Link>
            </li>
            <li className="footer__item">
              <Link className="footer__link" to="/offer">Публічна оферта</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="footer__bottom">
        <p className="footer__meta">© Smak Velychi, 2026</p>
        <p className="footer__meta">ТРЦ “Dream Town”, м. Київ</p>
      </div>
    </footer>
  )
}

export default Footer