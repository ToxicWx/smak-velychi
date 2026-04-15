import './home-hero.css'
import Button from '../../shared/button/Button'
import { useNavigate } from 'react-router-dom'

function HomeHero() {
  const navigate = useNavigate()

  return (
    <>
      <div className="hero__video-bg">
        <img src="/assets/animations/Main-banner.gif" alt="" />
      </div>

      <section className="container hero">
        <p className="hero__subtitle">
          <span className="hero__subtitle-italic">твій преміум-маркет</span>{' '}
          <span className="hero__subtitle-strong">з історією</span>
        </p>

        <h1 className="hero__title">
          СМАК
          <br />
          <span>
            ВЕЛИЧІ <small>–</small>
          </span>
        </h1>

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-number hero__stat-number--one">01</span>
            <span className="hero__stat-desc">флагманський магазин</span>
          </div>

          <div className="hero__stat">
            <span className="hero__stat-number hero__stat-number--two">200+</span>
            <span className="hero__stat-desc">продуктів преміум-класу</span>
          </div>

          <div className="hero__stat">
            <span className="hero__stat-number hero__stat-number--three">30+</span>
            <span className="hero__stat-desc">
              історичних рецептів з <br /> нашими продуктами
            </span>
          </div>
        </div>

        <p className="hero__tagline">
          від княжих застіль
          <br />
          до твого столу!
        </p>

        <Button
          type="button"
          variant="primary"
          preset="primary-cta"
          className="hero__button"
          onClick={() => navigate('/assortment')}
        >
          Перейти до Асортименту
        </Button>
      </section>
    </>
  )
}

export default HomeHero
