import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Breadcrumbs from '../../components/shared/breadcrumbs/Breadcrumbs'
import AssortmentHero from '../../components/assortment/assortment-hero/AssortmentHero'
import ProductsSection from '../../components/shared/products-section/ProductsSection'
import AssortmentCatalog from '../../components/assortment/assortment-catalog/AssortmentCatalog'
import { getCategories, getProducts, getAssetUrl } from '../../api/directus'
import { useCart } from '../../context/CartContext'
import { resolvePrice } from '../../utils/price'
import { normalizeUnitLabel } from '../../utils/unit'
import './assortment-page.css'

const SECTIONS_LIMIT = 6

function getCategoryId(value) {
  if (value && typeof value === 'object') {
    return value.id ?? null
  }

  return value ?? null
}

function buildProductCard(product, addItem, openCart) {
  const { price, oldPrice } = resolvePrice(product)

  return {
    id: product.id,
    title: product.title,
    image: getAssetUrl(product.og_image_file_id),
    price,
    oldPrice,
    unit: normalizeUnitLabel(product.unit_label),
    href: `/product/${product.slug}`,
    onAddToCart: () => {
      addItem({
        id: product.id,
        slug: product.slug,
        title: product.title,
        image: getAssetUrl(product.og_image_file_id),
        price,
        oldPrice,
        unit: normalizeUnitLabel(product.unit_label),
      })
      openCart()
    },
  }
}

function AssortmentPage() {
  const { openCart } = useOutletContext()
  const { addItem } = useCart()

  const [sections, setSections] = useState([])
  const [catalogItems, setCatalogItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getCategories(), getProducts()])
      .then(([catsRes, prodsRes]) => {
        const categories = catsRes.data || []
        const products = prodsRes.data || []

        setCatalogItems(
          categories.map((category) => ({
            id: category.id,
            name: category.name,
            image: getAssetUrl(category.image_file_id),
            href: `/category/${category.slug}`,
          }))
        )

        const featuredSections = categories
          .slice(0, SECTIONS_LIMIT)
          .map((category) => {
            const categoryProducts = products
              .filter(
                (product) =>
                  String(getCategoryId(product.category_id)) === String(getCategoryId(category.id))
              )
              .map((product) => buildProductCard(product, addItem, openCart))

            return {
              id: category.id,
              title: category.name,
              href: `/category/${category.slug}`,
              products: categoryProducts,
            }
          })
          .filter((section) => section.products.length > 0)

        setSections(featuredSections)
      })
      .catch((error) => {
        console.error('Помилка завантаження асортименту:', error)
        setCatalogItems([])
        setSections([])
      })
      .finally(() => setLoading(false))
  }, [addItem, openCart])

  const breadcrumbs = [
    { label: 'Головна', href: '/' },
    { label: 'Весь Асортимент' },
  ]

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <div className="container assortment-page">
        <AssortmentHero />

        {loading ? (
          <p>Завантаження...</p>
        ) : (
          <>
            {sections.map((section) => (
              <ProductsSection
                key={section.id}
                title={section.title}
                href={section.href}
                products={section.products}
              />
            ))}

            <AssortmentCatalog items={catalogItems} />
          </>
        )}
      </div>
    </>
  )
}

export default AssortmentPage
