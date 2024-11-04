// components/AboutSection.jsx
import React from 'react';
import { Mail, Github, Linkedin, FileDown } from 'lucide-react';
import profileImg from '../assets/me.jpeg';
import resumePDF from '../assets/shamukharesume.pdf';

const AboutSection = () => {
  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'Shanmukha_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" className="min-h-screen py-20 px-4 border-t border-indigo-400/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold tracking-[0.2em] text-indigo-400 mb-12"
            style={{ fontFamily: "'VT323', monospace" }}>
          About Me
          <span className="block w-24 h-0.5 bg-indigo-400/50 mt-2"></span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <p className="text-xl leading-relaxed animate-fadeIn" 
               style={{ fontFamily: "'VT323', monospace" }}>
              I'm a committed Software Engineer looking for Summer’25 SDE/Firmware Internship Opportunities. Currently pursuing my Masters at Binghamton University, with a strong foundation in programming, embedded systems, and networking protocols and 802.11 Communications (Wi-Fi). My academic journey has equipped me with a solid understanding of algorithms, distributed systems, and object-oriented programming. With professional experience as a Software Development Engineer at Capgemini, I have honed my skills in optimizing software performance, conducting root cause analysis, and integrating complex systems. I have successfully developed kernel processes, implemented virtual file systems, and engineered communication protocols using reinforcement learning.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center gap-4 animate-fadeIn delay-200">
              <button
                onClick={downloadResume}
                className="group flex items-center gap-2 px-6 py-2.5 
                         border border-indigo-400 rounded-md text-indigo-400 text-lg
                         hover:bg-indigo-400/10 transition-all duration-300"
                style={{ fontFamily: "'VT323', monospace" }}
              >
                <FileDown className="w-5 h-5" />
                <span>Download Resume</span>
              </button>
              
              <div className="flex space-x-6 mt-4 sm:mt-0">
                {[
                  { icon: Mail, href: "mailto:srallapalli@binghamton.edu", label: "Email" },
                  { icon: Github, href: "https://github.com/Shanmukha2031", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/shanmukha20/", label: "LinkedIn" }
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300
                             hover:scale-105 transform"
                    aria-label={item.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <item.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="relative max-w-md mx-auto animate-fadeIn delay-300">
            <div className="w-full aspect-square rounded-full overflow-hidden 
                          border border-indigo-400/20 hover:border-indigo-400/30 
                          transition-all duration-500">
              <img
                src={profileImg}
                alt="Shanmukha Subrahmanyam Rallapalli"
                className="w-full h-full object-cover object-top transform 
                         hover:scale-[1.02] transition-transform duration-500"
                style={{ objectPosition: '50% 30%' }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          opacity: 0;
          animation: fadeIn 1s ease-out forwards;
        }

        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
      `}</style>
    </section>
  );
};

export default AboutSection;
