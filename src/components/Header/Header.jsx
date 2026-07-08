import React, { useState, useEffect } from 'react';
import './Header.css';

const NAV_ITEMS = [
  { id: 'sobre', label: 'Início' },
  { id: 'about-me', label: 'Sobre Mim' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'contato', label: 'Contato' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(NAV_ITEMS[0].id);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

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
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={activeSection === item.id ? 'active' : ''}
                onClick={() => scrollToSection(`#${item.id}`)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
