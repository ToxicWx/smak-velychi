import RichText from '../shared/rich-text/RichText'

function RecipeInfoCard({
  cookTime,
  portions,
  title,
  ingredients = [],
  ingredientsHtml = '',
}) {
  const hasMeta = cookTime || portions
  const hasRows = ingredients.length > 0

  return (
    <section className="recipe-info-card">
      {hasMeta ? (
        <div className="recipe-info-card__meta">
          {cookTime ? (
            <div className="recipe-info-card__meta-item">
              <img src="/assets/icons/time-icon.svg" alt="" aria-hidden="true" />
              <span>{cookTime}</span>
            </div>
          ) : null}

          {portions ? (
            <div className="recipe-info-card__meta-item">
              <img src="/assets/icons/portion-icon.svg" alt="" aria-hidden="true" />
              <span>{portions}</span>
            </div>
          ) : null}
        </div>
      ) : null}

      <h1 className="recipe-info-card__title">{title}</h1>

      {hasRows ? (
        <div className="recipe-info-card__ingredients">
          {ingredients.map((item, index) => (
            <div className="recipe-info-card__ingredient-row" key={`${item.name}-${index}`}>
              <span className="recipe-info-card__ingredient-name">{item.name}</span>
              <span className="recipe-info-card__ingredient-value">{item.value}</span>
            </div>
          ))}
        </div>
      ) : ingredientsHtml ? (
        <RichText
          className="recipe-info-card__ingredients recipe-info-card__ingredients--html"
          html={ingredientsHtml}
        />
      ) : null}
    </section>
  )
}

export default RecipeInfoCard
