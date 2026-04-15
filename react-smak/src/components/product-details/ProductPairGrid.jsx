import RichText from '../shared/rich-text/RichText'

function ProductPairGrid({ blocks = [] }) {
  if (!blocks.length) {
    return null
  }

  return (
    <section className="product-pair-grid">
      {blocks.map((block, index) => (
        <article className="product-note-card" key={`${block.title || 'block'}-${index}`}>
          {block.title ? <h2 className="product-section-title">{block.title}</h2> : null}
          <RichText
            className="product-section-text product-section-text--html"
            html={block.html}
          />
        </article>
      ))}
    </section>
  )
}

export default ProductPairGrid
