import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const linkClass = ({ isActive }) =>
    `navbar-link ${isActive ? 'navbar-link-active' : ''}`

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="navbar">
      <NavLink to="/" className="navbar-logo">
        <span className="navbar-logo-mark">RRS</span>
        <span className="navbar-logo-text">Railway Reservation System</span>
      </NavLink>

      <nav className="navbar-links">
        <NavLink to="/reservation" className={linkClass}>Railway Reservation</NavLink>
        <NavLink to="/alerts" className={linkClass}>Alerts</NavLink>
        <NavLink to="/services" className={linkClass}>Other Services</NavLink>
        <NavLink to="/contact" className={linkClass}>Contact Us</NavLink>
      </nav>

      {user ? (
        <div className="navbar-account">
          <span className="account-circle">{user.name.charAt(0).toUpperCase()}</span>
          <span>{user.name}</span>
          <button className="navbar-logout" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <NavLink to="/login" className="navbar-account">
          <span className="account-circle">👤</span>
          <span>Login / Sign Up</span>
        </NavLink>
      )}
    </header>
  )
}

export default Navbar