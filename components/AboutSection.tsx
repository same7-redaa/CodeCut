import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../i18n';
import AnimatedSection from './AnimatedSection';
import aboutImageUrl from '../OC (1).png?url';

const AboutSection: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <section id="about" className="py-20 md:py-32 bg-black">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <div className="relative group">
              <img
                src={aboutImageUrl}
                alt="Code Cut Team"
                className="w-full h-auto object-contain max-w-md lg:max-w-lg mx-auto transform transition-all duration-700 group-hover:scale-105"
                style={{
                  animation: 'fadeInSlideUp 1s ease-out',
                }}
              />
              {/* Animated accent elements */}
              <div 
                className="absolute -top-4 -left-4 w-24 h-24 border-4 border-red-500 opacity-50 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
                style={{
                  animation: 'fadeIn 1.2s ease-out 0.3s both',
                }}
              ></div>
              <div 
                className="absolute -bottom-4 -right-4 w-32 h-32 border-4 border-red-500/30 transition-all duration-500 group-hover:scale-110 group-hover:border-red-500/60"
                style={{
                  animation: 'fadeIn 1.2s ease-out 0.5s both',
                }}
              ></div>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {language === 'en' ? (
                <>Who <span 
                  className="text-red-500"
                  style={{
                    textShadow: '0 0 15px rgba(239, 68, 68, 0.7), 0 0 30px rgba(239, 68, 68, 0.4)',
                  }}
                >We</span> Are</>
              ) : (
                <><span 
                  className="text-red-500"
                  style={{
                    textShadow: '0 0 15px rgba(239, 68, 68, 0.7), 0 0 30px rgba(239, 68, 68, 0.4)',
                  }}
                >من</span> نحن</>
              )}
            </h2>
            <p className="text-gray-300 text-lg mb-4 leading-relaxed">
              {getTranslation(language, 'aboutDescription')}
            </p>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              {getTranslation(language, 'aboutVision')}
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div 
                  className="text-3xl md:text-4xl font-bold text-red-500 mb-1"
                  style={{
                    textShadow: '0 0 10px rgba(239, 68, 68, 0.6), 0 0 20px rgba(239, 68, 68, 0.3)',
                  }}
                >4+</div>
                <div className="text-sm md:text-base text-gray-400">{getTranslation(language, 'yearsExperience')}</div>
              </div>
              <div className="text-center">
                <div 
                  className="text-3xl md:text-4xl font-bold text-red-500 mb-1"
                  style={{
                    textShadow: '0 0 10px rgba(239, 68, 68, 0.6), 0 0 20px rgba(239, 68, 68, 0.3)',
                  }}
                >350+</div>
                <div className="text-sm md:text-base text-gray-400">{getTranslation(language, 'happyClients')}</div>
              </div>
              <div className="text-center">
                <div 
                  className="text-3xl md:text-4xl font-bold text-red-500 mb-1"
                  style={{
                    textShadow: '0 0 10px rgba(239, 68, 68, 0.6), 0 0 20px rgba(239, 68, 68, 0.3)',
                  }}
                >70+</div>
                <div className="text-sm md:text-base text-gray-400">{getTranslation(language, 'companiesTrusted')}</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;