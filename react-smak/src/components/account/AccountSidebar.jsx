import Button from '../shared/button/Button'

function AccountSidebar({ onOrderClick, onRegisterClick }) {
  return (
    <>
      <div className="sidebar-widget">
        <h3 className="sidebar-widget__title">Розташування маркету</h3>
        <p className="sidebar-widget__text">ТРЦ &quot;Dream Town&quot;, м. Київ</p>
      </div>

      <div className="sidebar-widget">
        <h3 className="sidebar-widget__title">Дегустації</h3>

        <div className="tasting-block">
          <h4 className="tasting-block__title">Персональна Дегустація</h4>
          <p className="tasting-block__text">
            Щоб замовити дегустацію, заповніть форму нижче, і наш менеджер
            зв&apos;яжеться з вами, щоб узгодити деталі дегустації.
          </p>
          <Button
            type="button"
            variant="outline-dark"
            preset="outline-wide"
            onClick={onOrderClick}
          >
            Замовити Дегустацію
          </Button>
        </div>

        <div className="tasting-block">
          <h4 className="tasting-block__title">Відкриті Дегустації</h4>
          <p className="tasting-block__text">
            Заповніть форму нижче, щоб забронювати місце на дегустації.
          </p>
          <Button
            type="button"
            variant="outline-dark"
            preset="outline-wide"
            onClick={onRegisterClick}
          >
            Зареєструватись
          </Button>
        </div>
      </div>
    </>
  )
}

export default AccountSidebar
