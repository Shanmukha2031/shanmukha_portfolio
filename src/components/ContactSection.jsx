// components/ContactSection.jsx
import React from 'react';
import { Mail, Phone, Linkedin } from 'lucide-react';

const ContactSection = () => (
  <section id="contact" className="min-h-screen py-20 px-4 border-t border-[#00ff00]/20">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold tracking-[0.2em] text-[#00ff00] mb-12">Contact</h2>
      <div className="space-y-6">
        <p className="text-xl">Let's connect and discuss opportunities!</p>
        <div className="flex justify-center space-x-8">
          <a
            href="mailto:srallapalli@binghamton.edu"
            className="flex items-center space-x-2 text-[#00ff00] hover:text-[#33ff33] transition-colors"
          >
            <Mail className="w-6 h-6" />
            <span>Email</span>
          </a>
          <a
            href="tel:+1(607)-788-0415"
            className="flex items-center space-x-2 text-[#00ff00] hover:text-[#33ff33] transition-colors"
          >
            <Phone className="w-6 h-6" />
            <span>Call</span>
          </a>
          <a
            href="https://www.linkedin.com/in/shanmukha20/"
            className="flex items-center space-x-2 text-[#00ff00] hover:text-[#33ff33] transition-colors"
          >
            <Linkedin className="w-6 h-6" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;

