import './about-hero.css'

function AboutHero({ data }) {
  return (
    <section className="about-hero">
      <h1 className="about-hero__title">{data.title}</h1>

      <div className="about-hero__visual">
        <img
          className="about-hero__blur"
          src={data.blurImage}
          alt=""
          aria-hidden="true"
        />
        <img
          className="about-hero__facade"
          src={data.facadeImage}
          alt="Фасад Смак Величі"
        />
      </div>

      <p className="about-hero__text">{data.text}</p>
    </section>
  )
}

export default AboutHero