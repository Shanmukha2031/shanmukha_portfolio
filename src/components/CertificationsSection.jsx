// components/CertificationsSection.jsx
import React from 'react';
import certifications from '../data/certifications';

const CertificationCard = ({ cert }) => (
  <div className="bg-[#222222]/50 p-6 rounded-lg border border-[#00ff00]/20 
                hover:border-[#00ff00] transition-all group">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
      <h3 className="text-xl font-bold">{cert.title}</h3>
      <span className="text-sm text-[#00ff00]">{cert.date}</span>
    </div>
    <p className="text-lg text-[#00ff00] mb-2">{cert.issuer}</p>
    <p className="mb-4 text-gray-300">{cert.description}</p>
    {cert.credentialLink && (
      <a
        href={cert.credentialLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-sm text-[#00ff00] hover:text-[#33ff33] 
                 transition-colors group-hover:underline"
      >
        View Credential →
      </a>
    )}
  </div>
);

const CertificationsSection = () => (
  <section id="certifications" className="min-h-screen py-20 px-4 border-t border-[#00ff00]/20">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold tracking-[0.2em] text-[#00ff00] mb-12">Certifications</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {certifications.map((cert, index) => (
          <CertificationCard key={index} cert={cert} />
        ))}
      </div>
    </div>
  </section>
);

export default CertificationsSection;

