import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ArticleDetailTemplate from '../../components/shared/article-detail/ArticleDetailTemplate'
import { BLOG_EXCLUDED_CATEGORY_SLUGS, getPostBySlug } from '../../api/directus'

function BlogDetailPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isCancelled = false

    if (!slug) {
      setLoading(false)
      return undefined
    }

    getPostBySlug(slug, { excludeCategorySlugs: BLOG_EXCLUDED_CATEGORY_SLUGS })
      .then((response) => {
        if (!isCancelled) {
          setPost(response.data?.[0] || null)
        }
      })
      .catch((error) => {
        console.error('Помилка завантаження статті:', error)
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

  if (loading) {
    return <ArticleDetailTemplate title="Завантаження..." showBackButton={false} />
  }

  if (!post) {
    return (
      <ArticleDetailTemplate
        breadcrumbs={[
          { label: 'Головна', href: '/' },
          { label: 'Блог', href: '/blog' },
          { label: 'Статтю не знайдено' },
        ]}
        title="Статтю не знайдено"
        lead="Перевірте slug у Directus або додайте опублікований матеріал."
        backButtonLabel="Перейти до Блогу"
        backButtonHref="/blog"
      />
    )
  }

  return (
    <ArticleDetailTemplate
      breadcrumbs={[
        { label: 'Головна', href: '/' },
        { label: 'Блог', href: '/blog' },
        { label: post.title },
      ]}
      title={post.title}
      lead={post.excerpt_plain}
      heroImage={post.image}
      htmlContent={post.content || ''}
      backButtonLabel="Перейти до Блогу"
      backButtonHref="/blog"
    />
  )
}

export default BlogDetailPage
