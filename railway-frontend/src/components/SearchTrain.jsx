import { useState, useEffect } from 'react'
import { searchTrains } from '../api'

function SearchTrain({ initialSource = '', initialDestination = '', autoSearch = false }) {
  const [source, setSource] = useState(initialSource)
  const [destination, setDestination] = useState(initialDestination)
  const [results, setResults] = useState([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSearch = () => {
    if (!source || !destination) return
    setLoading(true)
    searchTrains(source, destination)
      .then((data) => {
        setResults(data)
        setSearched(true)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (autoSearch && initialSource && initialDestination) {
      handleSearch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="panel">
      <h2>Search Trains</h2>
      <div className="form-row">
        <div className="field">
          <label>Source</label>
          <input value={source} onChange={(e) => setSource(e.target.value)} placeholder="Chennai" />
        </div>
        <div className="field">
          <label>Destination</label>
          <input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Bangalore" />
        </div>
        <button className="btn-primary" onClick={handleSearch}>Search</button>
      </div>

      {loading && <p className="muted">Searching…</p>}
      {searched && !loading && results.length === 0 && (
        <p className="muted">No trains found for this route.</p>
      )}

      {results.length > 0 && (
        <div className="board">
          <div className="board-row board-head">
            <span>Train</span><span>From</span><span>To</span><span>Seats</span>
          </div>
          {results.map((train, i) => (
            <div className="board-row" key={train.trainId} style={{ animationDelay: `${i * 60}ms` }}>
              <span>{train.trainName}</span>
              <span>{train.source}</span>
              <span>{train.destination}</span>
              <span className="mono">{train.totalSeats}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default SearchTrain