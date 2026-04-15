import { useEffect, useState } from 'react'
import Breadcrumbs from '../../components/shared/breadcrumbs/Breadcrumbs'
import PageIntro from '../../components/shared/page-intro/PageIntro'
import BlogCard from '../../components/shared/blog-card/BlogCard'
import { BLOG_EXCLUDED_CATEGORY_SLUGS, getPosts } from '../../api/directus'
import './blog-page.css'

function BlogPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isCancelled = false

    getPosts({ excludeCategorySlugs: BLOG_EXCLUDED_CATEGORY_SLUGS })
      .then((response) => {
        if (!isCancelled) {
          setPosts(response.data || [])
        }
      })
      .catch((error) => {
        console.error('Помилка завантаження блогу:', error)
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

  const breadcrumbs = [
    { label: 'Головна', href: '/' },
    { label: 'Блог' },
  ]

  return (
    <section className="blog-page">
      <Breadcrumbs items={breadcrumbs} />

      <div className="container">
        <div className="blog-page__title-wrap">
          <PageIntro title="Блог" />
        </div>

        {loading ? (
          <p>Завантаження...</p>
        ) : posts.length > 0 ? (
          <div className="blog-page__grid">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                text={post.excerpt_plain}
                image={post.image}
                to={`/blog/${post.slug}`}
              />
            ))}
          </div>
        ) : (
          <p>У Directus поки немає опублікованих матеріалів для блогу.</p>
        )}
      </div>
    </section>
  )
}

export default BlogPage
