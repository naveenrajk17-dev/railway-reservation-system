const alerts = [
  {
    id: 1,
    level: 'critical',
    title: 'Chennai Super Express — Delayed',
    message: 'Running approximately 45 minutes behind schedule due to signal maintenance near Katpadi.',
    time: '2 hours ago',
  },
  {
    id: 2,
    level: 'warning',
    title: 'Coimbatore Express — Platform Change',
    message: 'Departure platform changed from Platform 3 to Platform 6 at Chennai Central.',
    time: '5 hours ago',
  },
  {
    id: 3,
    level: 'info',
    title: 'Scheduled Maintenance',
    message: 'Online booking may be briefly unavailable between 2:00 AM and 2:30 AM tonight for system upgrades.',
    time: '1 day ago',
  },
  {
    id: 4,
    level: 'info',
    title: 'Madurai Super Fast — On Time',
    message: 'Running on schedule. No delays reported.',
    time: '1 day ago',
  },
]

function Alerts() {
  return (
    <section className="panel">
      <h2>Alerts</h2>
      <p className="muted alerts-subtitle">Live updates on train delays, platform changes, and service notices.</p>

      <div className="alerts-list">
        {alerts.map((alert) => (
          <div key={alert.id} className={`alert-card alert-${alert.level}`}>
            <span className={`alert-tag alert-tag-${alert.level}`}>
              {alert.level === 'critical' ? 'Delay' : alert.level === 'warning' ? 'Notice' : 'Info'}
            </span>
            <div className="alert-body">
              <h3>{alert.title}</h3>
              <p>{alert.message}</p>
              <span className="alert-time">{alert.time}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Alerts