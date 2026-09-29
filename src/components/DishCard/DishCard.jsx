import './DishCard.scss'

export const categoryLabels = {
  starter: 'Forret',
  main: 'Hovedret',
  dessert: 'Dessert',
}

// Genbruges på forsiden (signaturretter) og menu-siden
export default function DishCard({ dish }) {
  return (
    <article className="dish-card">
      <div className="dish-card__media">
        <img src={dish.image} alt={dish.title} loading="lazy" width="500" height="333" />
        {dish.isSignature && <span className="dish-card__badge">Signatur</span>}
      </div>
      <div className="dish-card__body">
        <p className="eyebrow">{categoryLabels[dish.category]}</p>
        <h3>{dish.title}</h3>
        <p className="dish-card__desc">{dish.description}</p>
        <p className="dish-card__price">{dish.price} kr.</p>
      </div>
    </article>
  )
}
