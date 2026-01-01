import React, { useState, useEffect } from "react";
import Logo from '@assets/images/logo_black.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${isSticky ? "sticky" : ""}`}>
      <div className="nav-container">

        {/* Logo */}
        <div className="logo">
          <a href="/"><img src={Logo} alt="logo" /></a>
        </div>

        {/* Mobile Toggle */}
        <div 
          className={`toggle menu-icon ${menuOpen ? "active" : ""}`} 
          onClick={() => setMenuOpen(true)}
        >
          <span></span><span></span><span></span>
        </div>

        {/* Menu Links */}
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <button className="close-btn" onClick={() => setMenuOpen(false)}>
            ✕
          </button>

          <li><a href="/project">PROJECTS</a></li>
          <li><a href="/gallery">Studio</a></li>
          <li><a href="/about-us">ABOUT US</a></li>
          <li><a href="/recognition">RECOGNITION</a></li>
          <li><a href="/contact-us">CONTACT US</a></li>
          <li><a className="highlight" href="/contact-us">DESIGN YOUR DREAM →</a></li>
        </ul>

      </div>
    </header>
  );
};

export default Navbar;
