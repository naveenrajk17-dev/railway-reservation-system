import { useState } from 'react'
import { Link } from 'react-router-dom'
import { bookTicket } from '../api'
import TicketStub from './TicketStub'

function BookTicket() {
  const [userId, setUserId] = useState('')
  const [trainId, setTrainId] = useState('')
  const [date, setDate] = useState('')
  const [seat, setSeat] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleBook = () => {
    if (!userId || !trainId || !date || !seat) return
    setLoading(true)
    setError('')
    setResult(null)
    bookTicket({
      journeyDate: date,
      seatNumber: seat,
      user: { userId },
      train: { trainId },
    })
      .then((data) => setResult(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  return (
    <section className="panel">
      <h2>Book a Ticket</h2>
      <div className="form-grid">
        <div className="field">
          <label>User ID</label>
          <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </div>
        <div className="field">
          <label>Train ID</label>
          <input type="number" value={trainId} onChange={(e) => setTrainId(e.target.value)} />
        </div>
        <div className="field">
          <label>Journey Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="field">
          <label>Seat Number</label>
          <input type="number" value={seat} onChange={(e) => setSeat(e.target.value)} />
        </div>
      </div>
      <button className="btn-primary" onClick={handleBook} disabled={loading}>
        {loading ? 'Booking…' : 'Book Ticket'}
      </button>

      {error && <p className="error-text">{error}</p>}

      {result && (
        <>
          <TicketStub
            pnr={result.pnrNumber}
            status={result.status}
            date={result.journeyDate}
            seat={result.seatNumber}
          />
          <Link to={`/payment/${result.pnrNumber}`} className="btn-primary pay-now-btn">
            Pay Now
          </Link>
        </>
      )}
    </section>
  )
}

export default BookTicket