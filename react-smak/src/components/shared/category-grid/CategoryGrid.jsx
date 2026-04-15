import { Link } from 'react-router-dom'
import './category-grid.css'

function CategoryGrid({
  items = [],
  title,
  subtitle,
  showHeader = false,
  variant = 'page',
  className = '',
}) {
  return (
    <section className={`category-grid category-grid--${variant} ${className}`}>
      {showHeader && (
        <div className="category-grid__header">
          {title && <h2 className="category-grid__title">{title}</h2>}
          {subtitle && <p className="category-grid__subtitle">{subtitle}</p>}
        </div>
      )}

      <ul className="category-grid__list">
        {items.map((item) => (
          <li className="category-grid__item" key={item.id || item.slug || item.name}>
            <Link
              to={item.href || '/'}
              className="category-grid__card"
              style={{ backgroundImage: `url('${item.image}')` }}
            >
              <span className="category-grid__overlay" />
              <span className="category-grid__name">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default CategoryGrid