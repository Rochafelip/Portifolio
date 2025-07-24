import React from 'react';
import fotoFelipe from '../../assets/images/aboutme1.jpg';
import './AboutMe.css';

const AboutMe = () => {
  return (
    <section className="about-me-section" id="about-me">
      <div className="about-me-wrapper">
        <div className="about-me-content">
          <img
            src={fotoFelipe}
            alt="Felipe Rocha"
            className="about-me-img"
          />

          <div className="about-me-text">
            <h2 className="text-light">Sobre Mim</h2>

            <div className="text-block mb-4">
              <p>
                  Desenvolvedor de software com foco na construção de aplicações web completas, utilizando Ruby on Rails no backend. Para criar soluções robustas e entregar valor real aos projetos, também possuo conhecimento prático em tecnologias frontend como React.js, JavaScript, HTML e CSS. Com formação em Ciência da Computação e experiência com APIs, TDD e banco de dados como PostgreSQL, valorizo a escrita de código limpo, a colaboração em equipe e a entrega de produtos de alta qualidade.
              </p>
            </div>
            <h4 className="text-light mb-3">Formação Acadêmica</h4>
            <div className="text-block">              
              <div className="education-item py-1 px-2 mb-3">
                <i className="bi bi-mortarboard text-light"></i>
                <p className="mb-0">
                 Bacharel em Ciência da Computação                           
                </p>             
              </div>
              <div className='py-1 px-2 mb-3'>
                 <p className='mb-1'>
                  Universidade Católica de Pernambuco - (UNICAP)
                </p>    
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
