import { Link } from 'react-router-dom'
import './breadcrumbs.css'

function Breadcrumbs({ items = [] }) {
  return (
    <nav className="breadcrumbs" aria-label="Хлібні крихти">
      <div className="container">
        <ul className="breadcrumbs__list">
          {items.map((item, index) => {
            const isLast = index === items.length - 1

            return (
              <li key={`${item.label}-${index}`} className="breadcrumbs__item">
                {item.href && !isLast ? (
                  <Link to={item.href} className="breadcrumbs__link">
                    {item.label}
                  </Link>
                ) : (
                  <span className="breadcrumbs__current">{item.label}</span>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Breadcrumbs