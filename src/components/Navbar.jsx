import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faUser, faUserGroup, faCamera, faHouse } from '@fortawesome/free-solid-svg-icons';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      setUser(null); // Clear user state
      navigate('/login'); // Redirect to login page
    }
  };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        {user ? (
          <>
            <li>
              <NavLink to="/dashboard" className="nav-link" activeClassName="active-link" aria-label="Dashboard">
                <FontAwesomeIcon icon={faHouse} />
              </NavLink>
            </li>
            <li>
              <NavLink to="/bills" className="nav-link" activeClassName="active-link" aria-label="Bills">
                <FontAwesomeIcon icon={faMoneyBill} />
              </NavLink>
            </li>
            <li>
              <NavLink to="/friends" className="nav-link" activeClassName="active-link" aria-label="Friends">
                <FontAwesomeIcon icon={faUserGroup} />
              </NavLink>
            </li>
            <li>
              <NavLink to="/camera" className="nav-link" activeClassName="active-link" aria-label="Camera">
                <FontAwesomeIcon icon={faCamera} />
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className="nav-link" activeClassName="active-link" aria-label="Profile">
                <FontAwesomeIcon icon={faUser} />
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button" aria-label="Logout">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login" className="nav-link" activeClassName="active-link" aria-label="Login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className="nav-link" activeClassName="active-link" aria-label="Register">
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;