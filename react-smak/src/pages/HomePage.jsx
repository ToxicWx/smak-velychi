import { useOutletContext } from 'react-router-dom'
import HomeHero from '../components/home/home-hero/HomeHero'
import HomeAbout from '../components/home/home-about/HomeAbout'
import HomeHalls from '../components/home/home-halls/HomeHalls'
import HomeAssortment from '../components/home/home-assortment/HomeAssortment'
import HomeTastings from '../components/home/home-tastings/HomeTastings'
import HomeStories from '../components/home/home-stories/HomeStories'
import HomeBlog from '../components/home/home-blog/HomeBlog'
import HomeLoyalty from '../components/home/home-loyalty/HomeLoyalty'

function HomePage() {
  const { openOrderTasting, openRegisterTasting, openLogin } = useOutletContext()

  return (
    <main>
      <HomeHero />
      <HomeAbout />
      <HomeHalls />
      <HomeAssortment />
      <HomeTastings
        onOrderClick={openOrderTasting}
        onRegisterClick={openRegisterTasting}
      />
      <HomeStories />
      <HomeBlog />
      <HomeLoyalty onRegisterClick={openLogin} />
    </main>
  )
}

export default HomePage
