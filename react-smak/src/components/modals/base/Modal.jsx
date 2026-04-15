import './modal.css'

function Modal({
  isOpen,
  onClose,
  children,
  className = '',
  contentClassName = '',
}) {
  if (!isOpen) return null

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose?.()
    }
  }

  return (
    <div className={`modal-overlay ${className}`.trim()} onClick={handleOverlayClick}>
      <div className={`modal-shell ${contentClassName}`.trim()}>
        {children}
      </div>
    </div>
  )
}

export default Modal