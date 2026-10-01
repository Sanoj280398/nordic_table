import { imageUrl } from '../../services/api.js'
import './DishCard.scss'

export const categoryLabels = {
  starter: 'Forret',
  main: 'Hovedret',
  dessert: 'Dessert',
}

// Kort til forsidens signaturretter
export default function DishCard({ dish }) {
  return (
    <article className="dish-card">
      <div className="dish-card__media">
        <img src={imageUrl(dish.image)} alt={dish.title} loading="lazy" width="500" height="333" />
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
