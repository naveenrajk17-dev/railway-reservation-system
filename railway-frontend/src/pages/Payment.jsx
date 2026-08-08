import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getBookingByPnr } from '../api'

function Payment() {
  const { pnr } = useParams()
  const navigate = useNavigate()

  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState(false)
  const [paid, setPaid] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const [error, setError] = useState('')

  useEffect(() => {
    getBookingByPnr(pnr)
      .then((data) => {
        if (!data) setError('Booking not found.')
        else setBooking(data)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [pnr])

  // Once payment succeeds, count down from 5 and auto-redirect home
  useEffect(() => {
    if (!paid) return
    if (countdown === 0) {
      navigate('/')
      return
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [paid, countdown, navigate])

  const handlePay = () => {
    setPaying(true)
    // Simulated payment — no real gateway, just a short delay for realism
    setTimeout(() => {
      setPaying(false)
      setPaid(true)
    }, 1500)
  }

  if (loading) return <section className="panel"><p className="muted">Loading booking…</p></section>
  if (error) return <section className="panel"><p className="error-text">{error}</p></section>

  if (paid) {
    return (
      <section className="panel payment-success">
        <h2>✅ Payment Successful</h2>
        <p className="muted">Your ticket is confirmed.</p>
        <p className="muted">Redirecting to home in {countdown}…</p>
      </section>
    )
  }

  return (
    <section className="panel payment-panel">
      <h2>Complete Your Payment</h2>

      <div className="payment-summary">
        <div className="payment-row">
          <span>Passenger</span>
          <span>{booking.user?.name}</span>
        </div>
        <div className="payment-row">
          <span>User ID</span>
          <span className="mono">{booking.user?.userId}</span>
        </div>
        <div className="payment-row">
          <span>PNR</span>
          <span className="mono">{booking.pnrNumber}</span>
        </div>
        <div className="payment-row">
          <span>Route</span>
          <span>{booking.train?.source} → {booking.train?.destination}</span>
        </div>
        <div className="payment-row">
          <span>Seat</span>
          <span className="mono">{booking.seatNumber}</span>
        </div>
        <div className="payment-row payment-amount">
          <span>Amount</span>
          <span className="mono">₹{booking.train?.price?.toFixed(2)}</span>
        </div>
      </div>

      <button className="btn-primary" onClick={handlePay} disabled={paying}>
        {paying ? 'Processing…' : 'Pay Now'}
      </button>
    </section>
  )
}

export default Payment