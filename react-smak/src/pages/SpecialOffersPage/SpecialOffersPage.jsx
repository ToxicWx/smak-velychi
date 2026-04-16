import { useEffect, useMemo, useState } from 'react'
import Breadcrumbs from '../../components/shared/breadcrumbs/Breadcrumbs'
import PageIntro from '../../components/shared/page-intro/PageIntro'
import ProductCard from '../../components/shared/product-card/ProductCard'
import { getAssetUrl, getProducts } from '../../api/directus'
import { useCart } from '../../context/CartContext'
import { resolvePrice } from '../../utils/price'
import { normalizeUnitLabel } from '../../utils/unit'
import './special-offers-page.css'

function SpecialOffersPage() {
  const { addItem } = useCart()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')

    getProducts()
      .then((response) => {
        setProducts(response.data || [])
      })
      .catch((requestError) => {
        console.error('Помилка завантаження акційних товарів:', requestError)
        setError('Не вдалося завантажити акційні товари. Спробуйте пізніше.')
      })
      .finally(() => setLoading(false))
  }, [])

  const saleProducts = useMemo(
    () => products.filter((product) => resolvePrice(product).oldPrice),
    [products]
  )

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

  const breadcrumbs = [
    { label: 'Головна', href: '/' },
    { label: 'Весь Асортимент', href: '/assortment' },
    { label: 'Акції' },
  ]

  return (
    <section className="special-offers-page">
      <Breadcrumbs items={breadcrumbs} />

      <div className="container">
        <div className="special-offers-page__title-wrap">
          <PageIntro title="Акції" />
        </div>

        <div className="special-offers-page__content">
          {loading ? <p className="special-offers-page__text">Завантаження...</p> : null}
          {error ? <p className="special-offers-page__text">{error}</p> : null}

          {!loading && !error && saleProducts.length === 0 ? (
            <p className="special-offers-page__text">Зараз акційних товарів немає.</p>
          ) : null}

          {!loading && !error && saleProducts.length > 0 ? (
            <div className="special-offers-page__grid">
              {saleProducts.map((product) => {
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
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default SpecialOffersPage
