import Breadcrumbs from '../../components/shared/breadcrumbs/Breadcrumbs'
import PageIntro from '../../components/shared/page-intro/PageIntro'
import '../../styles/info-pages.css'
import './contacts-page.css'

function ContactsPage() {
  const breadcrumbs = [
    { label: 'Головна', href: '/' },
    { label: 'Контакти' },
  ]

  return (
    <section className="info-page contacts-page">
      <Breadcrumbs items={breadcrumbs} />

      <div className="container info-page__container">
        <div className="info-page__title-wrap">
          <PageIntro title="Контакти" />
        </div>

        <div className="contacts-page__content">
          <div className="contacts-page__top">
            <div className="contacts-page__item">
              <h2 className="contacts-page__label">Контактний телефон</h2>
              <p className="contacts-page__value">+38 (066) 666-66-66</p>
            </div>

            <div className="contacts-page__item">
              <h2 className="contacts-page__label">Електронна пошта</h2>
              <p className="contacts-page__value">smakvelychi@gmail.com</p>
            </div>

            <div className="contacts-page__item">
              <h2 className="contacts-page__label">Розташування маркету</h2>
              <p className="contacts-page__value">
                ТРЦ “Dream Town”, м. Київ
                <br />
                Оболонський проспект, 1Б
              </p>
            </div>
          </div>

          <div className="contacts-page__map-wrap">
            <iframe
              className="contacts-page__map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2537.4270468492505!2d30.495784276831866!3d50.507620483245276!2m3!1f0!2f0!3f0!2m3!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4d2121e5954cb%3A0x5ec6de7d562f1af6!2z0J7QsdC-0LvQvtC90YHRjNC60LjQuSDQv9GA0L7RgdC_0LXQutGCLCAx0JEsINCa0LjRl9CyLCAwNDIwNQ!5e0!3m2!1suk!2sua!4v1774390026636!5m2!1suk!2sua"
              width="900"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Мапа розташування маркету Смак Величі"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactsPage