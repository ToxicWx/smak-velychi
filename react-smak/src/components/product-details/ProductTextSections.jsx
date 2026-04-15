import RichText from '../shared/rich-text/RichText'

function ProductTextSections({ slogan, descriptionHtml, ingredientsTitle, ingredientsHtml }) {
  const sections = [
    slogan
      ? {
          title: 'Слоган',
          content: <p className="product-section-text">{slogan}</p>,
        }
      : null,
    descriptionHtml
      ? {
          title: 'Опис',
          content: (
            <RichText
              className="product-section-text product-section-text--html"
              html={descriptionHtml}
            />
          ),
        }
      : null,
    ingredientsHtml
      ? {
          title: ingredientsTitle || 'Інгредієнти',
          content: (
            <RichText
              className="product-section-text product-section-text--html"
              html={ingredientsHtml}
            />
          ),
        }
      : null,
  ].filter(Boolean)

  if (!sections.length) {
    return null
  }

  return (
    <section className="product-text-sections">
      {sections.map((section, index) => (
        <div key={section.title}>
          <div className="product-text-sections__item">
            <h2 className="product-section-title">{section.title}</h2>
            {section.content}
          </div>
          {index < sections.length - 1 ? (
            <div className="product-text-sections__divider" />
          ) : null}
        </div>
      ))}
    </section>
  )
}

export default ProductTextSections
