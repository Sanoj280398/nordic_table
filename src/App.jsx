import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Home from './pages/Home/Home.jsx'
import Menu from './pages/Menu/Menu.jsx'
import Booking from './pages/Booking/Booking.jsx'
import Login from './pages/Login/Login.jsx'
import Backoffice from './pages/Backoffice/Backoffice.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Backoffice har sin egen header og ingen footer (jf. Figma) */}
      <Route
        path="/backoffice"
        element={
          <ProtectedRoute>
            <Backoffice />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
