import RecipeStepCard from './RecipeStepCard'

function RecipeStepsSection({
  title = 'Секрет приготування',
  steps = [],
  bottomNote,
}) {
  const normalizedSteps = steps
    .slice(0, 5)
    .map((step, index) => ({
      id: step.id ?? index,
      stepNumber: step.stepNumber ?? step.step_number ?? index + 1,
      title: step.title ?? '',
      text: step.text ?? step.description ?? step.content ?? '',
      html: step.html ?? '',
      image: step.image ?? step.photo ?? step.imageUrl ?? '',
    }))
    .filter((step) => step.title || step.text || step.html || step.image)

  if (!normalizedSteps.length) {
    return null
  }

  const firstRow = normalizedSteps.slice(0, 3)
  const secondRow = normalizedSteps.slice(3, 5)

  return (
    <section className="recipe-steps">
      <h2 className="recipe-steps__title">{title}</h2>

      <div className="recipe-steps__rows">
        <div className="recipe-steps__row recipe-steps__row--top">
          {firstRow.map((step) => (
            <RecipeStepCard
              key={step.id}
              stepNumber={step.stepNumber}
              title={step.title}
              text={step.text}
              html={step.html}
              image={step.image}
            />
          ))}
        </div>

        {secondRow.length ? (
          <div className="recipe-steps__row recipe-steps__row--bottom">
            {secondRow.map((step) => (
              <RecipeStepCard
                key={step.id}
                stepNumber={step.stepNumber}
                title={step.title}
                text={step.text}
                html={step.html}
                image={step.image}
              />
            ))}
          </div>
        ) : null}
      </div>

      {bottomNote ? <p className="recipe-steps__bottom-note">{bottomNote}</p> : null}
    </section>
  )
}

export default RecipeStepsSection
