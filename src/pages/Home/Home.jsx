import { Link } from 'react-router-dom'
import Hero from '../../components/Hero/Hero.jsx'
import Icon from '../../components/Icon/Icon.jsx'
import SignatureDishes from './SignatureDishes.jsx'
import headerBg from '../../assets/images/headerbg.png'
import restaurantDark from '../../assets/images/restaurant2.png'
import restaurant from '../../assets/images/restaurant.png'
import './Home.scss'

const facts = [
  { value: '12', label: 'Retter på menuen' },
  { value: '6', label: 'Års erfaring' },
  { value: '100', label: '% nordiske råvarer' },
]

export default function Home() {
  return (
    <>
      <Hero home eyebrow="Velkomst" title="Smag det nordiske" image={headerBg}>
        <p>
          Nordic Table er et sted, hvor sæsonens bedste råvarer forvandles til uforglemmelige
          oplevelser. Ro, kvalitet og hygge i hvert eneste måltid.
        </p>
        <div className="hero__actions">
          <Link to="/booking" className="btn">Book bord</Link>
          <Link to="/menu" className="btn btn--outline">Se menuen</Link>
        </div>
        <a href="#signaturretter" className="hero__scroll" aria-label="Gå til signaturretter">
          <Icon name="chevronDown" size={28} />
        </a>
      </Hero>

      <SignatureDishes />

      <section className="about" aria-labelledby="about-heading">
        <div className="about__inner">
          <img src={restaurant} alt="Restaurantens spisesal i varmt, dæmpet lys" loading="lazy" width="1536" height="1024" />
          <div>
            <p className="eyebrow">Om os</p>
            <h2 id="about-heading">En restaurant båret af nærhed og nærvær</h2>
            <hr />
            <p>
              Nordic Table er grundlagt med en klar overbevisning: god mad behøver ikke at være
              kompliceret. Vi laver mad af det, naturen giver os – det nordiske køkkens
              uforlignelige råvarer.
            </p>
            <p>
              Fra de friske fiskefarvande til skovens bær og urter – vores menu forandrer sig med
              årstidens rytme. Det giver gæsterne noget nyt at opdage, og det giver os glæden ved at
              lave mad med det bedste, vi kan få fat i.
            </p>

            <ul className="facts" aria-label="Nøgletal">
              {facts.map(({ value, label }) => (
                <li key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="teaser" style={{ backgroundImage: `url(${restaurantDark})` }} aria-labelledby="teaser-heading">
        <p className="eyebrow">Reservationer</p>
        <h2 id="teaser-heading">Book dit bord hos Nordic Table</h2>
        <p>
          Vi åbner vores døre for dig og dine, og giver jer en aften I aldrig glemmer.
          Book dit bord i dag – det er nemt og hurtigt.
        </p>
        <Link to="/booking" className="btn">Book bord nu</Link>
      </section>
    </>
  )
}
