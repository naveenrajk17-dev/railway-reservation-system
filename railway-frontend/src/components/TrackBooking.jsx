import { useState } from 'react'
import { getBookingByPnr, cancelBooking } from '../api'
import TicketStub from './TicketStub'

function TrackBooking() {
    const [pnr, setPnr] = useState('')
    const [result, setResult] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleTrack = () => {
        if (!pnr) return
        setLoading(true)
        setError('')
        setMessage('')
        setResult(null)
        getBookingByPnr(pnr)
            .then((data) => {
                if (!data) setError('No booking found for this PNR.')
                else setResult(data)
            })
            .catch(() => setError('No booking found for this PNR.'))
            .finally(() => setLoading(false))
    }

    const handleCancel = (pnrToCancel) => {
        cancelBooking(pnrToCancel).then((updated) => {
            setResult(updated)
            setMessage('Ticket cancelled successfully.')
        })
    }

    return (
        <section className="panel">
            <h2>Track Your Booking</h2>
            <div className="form-row">
                <div className="field">
                    <label>PNR Number</label>
                    <input value={pnr} onChange={(e) => setPnr(e.target.value)} placeholder="PNR326132" />
                </div>
                <button className="btn-primary" onClick={handleTrack}>Track</button>
            </div>

            {loading && <p className="muted">Fetching booking…</p>}
            {error && <p className="error-text">{error}</p>}
            {message && <p className="success-text">{message}</p>}

            {result && (
                <TicketStub
                    pnr={result.pnrNumber}
                    status={result.status}
                    date={result.journeyDate}
                    seat={result.seatNumber}
                    passenger={result.user?.name}
                    trainName={result.train?.trainName}
                    source={result.train?.source}
                    destination={result.train?.destination}
                    onCancel={handleCancel}
                />
            )}
        </section>
    )
}

export default TrackBooking