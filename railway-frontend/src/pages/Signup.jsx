import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signup } from '../api'
import { useAuth } from '../context/AuthContext'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login: setAuthUser } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !password || !phone) return

    setLoading(true)
    setError('')

    signup({ name, email, password, phone })
      .then((data) => {
        setAuthUser(data)
        navigate('/reservation')
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  return (
    <section className="panel auth-panel">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Full Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="field">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="field">
          <label>Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? 'Creating account…' : 'Sign Up'}
        </button>
      </form>

      <p className="auth-switch">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  )
}

export default Signup