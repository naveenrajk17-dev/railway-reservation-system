import { useState } from 'react'

function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !message) return
    // No backend endpoint for this yet — this just simulates a submission.
    setSent(true)
  }

  return (
    <section className="panel contact-panel">
      <h2>Contact Us</h2>

      <div className="contact-grid">
        <div className="contact-info">
          <div className="contact-item">
            <span className="ticket-label">Support Phone</span>
            <span>1800-111-139</span>
          </div>
          <div className="contact-item">
            <span className="ticket-label">Support Email</span>
            <span>support@railwayreservation.example</span>
          </div>
          <div className="contact-item">
            <span className="ticket-label">Hours</span>
            <span>24/7 Customer Support</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          {sent ? (
            <p className="success-text">Thanks, {name} — your message has been received. We'll get back to you soon.</p>
          ) : (
            <>
              <div className="field">
                <label>Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="field">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="field">
                <label>Message</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} />
              </div>
              <button className="btn-primary" type="submit">Send Message</button>
            </>
          )}
        </form>
      </div>
    </section>
  )
}

export default Contact