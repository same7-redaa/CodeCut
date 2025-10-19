import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import AnimatedSection from './AnimatedSection';

const CompanyVideoSection: React.FC = () => {
  const { language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const youtubeId = 'E5F-TmPoHZQ'; // Extracted from the URL
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <section className="py-20 md:py-32 bg-black">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {language === 'en' ? (
              <>Learn <span 
                className="text-red-500"
                style={{
                  textShadow: '0 0 15px rgba(239, 68, 68, 0.7), 0 0 30px rgba(239, 68, 68, 0.4)',
                }}
              >About Us</span></>
            ) : (
              <>اعرف أكتر <span 
                className="text-red-500"
                style={{
                  textShadow: '0 0 15px rgba(239, 68, 68, 0.7), 0 0 30px rgba(239, 68, 68, 0.4)',
                }}
              >عننا</span></>
            )}
          </h2>
          

        </AnimatedSection>

        {/* Video Section */}
        <AnimatedSection className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">
            {language === 'en' ? 'Watch Our Story' : 'شاهد قصتنا'}
          </h3>
          
          {/* Video Thumbnail */}
          <div className="relative max-w-4xl mx-auto group cursor-pointer" onClick={openModal}>
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src={thumbnailUrl}
                alt="Company Video"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 group-hover:bg-black/20">
                <div 
                  className="w-20 h-20 md:w-24 md:h-24 bg-red-600 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:bg-red-500"
                  style={{
                    boxShadow: '0 0 30px rgba(239, 68, 68, 0.6), 0 0 60px rgba(239, 68, 68, 0.3)',
                  }}
                >
                  <svg 
                    className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
            </div>
            
            {/* Video Title */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h4 className="text-xl md:text-2xl font-bold">
                {language === 'en' ? 'Code Cut - Company Introduction' : 'كود كت - تعريف الشركة'}
              </h4>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={closeModal}>
            <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
              {/* Close Button */}
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* YouTube Embed */}
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title="Company Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CompanyVideoSection;