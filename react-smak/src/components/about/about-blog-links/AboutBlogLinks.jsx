import Button from '../../shared/button/Button'
import './about-blog-links.css'

function AboutBlogLinks({ data }) {
  return (
    <section className="about-blog-links">
      <h2 className="about-blog-links__title">{data.title}</h2>

      <div className="about-blog-links__columns">
        {data.items.map((item) => (
          <article className="about-blog-links__item" key={item.id}>
            <h3 className="about-blog-links__heading">{item.heading}</h3>
            <p className="about-blog-links__text">{item.text}</p>

            <Button to="/stories" variant="dark" preset="dark-cta">
              {item.buttonText}
            </Button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default AboutBlogLinks