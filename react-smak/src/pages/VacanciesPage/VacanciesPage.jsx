import Breadcrumbs from '../../components/shared/breadcrumbs/Breadcrumbs'
import PageIntro from '../../components/shared/page-intro/PageIntro'
import '../../styles/info-pages.css'

function VacanciesPage() {
  const breadcrumbs = [
    { label: 'Головна', href: '/' },
    { label: 'Вакансії' },
  ]

  return (
    <section className="info-page">
      <Breadcrumbs items={breadcrumbs} />

      <div className="container info-page__container">
        <div className="info-page__title-wrap">
          <PageIntro title="Вакансії" />
        </div>

        <div className="info-page__content info-page__content--vacancies">
          <div className="info-page__vacancy-text">
            <section className="info-page__block">
              <h2 className="info-page__heading">Кого шукаємо</h2>
              <p>
                Адміністратора торговельного залу, директора, продавець-консультанта,
                касира, товарознавця, вантажника, прибиральника, охоронця.
              </p>
            </section>

            <section className="info-page__block">
              <h2 className="info-page__heading">Категорії кандидатів</h2>
              <ul className="info-page__vacancy-list info-page__vacancy-list--dash">
                <li>фахівці з досвідом у торгівлі / сервісі;</li>
                <li>студенти (гнучкий графік, часткова зайнятість);</li>
                <li>ветерани та ветеранки;</li>
                <li>люди пенсійного віку;</li>
                <li>кандидати з інклюзією (робочі місця, адаптовані до можливостей людини).</li>
              </ul>

              <h3 className="info-page__subheading">Базові вимоги:</h3>
              <ul className="info-page__vacancy-list">
                <li>відповідальність, ввічливість, орієнтація на сервіс, охайний вигляд, комунікабельність;</li>
                <li>відсутність грубих порушень трудової дисципліни та шкідливих звичок, що заважають роботі;</li>
                <li>для керівних позицій — досвід управління персоналом, базові навички роботи з товаром та касовою технікою.</li>
              </ul>
            </section>

            <section className="info-page__block">
              <h2 className="info-page__heading">Ми пропонуємо</h2>
              <ul className="info-page__vacancy-list info-page__vacancy-list--dash">
                <li>Офіційне працевлаштування;</li>
                <li>Гідну заробітну плату; річну премію.</li>
                <li>Соціальний пакет.</li>
                <li>Гнучкий графік.</li>
                <li>Навчання та розвиток.</li>
                <li>Дружній колектив.</li>
                <li>Участь у розвитку унікального концепту магазину «Смак Величі».</li>
              </ul>
            </section>

            <section className="info-page__block">
              <h2 className="info-page__heading">Маєте запитання?</h2>
              <p>
                З радістю відповімо та підкажемо деталі щодо відкритих позицій.
                <br />
                Телефонуйте: +38 (066) 666-66-66
              </p>
            </section>

            <section className="info-page__block">
              <h2 className="info-page__heading">Хочете надіслати резюме?</h2>
              <p>
                Надішліть його на адресу: smakvelychi@gmail.com
                <br />
                У темі листа вкажіть назву посади.
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VacanciesPage