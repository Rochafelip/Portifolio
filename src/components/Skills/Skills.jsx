import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Skill.css';

const frontendSkills = [
  { name: 'React', icon: 'devicon-react-original colored' },
  { name: 'Vue.js', icon: 'devicon-vuejs-plain colored' },
  { name: 'Angular', icon: 'devicon-angularjs-plain colored' },
  { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
  { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
];

const backendSkills = [
  { name: 'Ruby', icon: 'devicon-ruby-plain colored' },
  { name: 'Ruby on Rails', icon: 'devicon-rails-plain colored' },
  { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
  { name: 'Java', icon: 'devicon-java-plain colored' },
  { name: 'Spring Boot', icon: 'devicon-spring-plain colored' },
];

const devopsSkills = [
  { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
  { name: 'MySQL', icon: 'devicon-mysql-plain colored' },
  { name: 'Docker', icon: 'devicon-docker-plain colored' },
  { name: 'Git & GitHub', icon: 'devicon-git-plain colored' },
  { name: 'Postman', icon: 'bi-send' },
];

const renderSkillsColumn = (title, skills) => (
  <div className="SkillsColumn col-12 col-md-4 mb-4">
    <h4 className="text-light text-center mb-4">{title}</h4>
    <div className="skills-box">
      {skills.map((skill, index) => (
        <div key={index} className="text-center skill-item">
          <i className={`${skill.icon} skill-icon`}></i>
          <p className="text-light">{skill.name}</p>
        </div>
      ))}
    </div>
  </div>
);

const Skills = () => {
  return (
    <section className="skills-section py-2" id="habilidades">
      <h2 className="TextHabilidades text-center mb-2">Habilidades Técnicas</h2>
      <div className="container">        
        <div className="row skills-wrapper">
          {renderSkillsColumn('Frontend', frontendSkills)}
          {renderSkillsColumn('Backend', backendSkills)}
          {renderSkillsColumn('Banco de Dados', devopsSkills)}
        </div>
      </div>
    </section>
  );
};

export default Skills;
