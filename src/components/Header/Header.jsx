import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'center', 
      });
      setMenuOpen(false); 
    }
  };

  return (
    <header className="custom-header">
      <div className="container">
        <div className="header-container">
          <h4 className="logo">Felipe Rocha</h4>

          <button
            className="menu-toggle"
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <span className="custom-toggler-icon"></span>
          </button>

          <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <button onClick={() => scrollToSection('#sobre')}>Início</button>
            <button onClick={() => scrollToSection('#about-me')}>Sobre Mim</button>
            <button onClick={() => scrollToSection('#habilidades')}>Habilidades</button>
            <button onClick={() => scrollToSection('#projetos')}>Projetos</button>
            <button onClick={() => scrollToSection('#contato')}>Contato</button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
