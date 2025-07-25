import React from 'react';
import './ContactSection.css';
import cv from '../../assets/pdf/curriculo.pdf';

const ContactSection = () => {
  return (
    <section id="contato" className="contact-section">
      <div className="container text-center">
        <h2 className="contact-section-title mb-4">Vamos conversar!</h2>
        <h4>Estou sempre disposto a conhecer novas possibilidades e parcerias.</h4>
        <h4>Fique à vontade para me mandar uma mensagem!</h4>
        <h6>Contato: (81)99752-4801 - Recife/PE</h6>
        <div className="btn-group">
          <a
            href={cv}
            download
            className="btn btn-light"
          >
            Baixar Currículo
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
