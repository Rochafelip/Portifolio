import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
        <div className="footer-container align-items-center justify-content-center">
           <p className="footer-text">© {new Date().getFullYear()} Felipe Rocha. Todos os direitos reservados.</p>        
        </div>
    </footer>
  );
};

export default Footer;
