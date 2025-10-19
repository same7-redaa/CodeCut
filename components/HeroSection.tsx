import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../i18n';
import AnimatedSection from './AnimatedSection';
// Background image placed at project root as: download (4).jpg
// Use Vite's ?url import for robust path resolution
import heroBgUrl from '../download (4).jpg?url';
import logoUrl from '../logo (2).png?url';

const HeroSection: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-black overflow-hidden">
      {/* Background image layer with blur */}
      <img
        src={heroBgUrl}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0 select-none"
        draggable={false}
        aria-hidden="true"
        style={{ filter: 'blur(2px)' }}
      />
      
      {/* Black overlay layer */}
      <div className="absolute inset-0 bg-black/40 z-[0.5]" />

      {/* Bottom black gradient to fade the image edge */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1]"
        style={{
          height: '40vh',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))',
        }}
      />

      <div className="container mx-auto px-6 text-center relative z-10">
        <AnimatedSection>
          {/* Logo */}
          <div className="mb-8">
            <img 
              src={logoUrl}
              alt="Code Cut Logo"
              className="w-40 h-40 md:w-60 md:h-60 lg:w-72 lg:h-72 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96 mx-auto object-contain"
              style={{
                filter: 'drop-shadow(0 0 25px rgba(239, 68, 68, 0.6))',
              }}
            />
          </div>

          {/* Brand Name */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-tight" style={{
            fontFamily: '"BBH Sans Bogle", "Impact", "Arial Black", "Helvetica", sans-serif',
            fontWeight: '900',
            letterSpacing: '6px',
            fontStyle: 'normal',
            textTransform: 'uppercase',
            WebkitTextStroke: '1px rgba(255, 255, 255, 0.05)',
            textStroke: '1px rgba(255, 255, 255, 0.05)'
          }}>
            <span className="text-white" style={{
              textShadow: '0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.5), 0 4px 8px rgba(0, 0, 0, 0.7)',
              filter: 'contrast(1.3) brightness(1.2) saturate(1.1)',
            }}>Code Cut</span>
          </h1>
          
          {/* Tagline */}
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 font-bold max-w-4xl mx-auto mb-12 tracking-wide">
            {getTranslation(language, 'tagline')}
          </p>
          <button
            onClick={() => {
              const servicesSection = document.getElementById('services');
              servicesSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-3 bg-red-600 text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-red-700 transition-transform transform hover:scale-105 duration-300"
            style={{
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.5), 0 0 40px rgba(239, 68, 68, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(239, 68, 68, 0.8), 0 0 60px rgba(239, 68, 68, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.5), 0 0 40px rgba(239, 68, 68, 0.3)';
            }}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </svg>
            {getTranslation(language, 'orderNow')}
          </button>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default HeroSection;