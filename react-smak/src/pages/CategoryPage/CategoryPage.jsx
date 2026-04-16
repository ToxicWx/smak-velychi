import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumbs from '../../components/shared/breadcrumbs/Breadcrumbs'
import ProductCard from '../../components/shared/product-card/ProductCard'
import { getCategoryBySlug, getProductsByCategory, getAssetUrl } from '../../api/directus'
import { useCart } from '../../context/CartContext'
import { resolvePrice } from '../../utils/price'
import { normalizeUnitLabel } from '../../utils/unit'
import './category-page.css'

const PAGE_SIZE = 15

function CategoryPage() {
  const { slug } = useParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [category, setCategory] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { addItem } = useCart()

  useEffect(() => {
    setLoading(true)
    setError(null)
    setCurrentPage(1)

    getCategoryBySlug(slug)
      .then((catRes) => {
        const cat = catRes.data?.[0]
        if (!cat) {
          setCategory(null)
          setProducts([])
          setLoading(false)
          return
        }

        setCategory(cat)
        return getProductsByCategory(cat.id)
      })
      .then((prodsRes) => {
        if (prodsRes) {
          setProducts(prodsRes.data || [])
        }
      })
      .catch((err) => {
        console.error('Помилка завантаження даних:', err)
        setError('Не вдалося завантажити дані. Спробуйте пізніше.')
      })
      .finally(() => setLoading(false))
  }, [slug])

  const pageCount = Math.max(1, Math.ceil(products.length / PAGE_SIZE))

  const visibleProducts = useMemo(() => {
    return products.slice(0, currentPage * PAGE_SIZE)
  }, [currentPage, products])

  const breadcrumbs = [
    { label: 'Головна', href: '/' },
    { label: 'Весь Асортимент', href: '/assortment' },
    { label: category?.name || 'Категорія' },
  ]

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pageCount))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePageClick = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleShowMore = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pageCount))
  }

  const handleAddToCart = (product) => {
    const { price, oldPrice } = resolvePrice(product)

    addItem({
      id: product.id,
      slug: product.slug,
      title: product.title,
      image: getAssetUrl(product.og_image_file_id),
      price,
      oldPrice,
      unit: normalizeUnitLabel(product.unit_label),
    })
  }

  if (loading) {
    return (
      <section className="catalog-products">
        <div className="container">
          <p>Завантаження...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="catalog-products">
        <div className="container">
          <p>{error}</p>
        </div>
      </section>
    )
  }

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <section className="catalog-products">
        <div className="container">
          <h1 className="catalog-products__title">
            {category?.name || 'Категорія'}
          </h1>

          <div className="catalog-products__grid">
            {visibleProducts.map((product) => {
              const { price, oldPrice } = resolvePrice(product)

              return (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  image={getAssetUrl(product.og_image_file_id)}
                  price={price}
                  oldPrice={oldPrice}
                  unit={normalizeUnitLabel(product.unit_label)}
                  href={`/product/${product.slug}`}
                  onAddToCart={() => handleAddToCart(product)}
                />
              )
            })}
          </div>

          <div className="catalog-products__footer">
            {currentPage < pageCount && (
              <button
                className="catalog-products__more"
                type="button"
                onClick={handleShowMore}
              >
                Показати ще
              </button>
            )}

            <nav className="catalog-products__pagination" aria-label="Пагінація">
              <button
                type="button"
                className="catalog-products__page catalog-products__page--arrow"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                ‹
              </button>

              {Array.from({ length: pageCount }, (_, index) => {
                const page = index + 1
                return (
                  <button
                    key={page}
                    type="button"
                    className={`catalog-products__page ${
                      currentPage === page ? 'is-active' : ''
                    }`}
                    onClick={() => handlePageClick(page)}
                  >
                    {page}
                  </button>
                )
              })}

              <button
                type="button"
                className="catalog-products__page catalog-products__page--arrow"
                onClick={handleNextPage}
                disabled={currentPage === pageCount}
              >
                ›
              </button>
            </nav>
          </div>
        </div>
      </section>
    </>
  )
}

export default CategoryPage
