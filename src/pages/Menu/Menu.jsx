import { useEffect, useState } from 'react'
import Hero from '../../components/Hero/Hero.jsx'
import { api } from '../../services/api.js'
import headerBg from '../../assets/images/headerbg.png'
import appetizers from '../../assets/images/appetizers.png'
import mainCourses from '../../assets/images/mainCourses.png'
import desserts from '../../assets/images/desserts.png'
import './Menu.scss'

// Rækkefølgen her bestemmer rækkefølgen på siden
const categories = [
  { key: 'starter', title: 'Forretter', image: appetizers },
  { key: 'main', title: 'Hovedretter', image: mainCourses },
  { key: 'dessert', title: 'Desserter', image: desserts },
]

export default function Menu() {
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Skråstreg til sidst: API'ets statiske /dishes-mappe omdirigerer ellers
    api('/dishes/')
      .then((res) => setDishes(res.data))
      .catch(() => setError('Vi kunne ikke hente menuen lige nu. Prøv igen senere.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Hero small eyebrow="Vores menu" title="Smagsoplevelser fra det nordiske køkken" image={headerBg}>
        <p>
          Alt på vores menu er tilberedt af sæsonens friskeste råvarer. Vi arbejder tæt med
          lokale producenter for at sikre den bedste kvalitet.
        </p>
      </Hero>

      <div className="menu">
        <div className="menu__inner">
        {loading && <p role="status">Henter menuen…</p>}
        {error && <p role="alert" className="error">{error}</p>}
        {!loading && !error && dishes.length === 0 && <p>Der er ingen retter på menuen endnu.</p>}

        {categories.map(({ key, title, image }) => {
          const items = dishes.filter((dish) => dish.category === key)
          if (items.length === 0) return null

          return (
            <section key={key} className="menu__category" aria-labelledby={`cat-${key}`}>
              <header className="menu__heading">
                <img src={image} alt="" width="1536" height="1024" loading="lazy" />
                <h2 id={`cat-${key}`}>{title}</h2>
              </header>

              <ul className="menu__list">
                {items.map((dish) => (
                  <li key={dish._id} className="menu__item">
                    <h3>{dish.title}</h3>
                    <div className="menu__row">
                      <p className="menu__desc">{dish.description}</p>
                      <p className="menu__price">{dish.price} kr.</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
        </div>
      </div>
    </>
  )
}
