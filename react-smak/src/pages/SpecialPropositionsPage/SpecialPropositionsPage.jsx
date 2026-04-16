import Breadcrumbs from '../../components/shared/breadcrumbs/Breadcrumbs'
import PageIntro from '../../components/shared/page-intro/PageIntro'

function SpecialPropositionsPage() {
  const breadcrumbs = [
    { label: 'Головна', href: '/' },
    { label: 'Весь Асортимент', href: '/assortment' },
    { label: 'Спеціальні пропозиції' },
  ]

  return (
    <section className="special-offers-page">
      <Breadcrumbs items={breadcrumbs} />

      <div className="container">
        <div className="special-offers-page__title-wrap">
          <PageIntro title="Спеціальні пропозиції" />
        </div>

        <div className="special-offers-page__content">
          <p className="special-offers-page__text">
            Для ваc поки немає спеціальних пропозицій
          </p>
        </div>
      </div>
    </section>
  )
}

export default SpecialPropositionsPage
