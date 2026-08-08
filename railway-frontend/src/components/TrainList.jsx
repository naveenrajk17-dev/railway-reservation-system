import { useEffect, useState } from 'react'
import { getAllTrains } from '../api'

function TrainList() {
    const [trains, setTrains] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getAllTrains()
            .then((data) => setTrains(data))
            .finally(() => setLoading(false))
    }, [])

    return (
        <section className="panel">
            <h2>All Trains</h2>
            {loading && <p className="muted">Loading departure board…</p>}
            {!loading && trains.length === 0 && <p className="muted">No trains found.</p>}

            {trains.length > 0 && (
                <div className="board">
                    <div className="board-row board-head">
                        <span>ID</span><span>Name</span><span>From</span><span>To</span><span>Seats</span>
                    </div>
                    {trains.map((train, i) => (
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
    )
}

export default TrainList