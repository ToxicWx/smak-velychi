import RichText from '../shared/rich-text/RichText'

function buildStepHtml(stepNumber, title, html) {
  const normalizedHtml = String(html || '').trim()

  if (!normalizedHtml) {
    return ''
  }

  const numberMarkup = stepNumber
    ? `<span class="recipe-step-card__number">${stepNumber}. </span>`
    : ''
  const titleMarkup = title
    ? `<span class="recipe-step-card__title">${title}</span> `
    : ''

  if (/^<p[\s>]/i.test(normalizedHtml)) {
    return normalizedHtml.replace(/^<p([^>]*)>/i, `<p$1>${numberMarkup}${titleMarkup}`)
  }

  return `<p>${numberMarkup}${titleMarkup}${normalizedHtml}</p>`
}

function RecipeStepCard({ stepNumber, title, text, html, image }) {
  const hasPlainCopy = Boolean(stepNumber || title || text)
  const htmlWithPrefix = !text && html ? buildStepHtml(stepNumber, title, html) : html

  return (
    <article className="recipe-step-card">
      {stepNumber || title || text || html ? (
        <div className="recipe-step-card__copy">
          {hasPlainCopy && text ? (
            <p className="recipe-step-card__text">
              {stepNumber ? (
                <span className="recipe-step-card__number">{stepNumber}. </span>
              ) : null}
              {title ? <span className="recipe-step-card__title">{title}</span> : null}
              {text ? ` ${text}` : null}
            </p>
          ) : null}

          {htmlWithPrefix ? (
            <RichText
              className="recipe-step-card__text recipe-step-card__text--html"
              html={htmlWithPrefix}
            />
          ) : null}
        </div>
      ) : null}

      {image ? (
        <img
          className="recipe-step-card__image"
          src={image}
          alt={stepNumber ? `Крок ${stepNumber}` : 'Крок рецепта'}
        />
      ) : null}
    </article>
  )
}

export default RecipeStepCard
