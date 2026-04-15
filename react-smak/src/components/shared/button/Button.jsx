import { Link } from 'react-router-dom'
import './button.css'

function Button({
  children,
  type = 'button',
  variant = 'primary',
  preset = 'auto',
  iconLeft = null,
  iconRight = null,
  disabled = false,
  fullWidth = false,
  className = '',
  onClick,
  href,
  to,
  target,
  rel,
}) {
  const classes = [
    'ui-button',
    `ui-button--${variant}`,
    `ui-button--${preset}`,
    fullWidth ? 'ui-button--full-width' : '',
    disabled ? 'ui-button--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {iconLeft && (
        <span className="ui-button__icon ui-button__icon--left">{iconLeft}</span>
      )}

      {children && <span className="ui-button__label">{children}</span>}

      {iconRight && (
        <span className="ui-button__icon ui-button__icon--right">{iconRight}</span>
      )}
    </>
  )

  if (to) {
    return (
      <Link
        className={classes}
        to={to}
        aria-disabled={disabled}
        onClick={disabled ? (event) => event.preventDefault() : onClick}
      >
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        target={target}
        rel={rel}
        aria-disabled={disabled}
        onClick={disabled ? (event) => event.preventDefault() : onClick}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  )
}

export default Button