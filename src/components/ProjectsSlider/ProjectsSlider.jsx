import React, { useEffect, useState } from 'react';
import { fetchGitHubRepos } from '../../utils/fetchGitHubRepos';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ProjectsSlider.css';

const ProjectsSlider = ({ username }) => {
  const [repos, setRepos] = useState([]);

useEffect(() => {
  const load = async () => {
    const result = await fetchGitHubRepos(username);
    setRepos(result);
  };
  load();
}, [username]);

  return (
    <section id="projetos" className="projects-slider-section my-1">
      <div className="container py-2 px-2">
        <h2 className="TextContainer text-center mb-2">Projetos no GitHub</h2>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
          }}
        >
          {repos.map((repo) => (
            <SwiperSlide key={repo.id}>
              <div className="project-card rounded shadow-sm p-4 d-flex flex-column justify-content-between h-100">
                <div className="flex-grow-1">
                  <div className="project-image mb-4">
                    <img
                      src={repo.image}
                      alt={repo.displayName}
                      className="img-fluid rounded"
                    />
                  </div>
                  <h4 className="text-light">{repo.displayName}</h4>
                  <p className="text-light small">
                    {repo.description || 'Sem descrição.'}
                  </p>
                  <p className="text-light small">
                    {repo.languages || 'Não definidas'}
                  </p>
                </div>
                <div className="mb-0 d-flex justify-content-between align-items-center">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2 px-3 btn btn-sm btn-outline-light w-70"
                  >
                    Ver Projeto
                  </a>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2 px-3 btn btn-sm btn-outline-light w-70"
                  >
                    Ver no GitHub
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProjectsSlider;
