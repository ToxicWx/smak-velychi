import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumbs from '../../components/shared/breadcrumbs/Breadcrumbs'
import ArticleDetailTemplate from '../../components/shared/article-detail/ArticleDetailTemplate'
import RecipeGallery from '../../components/recipe-details/RecipeGallery'
import RecipeInfoCard from '../../components/recipe-details/RecipeInfoCard'
import RecipeFeaturedProduct from '../../components/recipe-details/RecipeFeaturedProduct'
import RecipeStepsSection from '../../components/recipe-details/RecipeStepsSection'
import {
  TASTE_STORY_CATEGORY_SLUGS,
  getTasteStoryBySlug,
  isRecipeLikePost,
} from '../../api/directus'
import '../../components/recipe-details/recipe-details.css'

function buildStoryGallery(story) {
  const images = [
    story?.image,
    ...(story?.steps || []).map((step) => step.image).filter(Boolean),
  ].filter(Boolean)

  return Array.from(new Set(images)).slice(0, 5)
}

function StoryDetailPage() {
  const { slug } = useParams()
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isCancelled = false

    if (!slug) {
      setLoading(false)
      return undefined
    }

    getTasteStoryBySlug(slug, TASTE_STORY_CATEGORY_SLUGS)
      .then((response) => {
        if (!isCancelled) {
          setStory(response.data?.[0] || null)
        }
      })
      .catch((error) => {
        console.error('Помилка завантаження історії смаку:', error)
      })
      .finally(() => {
        if (!isCancelled) {
          setLoading(false)
        }
      })

    return () => {
      isCancelled = true
    }
  }, [slug])

  const galleryImages = useMemo(() => buildStoryGallery(story), [story])
  const shouldRenderRecipeTemplate = isRecipeLikePost(story)

  if (loading) {
    return shouldRenderRecipeTemplate ? (
      <section className="recipe-page">
        <div className="container">
          <p>Завантаження...</p>
        </div>
      </section>
    ) : (
      <ArticleDetailTemplate title="Завантаження..." showBackButton={false} />
    )
  }

  if (!story) {
    return (
      <ArticleDetailTemplate
        breadcrumbs={[
          { label: 'Головна', href: '/' },
          { label: 'Історії Смаку', href: '/stories' },
          { label: 'Історію не знайдено' },
        ]}
        title="Історію не знайдено"
        lead="Перевірте slug у Directus або додайте опублікований матеріал у потрібній категорії."
        backButtonLabel="Перейти до Історій Смаку"
        backButtonHref="/stories"
      />
    )
  }

  if (!shouldRenderRecipeTemplate) {
    return (
      <ArticleDetailTemplate
        breadcrumbs={[
          { label: 'Головна', href: '/' },
          { label: 'Історії Смаку', href: '/stories' },
          { label: story.title },
        ]}
        title={story.title}
        lead={story.excerpt_plain}
        heroImage={story.image}
        htmlContent={story.content || ''}
        backButtonLabel="Перейти до Історій Смаку"
        backButtonHref="/stories"
      />
    )
  }

  return (
    <section className="recipe-page">
      <Breadcrumbs
        items={[
          { label: 'Головна', href: '/' },
          { label: 'Історії Смаку', href: '/stories' },
          { label: story.title },
        ]}
      />

      <div className="container recipe-page__container">
        <div className="recipe-page__top">
          <RecipeGallery images={galleryImages} title={story.title} />

          <RecipeInfoCard
            cookTime={story.prepTimeLabel}
            portions={story.servingsLabel}
            title={story.title}
            ingredientsHtml={story.ingredientsHtml}
          />
        </div>

        {story.relatedProduct ? (
          <RecipeFeaturedProduct
            label={`Фірмовий продукт - ${story.relatedProduct.title}`}
            note={story.productNote}
            buttonText={story.ctaButtonText || 'Перейти до Продукту'}
            href={`/product/${story.relatedProduct.slug}`}
          />
        ) : null}

        <RecipeStepsSection
          title={story.secretTitle || 'Секрет приготування'}
          steps={story.steps}
          bottomNote="Нехай смакує!"
        />
      </div>
    </section>
  )
}

export default StoryDetailPage
