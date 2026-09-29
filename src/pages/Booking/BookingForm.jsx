import { useState } from 'react'
import { api } from '../../services/api.js'
import { today, slotsFor, validate } from './bookingRules.js'

const emptyForm = { name: '', email: '', date: '', time: '', guests: '' }

export default function BookingForm() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [serverError, setServerError] = useState('')
  const [booking, setBooking] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    // Ny dato kan gøre det valgte tidspunkt ugyldigt – nulstil det så
    const next = { ...form, [name]: value }
    if (name === 'date' && !slotsFor(value).includes(form.time)) next.time = ''
    setForm(next)
    // Fjern fejlen, så snart brugeren retter feltet
    if (errors[name]) setErrors({ ...errors, [name]: undefined })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus()
      return
    }

    setStatus('sending')
    try {
      const res = await api('/booking', {
        method: 'POST',
        body: {
          name: form.name.trim(),
          email: form.email.trim(),
          startAt: new Date(`${form.date}T${form.time}`).toISOString(),
          numberOfGuests: Number(form.guests),
        },
      })
      setBooking({ ...form, id: res.data?._id })
      setStatus('success')
    } catch (err) {
      setServerError(err.message)
      setStatus('error')
    }
  }

  if (status === 'success') {
    const when = new Date(`${booking.date}T${booking.time}`).toLocaleDateString('da-DK', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    })
    return (
      <section className="booking-form booking-form--success" role="status" aria-live="polite">
        <h2>Tak for din reservation, {booking.name}!</h2>
        <p>Vi har modtaget din bestilling og glæder os til at se dig.</p>
        <dl>
          <div><dt>Dato</dt><dd>{when}</dd></div>
          <div><dt>Tidspunkt</dt><dd>kl. {booking.time}</dd></div>
          <div><dt>Antal gæster</dt><dd>{booking.guests}</dd></div>
          <div><dt>Email</dt><dd>{booking.email}</dd></div>
        </dl>
        <button className="btn btn--outline" onClick={() => { setForm(emptyForm); setStatus('idle') }}>
          Lav en ny reservation
        </button>
      </section>
    )
  }

  const field = (name) => ({
    id: name,
    name,
    value: form[name],
    onChange: handleChange,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })

  const error = (name) =>
    errors[name] && <p id={`${name}-error`} className="booking-form__error">{errors[name]}</p>

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate aria-labelledby="form-heading">
      <h2 id="form-heading">Din reservation</h2>

      <div className="booking-form__field">
        <label htmlFor="name">Fulde navn *</label>
        <input type="text" autoComplete="name" placeholder="Jens Jensen" {...field('name')} />
        {error('name')}
      </div>

      <div className="booking-form__field">
        <label htmlFor="email">Email *</label>
        <input type="email" autoComplete="email" placeholder="jens@example.dk" {...field('email')} />
        {error('email')}
      </div>

      <div className="booking-form__row">
        <div className="booking-form__field">
          <label htmlFor="date">Dato *</label>
          <input type="date" min={today()} {...field('date')} />
          {error('date')}
        </div>

        <div className="booking-form__field">
          <label htmlFor="time">Tidspunkt *</label>
          <select {...field('time')} disabled={slotsFor(form.date).length === 0}>
            <option value="">{form.date ? 'Vælg tidspunkt' : 'Vælg dato først'}</option>
            {slotsFor(form.date).map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {error('time')}
        </div>
      </div>

      <div className="booking-form__field">
        <label htmlFor="guests">Antal gæster *</label>
        <select {...field('guests')}>
          <option value="">Vælg antal gæster</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{n} {n === 1 ? 'person' : 'personer'}</option>
          ))}
        </select>
        {error('guests')}
      </div>

      {status === 'error' && (
        <p role="alert" className="booking-form__alert">
          Din reservation kunne ikke gennemføres: {serverError}. Prøv igen, eller ring til os.
        </p>
      )}

      <button type="submit" className="btn booking-form__submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sender…' : 'Book bord'}
      </button>
    </form>
  )
}
