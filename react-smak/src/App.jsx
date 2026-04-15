import { useEffect } from 'react'
import { Routes, Route, useLocation, useParams } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage/AboutPage'
import AssortmentPage from './pages/AssortmentPage/AssortmentPage'
import CategoryPage from './pages/CategoryPage/CategoryPage'
import ProductPage from './pages/ProductPage/ProductPage'
import BlogPage from './pages/BlogPage/BlogPage'
import BlogDetailPage from './pages/BlogDetailPage/BlogDetailPage'
import TasteStoriesPage from './pages/TasteStoriesPage/TasteStoriesPage'
import StoryDetailPage from './pages/StoryDetailPage/StoryDetailPage'
import ContactsPage from './pages/ContactsPage/ContactsPage'
import LoyaltyProgramPage from './pages/LoyaltyProgramPage/LoyaltyProgramPage'
import AccountPage from './pages/AccountPage/AccountPage'
import OrdersPage from './pages/OrdersPage/OrdersPage'
import CheckoutPage from './pages/CheckoutPage/CheckoutPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage/PrivacyPolicyPage'
import PublicOfferPage from './pages/PublicOfferPage/PublicOfferPage'
import VacanciesPage from './pages/VacanciesPage/VacanciesPage'
import SpecialOffersPage from './pages/SpecialOffersPage/SpecialOffersPage'
import RecipePage from './pages/RecipePage/RecipePage'

function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/assortment" element={<AssortmentPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/product/:slug" element={<ProductRoute />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/stories" element={<TasteStoriesPage />} />
        <Route path="/stories/:slug" element={<StoryDetailPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/loyalty" element={<LoyaltyProgramPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/offer" element={<PublicOfferPage />} />
        <Route path="/vacancies" element={<VacanciesPage />} />
        <Route path="/discounts" element={<SpecialOffersPage />} />
        <Route path="/recipe/:slug" element={<RecipePage />} />

        {/* 404 — будь-який невідомий URL рендерить цю сторінку */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

function ProductRoute() {
  const { slug } = useParams()
  return <ProductPage productSlug={slug} />
}

// Мінімальна 404-сторінка прямо тут.
// Якщо захочеш — перенеси в окремий файл src/pages/NotFoundPage.jsx
function NotFoundPage() {
  return (
    <section style={{ padding: '80px 0', textAlign: 'center' }}>
      <div className="container">
        <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>404</h1>
        <p style={{ marginBottom: '32px' }}>Сторінку не знайдено</p>
        <a href="/" style={{ textDecoration: 'underline' }}>
          Повернутися на головну
        </a>
      </div>
    </section>
  )
}

export default App
