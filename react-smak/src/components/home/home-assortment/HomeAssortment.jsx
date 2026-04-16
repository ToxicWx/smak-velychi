import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './home-assortment.css'
import ProductCard from '../../shared/product-card/ProductCard'
import Button from '../../shared/button/Button'
import { getAssetUrl, getCategories, getProducts } from '../../../api/directus'
import { useCart } from '../../../context/CartContext'
import { resolvePrice } from '../../../utils/price'
import { normalizeUnitLabel } from '../../../utils/unit'

const HOME_PRODUCTS_LIMIT = 6

function normalizeValue(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[`’']/g, "'")
    .trim()
}

function HomeAssortment() {
  const { addItem } = useCart()
  const [products, setProducts] = useState([])

  useEffect(() => {
    Promise.all([getCategories(), getProducts()])
      .then(([categoriesResponse, productsResponse]) => {
        const categories = categoriesResponse.data || []
        const allProducts = productsResponse.data || []
        const meatCategory = categories.find((category) =>
          normalizeValue(category.name).includes("м'яс")
        )

        const homeProducts = meatCategory
          ? allProducts.filter((product) => {
              const categoryId =
                product.category_id && typeof product.category_id === 'object'
                  ? product.category_id.id
                  : product.category_id

              return String(categoryId) === String(meatCategory.id)
            })
          : allProducts

        setProducts(homeProducts.slice(0, HOME_PRODUCTS_LIMIT))
      })
      .catch((error) => {
        console.error('Помилка завантаження товарів на головній:', error)
        setProducts([])
      })
  }, [])

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

  return (
    <section className="home-assortment">
      <div className="container">
        <div className="home-assortment__head">
          <h2 className="home-assortment__title">Асортимент</h2>
        </div>

        <div className="home-assortment__grid">
          {products.map((product) => {
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

        <div className="home-assortment__footer">
          <Link to="/assortment" className="home-assortment__cta-link">
            <Button
              type="button"
              variant="light"
              preset="outline-wide"
              className="home-assortment__button"
            >
              Переглянути весь Асортимент
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HomeAssortment
