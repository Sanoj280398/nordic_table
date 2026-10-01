import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../services/api.js'
import DishCard from '../../components/DishCard/DishCard.jsx'

export default function SignatureDishes() {
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Skråstreg til sidst: API'ets statiske /dishes-mappe omdirigerer ellers
    api('/dishes/?signature=true')
      .then((res) => setDishes(res.data.slice(0, 3)))
      .catch(() => setError('Vi kunne ikke hente vores signaturretter lige nu. Prøv igen senere.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="signaturretter" className="home-section" aria-labelledby="signature-heading">
      <p className="eyebrow">Udvalgte retter</p>
      <h2 id="signature-heading">Vores signaturretter</h2>
      <p className="home-section__lead">
        Hver af vores signaturretter er omhyggeligt sammensat af sæsonens bedste nordiske råvarer.
      </p>

      {loading && <p role="status">Henter retter…</p>}
      {error && <p role="alert" className="error">{error}</p>}
      {!loading && !error && dishes.length === 0 && <p>Ingen signaturretter lige nu.</p>}

      {dishes.length > 0 && (
        <div className="dish-grid">
          {dishes.map((dish) => <DishCard key={dish._id} dish={dish} />)}
        </div>
      )}

      <Link to="/menu" className="btn btn--outline">Se hele menuen</Link>
    </section>
  )
}
