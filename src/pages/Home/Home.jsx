import React from 'react';
import Header from '../../components/Header/Header';
import ProfileBanner from '../../components/ProfileBanner/ProfileBanner';
import AboutMe from '../../components/AboutMe/AboutMe';
import Skills from '../../components/Skills/Skills';
import ProjectsSlider from '../../components/ProjectsSlider/ProjectsSlider'
import Footer from '../../components/Footer/Footer';
import ContactSection from '../../components/ContactSection/ContactSection';

function Home() {
  return (
    
    <div className="pt-20">
      <Header />
      <ProfileBanner />
      <AboutMe />
      <Skills />
      <ProjectsSlider username="Rochafelip" />
      <ContactSection />
      <Footer />      
    </div>
  );
}

export default Home;
