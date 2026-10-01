import { useState } from 'react'
import Icon from '../../components/Icon/Icon.jsx'
import { categoryLabels } from '../../components/DishCard/DishCard.jsx'
import { categories, emptyDish, validateDish, toFormData } from './dishRules.js'

// Bruges både til at oprette (dish = null) og redigere en ret.
// Forælderen giver den key={dish id}, så formularen nulstilles ved skift.
export default function DishForm({ dish, onSave, onCancel }) {
  const [form, setForm] = useState(
    dish ? { ...emptyDish, ...dish, price: String(dish.price), image: null } : emptyDish,
  )
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [saving, setSaving] = useState(false)

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target
    const v = type === 'checkbox' ? checked : type === 'file' ? files[0] ?? null : value
    setForm({ ...form, [name]: v })
    setErrors({ ...errors, [name]: undefined })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const found = validateDish(form)
    setErrors(found)
    if (Object.keys(found).length) return

    setSaving(true)
    setServerError('')
    try {
      await onSave(toFormData(form, dish?._id))
      if (!dish) {
        setForm(emptyDish)
        e.target.reset() // tømmer fil-feltet
      }
    } catch (err) {
      setServerError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const field = (name) => ({
    id: `dish-${name}`,
    name,
    onChange: handleChange,
    'aria-invalid': Boolean(errors[name]),
  })

  return (
    <form className="dish-form" onSubmit={handleSubmit} noValidate aria-labelledby="dish-form-heading">
      <h2 id="dish-form-heading">{dish ? `Rediger "${dish.title}"` : 'Opret ny ret til menukortet'}</h2>

      <div className="dish-form__row">
        <label className="visually-hidden" htmlFor="dish-title">Titel</label>
        <input type="text" placeholder="Titel" value={form.title} {...field('title')} />

        <label className="visually-hidden" htmlFor="dish-description">Beskrivelse</label>
        <input type="text" placeholder="Beskrivelse" value={form.description} {...field('description')} />

        <label className="visually-hidden" htmlFor="dish-category">Type</label>
        <select value={form.category} {...field('category')}>
          <option value="">Type</option>
          {categories.map((c) => <option key={c} value={c}>{categoryLabels[c]}</option>)}
        </select>

        <label className="visually-hidden" htmlFor="dish-price">Pris</label>
        <input type="number" min="0" placeholder="Pris" value={form.price} {...field('price')} />

        <label className="dish-form__file" htmlFor="dish-image">
          <span>{form.image?.name ?? (dish ? 'Nyt billede' : 'Fil')}</span>
          <input type="file" accept="image/*" {...field('image')} />
        </label>

        <label className="dish-form__check" htmlFor="dish-isSignature">
          <input type="checkbox" checked={form.isSignature} {...field('isSignature')} />
          Signaturret
        </label>

        {dish ? (
          <span className="dish-form__edit-actions">
            <button type="submit" className="btn" disabled={saving}>{saving ? 'Gemmer…' : 'Gem'}</button>
            <button type="button" className="btn btn--outline" onClick={onCancel}>Annuller</button>
          </span>
        ) : (
          <button type="submit" className="dish-form__add" disabled={saving} aria-label="Opret ret">
            <Icon name="plus" size={26} />
          </button>
        )}
      </div>

      {Object.values(errors).some(Boolean) && (
        <ul className="dish-form__errors" role="alert">
          {Object.values(errors).filter(Boolean).map((msg) => <li key={msg}>{msg}</li>)}
        </ul>
      )}
      {serverError && <p className="dish-form__errors" role="alert">Kunne ikke gemme: {serverError}</p>}
    </form>
  )
}
