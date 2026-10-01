import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="home-section" style={{ minHeight: '50vh' }}>
      <p className="eyebrow">Fejl 404</p>
      <h1>Siden findes ikke</h1>
      <p>Vi kunne desværre ikke finde den side, du leder efter. Måske er linket forkert, eller siden er flyttet.</p>
      <div className="hero__actions" style={{ justifyContent: 'center' }}>
        <Link to="/" className="btn">Til forsiden</Link>
        <Link to="/menu" className="btn btn--outline">Se menuen</Link>
      </div>
    </section>
  )
}
