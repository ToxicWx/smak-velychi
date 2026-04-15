import { useEffect, useState } from 'react'
import { useOutletContext, Navigate } from 'react-router-dom'
import Breadcrumbs from '../../components/shared/breadcrumbs/Breadcrumbs'
import AccountPersonalCard from '../../components/account/AccountPersonalCard'
import AccountLoyaltyCard from '../../components/account/AccountLoyaltyCard'
import AccountOrdersSection from '../../components/account/AccountOrdersSection'
import AccountSidebar from '../../components/account/AccountSidebar'
import EditPersonalDataModal from '../../components/modals/profile/EditPersonalDataModal'
import { useAuth } from '../../context/AuthContext'
import { getLoyaltyLevels, getUserOrders, getUserProfile } from '../../api/directus'
import { buildUserLoyaltySummary, normalizeLoyaltyLevels } from '../../data/loyaltyLevels'
import '../../components/account/account.css'

function AccountPage() {
  const { openOrderTasting, openRegisterTasting } = useOutletContext()
  const { user, isAuthorized, updateUser } = useAuth()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [orders, setOrders] = useState([])
  const [loyaltyLevels, setLoyaltyLevels] = useState(normalizeLoyaltyLevels())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getLoyaltyLevels()
      .then((response) => {
        setLoyaltyLevels(normalizeLoyaltyLevels(response.data || []))
      })
      .catch((error) => {
        console.error('Помилка завантаження рівнів лояльності:', error)
        setLoyaltyLevels(normalizeLoyaltyLevels())
      })
  }, [])

  useEffect(() => {
    let isCancelled = false

    if (!isAuthorized || !user?.id) {
      setLoading(false)
      return undefined
    }

    const loadAccountData = async () => {
      try {
        setLoading(true)
        const [profile, nextOrders] = await Promise.all([
          getUserProfile(user.id),
          getUserOrders(user.id),
        ])

        if (isCancelled) return

        updateUser(profile)
        setOrders(nextOrders)
      } catch (error) {
        console.error('Помилка завантаження акаунта:', error)
      } finally {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    }

    loadAccountData()

    return () => {
      isCancelled = true
    }
  }, [isAuthorized, updateUser, user?.id])

  if (!isAuthorized || !user) {
    return <Navigate to="/" replace />
  }

  const firstName = user.first_name || user.firstName || ''
  const lastName = user.last_name || user.lastName || ''
  const email = user.email || ''
  const phone = user.phone || ''
  const loyaltySummary = buildUserLoyaltySummary(user, loyaltyLevels)
  const hasProfileName = Boolean(firstName && lastName)
  const greeting = hasProfileName
    ? `Вітаємо, ${firstName}!`
    : `Вітаємо, ${phone}!`

  return (
    <section className="account-page">
      <Breadcrumbs
        items={[
          { label: 'Головна', href: '/' },
          { label: 'Особистий кабінет' },
        ]}
      />

      <div className="container">
        <div className="account-page__header">
          <h1 className="account-page__title">{greeting}</h1>
        </div>

        <div className="account-page__layout">
          <div className="account-page__content">
            <div className="account-page__cards-grid">
              <AccountPersonalCard
                phone={phone}
                firstName={firstName}
                lastName={lastName}
                email={email}
                onEdit={() => setIsEditOpen(true)}
              />

              <AccountLoyaltyCard
                hasLoyaltyStatus={loyaltySummary.hasLoyaltyStatus}
                status={loyaltySummary.loyaltyStatus}
                nextLevelAmount={loyaltySummary.nextLevelAmount}
                progressWidth={loyaltySummary.progressWidth}
                levels={loyaltySummary.levels}
                activeLevelSlugs={loyaltySummary.activeLevelSlugs}
              />
            </div>

            <AccountOrdersSection orders={loading ? [] : orders.slice(0, 3)} />
          </div>

          <aside className="account-page__sidebar">
            <AccountSidebar
              onOrderClick={openOrderTasting}
              onRegisterClick={openRegisterTasting}
            />
          </aside>
        </div>
      </div>

      <EditPersonalDataModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        initialData={{ phone, firstName, lastName, email }}
      />
    </section>
  )
}

export default AccountPage
