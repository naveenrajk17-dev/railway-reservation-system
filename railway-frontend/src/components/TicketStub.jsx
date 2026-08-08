function TicketStub({ pnr, status, date, seat, passenger, trainName, source, destination, onCancel }) {
    const isConfirmed = status === 'BOOKED'

    return (
        <div className="ticket-stub">
            <div className="ticket-main">
                <span className="ticket-label">PNR</span>
                <span className="ticket-pnr mono">{pnr}</span>
                {trainName && <span className="ticket-train">{trainName}</span>}
                {(source || destination) && (
                    <span className="ticket-route">{source} → {destination}</span>
                )}
                {passenger && <span className="ticket-passenger">Passenger: {passenger}</span>}
            </div>

            <div className="ticket-divider">
                <span className="notch notch-top" />
                <span className="notch notch-bottom" />
            </div>

            <div className="ticket-side">
                <span className="ticket-label">Date</span>
                <span className="mono">{date}</span>
                <span className="ticket-label">Seat</span>
                <span className="mono">{seat}</span>
                <span className={`status-pill ${isConfirmed ? 'status-confirmed' : 'status-other'}`}>
                    {status}
                </span>
                {isConfirmed && onCancel && (
                    <button className="btn-cancel" onClick={() => onCancel(pnr)}>
                        Cancel Ticket
                    </button>
                )}
            </div>
        </div>
    )
}

export default TicketStub