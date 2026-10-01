export const categories = ['starter', 'main', 'dessert']

export const emptyDish = { title: '', description: '', category: '', price: '', isSignature: false, image: null }

// Grænserne følger API'ets dish-model (title 2–80, description 5–200, price ≥ 0)
export function validateDish({ title, description, category, price, image }) {
  const errors = {}
  const t = title.trim().length
  if (t < 2 || t > 80) errors.title = 'Titel skal være 2–80 tegn.'
  const d = description.trim().length
  if (d < 5 || d > 200) errors.description = 'Beskrivelse skal være 5–200 tegn.'
  if (!categories.includes(category)) errors.category = 'Vælg en type.'
  if (price === '' || !(Number(price) >= 0)) errors.price = 'Pris skal være et tal på 0 eller mere.'
  if (image && !image.type.startsWith('image/')) errors.image = 'Filen skal være et billede.'
  return errors
}

// API'et modtager retter som multipart/form-data (pga. billed-upload)
export function toFormData(dish, id) {
  const fd = new FormData()
  if (id) fd.append('id', id)
  fd.append('title', dish.title.trim())
  fd.append('description', dish.description.trim())
  fd.append('category', dish.category)
  fd.append('price', String(Number(dish.price)))
  fd.append('isSignature', String(dish.isSignature))
  if (dish.image) fd.append('image', dish.image)
  return fd
}
