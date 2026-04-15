import Button from '../button/Button'
import './blog-card.css'

function BlogCard({
  title,
  text,
  image,
  buttonText = 'Детальніше',
  to,
}) {
  return (
    <article className="blog-card">
      <img src={image} alt="" className="blog-card__bg" />

      <div className="blog-card__content">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>

      <div className="blog-card__button-wrap">
        <Button
          to={to}
          variant="outline-dark"
          preset="detailed-card"
          className="blog-card__button"
        >
          {buttonText}
        </Button>
      </div>
    </article>
  )
}

export default BlogCard