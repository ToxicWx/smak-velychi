import Button from '../../shared/button/Button'

function CartAuthState({ onOpenLogin }) {
  return (
    <div className="cart-modal__state">
      <div className="cart-modal__state-message">
        <p className="cart-modal__state-text">
          Виконайте вхід в акаунт, щоб
          <br />
          додати товар до кошику.
        </p>
      </div>

      {onOpenLogin && (
        <Button
          type="button"
          variant="light"
          preset="cart-wide"
          onClick={onOpenLogin}
        >
          Увійти
        </Button>
      )}
    </div>
  )
}

export default CartAuthState
