import CategoryGrid from '../../shared/category-grid/CategoryGrid'
import './assortment-catalog.css'

function AssortmentCatalog({ items }) {
  return (
    <section className="assortment-catalog">
      <CategoryGrid
        items={items}
        title="Швидко знайти Асортимент"
        showHeader={true}
        variant="page"
      />
    </section>
  )
}

export default AssortmentCatalog