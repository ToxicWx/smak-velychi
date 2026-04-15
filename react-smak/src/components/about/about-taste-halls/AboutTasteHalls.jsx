import './about-taste-halls.css'

function AboutTasteHalls({ data }) {
  return (
    <section className="about-taste-halls">
      <h2 className="about-taste-halls__title">{data.title}</h2>
      <p className="about-taste-halls__intro">{data.intro}</p>

      <div className="about-taste-halls__grid">
        {data.items.map((item, index) => (
          <article
            className={`about-taste-halls__card about-taste-halls__card--${index + 1}`}
            key={item.id}
          >
            <h3 className="about-taste-halls__card-title">{item.title}</h3>
            <img
              className="about-taste-halls__card-image"
              src={item.image}
              alt={item.title}
            />
            <p className="about-taste-halls__card-text">{item.text}</p>
          </article>
        ))}
      </div>

      <p className="about-taste-halls__outro">{data.outro}</p>
    </section>
  )
}

export default AboutTasteHalls