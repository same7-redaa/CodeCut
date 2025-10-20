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

// Real client testimonial images from public folder
const testimonialImages = [
  '/testimonials/testimonial-1.jpeg',
  '/testimonials/testimonial-2.jpeg',
  '/testimonials/testimonial-3.jpeg',
  '/testimonials/testimonial-4.jpeg',
  '/testimonials/testimonial-5.jpeg',
  '/testimonials/testimonial-6.jpeg',
  '/testimonials/testimonial-7.jpeg',
  '/testimonials/testimonial-8.jpeg',
  '/testimonials/testimonial-9.jpeg',
  '/testimonials/testimonial-10.jpeg',
  '/testimonials/testimonial-11.jpeg',
  '/testimonials/testimonial-12.jpeg',
];

const TestimonialsSection: React.FC = () => {
  const { language } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Auto-rotate testimonials every 4 seconds
  useEffect(() => {
    if (testimonialImages.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialImages.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [testimonialImages.length]);

  // Handle touch events for swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50; // Minimum distance for swipe

    if (distance > minSwipeDistance) {
      // Swipe left - go to next image
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialImages.length);
    }
    
    if (distance < -minSwipeDistance) {
      // Swipe right - go to previous image
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonialImages.length) % testimonialImages.length);
    }
  };

  // Handle mouse drag events
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setTouchStart(e.clientX);
    setTouchEnd(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setTouchEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialImages.length);
    }
    
    if (distance < -minSwipeDistance) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonialImages.length) % testimonialImages.length);
    }
  };

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

        {/* Testimonials Grid */}
        <div className="w-full">
          {/* Add CSS for modal */}
          <style dangerouslySetInnerHTML={{
            __html: `
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
                backdrop-filter: blur(5px);
              }

              /* Testimonials Grid Styles */
              .testimonials-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr); /* Mobile: 2 columns */
                gap: 1rem;
                padding: 2rem 0;
                justify-items: center;
                max-width: 1200px;
                margin: 0 auto;
              }

              @media (min-width: 640px) {
                .testimonials-grid {
                  grid-template-columns: repeat(3, 1fr); /* Tablet: 3 columns */
                  gap: 1.5rem;
                }
              }

              @media (min-width: 768px) {
                .testimonials-grid {
                  grid-template-columns: repeat(4, 1fr); /* Desktop small: 4 columns */
                  gap: 2rem;
                }
              }

              @media (min-width: 1024px) {
                .testimonials-grid {
                  grid-template-columns: repeat(5, 1fr); /* Desktop: 5 columns */
                  gap: 2rem;
                }
              }

              @media (min-width: 1280px) {
                .testimonials-grid {
                  grid-template-columns: repeat(6, 1fr); /* Large desktop: 6 columns */
                  gap: 2.5rem;
                }
              }

              .testimonial-item {
                cursor: pointer;
                transition: all 0.3s ease;
              }

              .testimonial-item img {
                width: 140px;
                height: 140px;
                border-radius: 16px;
                box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3);
                transition: all 0.3s ease;
                object-fit: cover;
              }

              .testimonial-item:hover img {
                transform: scale(1.05);
                box-shadow: 0 12px 30px rgba(239, 68, 68, 0.5);
              }

              @media (min-width: 640px) {
                .testimonial-item img {
                  width: 160px;
                  height: 160px;
                }
              }

              @media (min-width: 1024px) {
                .testimonial-item img {
                  width: 180px;
                  height: 180px;
                }
              }

              /* Modal Styles */
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
                backdrop-filter: blur(5px);
              }

              .modal-content {
                background: #1a1a1a;
                border-radius: 1rem;
                max-width: 95vw;
                max-height: 95vh;
                overflow-y: auto;
                position: relative;
                border: 2px solid #333;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
              }

              .modal-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: rgba(239, 68, 68, 0.9);
                color: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 20px;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                transition: all 0.3s ease;
              }

              .modal-close:hover {
                background: rgba(239, 68, 68, 1);
                transform: scale(1.1);
              }

              .modal-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 2rem;
                padding: 3rem 1.5rem 1.5rem 1.5rem;
                justify-items: center;
                align-items: start;
              }

              .modal-image {
                width: auto;
                height: auto;
                max-width: 100%;
                max-height: none;
                border-radius: 12px;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
                transition: all 0.3s ease;
                object-fit: contain;
              }

              .modal-image:hover {
                transform: scale(1.05);
                box-shadow: 0 15px 40px rgba(239, 68, 68, 0.4);
              }

              @media (min-width: 640px) {
                .modal-grid {
                  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                  gap: 1.5rem;
                  padding: 3rem 2rem 2rem 2rem;
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

          {/* Three Images Layout - Center with sides */}
          <div className="relative w-full max-w-4xl mx-auto px-4 py-8">
            <div 
              className="flex items-center justify-center relative min-h-80 md:min-h-96 py-8 select-none cursor-grab active:cursor-grabbing"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Previous Button */}
              <button
                onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonialImages.length) % testimonialImages.length)}
                className="absolute left-2 md:left-4 z-30 bg-red-600 hover:bg-red-700 text-white rounded-full p-3 md:p-4 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label={language === 'en' ? 'Previous image' : 'الصورة السابقة'}
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={language === 'en' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
                </svg>
              </button>

              {/* Left Background Image */}
              <div className="absolute left-12 md:left-20 z-10 opacity-60 transform -rotate-12 scale-75">
                <img 
                  src={testimonialImages[(currentIndex - 1 + testimonialImages.length) % testimonialImages.length]} 
                  alt="آراء عملائنا"
                  className="max-w-[8rem] max-h-48 md:max-w-[10rem] md:max-h-60 w-auto h-auto object-contain rounded-2xl shadow-lg border-2 border-red-500/20 transition-all duration-1000"
                />
              </div>
              
              {/* Center Main Image */}
              <div className="relative z-20 cursor-pointer transform transition-all duration-500 hover:scale-105">
                <img 
                  src={testimonialImages[currentIndex]} 
                  alt="آراء عملائنا الرئيسية"
                  className="max-w-xs max-h-96 md:max-w-md md:max-h-[28rem] lg:max-w-lg lg:max-h-[32rem] w-auto h-auto object-contain rounded-3xl shadow-2xl border-4 border-red-500/30 hover:border-red-500/60 transition-all duration-500"
                  onClick={() => {
                    setSelectedImage(testimonialImages[currentIndex]);
                    setShowModal(true);
                  }}
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-3xl blur-sm -z-10"></div>
              </div>
              
              {/* Right Background Image */}
              <div className="absolute right-12 md:right-20 z-10 opacity-60 transform rotate-12 scale-75">
                <img 
                  src={testimonialImages[(currentIndex + 1) % testimonialImages.length]} 
                  alt="آراء عملائنا"
                  className="max-w-[8rem] max-h-48 md:max-w-[10rem] md:max-h-60 w-auto h-auto object-contain rounded-2xl shadow-lg border-2 border-red-500/20 transition-all duration-1000"
                />
              </div>

              {/* Next Button */}
              <button
                onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialImages.length)}
                className="absolute right-2 md:right-4 z-30 bg-red-600 hover:bg-red-700 text-white rounded-full p-3 md:p-4 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label={language === 'en' ? 'Next image' : 'الصورة التالية'}
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={language === 'en' ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'} />
                </svg>
              </button>
            </div>
            
            {/* Swipe Instruction */}
            <div className="text-center mt-4 mb-4">
              <p className="text-gray-500 text-sm">
                {language === 'en' ? 'Tap and drag or swipe to navigate' : 'اضغط واسحب أو مرر للتنقل'}
              </p>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-4 gap-2">
              {testimonialImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-red-500 shadow-lg scale-125' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
            
          </div>


        </div>

        {/* Modal for selected image */}
        {showModal && selectedImage && (
          <div 
            className="modal-overlay"
            onClick={() => {
              setShowModal(false);
              setSelectedImage('');
            }}
          >
            <div 
              className="max-w-4xl max-h-[90vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedImage('');
                }}
                className="absolute -top-4 -right-4 text-white hover:text-red-500 text-2xl font-bold bg-red-600 hover:bg-red-700 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200 z-10 shadow-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Selected image */}
              <img
                src={selectedImage}
                alt="Client testimonial"
                className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl"
                style={{
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;