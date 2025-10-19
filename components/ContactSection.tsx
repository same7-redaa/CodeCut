import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../i18n';
import AnimatedSection from './AnimatedSection';

const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/share/19kqSVvSjP/?mibextid=wwXIfr',
    color: '#1877F2',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/code_cut.agency?igsh=MXU5MWtidHUzMms0YQ==',
    gradient: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@Code-cut',
    color: '#FF0000',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/201002740110',
    color: '#25D366',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    ),
  },
];

const ContactSection: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <section id="contact" className="py-20 md:py-32 bg-black">
       <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {language === 'en' ? (
              <>Let's <span 
                className="text-red-500"
                style={{
                  textShadow: '0 0 15px rgba(239, 68, 68, 0.7), 0 0 30px rgba(239, 68, 68, 0.4)',
                }}
              >Connect</span></>
            ) : (
              <><span 
                className="text-red-500"
                style={{
                  textShadow: '0 0 15px rgba(239, 68, 68, 0.7), 0 0 30px rgba(239, 68, 68, 0.4)',
                }}
              >لنتواصل</span></>
            )}
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">
            {getTranslation(language, 'contactSubtitle')}
          </p>
        </AnimatedSection>

        <AnimatedSection className="max-w-3xl mx-auto">
          {/* Social Media Icons */}
          <div className="flex justify-center items-center gap-6 md:gap-8 mb-12">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label={link.name}
              >
                <div 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  style={{
                    background: link.gradient || link.color,
                    boxShadow: link.color 
                      ? `0 4px 15px ${link.color}66`
                      : '0 4px 15px rgba(225, 48, 108, 0.4)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = link.color 
                      ? `0 8px 30px ${link.color}99`
                      : '0 8px 30px rgba(225, 48, 108, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = link.color 
                      ? `0 4px 15px ${link.color}66`
                      : '0 4px 15px rgba(225, 48, 108, 0.4)';
                  }}
                >
                  <div className="text-white">
                    {link.icon}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Contact Icons - Additional Methods */}
          <div className="flex justify-center items-center gap-6 md:gap-8 mb-12 flex-wrap">
            {/* Email */}
            <a 
              href="mailto:diaamahfouz229@gmail.com"
              className="group relative"
              aria-label="Email"
            >
              <div 
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                style={{
                  background: '#DC2626',
                  boxShadow: '0 4px 15px rgba(220, 38, 38, 0.4)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(220, 38, 38, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(220, 38, 38, 0.4)';
                }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                <span className="text-xs text-gray-400">{language === 'en' ? 'Email' : 'البريد'}</span>
              </div>
            </a>

            {/* Phone */}
            <a 
              href="tel:+201012819721"
              className="group relative"
              aria-label="Phone Call"
            >
              <div 
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                style={{
                  background: '#3B82F6',
                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(59, 130, 246, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.4)';
                }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                <span className="text-xs text-gray-400">{language === 'en' ? 'Call' : 'اتصال'}</span>
              </div>
            </a>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-white mb-4">
              {getTranslation(language, 'readyToStart')}
            </p>
            <p className="text-gray-400 mb-8">
              {getTranslation(language, 'connectWithUs')}
            </p>
            
            {/* WhatsApp Order Button */}
            <a
              href="https://wa.me/201002740110?text=مرحبا%20أريد%20طلب%20خدمة%20من%20كود%20كت"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
              style={{
                boxShadow: '0 0 20px rgba(34, 197, 94, 0.5), 0 0 40px rgba(34, 197, 94, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(34, 197, 94, 0.8), 0 0 60px rgba(34, 197, 94, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(34, 197, 94, 0.5), 0 0 40px rgba(34, 197, 94, 0.3)';
              }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>{language === 'en' ? 'Order Now!' : 'اطلب الآن!'}</span>
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ContactSection;