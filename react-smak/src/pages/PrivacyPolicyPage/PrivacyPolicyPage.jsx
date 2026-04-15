import Breadcrumbs from '../../components/shared/breadcrumbs/Breadcrumbs'
import PageIntro from '../../components/shared/page-intro/PageIntro'
import '../../styles/info-pages.css'

function PrivacyPolicyPage() {
  const breadcrumbs = [
    { label: 'Головна', href: '/' },
    { label: 'Політика конфіденційності' },
  ]

  return (
    <section className="info-page">
      <Breadcrumbs items={breadcrumbs} />

      <div className="container info-page__container">
        <div className="info-page__title-wrap">
          <PageIntro title="Політика конфіденційності" />
        </div>

        <div className="info-page__content info-page__content--legal">
          <div className="info-page__meta">
            <p>
              <strong>ТОВ «Смак Величі Маркет»</strong>
              <br />
              Останнє оновлення: 28.11.2025
              <br />
               Ця Політика конфіденційності визначає, як ТОВ «Смак Величі»
              (далі — «Компанія», «Ми») збирає, використовує, зберігає та
              захищає персональні дані користувачів сайту smakvelychi.ua
              (далі — «Сайт»).
            </p>

          </div>

          <div className="info-page__legal-note">
            <p className="info-page__lead-note">
              Користуючись нашим Сайтом, Ви погоджуєтеся з умовами цієї Політики.
            </p>
          </div>

          <section className="info-page__legal-section">
            <h2 className="info-page__heading">1. Які дані ми збираємо</h2>
            <div className="info-page__legal-text">1.1. Надані користувачами дані</div>
            <ul className="info-page__legal-list">
              <li>ім’я;</li>
              <li>номер телефону;</li>
              <li>електронна пошта;</li>
              <li>адреса доставки;</li>
              <li>дані, необхідні для реєстрації або входу в акаунт.</li>
            </ul>

            <div className="info-page__legal-text">1.2. Автоматично зібрані дані</div>
            <ul className="info-page__legal-list">
              <li>файли cookies;</li>
              <li>IP-адреса;</li>
              <li>інформація про пристрій, браузер;</li>
              <li>статистика відвідувань (через Google Analytics та аналогічні сервіси).</li>
            </ul>

            <div className="info-page__legal-text">1.3. Дані про замовлення</div>
            <ul className="info-page__legal-list">
              <li>список замовлень;</li>
              <li>інформація про оплату (без зберігання платіжних карт).</li>
            </ul>
          </section>

          <section className="info-page__legal-section">
            <h2 className="info-page__heading">2. Як ми використовуємо дані</h2>
            <div className="info-page__legal-text">
              Персональні дані використовуються з метою:
            </div>
            <ul className="info-page__legal-list">
              <li>створення та підтримки Вашого акаунту;</li>
              <li>оформлення й обробки замовлень;</li>
              <li>комунікації щодо покупок, акцій та подій;</li>
              <li>роботи програми лояльності;</li>
              <li>покращення роботи Сайту й обслуговування клієнтів;</li>
              <li>забезпечення безпеки та запобігання шахрайству.</li>
            </ul>
          </section>

          <section className="info-page__legal-section">
            <h2 className="info-page__heading">3. Передача даних третім сторонам</h2>
            <div className="info-page__legal-text">
              Ми можемо передавати дані виключно таким категоріям партнерів:
            </div>
            <ul className="info-page__legal-list">
              <li>служби доставки (Нова Пошта, Укрпошта, Meest, Glovo, Bolt Food);</li>
              <li>платіжні сервіси (LiqPay, Apple Pay, Google Pay, PayPal);</li>
              <li>SMS- / email сервіси;</li>
              <li>системи аналітики.</li>
            </ul>
            <div className="info-page__legal-text">
              Компанія ніколи не продає та не передає дані стороннім особам, не
              пов’язаним з обслуговуванням клієнтів.
            </div>
          </section>

          <section className="info-page__legal-section">
            <h2 className="info-page__heading">4. Використання cookies</h2>
            <div className="info-page__legal-text">
              Cookies застосовуються для:
            </div>
            <ul className="info-page__legal-list">
              <li>персоналізації контенту;</li>
              <li>збереження налаштувань користувача;</li>
              <li>роботи функцій входу;</li>
              <li>аналітики відвідувань.</li>
            </ul>
            <div className="info-page__legal-text">
              Ви можете вимкнути cookies у налаштуваннях браузера, але це може
              вплинути на роботу Сайту.
            </div>
          </section>

          <section className="info-page__legal-section">
            <h2 className="info-page__heading">5. Зберігання даних</h2>
            <div className="info-page__legal-text">
              Ми зберігаємо персональні дані протягом всього періоду співпраці та
              відповідно до законодавчих вимог.
            </div>
          </section>

          <section className="info-page__legal-section">
            <h2 className="info-page__heading">6. Захист персональних даних</h2>
            <div className="info-page__legal-text">
              ТОВ «Смак Величі Маркет» використовує:
            </div>
            <ul className="info-page__legal-list">
              <li>шифрування даних;</li>
              <li>захищені протоколи передачі;</li>
              <li>контроль доступу до баз даних;</li>
              <li>системи моніторингу безпеки.</li>
            </ul>
          </section>

          <section className="info-page__legal-section">
            <h2 className="info-page__heading">7. Права користувача</h2>
            <div className="info-page__legal-text">Користувач має право:</div>
            <ul className="info-page__legal-list">
              <li>отримати копію своїх персональних даних;</li>
              <li>оновити або змінити інформацію;</li>
              <li>вимагати видалення персональних даних;</li>
              <li>відкликати згоду на обробку.</li>
            </ul>
            <div className="info-page__legal-text">
              Звернення приймаються на email: support@smakvelychi.ua
            </div>
          </section>

          <section className="info-page__legal-section">
            <h2 className="info-page__heading">8. Зміни Політики</h2>
            <div className="info-page__legal-text">
              Компанія може оновлювати Політику. Нова версія публікується на цій
              сторінці.
            </div>
          </section>

          <section className="info-page__legal-section">
            <h2 className="info-page__heading">9. Контакти</h2>
            <div className="info-page__legal-text">
              ТОВ «Смак Величі Маркет»
              <br />
              ЄДРПОУ: 44900128
              <br />
              Юридична адреса: м. Київ, Оболонський проспект, 1Б
              <br />
              Email: smakvelychi@gmail.com
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

export default PrivacyPolicyPage