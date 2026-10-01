import { Link } from 'react-router-dom'
import logo from '../../assets/images/logoWhite.png'
import { openingHours, formatHours, contact, socials } from '../../data/info.js'
import Icon from '../Icon/Icon.jsx'
import './Footer.scss'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <section>
          <img src={logo} alt="Nordic Table" width="778" height="371" loading="lazy" />
          <p className="footer__about">
            Nordisk køkken med fokus på sæsonens råvarer, enkelhed og hygge. Velkommen til bordet.
          </p>
          <ul className="footer__socials">
            {socials.map(({ name, url }) => (
              <li key={name}>
                <a href={url} target="_blank" rel="noopener noreferrer" aria-label={name}>
                  <Icon name={name} size={36} />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Åbningstider</h2>
          <dl className="footer__hours">
            {openingHours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{formatHours(h)}</dd>
              </div>
            ))}
          </dl>
        </section>

        <nav aria-label="Hurtige links">
          <h2>Hurtige links</h2>
          <ul>
            <li><Link to="/booking">Book bord</Link></li>
            <li><Link to="/login">Personale</Link></li>
          </ul>
        </nav>

        <section>
          <h2>Kontakt os</h2>
          <ul className="footer__contact">
            <li><Icon name="address" size={20} filled />{contact.address}</li>
            <li>
              <Icon name="phone" size={20} filled />
              <a href={`tel:${contact.phone.replaceAll(' ', '')}`}>{contact.phone}</a>
            </li>
            <li>
              <Icon name="email" size={20} filled />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
          </ul>
        </section>
      </div>

      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} Nordic Table. Alle rettigheder forbeholdes</p>
        <p>Designet og udviklet med omhu</p>
      </div>
    </footer>
  )
}
