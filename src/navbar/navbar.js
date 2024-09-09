import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../src/UserContexr/authContext'; 
import './navbar.css';

function Navbar() {
  const { isLoggedIn, logoutUser } = useContext(AuthContext);
  const [isActive, setIsActive] = useState(false);

  const handleLogout = () => {
    logoutUser();
    toggleMenu();
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to="/home" className='navbar-logo'>
            POPTIME
          </Link>
          <div className='menu-icon' onClick={toggleMenu}>
            {isActive ? '✕' : '☰'}
          </div>
          <ul className={`nav-menu ${isActive ? 'active' : ''}`}>
            <li className="nav-item">
              <Link to='/home' className="barra-nav-links" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <Link to='/watchlist' className="barra-nav-links" onClick={toggleMenu}>
                  Watchlist
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link to='/explore' className="barra-nav-links" onClick={toggleMenu}>
                Explore
              </Link>
            </li>
            <li className="nav-item">
              {isLoggedIn ? (
                <Link to='/login' className="barra-nav-links" onClick={handleLogout}>
                  Logout
                </Link>
              ) : (
                <Link to='/login' className="barra-nav-links" onClick={toggleMenu}>
                  Login / Register
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
