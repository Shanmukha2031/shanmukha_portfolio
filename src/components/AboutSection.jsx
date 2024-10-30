// components/AboutSection.jsx
import React from 'react';
import { Mail, Github, Linkedin, FileDown, Code, Music, Film, Coffee } from 'lucide-react';
import profileImg from '../assets/me.jpg';
import resumePDF from '../assets/siddhant_chaurasia_resume.pdf';

const AboutSection = () => {
  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'Siddhant_Chaurasia_Resume.pdf';
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
              I'm an <span className="text-indigo-400">Electrical and Computer Engineer</span> with a passion for 
              embedded systems, signal processing, and machine learning. A true tech polyglot, I enjoy diving 
              deep into complex challenges and transforming them into innovative, efficient solutions. Whether 
              it's designing low-power embedded devices, developing cutting-edge signal processing algorithms, 
              or harnessing the power of AI, I thrive on pushing the boundaries of what's possible.
            </p>
            
            <p className="text-xl leading-relaxed animate-fadeIn delay-200" 
               style={{ fontFamily: "'VT323', monospace" }}>
              As a recent <span className="text-indigo-400">Master's graduate from Binghamton University</span>, 
              I am eager to apply my expertise to tackle real-world challenges. I believe in creating technology that not 
              only solves problems but also inspires innovation. My goal is to contribute to projects that push the 
              boundaries of what's possible while making a meaningful impact.
            </p>

            <div className="bg-black/20 p-6 rounded-lg border border-indigo-400/20 
                          backdrop-blur-sm hover:border-indigo-400/30 transition-all duration-500
                          animate-fadeIn delay-300">
              <h3 className="text-xl font-bold mb-4 text-indigo-400" 
                  style={{ fontFamily: "'VT323', monospace" }}>
                In my free time, I enjoy...
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Music, text: "Playing Guitar" },
                  { icon: Film, text: "Shows/Movies" },
                  { icon: Coffee, text: "Coffee Brewing" },
                  { icon: Code, text: "Side Projects" }
                ].map((item, index) => (
                  <div key={index} 
                       className="flex items-center gap-3 hover:translate-x-1 transition-transform duration-300">
                    <item.icon className="w-5 h-5 text-indigo-400" />
                    <span className="text-lg">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center gap-4 animate-fadeIn delay-400">
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
                  { icon: Mail, href: "mailto:schaurasia@binghamton.edu" },
                  { icon: Github, href: "https://github.com/yourusername" },
                  { icon: Linkedin, href: "https://linkedin.com/in/siddchau27" }
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300
                             hover:scale-105 transform"
                    aria-label={item.icon.name}
                  >
                    <item.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="relative max-w-md mx-auto animate-fadeIn delay-500">
            <div className="w-full aspect-square rounded-full overflow-hidden 
                          border border-indigo-400/20 hover:border-indigo-400/30 
                          transition-all duration-500">
              <img
                src={profileImg}
                alt="Siddhant Chaurasia"
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
