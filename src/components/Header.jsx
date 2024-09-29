import "../styles/Header.css";

import Logo from "../assets/Logo.svg";

import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/">
          <img src={Logo} alt="Little Lemon Logo" />
        </NavLink>
      </div>
      <ul className="navbar-NavLinks">
        <li><NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink></li>
        <li><NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>About</NavLink></li>
        <li><NavLink to="/menu" className={({ isActive }) => (isActive ? "active" : "")}>Menu</NavLink></li>
        <li><NavLink to="/reservations" className={({ isActive }) => (isActive ? "active" : "")}>Reservations</NavLink></li>
        <li><NavLink to="/order-online" className={({ isActive }) => (isActive ? "active" : "")}>Order Online</NavLink></li>
        <li><NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>Login</NavLink></li>
      </ul>
    </nav>
  );
}

export default Header;