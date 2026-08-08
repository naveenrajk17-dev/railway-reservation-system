function Tabs({ active, onChange }) {
    const tabs = [
        { id: 'search', label: 'Search Trains' },
        { id: 'book', label: 'Book Ticket' },
        { id: 'track', label: 'Track PNR' },
        { id: 'mybookings', label: 'My Bookings' },
        { id: 'all', label: 'All Trains' },
    ]

    return (
        <nav className="tabs">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`tab ${active === tab.id ? 'tab-active' : ''}`}
                    onClick={() => onChange(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </nav>
    )
}

export default Tabs