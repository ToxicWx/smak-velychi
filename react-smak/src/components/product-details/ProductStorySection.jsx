import RichText from '../shared/rich-text/RichText'

function ProductStorySection({ title, html }) {
  if (!html) {
    return null
  }

  return (
    <section className="product-story">
      <div className="product-story__legend">
        <h2 className="product-story__title">{title || 'Легенда Смаку'}</h2>
        <RichText
          className="product-story__text product-section-text--html"
          html={html}
        />
      </div>
    </section>
  )
}

export default ProductStorySection
