import { hoursForDay } from '../../data/info.js'

// Lokal dato som YYYY-MM-DD (toISOString ville give UTC-datoen)
export const today = () => new Date().toLocaleDateString('sv-SE')

const pad = (n) => String(n).padStart(2, '0')

// Halvtimes-tider for en dato. Sidste bordbestilling er 1 time før lukning.
export function slotsFor(date) {
  if (!date) return []
  const { open, close } = hoursForDay(new Date(`${date}T00:00`).getDay())
  if (open === null) return []
  const slots = []
  for (let m = open * 60; m <= (close - 1) * 60; m += 30) {
    slots.push(`${pad(Math.floor(m / 60))}:${pad(m % 60)}`)
  }
  return slots
}

export function validate({ name, email, date, time, guests }) {
  const errors = {}
  if (name.trim().length < 2) errors.name = 'Skriv dit fulde navn.'
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Skriv en gyldig email, fx navn@mail.dk.'

  if (!date) errors.date = 'Vælg en dato.'
  else if (date < today()) errors.date = 'Datoen kan ikke være i fortiden.'
  else if (slotsFor(date).length === 0) errors.date = 'Vi har lukket den dag. Vælg en anden dato.'

  if (!time) errors.time = 'Vælg et tidspunkt.'
  else if (date && !slotsFor(date).includes(time)) errors.time = 'Tidspunktet ligger uden for åbningstiden.'

  const n = Number(guests)
  if (!Number.isInteger(n) || n < 1 || n > 12) errors.guests = 'Antal gæster skal være mellem 1 og 12.'
  return errors
}
