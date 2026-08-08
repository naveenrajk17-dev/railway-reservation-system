import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllTrains } from '../api'

const features = [
  { icon: '🔍', title: 'Search Trains', desc: 'Find trains between any two stations.', tab: 'search' },
  { icon: '🎫', title: 'Instant Booking', desc: 'Reserve your seat in seconds.', tab: 'book' },
  { icon: '📍', title: 'Track PNR', desc: 'Check your booking status anytime.', tab: 'track' },
  { icon: '🗂️', title: 'My Bookings', desc: 'View and manage your tickets.', tab: 'mybookings' },
]

function Home() {
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [trains, setTrains] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getAllTrains()
      .then((data) => setTrains(data))
      .finally(() => setLoading(false))
  }, [])

  const handleQuickSearch = (e) => {
    e.preventDefault()
    navigate('/reservation', {
      state: { tab: 'search', prefillSource: source, prefillDestination: destination, autoSearch: true },
    })
  }

  const goToTab = (tab) => {
    navigate('/reservation', { state: { tab } })
  }

  const totalSeats = trains.reduce((sum, t) => sum + (t.totalSeats || 0), 0)
  const routeCount = new Set(trains.map((t) => `${t.source}-${t.destination}`)).size

  return (
    <div className="home-page">
      <section className="panel hero-panel">
        <span className="eyebrow">WELCOME</span>
        <h2>Book train tickets in seconds</h2>
        <p className="muted hero-copy">
          Search live train availability, book your seat, and track your PNR — all in one place.
        </p>

        <form className="quick-search" onSubmit={handleQuickSearch}>
          <div className="field">
            <label>From</label>
            <input value={source} onChange={(e) => setSource(e.target.value)} placeholder="Chennai" />
          </div>
          <div className="field">
            <label>To</label>
            <input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Bangalore" />
          </div>
          <button className="btn-primary" type="submit">Search Trains</button>
        </form>
      </section>

      <section className="stats-bar">
        <div className="stat-item">
          <span className="stat-number mono">{trains.length}</span>
          <span className="stat-label">Active Trains</span>
        </div>
        <div className="stat-item">
          <span className="stat-number mono">{routeCount}</span>
          <span className="stat-label">Routes</span>
        </div>
        <div className="stat-item">
          <span className="stat-number mono">{totalSeats.toLocaleString()}</span>
          <span className="stat-label">Total Seats</span>
        </div>
        <div className="stat-item">
          <span className="stat-number mono">24/7</span>
          <span className="stat-label">Booking Open</span>
        </div>
      </section>

      <section className="feature-strip">
        {features.map((f) => (
          <button key={f.tab} className="feature-card" onClick={() => goToTab(f.tab)}>
            <span className="feature-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p className="muted">{f.desc}</p>
          </button>
        ))}
      </section>

      <section className="panel">
        <h2>Live Departure Board</h2>
        {loading && <p className="muted">Loading trains…</p>}
        {!loading && trains.length > 0 && (
          <div className="board">
            <div className="board-row board-head">
              <span>ID</span><span>Name</span><span>From</span><span>To</span><span>Seats</span>
            </div>
            {trains.slice(0, 4).map((train, i) => (
              <div className="board-row" key={train.trainId} style={{ animationDelay: `${i * 60}ms` }}>
                <span className="mono">{String(train.trainId).padStart(3, '0')}</span>
                <span>{train.trainName}</span>
                <span>{train.source}</span>
                <span>{train.destination}</span>
                <span className="mono">{train.totalSeats}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home