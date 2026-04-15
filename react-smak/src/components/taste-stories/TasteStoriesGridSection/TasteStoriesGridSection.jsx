import TasteStoryGridCard from '../TasteStoryGridCard/TasteStoryGridCard'
import './taste-stories-grid-section.css'

function TasteStoriesGridSection({ title, items = [] }) {
  return (
    <section className="taste-stories-grid-section">
      <h2 className="taste-stories-grid-section__title">{title}</h2>

      <div className="taste-stories-grid-section__grid">
        {items.map((item) => (
          <TasteStoryGridCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  )
}

export default TasteStoriesGridSection