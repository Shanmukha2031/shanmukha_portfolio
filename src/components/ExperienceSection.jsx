// components/ExperienceSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { CircuitBoard } from 'lucide-react';
import experiences from '../data/experiences';
import diode from '../assets/diode.png';
import mem from '../assets/mem.png';

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Header section remains the same */}
      <div className="max-w-5xl mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-24 relative"
        >
          {/* Header content remains the same */}
          <div className="inline-block relative">
            <svg className="absolute -left-12 -top-8" width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="2" fill="#7B68EE" />
              <path 
                d="M0 20 H15 M25 20 H40 M20 0 V15 M20 25 V40" 
                stroke="#7B68EE" 
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            <svg className="absolute -right-12 -top-8" width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="2" fill="#7B68EE" />
              <path 
                d="M0 20 H15 M25 20 H40 M20 0 V15 M20 25 V40" 
                stroke="#7B68EE" 
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            <h2 className="text-5xl font-bold tracking-wide px-16">
              <span className="text-transparent bg-clip-text bg-gradient-to-r 
                             from-[#7B68EE] via-[#9370DB] to-[#8A2BE2]">
                Professional Experience
              </span>
            </h2>

            <div className="mt-4 flex justify-center items-center space-x-4">
              <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#7B68EE]" />
              <CircuitBoard className="w-8 h-8 text-[#7B68EE]" />
              <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#7B68EE]" />
            </div>
          </div>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Simple connecting line */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px]">
            <div className="h-full w-full bg-gradient-to-b from-transparent via-[#40E0D0] to-transparent" />
          </div>

          {/* Experience Cards */}
          <div className="space-y-20">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="relative pl-12"
              >
                {/* Timeline Node with Memory Icon */}
                <div className="absolute left-0 top-0 -translate-x-1/2">
                  <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] border-2 border-[#40E0D0] 
                                flex items-center justify-center transform rotate-45
                                overflow-hidden group">
                    <img 
                      src={mem} 
                      alt="memory" 
                      className="w-5 h-5 object-contain -rotate-45 opacity-70
                               group-hover:opacity-100 transition-opacity duration-300" 
                    />
                  </div>
                </div>

                {/* Experience Card - Content remains the same */}
                <div className="relative group">
                  <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-lg p-8 
                               border border-[#40E0D0]/20 hover:border-[#40E0D0]/40 
                               transition-all duration-500">
                    {/* Header */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-[#FF6B6B] mb-3 
                                   group-hover:text-[#FF8787] transition-colors">
                        {exp.position}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-base">
                        <span className="text-[#4FFFB0] font-semibold">{exp.company}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#40E0D0]/60" />
                        <span className="text-[#87CEEB]">{exp.location}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#40E0D0]/60" />
                        <span className="text-[#DDA0DD] font-mono">{exp.date}</span>
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.split(', ').map((tech, idx) => (
                          <span 
                            key={idx}
                            className="px-4 py-1.5 text-sm rounded-full bg-[#40E0D0]/10 
                                     text-[#40E0D0] border border-[#40E0D0]/20
                                     hover:border-[#40E0D0]/40 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Experience Points */}
                    <ul className="space-y-4">
                      {exp.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-4 group/item">
                          <img 
                            src={diode} 
                            alt="bullet" 
                            className="w-4 h-4 mt-1.5 opacity-60"
                          />
                          <span className="text-gray-300 leading-relaxed text-base">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
