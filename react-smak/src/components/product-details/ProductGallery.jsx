import { useEffect, useMemo, useState } from 'react'

function ProductGallery({ images = [], oldPrice }) {
  const safeImages = useMemo(() => {
    if (!images.length) {
      return ['/assets/icons/cart-icon.svg']
    }
    return images
  }, [images])

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setActiveIndex(0)
  }, [safeImages])

  const visibleThumbs = safeImages.slice(0, 3)
  const activeImage = safeImages[activeIndex] || safeImages[0]

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1))
  }

  const goNext = () => {
    setActiveIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1))
  }

  const handleThumbClick = (index) => {
    setActiveIndex(index)
  }

  return (
    <section className="product-gallery">
      <div className="product-gallery__thumbs">
        {visibleThumbs.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            className={`product-gallery__thumb ${
              activeIndex === index ? 'is-active' : ''
            }`}
            onClick={() => handleThumbClick(index)}
            aria-label={`Показати зображення ${index + 1}`}
          >
            <img src={image} alt="" />
          </button>
        ))}
      </div>

      <div className="product-gallery__main-wrap">
        {oldPrice ? (
          <div className="product-gallery__discount-badge" aria-hidden="true">
            <img src="/assets/icons/iconamoon_discount.svg" alt="" />
          </div>
        ) : null}

        <button
          type="button"
          className="product-gallery__nav product-gallery__nav--left"
          onClick={goPrev}
          aria-label="Попереднє зображення"
        >
          ←
        </button>

        <div className="product-gallery__main">
          <img src={activeImage} alt="Фото товару" />
        </div>

        <button
          type="button"
          className="product-gallery__nav product-gallery__nav--right"
          onClick={goNext}
          aria-label="Наступне зображення"
        >
          →
        </button>
      </div>
    </section>
  )
}

export default ProductGallery
