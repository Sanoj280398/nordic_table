import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header>
      <nav aria-label="Hovednavigation">
        <ul>
          <li><NavLink to="/">Forside</NavLink></li>
          <li><NavLink to="/menu">Menu</NavLink></li>
          <li><NavLink to="/booking">Book bord</NavLink></li>
          <li><NavLink to="/login">Log ind</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}
