import Breadcrumbs from '../../components/shared/breadcrumbs/Breadcrumbs'
import RecipeGallery from '../../components/recipe-details/RecipeGallery'
import RecipeInfoCard from '../../components/recipe-details/RecipeInfoCard'
import RecipeFeaturedProduct from '../../components/recipe-details/RecipeFeaturedProduct'
import RecipeStepsSection from '../../components/recipe-details/RecipeStepsSection'
import '../../components/recipe-details/recipe-details.css'

function RecipePage() {
  const recipe = {
    title: 'Сендвіч з індичкою та карамелізованою цибулею',
    cookTime: '30 хвилин',
    portions: '2 порції',
    gallery: [
      '/assets/images/burger.png',
      '/assets/images/burger.png',
      '/assets/images/burger.png',
      '/assets/images/burger.png',
      '/assets/images/burger.png',
    ],
    featuredProduct: {
      label: 'Фірмовий продукт - Хліб «Полбяний на Заквасці»',
      buttonText: 'Перейти до Продукту',
      href: '/product/1',
    },
    ingredients: [
      { name: 'Хліб «Полбяний на Заквасці»', value: '4 скибки' },
      { name: 'Індичка', value: '300 г' },
      { name: 'Цибуля', value: '2 шт.' },
      { name: 'Вершкове масло', value: '1 ст. ложка' },
      { name: 'Оливкова олія', value: '1 ст. ложка' },
      { name: 'Зерниста гірчиця', value: '1 ч. ложка' },
      { name: 'Сир (грюєр або схожий)', value: '50 г' },
      { name: 'Зелень (шпинат/листя салату)', value: '20 г' },
      { name: 'Сіль, перець, чебрець', value: 'за смаком' },
    ],
    steps: [
      {
        id: 1,
        stepNumber: 1,
        title: 'Підсмажте курку.',
        text: 'Наріжте філе тонкими шматочками, посоліть і поперчіть. Розігрійте оливкову олію на пательні й обсмажте курку до золотистої скоринки з обох боків — приблизно 8–10 хвилин.',
        image: '/assets/images/burger.png',
      },
      {
        id: 2,
        stepNumber: 2,
        title: 'Карамелізуйте цибулю.',
        text: 'Поки курка готується, наріжте цибулю тонкими півкільцями. У невеликій пательні розтопіть вершкове масло, додайте цибулю та дрібку солі. Готуйте на середньому вогні 8–10 хвилин, поки вона не стане м’якою, солодкою й золотистою.',
        image: '/assets/images/burger.png',
      },
      {
        id: 3,
        stepNumber: 3,
        title: 'Зберіть сендвіч.',
        text: 'Візьміть дві скибки хліба. На нижню нанесіть трохи гірчиці, викладіть шар індички, зверху — карамелізовану цибулю та сир. Накрийте другою скибкою хліба.',
        image: '/assets/images/burger.png',
      },
      {
        id: 4,
        stepNumber: 4,
        title: 'Підсмажте сендвіч.',
        text: 'Розігрійте суху пательню або гриль-прес і обсмажте сендвіч по 2–3 хвилини з кожного боку, поки сир не розплавиться, а хліб не стане рум’яним і хрустким.',
        image: '/assets/images/burger.png',
      },
      {
        id: 5,
        stepNumber: 5,
        title: 'Подавайте.',
        text: 'Розріжте навпіл і подавайте гарячим. Ідеально смакує зі шпинатом/листям салату, кількома краплями оливкової олії або келихом білого вина.',
        image: '/assets/images/burger.png',
      },      
    ],
    bottomNote: 'Нехай смакує!',
  }

  return (
    <section className="recipe-page">
      <Breadcrumbs
        items={[
          { label: 'Головна', href: '/' },
          { label: 'Історії Смаку', href: '/stories' },
          { label: recipe.title },
        ]}
      />

      <div className="container recipe-page__container">
        <div className="recipe-page__top">
          <RecipeGallery images={recipe.gallery} title={recipe.title} />

          <RecipeInfoCard
            cookTime={recipe.cookTime}
            portions={recipe.portions}
            title={recipe.title}
            ingredients={recipe.ingredients}
          />
        </div>

        <RecipeFeaturedProduct
          label={recipe.featuredProduct.label}
          buttonText={recipe.featuredProduct.buttonText}
          href={recipe.featuredProduct.href}
        />

        <RecipeStepsSection
          title="Секрет приготування"
          steps={recipe.steps}
          bottomNote={recipe.bottomNote}
        />
      </div>
    </section>
  )
}

export default RecipePage