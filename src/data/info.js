// Fælles restaurantinfo – bruges i footer og på booking-siden.
// weekdays følger Date.getDay(): 0 = søndag, 1 = mandag ... 6 = lørdag.
// open/close er hele timer; null = lukket.
export const openingHours = [
  { days: 'Mandag', weekdays: [1], open: null, close: null },
  { days: 'Tirsdag – torsdag', weekdays: [2, 3, 4], open: 17, close: 22 },
  { days: 'Fredag – lørdag', weekdays: [5, 6], open: 17, close: 23 },
  { days: 'Søndag', weekdays: [0], open: 12, close: 20 },
]

export const formatHours = ({ open, close }) => (open === null ? 'Lukket' : `${open}–${close}`)

export const hoursForDay = (weekday) => openingHours.find((h) => h.weekdays.includes(weekday))

export const contact = {
  address: 'Nordgade 12, 8000 Aarhus',
  phone: '+45 12 34 56 78',
  email: 'info@nordictable.dk',
}

export const socials = [
  { name: 'Facebook', url: 'https://facebook.com' },
  { name: 'Instagram', url: 'https://instagram.com' },
]
