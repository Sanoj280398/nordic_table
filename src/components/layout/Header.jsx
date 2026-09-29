import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import './Header.scss'

const links = [
  { to: '/', label: 'Forside' },
  { to: '/menu', label: 'Menu' },
  { to: '/booking', label: 'Book bord' },
  { to: '/login', label: 'Log ind' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className={`header ${open ? 'is-open' : ''}`}>
      <Link to="/" className="header__logo" onClick={close}>
        <img src={logo} alt="Nordic Table – til forsiden" width="787" height="483" />
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
