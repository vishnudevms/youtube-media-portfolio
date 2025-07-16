import './Navbar.css'
import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

let Navbar = () => {
    const [showSocial, setShowSocial] = useState(false);
    const socialRef = useRef();

    useEffect(() => {
    function handleClickOutside(event) {
      if (socialRef.current && !socialRef.current.contains(event.target)) {
        setShowSocial(false);
      }
    }
    if (showSocial) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSocial]);

  return (
    <div className="navbar">
      <div className="nav-content">
        <h2 className="maintitle">Angelislive</h2>
        <div className="alllinks" style={{ position: "relative" }}>
          <NavLink to='/' className={({ isActive }) => isActive ? "linkStyle activeLinkStyle" : "linkStyle"}>Home</NavLink>
          <NavLink to='/about' className={({ isActive }) => isActive ? "linkStyle activeLinkStyle" : "linkStyle"}>About</NavLink>
          <NavLink to='/gallery' className={({ isActive }) => isActive ? "linkStyle activeLinkStyle" : "linkStyle"}>Gallery</NavLink>
          <span
            className="linkStyle"
            style={{ cursor: "pointer" }}
            onClick={() => setShowSocial(v => !v)}
          >
            Subscribe
          </span>
          {showSocial && (
            <div className="mini-social-box" ref={socialRef}>
              <a href="https://www.youtube.com/@angelislive28" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", display: "block", marginBottom: "10px" }}>YouTube</a>
              <a href="https://www.instagram.com/angel_is_live/" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", display: "block", marginBottom: "10px" }}>Instagram</a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default Navbar;