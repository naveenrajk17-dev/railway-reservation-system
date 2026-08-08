const services = [
  { icon: '🍽️', title: 'Food on Train', desc: 'Order meals delivered directly to your seat during your journey.' },
  { icon: '🛏️', title: 'Retiring Rooms', desc: 'Book a room at the station to rest between connecting trains.' },
  { icon: '🚕', title: 'Cab at Station', desc: 'Arrange a cab pickup timed to your train\'s arrival.' },
  { icon: '🧳', title: 'Luggage Assistance', desc: 'Get help carrying luggage to and from the platform.' },
  { icon: '♿', title: 'Wheelchair Assistance', desc: 'Request wheelchair support for boarding and platform transfers.' },
  { icon: '📍', title: 'Platform Locator', desc: 'Find which platform your train departs from, in real time.' },
]

function Services() {
  return (
    <section className="panel">
      <h2>Other Services</h2>
      <p className="muted alerts-subtitle">Additional services to make your journey easier.</p>

      <div className="services-grid">
        {services.map((service) => (
          <div key={service.title} className="service-card">
            <span className="service-icon">{service.icon}</span>
            <h3>{service.title}</h3>
            <p className="muted">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services