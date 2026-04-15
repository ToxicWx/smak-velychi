import './scroll-to-top.css'

function ScrollToTopButton() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="container scroll-to-top">
      <button
        type="button"
        className="scroll-to-top__button"
        onClick={handleScrollToTop}
        aria-label="Прокрутити вгору"
      >
        <img
          className="scroll-to-top__icon"
          src="/assets/icons/arrow-up.svg"
          alt=""
          aria-hidden="true"
        />
      </button>
    </div>
  )
}

export default ScrollToTopButton
