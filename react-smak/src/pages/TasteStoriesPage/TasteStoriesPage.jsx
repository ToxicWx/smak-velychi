import { useEffect, useState } from 'react'
import Breadcrumbs from '../../components/shared/breadcrumbs/Breadcrumbs'
import TasteStoriesHeroSection from '../../components/taste-stories/TasteStoriesHeroSection/TasteStoriesHeroSection'
import TasteStoriesGridSection from '../../components/taste-stories/TasteStoriesGridSection/TasteStoriesGridSection'
import { TASTE_STORY_CATEGORY_SLUGS, getTasteStories, isRecipeLikePost } from '../../api/directus'
import './taste-stories-page.css'

function mapStoryCard(story) {
  return {
    id: story.id,
    title: story.title,
    description: story.excerpt_plain,
    image: story.image,
    time: story.prepTimeLabel,
    portions: story.servingsLabel,
    featuredProduct: story.relatedProduct?.title || '',
    productNote: story.productNote || '',
    href: `/stories/${story.slug}`,
    isRecipeLike: isRecipeLikePost(story),
  }
}

function TasteStoriesPage() {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isCancelled = false

    getTasteStories(TASTE_STORY_CATEGORY_SLUGS)
      .then((response) => {
        if (!isCancelled) {
          setStories((response.data || []).map(mapStoryCard))
        }
      })
      .catch((error) => {
        console.error('Помилка завантаження історій смаку:', error)
      })
      .finally(() => {
        if (!isCancelled) {
          setLoading(false)
        }
      })

    return () => {
      isCancelled = true
    }
  }, [])

  const recipeStories = stories.filter((story) => story.isRecipeLike)
  const nonRecipeStories = stories.filter((story) => !story.isRecipeLike)

  const featuredRecipeStories = recipeStories.slice(0, 4)
  const featuredOtherStories = nonRecipeStories.slice(0, 4)

  const featuredRecipeStoryIds = new Set(featuredRecipeStories.map((story) => story.id))
  const featuredOtherStoryIds = new Set(featuredOtherStories.map((story) => story.id))

  const remainingStories = stories.filter(
    (story) => !featuredRecipeStoryIds.has(story.id) && !featuredOtherStoryIds.has(story.id)
  )

  return (
    <div className="taste-stories-page">
      <Breadcrumbs
        items={[
          { label: 'Головна', href: '/' },
          { label: 'Історії Смаку' },
        ]}
      />

      <div className="container">
        <section className="taste-stories-page__intro">
          <h1 className="taste-stories-page__title">Історії Смаку</h1>
        </section>

        <div className="taste-stories-page__sections">
          {loading ? (
            <p>Завантаження...</p>
          ) : stories.length > 0 ? (
            <>
              {featuredRecipeStories.length > 0 ? (
                <TasteStoriesHeroSection
                  title="Сучасна трапеза"
                  description="Сезонні рецепти та гастроідеї з фірмовими продуктами."
                  items={featuredRecipeStories}
                />
              ) : null}

              {featuredOtherStories.length > 0 ? (
                <TasteStoriesHeroSection
                  title="Смаковий літопис"
                  description="Добірка історій про автентичні страви, давні традиції та побутові рецепти."
                  items={featuredOtherStories}
                />
              ) : null}

              {remainingStories.length > 0 ? (
                <TasteStoriesGridSection title="Інші Рецепти" items={remainingStories} />
              ) : null}
            </>
          ) : (
            <p>У Directus поки немає опублікованих матеріалів у категорії Історій Смаку.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default TasteStoriesPage
