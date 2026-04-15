import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import CategoryGrid from '../../shared/category-grid/CategoryGrid'
import { getCategories, getAssetUrl, searchProducts } from '../../../api/directus'
import { useAuth } from '../../../context/AuthContext'
import { useCart } from '../../../context/CartContext'
import { resolvePrice } from '../../../utils/price'
import './header.css'
import Button from '../../shared/button/Button'

const SEARCH_MIN_LENGTH = 2
const SEARCH_DEBOUNCE_MS = 300

const burgerColumns = [
  {
    title: 'Наші продукти',
    links: [
      { label: 'Асортимент', href: '/assortment', isAssortmentTrigger: true },
      { label: 'Акції', href: '/discounts' },
    ],
  },
  {
    title: 'Світ "Смаку Величі"',
    links: [
      { label: 'Головна', href: '/' },
      { label: 'Про "Смак Величі"', href: '/about' },
      { label: 'Дегустації', action: 'open-tastings' },
    ],
  },
  {
    title: 'Читати та Дивитись',
    links: [
      { label: 'Блог', href: '/blog' },
      { label: 'Історії Смаку', href: '/stories' },
    ],
  },
  {
    title: 'Центр Гостя',
    links: [
      { label: 'Акаунт', href: '/account' },
      { label: 'Програма лояльності', href: '/loyalty' },
      { label: 'Контакти', href: '/contacts' },
      { label: 'Вакансії', href: '/vacancies' },
    ],
  },
]

function Header({ onOpenCart, onOpenLogin, onOpenOrderTasting }) {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false)
  const [isAssortmentOpen, setIsAssortmentOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const searchRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  const { isAuthorized, user, logout } = useAuth()
  const { totalCount } = useCart()

  const isAnyMenuOpen = isBurgerOpen || isAssortmentOpen
  const isAccountPage = location.pathname === '/account'
  const trimmedSearchValue = searchValue.trim()
  const shouldShowSearchDropdown = searchDropdownOpen && trimmedSearchValue.length > 0
  const shouldShowSearchHint =
    trimmedSearchValue.length > 0 && trimmedSearchValue.length < SEARCH_MIN_LENGTH
  const shouldShowNoResults =
    trimmedSearchValue.length >= SEARCH_MIN_LENGTH &&
    !searchLoading &&
    searchResults.length === 0

  useEffect(() => {
    getCategories()
      .then((res) => {
        const items = (res.data || []).map((cat) => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          image: getAssetUrl(cat.image_file_id),
          href: `/category/${cat.slug}`,
        }))
        setCategories(items)
      })
      .catch((err) => console.error('Помилка завантаження категорій:', err))
  }, [])

  useEffect(() => {
    if (trimmedSearchValue.length < SEARCH_MIN_LENGTH) {
      setSearchResults([])
      setSearchLoading(false)
      return
    }

    setSearchLoading(true)

    const timeoutId = window.setTimeout(() => {
      searchProducts(trimmedSearchValue)
        .then((response) => {
          setSearchResults(response.data || [])
        })
        .catch((error) => {
          console.error('Помилка пошуку товарів:', error)
          setSearchResults([])
        })
        .finally(() => {
          setSearchLoading(false)
        })
    }, SEARCH_DEBOUNCE_MS)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [trimmedSearchValue])

  const closeAllMenus = () => {
    setIsBurgerOpen(false)
    setIsAssortmentOpen(false)
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeAllMenus()
        setSearchDropdownOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!searchRef.current?.contains(event.target)) {
        setSearchDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleDocumentClick)

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
    }
  }, [])

  useEffect(() => {
    closeAllMenus()
    setSearchDropdownOpen(false)
  }, [location.pathname])

  const handleBurgerClick = () => {
    if (isAnyMenuOpen) {
      closeAllMenus()
      return
    }
    setIsBurgerOpen(true)
  }

  const handleOpenAssortment = (event) => {
    event.preventDefault()
    setIsBurgerOpen(false)
    setIsAssortmentOpen(true)
  }

  const handleOpenTastings = () => {
    closeAllMenus()
    setSearchDropdownOpen(false)
    onOpenOrderTasting?.()
  }

  const handleClearSearch = () => {
    setSearchValue('')
    setSearchResults([])
    setSearchDropdownOpen(false)
    setSearchLoading(false)
  }

  const handleSearchFocus = () => {
    setSearchDropdownOpen(true)
  }

  const handleSearchResultClick = () => {
    setSearchDropdownOpen(false)
    setSearchValue('')
    setSearchResults([])
  }

  const handleAuthButtonClick = () => {
    if (isAuthorized) {
      if (!isAccountPage) {
        navigate('/account')
        closeAllMenus()
        setSearchDropdownOpen(false)
        return
      }

      logout()
      closeAllMenus()
      handleClearSearch()
      return
    }

    onOpenLogin?.()
  }

  return (
    <>
      <header className="header">
        <div className="container header__container">
          <div className="header__left">
            <button
              type="button"
              className="header__burger"
              aria-label="Відкрити меню"
              aria-expanded={isBurgerOpen}
              onClick={handleBurgerClick}
            >
              <img src="/assets/icons/burger-menu.svg" alt="" />
            </button>

            <div className="header__logo">
              <Link to="/" aria-label="Smak Velychi" onClick={closeAllMenus}>
                <img src="/assets/icons/logo-new.png" alt="Smak Velychi logo" />
              </Link>
            </div>
          </div>

          <div className="header__tools">
            <form
              ref={searchRef}
              className="header__search"
              onSubmit={(event) => event.preventDefault()}
            >
              <img
                src="/assets/icons/search-icon.svg"
                alt=""
                className="header__search-icon"
              />

              <input
                type="search"
                placeholder="Я шукаю..."
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                onFocus={handleSearchFocus}
              />

              <button
                className="header__search-clear"
                type="button"
                aria-label="Очистити"
                onClick={handleClearSearch}
              >
                <img src="/assets/icons/close-icon.svg" alt="" />
              </button>

              {shouldShowSearchDropdown && (
                <div className="header__search-dropdown">
                  {shouldShowSearchHint ? (
                    <p className="header__search-state">Введіть щонайменше 2 символи</p>
                  ) : null}

                  {searchLoading ? (
                    <p className="header__search-state">Шукаємо товари...</p>
                  ) : null}

                  {shouldShowNoResults ? (
                    <p className="header__search-state">Нічого не знайдено</p>
                  ) : null}

                  {!searchLoading && searchResults.length > 0 ? (
                    <div className="header__search-results">
                      {searchResults.map((product) => {
                        const { price, oldPrice } = resolvePrice(product)

                        return (
                          <Link
                            key={product.id}
                            to={`/product/${product.slug}`}
                            className="header__search-result"
                            onClick={handleSearchResultClick}
                          >
                            <img
                              src={getAssetUrl(product.og_image_file_id)}
                              alt={product.title}
                              className="header__search-result-image"
                            />

                            <div className="header__search-result-content">
                              <p className="header__search-result-title">{product.title}</p>

                              <div className="header__search-result-prices">
                                <span className="header__search-result-price">
                                  {price} грн
                                  {product.unit_label ? ` / ${product.unit_label}` : ''}
                                </span>

                                {oldPrice ? (
                                  <span className="header__search-result-old-price">
                                    {oldPrice} грн
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  ) : null}
                </div>
              )}
            </form>

            <div className="header__actions">
              <button type="button" className="header__cart" aria-label="Кошик" onClick={onOpenCart}>
                <img src="/assets/icons/cart-icon.svg" alt="" />
                {totalCount > 0 && (
                  <span className="header__cart-badge">{totalCount}</span>
                )}
              </button>

              <button
                type="button"
                className="header__login"
                onClick={handleAuthButtonClick}
              >
                <img src="/assets/icons/account-icon.svg" alt="" />
                {isAuthorized
                  ? isAccountPage
                    ? 'Вийти'
                    : user?.first_name || 'Акаунт'
                  : 'Увійти'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav
        className={`container header-menu header-menu--burger ${
          isBurgerOpen ? 'header-menu--open' : ''
        }`}
        aria-label="Головне меню"
      >
        <button
          type="button"
          className="header-menu__close"
          aria-label="Закрити меню"
          onClick={() => setIsBurgerOpen(false)}
        >
          <img src="/assets/icons/close-icon.svg" alt="" />
        </button>

        <div className="header-menu__columns">
          {burgerColumns.map((column) => (
            <section className="header-menu__column" key={column.title}>
              <h3 className="header-menu__title">{column.title}</h3>

              <ul className="header-menu__list">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.isAssortmentTrigger ? (
                      <a href={link.href} onClick={handleOpenAssortment}>
                        {link.label}
                      </a>
                    ) : link.action === 'open-tastings' ? (
                      <button
                        type="button"
                        className="header-menu__link-button"
                        onClick={handleOpenTastings}
                      >
                        {link.label}
                      </button>
                    ) : (
                      <NavLink to={link.href} onClick={closeAllMenus}>
                        {link.label}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </nav>

      <nav
        className={`container header-menu header-menu--assortment ${
          isAssortmentOpen ? 'header-menu--open' : ''
        }`}
        aria-label="Меню асортименту"
      >
        <button
          type="button"
          className="header-menu__close"
          aria-label="Закрити меню асортименту"
          onClick={() => setIsAssortmentOpen(false)}
        >
          <img src="/assets/icons/close-icon.svg" alt="" />
        </button>

        <CategoryGrid
          items={categories}
          title="Наші Продукти"
          subtitle="Асортимент"
          showHeader={true}
          variant="menu"
          className="header-menu__category-grid"
        />

        <div className="header-menu__footer">
          <Button
            to="/assortment"
            variant="outline"
            preset="menu-wide"
            onClick={closeAllMenus}
          >
            Переглянути весь Асортимент
          </Button>
        </div>
      </nav>

      <div
        className={`header-overlay ${isAnyMenuOpen ? 'header-overlay--visible' : ''}`}
        onClick={closeAllMenus}
        aria-hidden="true"
      />
    </>
  )
}

export default Header
