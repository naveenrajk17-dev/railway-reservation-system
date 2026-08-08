import { useEffect, useState } from 'react'

function Header() {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <header className="board-header">
            <div>
                <span className="eyebrow">LIVE RESERVATIONS · PLATFORM ONLINE</span>
                <h1>Railway Reservation System</h1>
            </div>
            <div className="board-clock">
                <span className="clock-label">STATION TIME</span>
                <span className="clock-digits mono">
                    {time.toLocaleTimeString('en-IN', { hour12: false })}
                </span>
            </div>
        </header>
    )
}

export default Header