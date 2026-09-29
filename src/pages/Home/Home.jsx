import { Link } from 'react-router-dom'
import Hero from '../../components/Hero/Hero.jsx'
import SignatureDishes from './SignatureDishes.jsx'
import headerBg from '../../assets/images/headerbg.png'
import restaurantDark from '../../assets/images/restaurant2.png'
import restaurant from '../../assets/images/restaurant.png'
import './Home.scss'

const facts = [
  { value: '12', label: 'Retter på menuen' },
  { value: '6', label: 'Års erfaring' },
  { value: '100%', label: 'Nordiske råvarer' },
]

export default function Home() {
  return (
    <>
      <Hero eyebrow="Nordisk køkken" title="Smag det nordiske" image={headerBg} imageDesktop={restaurantDark}>
        <p>
          Sæsonens bedste råvarer fra hav, mark og skov – tilberedt med ro,
          omhu og respekt for de nordiske traditioner.
        </p>
        <div className="hero__actions">
          <Link to="/booking" className="btn">Book bord</Link>
          <Link to="/menu" className="btn btn--outline">Se menu</Link>
        </div>
      </Hero>

      <SignatureDishes />

      <section className="home-section about" aria-labelledby="about-heading">
        <img src={restaurant} alt="Restaurantens spisesal i varmt, dæmpet lys" loading="lazy" width="1536" height="1024" />
        <div>
          <p className="eyebrow">Om os</p>
          <h2 id="about-heading">En restaurant bygget på ærlighed og råvarer</h2>
          <hr />
          <p>
            Nordic Table er skabt ud fra en enkel idé: gode råvarer, tid og ro omkring bordet.
            Vi arbejder tæt sammen med lokale fiskere, landmænd og sankere, og menuen skifter
            med årstiderne.
          </p>
          <p>
            Hos os skal du ikke skynde dig. Læn dig tilbage, nyd stemningen og lad køkkenet
            klare resten.
          </p>
        </div>
      </section>

      <section className="facts" aria-label="Nøgletal">
        <ul>
          {facts.map(({ value, label }) => (
            <li key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="teaser" style={{ backgroundImage: `url(${restaurantDark})` }} aria-labelledby="teaser-heading">
        <p className="eyebrow">Reservation</p>
        <h2 id="teaser-heading">Book dit bord hos Nordic Table</h2>
        <p>Reservér online på under et minut – til to eller til hele selskabet på op til 12 personer.</p>
        <Link to="/booking" className="btn">Book bord</Link>
      </section>
    </>
  )
}
