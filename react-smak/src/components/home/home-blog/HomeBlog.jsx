import { useEffect, useState } from 'react'
import './home-blog.css'
import Button from '../../shared/button/Button'
import BlogCard from '../../shared/blog-card/BlogCard'
import { BLOG_EXCLUDED_CATEGORY_SLUGS, getPosts } from '../../../api/directus'

function HomeBlog() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    let isCancelled = false

    getPosts({ excludeCategorySlugs: BLOG_EXCLUDED_CATEGORY_SLUGS })
      .then((response) => {
        if (!isCancelled) {
          setPosts((response.data || []).slice(0, 2))
        }
      })
      .catch((error) => {
        console.error('Помилка завантаження блогу на головній:', error)
      })

    return () => {
      isCancelled = true
    }
  }, [])

  return (
    <section className="container blog">
      <h2 className="blog__title">Блог</h2>

      <div className="blog__grid">
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            title={post.title}
            text={post.excerpt_plain}
            image={post.image}
            to={`/blog/${post.slug}`}
          />
        ))}

        <div className="blog__right">
          <p className="blog__right-text">
            У цьому розділі ми ділимося філософією бренду, історіями про
            гастрономічну спадщину та сучасні підходи до преміум-продуктів. Тут
            ви знайдете статті про традиції, інгредієнти, сезонні добірки та
            думки нашої команди про культуру смаку.
          </p>

          <Button
            to="/blog"
            className="blog__right-button"
            type="button"
            variant="dark"
            preset="dark-cta"
          >
            Перейти до Блогу
          </Button>
        </div>
      </div>
    </section>
  )
}

export default HomeBlog
