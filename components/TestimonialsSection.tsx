import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import AnimatedSection from './AnimatedSection';

interface Testimonial {
  id: number;
  name: string;
  nameAr: string;
  position: string;
  positionAr: string;
  review: string;
  reviewAr: string;
  image: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ahmed Mostafa',
    nameAr: 'أحمد مصطفى',
    position: 'CEO of Digital Solutions',
    positionAr: 'مدير عام شركة الحلول الرقمية',
    review: 'Code Cut transformed our brand completely. Their creativity and professionalism exceeded our expectations.',
    reviewAr: 'كود كت غيرت براندنا بالكامل. إبداعهم واحترافيتهم فاقت توقعاتنا بكتير.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 5
  },
  {
    id: 2,
    name: 'Fatima Hassan',
    nameAr: 'فاطمة حسن',
    position: 'Marketing Manager',
    positionAr: 'مديرة التسويق',
    review: 'Amazing video production and social media management. Our engagement increased by 300%!',
    reviewAr: 'إنتاج فيديو وإدارة سوشيال ميديا مذهلين. التفاعل زاد 300%!',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    rating: 5
  },
  {
    id: 3,
    name: 'Omar Khaled',
    nameAr: 'عمر خالد',
    position: 'Business Owner',
    positionAr: 'صاحب مشروع',
    review: 'Their motion graphics and branding services helped us stand out in a competitive market.',
    reviewAr: 'خدمات الموشن جرافيك والبراندينج خلتنا نتميز في سوق تنافسي.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 5
  },
  {
    id: 4,
    name: 'Nour Ahmed',
    nameAr: 'نور أحمد',
    position: 'Startup Founder',
    positionAr: 'مؤسسة شركة ناشئة',
    review: 'Professional team, creative solutions, and excellent communication. Highly recommended!',
    reviewAr: 'فريق محترف، حلول إبداعية، وتواصل ممتاز. أنصح بهم بقوة!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 5
  },
  {
    id: 5,
    name: 'Karim Youssef',
    nameAr: 'كريم يوسف',
    position: 'E-commerce Manager',
    positionAr: 'مدير التجارة الإلكترونية',
    review: 'Their ads management service doubled our sales. Amazing ROI and professional service.',
    reviewAr: 'خدمة إدارة الإعلانات ضاعفت مبيعاتنا. عائد مذهل وخدمة احترافية.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    rating: 5
  }
];

// Real client testimonial images from local folder
import testimonial1 from '../testimonials/testimonial-1.jpeg?url';
import testimonial2 from '../testimonials/testimonial-2.jpeg?url';
import testimonial3 from '../testimonials/testimonial-3.jpeg?url';
import testimonial4 from '../testimonials/testimonial-4.jpeg?url';
import testimonial5 from '../testimonials/testimonial-5.jpeg?url';
import testimonial6 from '../testimonials/testimonial-6.jpeg?url';
import testimonial7 from '../testimonials/testimonial-7.jpeg?url';
import testimonial8 from '../testimonials/testimonial-8.jpeg?url';
import testimonial9 from '../testimonials/testimonial-9.jpeg?url';
import testimonial10 from '../testimonials/testimonial-10.jpeg?url';
import testimonial11 from '../testimonials/testimonial-11.jpeg?url';
import testimonial12 from '../testimonials/testimonial-12.jpeg?url';

const testimonialImages = [
  testimonial1,
  testimonial2,
  testimonial3,
  testimonial4,
  testimonial5,
  testimonial6,
  testimonial7,
  testimonial8,
  testimonial9,
  testimonial10,
  testimonial11,
  testimonial12
];

const TestimonialsSection: React.FC = () => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // Auto-rotate images every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);



  return (
    <section className="py-20 md:py-32 bg-black">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {language === 'en' ? (
              <>What Our <span 
                className="text-red-500"
                style={{
                  textShadow: '0 0 15px rgba(239, 68, 68, 0.7), 0 0 30px rgba(239, 68, 68, 0.4)',
                }}
              >Clients Say</span></>
            ) : (
              <>آراء <span 
                className="text-red-500"
                style={{
                  textShadow: '0 0 15px rgba(239, 68, 68, 0.7), 0 0 30px rgba(239, 68, 68, 0.4)',
                }}
              >عملائنا</span></>
            )}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'See what our satisfied clients have to say about their experience working with Code Cut'
              : 'شوف إيه اللي عملاؤنا الراضين بيقولوه عن تجربتهم مع كود كت'}
          </p>
        </AnimatedSection>

        {/* Static testimonials grid with auto-rotation */}
        <div className="w-full">
          {/* Add CSS with different effects - bouncy and colorful */}
          <style dangerouslySetInnerHTML={{
            __html: `
              .testimonials-grid {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 1.5rem;
                flex-wrap: wrap;
                width: 100%;
                padding: 2rem 1rem;
                transition: all 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                animation: bounceIn 0.8s ease-out;
              }
              
              @keyframes bounceIn {
                0% {
                  opacity: 0;
                  transform: scale(0.3) rotate(-10deg);
                }
                50% {
                  opacity: 0.8;
                  transform: scale(1.1) rotate(2deg);
                }
                100% {
                  opacity: 1;
                  transform: scale(1) rotate(0deg);
                }
              }
              
              .testimonial-item {
                flex: 0 0 auto;
                opacity: 0;
                animation: popIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
                position: relative;
              }
              
              .testimonial-item:nth-child(1) { animation-delay: 0.1s; }
              .testimonial-item:nth-child(2) { animation-delay: 0.25s; }
              .testimonial-item:nth-child(3) { animation-delay: 0.4s; }
              .testimonial-item:nth-child(4) { animation-delay: 0.55s; }
              
              @keyframes popIn {
                0% {
                  opacity: 0;
                  transform: scale(0.5) translateY(50px) rotate(15deg);
                }
                70% {
                  opacity: 0.9;
                  transform: scale(1.1) translateY(-10px) rotate(-5deg);
                }
                100% {
                  opacity: 1;
                  transform: scale(1) translateY(0) rotate(0deg);
                }
              }
              
              .testimonial-item img {
                width: 160px;
                height: 200px;
                border-radius: 20px;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                box-shadow: 0 10px 30px rgba(239, 68, 68, 0.2);
              }
              
              .testimonial-item:hover img {
                transform: scale(1.08) rotate(2deg);
                box-shadow: 0 20px 50px rgba(239, 68, 68, 0.4);
                filter: brightness(1.1) contrast(1.1) saturate(1.2);
              }
              
              /* Mobile: Show only 2 images side by side */
              @media (max-width: 639px) {
                .testimonials-grid {
                  gap: 1rem;
                  justify-content: center;
                }
                .testimonial-item img {
                  width: 140px;
                  height: 180px;
                }
              }
              
              @media (min-width: 640px) {
                .testimonials-grid { gap: 2rem; }
                .testimonial-item img {
                  width: 200px;
                  height: 240px;
                }
              }
              
              @media (min-width: 1024px) {
                .testimonials-grid { gap: 2.5rem; }
                .testimonial-item img {
                  width: 240px;
                  height: 280px;
                }
              }

              .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.95);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                padding: 1rem;
              }
              
              .modal-content {
                background: #0f0f0f;
                border-radius: 1rem;
                max-width: 95vw;
                max-height: 95vh;
                overflow-y: auto;
                position: relative;
                border: 2px solid #333;
              }
              
              .modal-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 1rem;
                padding: 1.5rem;
                justify-items: center;
              }
              
              .modal-image {
                width: auto;
                height: auto;
                max-width: 100%;
                max-height: 300px;
                border-radius: 12px;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
                transition: all 0.3s ease;
              }
              
              .modal-image:hover {
                transform: scale(1.05);
                box-shadow: 0 15px 40px rgba(239, 68, 68, 0.3);
              }
              
              @media (min-width: 640px) {
                .modal-grid {
                  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                  gap: 1.5rem;
                  padding: 2rem;
                }
                .modal-image {
                  max-height: 350px;
                }
              }
              
              @media (min-width: 1024px) {
                .modal-grid {
                  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                  gap: 2rem;
                }
                .modal-image {
                  max-height: 400px;
                }
              }
            `
          }} />

          <div className="testimonials-grid">
            {(() => {
              // Show testimonials in sequential order, cycling through all images
              const testimonialsPerView = Math.min(4, testimonialImages.length);
              const displayImages = [];
              
              // Get consecutive images starting from currentIndex
              for (let i = 0; i < testimonialsPerView; i++) {
                const index = (currentIndex + i) % testimonialImages.length;
                displayImages.push(testimonialImages[index]);
              }
              
              return displayImages.map((image, index) => (
                <div 
                  key={`${currentIndex}-${index}`}
                  className={`testimonial-item ${index >= 2 ? 'hidden sm:block' : ''}`}
                >
                  <img 
                    src={image}
                    alt={`Client testimonial ${currentIndex + index + 1}`}
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
              ));
            })()}
          </div>

          {/* View All Button */}
          <div className="text-center mt-8">
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3 mx-auto"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                />
              </svg>
              <span>{language === 'en' ? 'View All Reviews' : 'مشاهدة الآراء'}</span>
            </button>
          </div>
        </div>

        {/* Modal for all images */}
        {showModal && (
          <div 
            className="modal-overlay"
            onClick={() => setShowModal(false)}
          >
            <div 
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-white hover:text-red-500 text-xl font-bold bg-red-600/20 hover:bg-red-600/40 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200 z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Modal header */}
              <div className="text-center p-6 border-b border-gray-600/50 bg-gradient-to-r from-red-600/10 to-red-700/10">
                <h3 className="text-3xl font-bold text-white">
                  {language === 'en' ? 'All Client Reviews' : 'جميع آراء العملاء'}
                </h3>
              </div>

              {/* All images grid */}
              <div className="modal-grid">
                {testimonialImages.map((image, index) => (
                  <div key={index} className="flex justify-center">
                    <img
                      src={image}
                      alt={`Client testimonial ${index + 1}`}
                      className="modal-image object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;