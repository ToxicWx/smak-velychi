import { useEffect, useRef, useState } from 'react'
import TasteStorySlideCard from '../TasteStorySlideCard/TasteStorySlideCard'
import './taste-stories-hero-section.css'

function TasteStoriesHeroSection({ title, description, items = [] }) {
  const sliderRef = useRef(null)

  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = () => {
    if (!sliderRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current

    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1)
  }

  const handleScroll = (direction) => {
    if (!sliderRef.current) return

    sliderRef.current.scrollBy({
      left: direction * 705,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    updateScrollState()

    slider.addEventListener('scroll', updateScrollState)
    window.addEventListener('resize', updateScrollState)

    return () => {
      slider.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [items])

  return (
    <section className="taste-stories-hero-section">
      <div className="taste-stories-hero-section__header">
        <div className="taste-stories-hero-section__info">
          <h2 className="taste-stories-hero-section__title">{title}</h2>
          <p className="taste-stories-hero-section__description">{description}</p>
        </div>

        <div className="taste-stories-hero-section__actions">
          <button
            type="button"
            className="taste-stories-hero-section__arrow"
            onClick={() => handleScroll(-1)}
            disabled={!canScrollLeft}
            aria-label="Попередній слайд"
          >
            <img src="/assets/icons/arrow-left.svg" alt="" />
          </button>

          <button
            type="button"
            className="taste-stories-hero-section__arrow"
            onClick={() => handleScroll(1)}
            disabled={!canScrollRight}
            aria-label="Наступний слайд"
          >
            <img src="/assets/icons/arrow-right.svg" alt="" />
          </button>
        </div>
      </div>

      <div className="taste-stories-hero-section__slider" ref={sliderRef}>
        {items.map((item) => (
          <TasteStorySlideCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  )
}

export default TasteStoriesHeroSection