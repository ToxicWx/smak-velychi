import './about-location.css'

function AboutLocation({ data }) {
  return (
    <section className="about-location">
      <p className="about-location__label">{data.label}</p>
      <p className="about-location__value">{data.value}</p>
    </section>
  )
}

export default AboutLocation