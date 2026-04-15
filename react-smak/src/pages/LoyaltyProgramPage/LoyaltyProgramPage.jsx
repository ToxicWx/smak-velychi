import { useEffect, useState } from 'react'
import Breadcrumbs from '../../components/shared/breadcrumbs/Breadcrumbs'
import LoyaltyLevelCard from '../../components/loyalty/LoyaltyLevelCard'
import { getLoyaltyLevels } from '../../api/directus'
import { normalizeLoyaltyLevels } from '../../data/loyaltyLevels'
import '../../components/loyalty/loyalty.css'

function LoyaltyProgramPage() {
  const [levels, setLevels] = useState(normalizeLoyaltyLevels())

  useEffect(() => {
    getLoyaltyLevels()
      .then((response) => {
        setLevels(normalizeLoyaltyLevels(response.data || []))
      })
      .catch((error) => {
        console.error('Помилка завантаження програми лояльності:', error)
        setLevels(normalizeLoyaltyLevels())
      })
  }, [])

  return (
    <section className="loyalty-page">
      <Breadcrumbs
        items={[
          { label: 'Головна', href: '/' },
          { label: 'Програма Лояльності' },
        ]}
      />

      <div className="container">
        <h1 className="loyalty-page__title">Програма Лояльності</h1>

        <div className="loyalty-page__grid">
          {levels.map((level) => (
            <LoyaltyLevelCard
              key={level.slug || level.id}
              title={level.title}
              image={level.image}
              howToGet={level.howToGet}
              bonuses={level.bonuses}
              showPreviousLevelNote={level.showPreviousLevelNote}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default LoyaltyProgramPage
