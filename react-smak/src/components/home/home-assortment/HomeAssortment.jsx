import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './home-assortment.css'
import ProductCard from '../../shared/product-card/ProductCard'
import Button from '../../shared/button/Button'
import { getAssetUrl, getProducts } from '../../../api/directus'
import { useCart } from '../../../context/CartContext'
import { resolvePrice } from '../../../utils/price'

const HOME_PRODUCTS_LIMIT = 6

function HomeAssortment() {
  const { addItem } = useCart()
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
      .then((response) => {
        setProducts((response.data || []).slice(0, HOME_PRODUCTS_LIMIT))
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
      unit: product.unit_label || '',
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
                unit={product.unit_label}
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
