import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

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
            <a href="#sobre">Início</a>
            <a href="#about-me">Sobre Mim</a>
            <a href="#habilidades">Habilidades</a>
            <a href="#projetos">Projetos</a>
            <a href="#contato">Contato</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
