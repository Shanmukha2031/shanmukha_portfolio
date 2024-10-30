// components/ProjectsSection.jsx
import React from 'react';
import projects from '../data/projects';

const ProjectsSection = () => (
  <section id="projects" className="min-h-screen py-20 px-4 border-t border-[#00ff00]/20">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold tracking-[0.2em] text-[#00ff00] mb-12">Projects</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-[#222222]/50 p-6 rounded-lg border border-[#00ff00]/20 
              hover:border-[#00ff00] transition-all group"
          >
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-sm text-[#00ff00] mb-4">{project.tech}</p>
            <ul className="list-disc ml-4 space-y-2">
              {project.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;

