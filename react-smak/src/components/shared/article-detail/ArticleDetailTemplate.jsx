import { Link } from 'react-router-dom'
import Breadcrumbs from '../../shared/breadcrumbs//Breadcrumbs'
import RichText from '../rich-text/RichText'
import Button from '../button/Button'
import './article-detail-template.css'

function ArticleDetailTemplate({
  breadcrumbs = [],
  title,
  lead,
  heroImage,
  htmlContent = '',
  sections = [],
  finalSection = null,
  backButtonLabel = 'Назад',
  showBackButton = true,
  onBackClick,
  backButtonHref = null,
}) {
  const backButtonNode = (
    <Button
      variant="outline-dark"
      className="article-detail__back-button"
      type="button"
      onClick={onBackClick}
    >
      {backButtonLabel}
    </Button>
  )

  return (
    <section className="article-detail">
      <Breadcrumbs items={breadcrumbs} />

      <div className="container article-detail__container">
        <div className="article-detail__intro-wrap">
          <header className="article-detail__intro">
            <h1 className="article-detail__title">{title}</h1>
            {lead ? <p className="article-detail__lead">{lead}</p> : null}
          </header>
        </div>

        {heroImage ? (
          <div className="article-detail__media-wrap">
            <div className="article-detail__image-wrap">
              <img src={heroImage} alt={title} className="article-detail__image" />
            </div>
          </div>
        ) : null}

        <div className="article-detail__body-wrap">
          <article className="article-detail__content">
            {htmlContent ? (
              <RichText html={htmlContent} />
            ) : (
              <>
                {sections.map((section) => (
                  <section className="article-detail__section" key={section.title}>
                    <h2 className="article-detail__section-title">{section.title}</h2>

                    {section.paragraphs?.[0] ? <p>{section.paragraphs[0]}</p> : null}

                    {section.list?.length ? (
                      <ul className="article-detail__list">
                        {section.list.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}

                    {section.paragraphs?.slice(1).map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}

                    {section.image ? (
                      <div className="article-detail__inline-image-wrap">
                        <img
                          src={section.image}
                          alt={section.title}
                          className="article-detail__inline-image"
                        />
                      </div>
                    ) : null}
                  </section>
                ))}

                {finalSection ? (
                  <section className="article-detail__last-section">
                    <div className="article-detail__last-text">
                      <h2 className="article-detail__section-title">
                        {finalSection.title}
                      </h2>

                      {finalSection.paragraphs?.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ) : null}
              </>
            )}
          </article>
        </div>

        {showBackButton ? (
          <div className="article-detail__footer-action">
            {backButtonHref ? (
              <Link to={backButtonHref} className="article-detail__back-button-link">
                {backButtonNode}
              </Link>
            ) : (
              backButtonNode
            )}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default ArticleDetailTemplate
