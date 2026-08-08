import { useState } from 'react'
import { getBookingsByUser, cancelBooking } from '../api'
import TicketStub from './TicketStub'

function MyBookings() {
    const [userId, setUserId] = useState('')
    const [bookings, setBookings] = useState([])
    const [searched, setSearched] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleLoad = () => {
        if (!userId) return
        setLoading(true)
        getBookingsByUser(userId)
            .then((data) => {
                setBookings(data)
                setSearched(true)
            })
            .finally(() => setLoading(false))
    }

    const handleCancel = (pnrToCancel) => {
        cancelBooking(pnrToCancel).then((updated) => {
            setBookings((prev) =>
                prev.map((b) => (b.pnrNumber === updated.pnrNumber ? updated : b))
            )
        })
    }

    return (
        <section className="panel">
            <h2>My Bookings</h2>
            <div className="form-row">
                <div className="field">
                    <label>User ID</label>
                    <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="1" />
                </div>
                <button className="btn-primary" onClick={handleLoad}>Load Bookings</button>
            </div>

            {loading && <p className="muted">Loading bookings…</p>}
            {searched && !loading && bookings.length === 0 && (
                <p className="muted">No bookings found for this user.</p>
            )}

            {bookings.map((booking) => (
                <TicketStub
                    key={booking.bookingId}
                    pnr={booking.pnrNumber}
                    status={booking.status}
                    date={booking.journeyDate}
                    seat={booking.seatNumber}
                    trainName={booking.train?.trainName}
                    source={booking.train?.source}
                    destination={booking.train?.destination}
                    onCancel={handleCancel}
                />
            ))}
        </section>
    )
}

export default MyBookings