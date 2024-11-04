// App.js
import React, { useCallback } from 'react';
import NavBar from './components/NavBar';
import Background from './components/Background';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import EducationSection from './components/EducationSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
// Removed import for CertificationsSection
import ContactSection from './components/ContactSection';

function App() {
  // Removed 'Certifications' from the navItems array
  const navItems = ['About', 'Experience', 'Education', 'Projects', 'Skills', 'Contact'];
  
  const scrollToSection = useCallback((section) => {
    const element = document.getElementById(section.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#1a1a1a] text-[#e0e0e0] overflow-x-hidden"
         style={{ fontFamily: "'VT323', monospace" }}>
      <Background />
      <div className="relative z-10">
        <NavBar navItems={navItems} scrollToSection={scrollToSection} />
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <ProjectsSection />
        <SkillsSection />
        {/* Removed <CertificationsSection /> */}
        <ContactSection />
      </div>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
        * {
          cursor: default;
        }
        ::selection {
          background: #00ff00;
          color: #000000;
        }
      `}</style>
    </div>
  );
}

export default App;
