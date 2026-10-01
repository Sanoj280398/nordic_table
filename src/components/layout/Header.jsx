import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logoDark from '../../assets/images/logoBlack.png'
import logoLight from '../../assets/images/logoWhite.png'
import './Header.scss'

// Er man allerede logget ind, sender /login videre til backoffice
const links = [
  { to: '/', label: 'Forside' },
  { to: '/menu', label: 'Menu' },
  { to: '/booking', label: 'Bestil bord' },
  { to: '/login', label: 'Log ind' },
]

export default function Header({ variant = 'solid' }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className={`header header--${variant} ${open ? 'is-open' : ''}`}>
      <Link to="/" className="header__logo" onClick={close}>
        {/* Lyst logo kun når headeren ligger over et mørkt billede på desktop */}
        <picture>
          {variant === 'home' && <source media="(min-width: 1024px)" srcSet={logoLight} />}
          <img src={logoDark} alt="Nordic Table – til forsiden" width="500" height="267" />
        </picture>
      </Link>

      <button
        className="header__toggle"
        aria-expanded={open}
        aria-controls="main-nav"
        onClick={() => setOpen(!open)}
      >
        <span className="visually-hidden">{open ? 'Luk menu' : 'Åbn menu'}</span>
        <span className="header__burger" aria-hidden="true" />
      </button>

      <nav id="main-nav" className="header__nav" aria-label="Hovednavigation">
        <ul>
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} end onClick={close}>{label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
