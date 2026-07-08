import React from 'react';
import './AboutMe.css';

const AboutMe = () => {
  return (
    <section className="about-me-section" id="about-me">
      <div className="about-me-wrapper">
        <h2 className="section-title px-3">Sobre Mim</h2>

        <div className="about-me-columns">
          <div className="experience-block">
            <h3>Experiências Profissionais</h3>

            <div className="timeline">
              <div className="timeline-item">
                <h5>Desenvolvedor Full Stack — EY</h5>
                <p>
                  Desenvolvimento full stack com Java no backend e Angular no frontend, atuando na construção de microsserviços e em melhorias de desempenho.
                </p>
                <small>Set 2025 – Atual</small>
              </div>

              <div className="timeline-item">
                <h5>Desenvolvedor Full Stack Ruby — Projeto ESG</h5>
                <p>
                  Construção de API RESTful com autenticação JWT, dashboards interativos e controle de indicadores GRI/ODS usando Rails e React.
                </p>
                <small>Maio 2025 – Set 2025</small>
              </div>

              <div className="timeline-item">
                <h5>Desenvolvedor Full Stack Ruby — Softex PE</h5>
                <p>
                  Aplicação full-stack com Hotwire e API Rails, testes com RSpec, autenticação segura e experiência em tempo real com Turbo.
                </p>
                <small>Fev 2024 – Abr 2025</small>
              </div>

              <div className="timeline-item">
                <h5>Suporte em Informática — TRE-PE</h5>
                <p>
                  Manutenção de estações Linux/Windows, monitoramento de rede e documentação técnica em ambiente público.
                </p>
                <small>Mar 2023 – Dez 2023</small>
              </div>

              <div className="timeline-item">
                <h5>Trainee Java Developer — BRX Retail</h5>
                <p>
                  Aprendizado acelerado em Oracle APEX e PL/SQL, com foco em queries otimizadas e participação em reuniões técnicas.
                </p>
                <small>Ago 2022 – Fev 2023</small>
              </div>

              <div className="timeline-item">
                <h5>Desenvolvedor Full Stack — SiDi</h5>
                <p>
                  App desktop com C# e UWP, consumo da PokéAPI e persistência local com NoSQL, priorizando UX e desempenho.
                </p>
                <small>Out 2021 – Jun 2022</small>
              </div>
            </div>
          </div>

          <div className="about-details">
            <div className="about-me-text">
              <p>
                Desenvolvedor de software com foco na construção de aplicações web completas, utilizando Ruby on Rails no backend. Para criar soluções robustas e entregar valor real aos projetos, também possuo conhecimento prático em tecnologias frontend como React.js, JavaScript, HTML e CSS. Com formação em Ciência da Computação e experiência com APIs, TDD e banco de dados como PostgreSQL, valorizo a escrita de código limpo, a colaboração em equipe e a entrega de produtos de alta qualidade.
              </p>
            </div>

            <div className="education-block">
              <h4>Formação Acadêmica</h4>
              <p className="mb-0">Bacharel em Ciência da Computação</p>
              <small>Universidade Católica de Pernambuco (UNICAP)</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
