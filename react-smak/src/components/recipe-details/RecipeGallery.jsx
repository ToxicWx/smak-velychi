import { useEffect, useMemo, useState } from 'react'

function RecipeGallery({ images = [], title = 'Фото рецепта' }) {
  const safeImages = useMemo(() => {
    const normalized = images.filter(Boolean).slice(0, 5)

    if (!normalized.length) {
      return ['/assets/icons/cart-icon.svg']
    }

    return normalized
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
    <section className="recipe-gallery">
      <div className="recipe-gallery__thumbs">
        {visibleThumbs.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            className={`recipe-gallery__thumb ${
              activeIndex === index ? 'is-active' : ''
            }`}
            onClick={() => handleThumbClick(index)}
            aria-label={`Показати зображення ${index + 1}`}
          >
            <img src={image} alt="" />
          </button>
        ))}
      </div>

      <div className="recipe-gallery__main-wrap">
        <button
          type="button"
          className="recipe-gallery__nav recipe-gallery__nav--left"
          onClick={goPrev}
          aria-label="Попереднє зображення"
        >
          ←
        </button>

        <div className="recipe-gallery__main">
          <img src={activeImage} alt={title} />
        </div>

        <button
          type="button"
          className="recipe-gallery__nav recipe-gallery__nav--right"
          onClick={goNext}
          aria-label="Наступне зображення"
        >
          →
        </button>
      </div>
    </section>
  )
}

export default RecipeGallery
