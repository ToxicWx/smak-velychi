import { useEffect, useRef, useState } from 'react'
import ProductCard from '../product-card/ProductCard'
import './products-section.css'

function ProductsSection({ title, href, products }) {
  const listRef = useRef(null)

  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = () => {
    if (!listRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = listRef.current

    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1)
  }

  const scrollList = (direction) => {
    if (!listRef.current) return

    listRef.current.scrollBy({
      left: direction * 920,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const listElement = listRef.current
    if (!listElement) return

    updateScrollState()

    listElement.addEventListener('scroll', updateScrollState)
    window.addEventListener('resize', updateScrollState)

    return () => {
      listElement.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [products])

  return (
    <section className="products-section">
      <div className="products-section__head">
        <h2 className="products-section__title">{title}</h2>

        <div className="products-section__controls">
          <a href={href} className="products-section__link">
            Дивитись всі
          </a>

          <div className="products-section__arrows">
            <button
              type="button"
              className={`products-section__arrow ${
                !canScrollLeft ? 'products-section__arrow--disabled' : ''
              }`}
              onClick={() => scrollList(-1)}
              aria-label={`Прокрутити ${title} вліво`}
              disabled={!canScrollLeft}
            >
              <img src="/assets/icons/arrow-left.svg" alt="" />
            </button>

            <button
              type="button"
              className={`products-section__arrow ${
                !canScrollRight ? 'products-section__arrow--disabled' : ''
              }`}
              onClick={() => scrollList(1)}
              aria-label={`Прокрутити ${title} вправо`}
              disabled={!canScrollRight}
            >
              <img src="/assets/icons/arrow-right.svg" alt="" />
            </button>
          </div>
        </div>
      </div>

      <div className="products-list" ref={listRef}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
            oldPrice={product.oldPrice}
            unit={product.unit}
            href={product.href}
            onAddToCart={product.onAddToCart}
          />
        ))}
      </div>
    </section>
  )
}

export default ProductsSection
