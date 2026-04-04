import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/logo.jpeg"
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* LEFT: LOGO */}
      <img style={{width: "90px", }} src={logo} alt="Hon. Asuakak Umoh" />
      {/* <h2 className="logo">Executive Chairman</h2> */}

      {/* RIGHT: HAMBURGER */}
      <div
        className={`hamburger ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* MENU */}
      <div className={`links ${isOpen ? "open" : ""}`}>
        <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
        <NavLink to="/about" onClick={() => setIsOpen(false)}>About</NavLink>
        <NavLink to="/leadership" onClick={() => setIsOpen(false)}>Leadership</NavLink>
        <NavLink to="/achievements" onClick={() => setIsOpen(false)}>Achievements</NavLink>
        <NavLink to="/education" onClick={() => setIsOpen(false)}>Education</NavLink>
        <NavLink to="/skills" onClick={() => setIsOpen(false)}>Skills</NavLink>
        <NavLink to="/gallery" onClick={() => setIsOpen(false)}>Gallery</NavLink>
        <NavLink to="/news" onClick={() => setIsOpen(false)}>News</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;