import Button from '../shared/button/Button'

function AccountPersonalCard({
  phone,
  firstName,
  lastName,
  email,
  onEdit,
}) {
  return (
    <section className="account-card">
      <h2 className="account-card__title">Персональні дані</h2>

      <ul className="account-card__list">
        <li>Номер телефона: {phone}</li>
        <li>Ім&apos;я: {firstName || ''}</li>
        <li>Прізвище: {lastName || ''}</li>
        <li>E-mail: {email}</li>
      </ul>

      <div className="account-card__action">
        <Button
          type="button"
          variant="light"
          preset="long"
          onClick={onEdit}
        >
          Редагувати дані
        </Button>
      </div>
    </section>
  )
}

export default AccountPersonalCard
