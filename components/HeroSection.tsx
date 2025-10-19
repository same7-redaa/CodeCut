import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../i18n';
import AnimatedSection from './AnimatedSection';
// Background image placed at project root as: download (4).jpg
// Use Vite's ?url import for robust path resolution
import heroBgUrl from '../download (4).jpg?url';

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
          {/* Brand Name */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold mb-6 leading-tight">
            <span className="text-white" style={{
              textShadow: '0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(255, 255, 255, 0.3)',
            }}>Code Cut</span>
          </h1>
          
          {/* Tagline */}
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 font-bold max-w-4xl mx-auto mb-12 tracking-wide">
            {getTranslation(language, 'tagline')}
          </p>
          <a
            href="#contact"
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
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {getTranslation(language, 'orderNow')}
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default HeroSection;