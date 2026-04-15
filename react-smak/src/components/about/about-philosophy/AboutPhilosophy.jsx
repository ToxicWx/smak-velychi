import './about-philosophy.css'

function AboutPhilosophy({ data }) {
  return (
    <section className="about-philosophy">
      <h2 className="about-philosophy__title">{data.title}</h2>

      <div className="about-philosophy__content">
        <ul className="about-philosophy__list">
          {data.items.map((item) => (
            <li className="about-philosophy__item" key={item.id}>
              <div className="about-philosophy__title-row">
                <span className="about-philosophy__number">{item.number}</span>
                <h3 className="about-philosophy__item-title">{item.title}</h3>
              </div>

              <p className="about-philosophy__item-text">{item.text}</p>
            </li>
          ))}
        </ul>

        <div className="about-philosophy__image-wrap">
          <img
            className="about-philosophy__image"
            src={data.image}
            alt="Інтер’єр маркету"
          />
        </div>
      </div>
    </section>
  )
}

export default AboutPhilosophy