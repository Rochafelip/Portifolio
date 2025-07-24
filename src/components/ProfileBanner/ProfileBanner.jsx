import React from 'react';
import './ProfileBanner.css';

const ProfileBanner = () => {
  return (
    <section id="sobre">
      <div className="container">
        <div className="row align-items-center justify-content-center banner-rounded text-light">
          
          <div className="col-md-4 text-center mb-4 mb-md-0">
            <img
              src="https://avatars.githubusercontent.com/u/174018410?v=4"
              alt="Foto Felipe Rocha"
              className="img-fluid rounded-circle shadow"
              id="foto-perfil"
            />
          </div>

          <div className="col-md-6 text-center text-md-start">
            <h2 className="typing mb-2">Olá, sou o Felipe Rocha</h2>
            <p className="lead mb-3">Desenvolvedor Full Stack | Ruby on Rails & React</p>

            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a
                href="https://github.com/Rochafelip"
                className="social-icon-rounded text-light"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <i className="bi bi-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/feliperochafrs/"
                className="social-icon-rounded text-primary"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <i className="bi bi-linkedin"></i>
              </a>
              <a
                href="mailto:rocha.felipe98@gmail.com"
                className="social-icon-rounded text-light"
                target="_blank"
                rel="noreferrer"
                aria-label="E-mail"
              >
                <i className="bi bi-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileBanner;
