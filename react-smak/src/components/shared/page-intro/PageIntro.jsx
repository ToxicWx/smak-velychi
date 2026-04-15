import './page-intro.css'

function PageIntro({ title, align = 'center' }) {
  return (
    <section className={`page-intro page-intro--${align}`}>
      <h1 className="page-intro__title">{title}</h1>
    </section>
  )
}

export default PageIntro