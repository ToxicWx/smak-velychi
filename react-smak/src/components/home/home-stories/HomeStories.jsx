import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../shared/button/Button'
import {
  TASTE_STORY_CATEGORY_SLUGS,
  getTasteStories,
  isRecipeLikePost,
} from '../../../api/directus'
import './home-stories.css'

function HomeStories() {
  const [stories, setStories] = useState([])

  useEffect(() => {
    let isCancelled = false

    getTasteStories(TASTE_STORY_CATEGORY_SLUGS)
      .then((response) => {
        if (isCancelled) {
          return
        }

        const recipeStories = (response.data || []).filter(isRecipeLikePost).slice(0, 2)
        setStories(recipeStories)
      })
      .catch((error) => {
        console.error('Помилка завантаження блоку історій смаку:', error)
      })

    return () => {
      isCancelled = true
    }
  }, [])

  return (
    <section className="container stories">
      <h2 className="stories__title">Історії Смаку</h2>

      <h3 className="stories__subtitle">
        Як давні рецепти оживають у сучасності?
      </h3>

      <p className="stories__text">
        Тут ви знайдете історії походження наших продуктів, відновлені техніки
        приготування, розповіді про інгредієнти та рецепти, натхненні кухнею
        Київської Русі. Це простір, де смак стає історією, а історія частиною
        вашого столу.
      </p>

      {stories.length ? (
        <div className="stories__cards">
          {stories.map((story) => (
            <Link key={story.id} to={`/stories/${story.slug}`} className="stories__card">
              <img src={story.image} alt={story.title} className="stories__card-bg" />
              <div className="stories__card-overlay" />

              <div className="stories__card-content">
                <h4 className="stories__card-title">{story.title}</h4>
                <p className="stories__card-desc">{story.excerpt_plain}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : null}

      <Button
        to="/stories"
        className="stories__button"
        type="button"
        variant="dark"
        preset="dark-cta"
      >
        Більше Рецептів
      </Button>
    </section>
  )
}

export default HomeStories
