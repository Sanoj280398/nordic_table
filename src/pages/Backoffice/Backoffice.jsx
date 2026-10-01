import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { api, imageUrl } from '../../services/api.js'
import Icon from '../../components/Icon/Icon.jsx'
import { categoryLabels } from '../../components/DishCard/DishCard.jsx'
import DishForm from './DishForm.jsx'
import logo from '../../assets/images/logoWhite.png'
import headerBg from '../../assets/images/headerbg.png'
import './Backoffice.scss'

export default function Backoffice() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(null)
  const [message, setMessage] = useState(null) // { type: 'success' | 'error', text }

  const loadDishes = useCallback(() => {
    // Skråstreg til sidst: API'ets statiske /dishes-mappe omdirigerer ellers
    return api('/dishes/')
      .then((res) => {
        setDishes(res.data)
        setError(null)
      })
      .catch(() => setError('Kunne ikke hente retterne. Tjek at API\'et kører, og prøv igen.'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    loadDishes()
  }, [loadDishes])

  // Fejl kastes videre til DishForm, som viser dem ved formularen
  const saveDish = async (formData) => {
    await api('/dish', { method: editing ? 'PUT' : 'POST', body: formData, token })
    setMessage({ type: 'success', text: editing ? 'Retten er opdateret.' : 'Retten er oprettet.' })
    setEditing(null)
    loadDishes()
  }

  const deleteDish = async (dish) => {
    if (!window.confirm(`Er du sikker på, at du vil slette "${dish.title}"?`)) return
    try {
      await api(`/dish/${dish._id}`, { method: 'DELETE', token })
      setMessage({ type: 'success', text: `"${dish.title}" er slettet.` })
      if (editing?._id === dish._id) setEditing(null)
      loadDishes()
    } catch (err) {
      setMessage({ type: 'error', text: `Kunne ikke slette retten: ${err.message}` })
    }
  }

  const startEdit = (dish) => {
    setEditing(dish)
    setMessage(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      <header className="admin-header" style={{ backgroundImage: `url(${headerBg})` }}>
        <Link to="/">
          <img src={logo} alt="Nordic Table – til forsiden" width="778" height="371" />
        </Link>
        <nav aria-label="Backoffice">
          <span className="admin-header__active" aria-current="page">Retter</span>
          <button type="button" onClick={handleLogout}>Log ud</button>
        </nav>
      </header>

      <main className="backoffice">
        <div className="backoffice__title">
          <p>Backoffice</p>
          <h1>Retter</h1>
        </div>

        <div className="backoffice__content">
          <DishForm
            key={editing?._id ?? 'new'}
            dish={editing}
            onSave={saveDish}
            onCancel={() => setEditing(null)}
          />

          <div aria-live="polite">
            {message && <p className={`backoffice__message backoffice__message--${message.type}`}>{message.text}</p>}
          </div>

          {loading && <p role="status">Henter retter…</p>}
          {error && <p role="alert" className="error">{error}</p>}
          {!loading && !error && dishes.length === 0 && <p>Der er ingen retter endnu. Opret den første ovenfor.</p>}

          {dishes.length > 0 && (
            <table className="dish-table">
              <caption className="visually-hidden">Alle retter på menukortet</caption>
              <thead>
                <tr>
                  <th scope="col">Titel</th>
                  <th scope="col">Beskrivelse</th>
                  <th scope="col">Type</th>
                  <th scope="col">Pris</th>
                  <th scope="col">Billede</th>
                  <th scope="col">Signaturret</th>
                  <th scope="col">Handlinger</th>
                </tr>
              </thead>
              <tbody>
                {dishes.map((dish) => (
                  <tr key={dish._id} className={editing?._id === dish._id ? 'is-editing' : ''}>
                    <td>{dish.title}</td>
                    <td>{dish.description}</td>
                    <td>{categoryLabels[dish.category]}</td>
                    <td>{dish.price}</td>
                    <td><img src={imageUrl(dish.image)} alt="" width="86" height="64" loading="lazy" /></td>
                    <td>{dish.isSignature ? 'Ja' : 'Nej'}</td>
                    <td>
                      <button type="button" className="dish-table__delete" onClick={() => deleteDish(dish)} aria-label={`Slet ${dish.title}`}>
                        <Icon name="trash" size={24} />
                      </button>
                      <button type="button" className="dish-table__edit" onClick={() => startEdit(dish)} aria-label={`Rediger ${dish.title}`}>
                        <Icon name="edit" size={24} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </>
  )
}
