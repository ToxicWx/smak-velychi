import { useState } from 'react'
import Breadcrumbs from '../../components/shared/breadcrumbs/Breadcrumbs'
import OrderTastingModal from '../../components/modals/tasting/OrderTastingModal'
import RegisterTastingModal from '../../components/modals/tasting/RegisterTastingModal'

import AboutHero from '../../components/about/about-hero/AboutHero'
import AboutLocation from '../../components/about/about-location/AboutLocation'
import AboutPhilosophy from '../../components/about/about-philosophy/AboutPhilosophy'
import AboutTasteHalls from '../../components/about/about-taste-halls/AboutTasteHalls'
import AboutTastingInfo from '../../components/about/about-tasting-info/AboutTastingInfo'
import AboutOpenTastings from '../../components/about/about-open-tastings/AboutOpenTastings'
import AboutGallery from '../../components/about/about-gallery/AboutGallery'
import AboutBlogLinks from '../../components/about/about-blog-links/AboutBlogLinks'

import {
  aboutHeroData,
  aboutLocationData,
  aboutPhilosophyData,
  aboutTasteHallsData,
  aboutTastingInfoData,
  aboutOpenTastingsData,
  aboutGalleryData,
  aboutBlogLinksData,
} from '../../data/aboutPageData'

import './about-page.css'

function AboutPage() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  const breadcrumbs = [
    { label: 'Головна', href: '/' },
    { label: 'Про “Смак Величі”' },
  ]

  return (
    <section className="about-page">
      <Breadcrumbs items={breadcrumbs} />

      <div className="container about-page__container">
        <AboutHero data={aboutHeroData} />
        <AboutLocation data={aboutLocationData} />
        <AboutPhilosophy data={aboutPhilosophyData} />
        <AboutTasteHalls data={aboutTasteHallsData} />
        <AboutTastingInfo
          data={aboutTastingInfoData}
          onOrderClick={() => setIsOrderModalOpen(true)}
        />
        <AboutOpenTastings
          data={aboutOpenTastingsData}
          onRegisterClick={() => setIsRegisterModalOpen(true)}
        />
        <AboutGallery data={aboutGalleryData} />
        <AboutBlogLinks data={aboutBlogLinksData} />
      </div>

      <OrderTastingModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />

      <RegisterTastingModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </section>
  )
}

export default AboutPage