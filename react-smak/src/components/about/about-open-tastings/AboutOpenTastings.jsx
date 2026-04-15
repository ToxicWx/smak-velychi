import Button from '../../shared/button/Button'
import './about-open-tastings.css'

function AboutOpenTastings({ data, onRegisterClick }) {
  return (
    <section className="about-open-tastings">
      <h2 className="about-open-tastings__title">{data.title}</h2>

      <div className="about-open-tastings__grid">
        {data.items.map((item) => (
          <article className="about-open-tastings__card" key={item.id}>
            <h3 className="about-open-tastings__card-title">
              <span>{item.date}</span>
              <span>{item.title}</span>
            </h3>

            <h4 className="about-open-tastings__card-subtitle">
              {item.subtitle}
            </h4>

            <p className="about-open-tastings__card-description">
              {item.description}
            </p>

            <p className="about-open-tastings__card-time">{item.time}</p>
          </article>
        ))}
      </div>

      <div className="about-open-tastings__footer-text">
        <p className="about-open-tastings__footer-info">{data.footerInfo}</p>
        <p className="about-open-tastings__footer-instruction">
          {data.footerInstruction}
        </p>
      </div>

      <div className="about-open-tastings__button-wrap">
        
        <Button variant="dark" preset="dark-cta" onClick={onRegisterClick}>
          {data.buttonText}
        </Button>
       
      </div>
    </section>
  )
}

export default AboutOpenTastings