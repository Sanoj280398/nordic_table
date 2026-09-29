const BASE_URL = import.meta.env.VITE_API_URL

export async function api(path, { method = 'GET', body, token } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      ...(body && { 'Content-Type': 'application/json' }),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body && JSON.stringify(body),
  })
  const data = res.status === 204 ? null : await res.json().catch(() => null)
  // API'et sender en læsbar besked med ved fejl – send den videre
  if (!res.ok) throw new Error(data?.message || `Request failed: ${res.status}`)
  return data
}
