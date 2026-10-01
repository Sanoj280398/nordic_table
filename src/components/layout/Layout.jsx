import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

// home  = header ligger over hero'en på alle skærme
// hero  = over hero'en på mobil, hvid bar på desktop
// solid = hvid bar overalt (sider uden hero, fx login og 404)
const headerVariants = { '/': 'home', '/menu': 'hero', '/booking': 'hero' }

export default function Layout() {
  const { pathname } = useLocation()

  return (
    <>
      <Header variant={headerVariants[pathname] ?? 'solid'} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
