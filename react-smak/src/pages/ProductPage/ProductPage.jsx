import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Breadcrumbs from '../../components/shared/breadcrumbs/Breadcrumbs'
import ProductGallery from '../../components/product-details/ProductGallery'
import ProductInfoCard from '../../components/product-details/ProductInfoCard'
import ProductTextSections from '../../components/product-details/ProductTextSections'
import ProductPairGrid from '../../components/product-details/ProductPairGrid'
import ProductStorySection from '../../components/product-details/ProductStorySection'
import ProductChefSection from '../../components/product-details/ProductChefSection'
import ProductsSection from '../../components/shared/products-section/ProductsSection'
import {
  getProductBySlug,
  getProductImages,
  getProductsByCategory,
  getAssetUrl,
} from '../../api/directus'
import { useCart } from '../../context/CartContext'
import '../../components/product-details/product-details.css'
import { resolvePrice, formatPrice } from '../../utils/price'

function mapInfoBlocks(item) {
  return [
    {
      title: item.info_block_1_title || '',
      html: item.info_block_1_text || '',
    },
    {
      title: item.info_block_2_title || '',
      html: item.info_block_2_text || '',
    },
  ].filter((block) => block.html)
}

function mapChefCards(item) {
  return [1, 2, 3]
    .map((index) => {
      const title = item[`chef_${index}_title`] || ''
      const textHtml = item[`chef_${index}_text`] || ''
      const imageFileId = item[`chef_${index}_image_file_id`]

      if (!title && !textHtml && !imageFileId) {
        return null
      }

      return {
        title,
        textHtml,
        image: getAssetUrl(imageFileId),
      }
    })
    .filter((card) => card && (card.title || card.textHtml || card.image))
}

function ProductPage({ productSlug }) {
  const { openCart } = useOutletContext()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!productSlug) return

    let isCancelled = false

    const loadProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        setProduct(null)
        setRelatedProducts([])

        const productResponse = await getProductBySlug(productSlug)
        const item = productResponse.data?.[0]

        if (!item) {
          if (!isCancelled) {
            setError('Продукт не знайдено')
          }
          return
        }

        const { price, oldPrice } = resolvePrice(item)
        const imagesResponse = await getProductImages(item.id)
        const productImages = imagesResponse.data || []
        const gallery = productImages.length
          ? productImages.map((imageItem) => getAssetUrl(imageItem.file_id)).filter(Boolean)
          : [getAssetUrl(item.og_image_file_id)].filter(Boolean)

        const nextProduct = {
          id: item.id,
          slug: item.slug,
          title: item.title,
          categoryId: item.category_id?.id || null,
          categoryName: item.category_id?.name || 'Категорія',
          categoryHref: item.category_id?.slug ? `/category/${item.category_id.slug}` : '/assortment',
          gallery,
          image: gallery[0] || getAssetUrl(item.og_image_file_id),
          price,
          oldPrice,
          unit: item.unit_label || '',
          slogan: item.slogan || '',
          descriptionHtml: item.description || '',
          ingredientsTitle: item.ingredients_title || '',
          ingredientsHtml: item.ingredients || '',
          infoBlocks: mapInfoBlocks(item),
          storyTitle: item.story_title || '',
          storyHtml: item.story_text || '',
          chefSectionTitle: item.chef_section_title || '',
          chefCards: mapChefCards(item),
        }

        if (!isCancelled) {
          setProduct(nextProduct)
        }

        if (!item.category_id?.id) {
          return
        }

        const relatedResponse = await getProductsByCategory(item.category_id.id)
        if (isCancelled) {
          return
        }

        const nextRelatedProducts = (relatedResponse.data || [])
          .filter((relatedItem) => relatedItem.id !== item.id)
          .slice(0, 8)
          .map((relatedItem) => {
            const relatedPrice = resolvePrice(relatedItem)

            return {
              id: relatedItem.id,
              title: relatedItem.title,
              image: getAssetUrl(relatedItem.og_image_file_id),
              price: relatedPrice.price,
              oldPrice: relatedPrice.oldPrice,
              unit: relatedItem.unit_label,
              href: `/product/${relatedItem.slug}`,
              onAddToCart: () => {
                addItem({
                  id: relatedItem.id,
                  slug: relatedItem.slug,
                  title: relatedItem.title,
                  image: getAssetUrl(relatedItem.og_image_file_id),
                  price: relatedPrice.price,
                  oldPrice: relatedPrice.oldPrice,
                  unit: relatedItem.unit_label || '',
                })
                openCart()
              },
            }
          })

        setRelatedProducts(nextRelatedProducts)
      } catch (loadError) {
        console.error('Помилка завантаження продукту:', loadError)
        if (!isCancelled) {
          setError('Не вдалося завантажити продукт')
        }
      } finally {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    }

    loadProduct()

    return () => {
      isCancelled = true
    }
  }, [addItem, openCart, productSlug])

  const handleAddToCart = () => {
    if (!product) return

    addItem({
      id: product.id,
      slug: product.slug,
      title: product.title,
      image: product.image,
      price: product.price,
      oldPrice: product.oldPrice,
      unit: product.unit,
    })
    openCart()
  }

  if (loading) {
    return (
      <section className="product-page">
        <div className="container">
          <p>Завантаження...</p>
        </div>
      </section>
    )
  }

  if (error || !product) {
    return (
      <section className="product-page">
        <div className="container">
          <p>{error || 'Продукт не знайдено'}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="product-page">
      <Breadcrumbs
        items={[
          { label: 'Головна', href: '/' },
          { label: 'Весь Асортимент', href: '/assortment' },
          { label: product.categoryName, href: product.categoryHref },
          { label: product.title },
        ]}
      />

      <div className="container">
        <div className="product-page__top">
          <ProductGallery images={product.gallery} oldPrice={product.oldPrice} />

          <div className="product-page__right">
            <ProductInfoCard
              title={product.title}
              price={formatPrice(product.price, product.unit)}
              oldPrice={formatPrice(product.oldPrice, product.unit)}
              onAddToCart={handleAddToCart}
            />

            <ProductTextSections
              slogan={product.slogan}
              descriptionHtml={product.descriptionHtml}
              ingredientsTitle={product.ingredientsTitle}
              ingredientsHtml={product.ingredientsHtml}
            />
          </div>
        </div>

        <ProductPairGrid blocks={product.infoBlocks} />

        <ProductStorySection
          title={product.storyTitle || 'Легенда Смаку'}
          html={product.storyHtml}
        />

        <ProductChefSection
          title={product.chefSectionTitle || 'Шеф радить'}
          cards={product.chefCards}
        />

        {relatedProducts.length > 0 && (
          <ProductsSection
            title="Спробуйте також"
            href={product.categoryHref}
            products={relatedProducts}
          />
        )}
      </div>
    </section>
  )
}

export default ProductPage
