// components/SkillsSection.jsx
import React from 'react';
import skillsData from '../data/skillsData';

const SkillsSection = () => (
  <section id="skills" className="min-h-screen py-20 px-4 border-t border-[#00ff00]/20">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold tracking-[0.2em] text-[#00ff00] mb-12">Technical Skills</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {skillsData.map((category, index) => (
          <div key={index} className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">{category.category}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#222222]/50 rounded-full border border-[#00ff00]/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;

