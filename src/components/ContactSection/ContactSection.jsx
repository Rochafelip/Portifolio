import React from 'react';
import './ContactSection.css';
import cv from '../../assets/pdf/curriculo.pdf';

const ContactSection = () => {
  return (
    <section id="contato" className="contact-section">
      <div className="container text-center">
        <h2 className="contact-section-title mb-4">Vamos conversar!</h2>
        <h5>Estou sempre disposto a conhecer novas possibilidades e parcerias.</h5>
        <h5>Fique à vontade para me mandar uma mensagem!</h5>
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
