const BASE_URL = import.meta.env.VITE_API_URL

// Nogle billeder fra API'et er relative (fx /dishes/no-image.jpg)
export const imageUrl = (path) => (path?.startsWith('/') ? `${BASE_URL}${path}` : path)

// body kan være et objekt (sendes som JSON) eller FormData (fx ved billed-upload)
export async function api(path, { method = 'GET', body, token } = {}) {
  const isForm = body instanceof FormData
  let res
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        ...(body && !isForm && { 'Content-Type': 'application/json' }),
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: isForm ? body : body && JSON.stringify(body),
    })
  } catch {
    throw new Error('Kunne ikke forbinde til serveren. Prøv igen senere.')
  }

  const data = res.status === 204 ? null : await res.json().catch(() => null)
  // API'et svarer nogle gange 200 med status "error" (fx login og token-fejl)
  if (!res.ok || data?.status === 'error') {
    throw new Error(data?.message || `Request failed: ${res.status}`)
  }
  return data
}
