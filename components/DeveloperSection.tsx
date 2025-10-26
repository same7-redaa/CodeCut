import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const DeveloperSection: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="py-8 bg-gradient-to-b from-black to-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4">
          {/* Developer Credit */}
          <p className="text-gray-400 text-sm md:text-base">
            {language === 'en' ? 'Designed & Developed by:' : 'تم التصميم والتطوير بواسطة:'}
            <span className="text-white font-bold mx-2">
              {language === 'en' ? 'Sameh Reda' : 'سامح رضا'}
            </span>
          </p>

          {/* CTA */}
          <p className="text-red-500 font-bold text-base md:text-lg">
            {language === 'en' ? 'Order Your Website Now!' : 'اطلب موقعك الآن!'}
          </p>

          {/* Contact Icons */}
          <div className="flex justify-center items-center gap-6 pt-2">
            {/* WhatsApp */}
            <a
              href="https://wa.me/201023160657"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              aria-label="WhatsApp"
            >
              <div
                className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                style={{
                  background: '#25D366',
                  boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(37, 211, 102, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 211, 102, 0.4)';
                }}
              >
                <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/17PeREgBmo/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              aria-label="Facebook"
            >
              <div
                className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                style={{
                  background: '#1877F2',
                  boxShadow: '0 4px 15px rgba(24, 119, 242, 0.4)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(24, 119, 242, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(24, 119, 242, 0.4)';
                }}
              >
                <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
            </a>

            {/* Website */}
            <a
              href="https://www.doc-digital.online/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              aria-label="Website"
            >
              <div
                className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
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
                <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperSection;
