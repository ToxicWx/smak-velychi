import Button from '../shared/button/Button'

function RecipeFeaturedProduct({
  label,
  note,
  buttonText = 'Перейти до Продукту',
  href = '#',
}) {
  return (
    <section className="recipe-featured-product">
      <p className="recipe-featured-product__label">{label}</p>
      {note ? <p className="recipe-featured-product__note">{note}</p> : null}

      <Button
        to={href}
        type="button"
        variant="dark"
        preset="auto"
        className="recipe-featured-product__button"
      >
        {buttonText}
      </Button>
    </section>
  )
}

export default RecipeFeaturedProduct
