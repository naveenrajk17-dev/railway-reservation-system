const BASE_URL = 'http://localhost:8081'

function authHeaders() {
  const stored = localStorage.getItem('rrs_user')
  if (!stored) return {}
  const { token } = JSON.parse(stored)
  return { Authorization: `Bearer ${token}` }
}

export async function getAllTrains() {
  const res = await fetch(`${BASE_URL}/trains`)
  return res.json()
}

export async function searchTrains(source, destination) {
  const res = await fetch(
    `${BASE_URL}/trains/search?source=${encodeURIComponent(source)}&destination=${encodeURIComponent(destination)}`
  )
  return res.json()
}

export async function bookTicket(payload) {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  })

  const raw = await res.text() // read as plain text first, safe either way

  if (!res.ok) {
    // Error responses from this endpoint are plain text, not JSON
    throw new Error(raw || 'Booking failed')
  }

  return JSON.parse(raw) // success responses are real JSON, safe to parse now
}

export async function getBookingByPnr(pnr) {
  const res = await fetch(`${BASE_URL}/bookings/pnr/${pnr}`, {
    headers: authHeaders(),
  })
  const raw = await res.text()
  if (!res.ok) throw new Error(raw || 'Booking not found')
  return raw ? JSON.parse(raw) : null
}

export async function cancelBooking(pnr) {
  const res = await fetch(`${BASE_URL}/bookings/cancel/${pnr}`, {
    method: 'PUT',
    headers: authHeaders(),
  })
  const raw = await res.text()
  if (!res.ok) throw new Error(raw || 'Cancel failed')
  return raw ? JSON.parse(raw) : null
}

export async function getBookingsByUser(userId) {
  const res = await fetch(`${BASE_URL}/bookings/user/${userId}`, {
    headers: authHeaders(),
  })
  return res.json()
}

export async function signup(payload) {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(typeof data === 'string' ? data : 'Signup failed')
  return data
}

export async function login(payload) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(typeof data === 'string' ? data : 'Login failed')
  return data
}