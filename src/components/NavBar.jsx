// components/NavBar.jsx
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

// Color scheme variants - you can switch between these
const colorSchemes = {
  neonGreen: {
    primary: '#00ff00',
    hover: '#33ff33',
    border: 'border-[#00ff00]/20',
    bg: 'bg-[#1a1a1a]',
  },
  cyberPink: {
    primary: '#ff00ff',
    hover: '#ff33ff',
    border: 'border-[#ff00ff]/20',
    bg: 'bg-[#1a1a1a]',
  },
  neonBlue: {
    primary: '#00ffff',
    hover: '#33ffff',
    border: 'border-[#00ffff]/20',
    bg: 'bg-[#1a1a1a]',
  },
  retroOrange: {
    primary: '#ff8c00',
    hover: '#ffa500',
    border: 'border-[#ff8c00]/20',
    bg: 'bg-[#1a1a1a]',
  }
};

const NavBar = ({ navItems, scrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  // Choose your color scheme here
  const colors = colorSchemes.neonGreen; // or cyberPink, neonBlue, retroOrange

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.toLowerCase()));
      const scrollPosition = window.scrollY + 100;

      const currentSection = sections.find(section => {
        if (!section) return false;
        const offset = section.offsetTop;
        const height = section.offsetHeight;
        return scrollPosition >= offset && scrollPosition < offset + height;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  // Optional: Animated logo variants
  const LogoVariants = () => (
    <div className="flex items-center space-x-2">
      {/* Variant 2: Glowing effect */}
      <span className={`text-2xl font-bold tracking-wider animate-pulse`}
            style={{ 
              color: colors.primary,
              textShadow: `0 0 10px ${colors.primary}`,
            }}>
        &lt;Shanmukha/&gt;
      </span>
    </div>
  );

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 
      ${isScrolled ? `${colors.bg}/95 backdrop-blur-md shadow-lg` : `${colors.bg}/50 backdrop-blur-sm`}
      ${colors.border}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div onClick={() => scrollToSection('home')}
               className="cursor-pointer">
            <LogoVariants />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center flex-1 space-x-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`text-sm transition-all tracking-wider uppercase
                         hover:scale-110 relative group px-4 py-2 rounded-md
                         ${activeSection === item.toLowerCase() ? 
                           `text-[${colors.primary}] bg-[${colors.primary}]/10` : 
                           'hover:text-[${colors.hover}]'}`}
              >
                {item}
                <span className={`absolute -bottom-1 left-0 w-0 h-[1px] bg-[${colors.primary}] 
                               transition-all group-hover:w-full`}></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ color: colors.primary }}
              className="hover:text-[${colors.hover}] transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden
        ${isMobileMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className={`px-4 py-2 ${colors.bg}/95 backdrop-blur-md ${colors.border}`}>
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                scrollToSection(item);
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-3 text-sm transition-colors tracking-wider uppercase
                       ${activeSection === item.toLowerCase() ? 
                         `text-[${colors.primary}]` : 
                         `hover:text-[${colors.hover}]`}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
