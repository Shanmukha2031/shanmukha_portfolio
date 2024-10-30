// components/EducationSection.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ChevronDown, BookOpen } from 'lucide-react';
import education from '../data/education';
import bing from '../assets/bing.png';
import muj from '../assets/muj.png';

const CourseList = ({ courses, isOpen, toggleOpen, type }) => (
  <div className="mt-4">
    <button
      onClick={toggleOpen}
      className="flex items-center space-x-2 text-amber-400 hover:text-amber-300 
                transition-colors duration-300 mb-4"
    >
      <BookOpen className="w-5 h-5" />
      <span>{type} Coursework</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </button>
    
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-4 p-6 rounded-lg relative
                        bg-gradient-to-br from-[#1a1a1a]/90 to-[#1a1a1a]/50">
            {courses.map((course, idx) => (
              <div key={idx} className="flex items-baseline space-x-3">
                <span className="text-amber-500/50 inline-block w-1">•</span>
                <span className="text-sm text-gray-300 flex-1">{course}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const EducationCard = ({ edu, index, isOpen, toggleOpen }) => {
  const logo = edu.institution.includes('Binghamton') ? bing : muj;
  const isBinghamton = edu.institution.includes('Binghamton');
  
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative flex items-center ${
        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
      } gap-8`}
    >
      {/* Content Card */}
      <div className={`w-full md:w-1/2 ${
        index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'
      }`}>
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 
                         border-amber-400/20"></div>
          <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 
                         border-amber-400/20"></div>
          
          {/* Main content */}
          <div className="p-8 backdrop-blur-sm relative">
            {/* Logo Section with glowing effect */}
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-amber-600/20 
                              rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity 
                              duration-500"></div>
                <div className="w-28 h-28 rounded-full overflow-hidden bg-[#1a1a1a] p-3
                              ring-2 ring-amber-400/20 ring-offset-2 ring-offset-[#1a1a1a]
                              transform group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={logo}
                    alt={edu.institution}
                    className={`w-full h-full object-contain
                              ${isBinghamton ? 'scale-150' : ''}`}
                  />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-fuchsia-500 
                             bg-clip-text text-transparent">
                  {edu.institution}
                </h3>
                {edu.location && (
                  <p className="text-sm text-gray-400 mt-1">{edu.location}</p>
                )}
              </div>

              <div className="relative">
                <div className="absolute left-0 top-0 w-1/4 h-px bg-gradient-to-r 
                              from-transparent to-amber-400/50"></div>
                <div className="absolute right-0 top-0 w-1/4 h-px bg-gradient-to-l 
                              from-transparent to-amber-400/50"></div>
                
                <div className="pt-6">
                  <p className="text-lg text-gray-200 text-center">{edu.degree}</p>
                  <div className="flex justify-center items-center gap-8 mt-3">
                    <p className="text-sm text-amber-400">CGPA: {edu.cgpa}</p>
                    <div className="w-1 h-1 rounded-full bg-amber-400/50"></div>
                    <p className="text-sm text-gray-400">{edu.date}</p>
                  </div>
                </div>
              </div>

              {/* Coursework */}
              {edu.coursework.graduate && (
                <CourseList
                  courses={edu.coursework.graduate}
                  isOpen={isOpen}
                  toggleOpen={toggleOpen}
                  type="Graduate"
                />
              )}
              {edu.coursework.undergraduate && (
                <CourseList
                  courses={edu.coursework.undergraduate}
                  isOpen={isOpen}
                  toggleOpen={toggleOpen}
                  type="Undergraduate"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const EducationSection = () => {
  const [openStates, setOpenStates] = useState({});

  const toggleCourses = (index) => {
    setOpenStates(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section id="education" className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block relative w-fit mx-auto">
            <div className="relative w-20 h-20 mx-auto">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-full h-full border-2 border-dashed 
                        border-amber-500/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-16 h-16 m-auto border-2 border-dashed 
                        border-amber-500/30 rounded-full"
              />
              <div className="absolute inset-0 m-auto w-12 h-12 flex items-center justify-center">
                <GraduationCap className="w-12 h-12 text-amber-400" />
              </div>
            </div>
            <h2 className="text-3xl font-bold tracking-[0.2em] text-amber-400 mt-4">
              Education
            </h2>
          </div>
        </motion.div>

        {/* Education Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px 
                       bg-gradient-to-b from-transparent via-amber-500/20 to-transparent" />

          {/* Education Cards */}
          <div className="space-y-20">
            {education.map((edu, index) => (
              <EducationCard
                key={index}
                edu={edu}
                index={index}
                isOpen={openStates[index]}
                toggleOpen={() => toggleCourses(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
