import Button from '../../shared/button/Button'
import './about-tasting-info.css'

function AboutTastingInfo({ data, onOrderClick }) {
  return (
    <section className="about-tasting-info">
      <h2 className="about-tasting-info__title">{data.title}</h2>
      <p className="about-tasting-info__text">{data.text}</p>


      <Button variant="dark" preset="dark-cta" onClick={onOrderClick}>
        {data.buttonText}
      </Button>
      
    </section>
  )
}

export default AboutTastingInfo