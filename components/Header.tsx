import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../i18n';
import logoUrl from '../logo (2).png?url';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId: string) => {
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      
      const sections = ['home', 'about', 'services', 'clients', 'contact'];
      let currentSection = 'home';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
          currentSection = section;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', titleKey: 'home' as const },
    { id: 'about', titleKey: 'about' as const },
    { id: 'services', titleKey: 'services' as const },
    { id: 'clients', titleKey: 'clients' as const },
    { id: 'contact', titleKey: 'contact' as const },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black shadow-lg shadow-red-500/10' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 md:px-6 py-2 md:py-3 flex justify-between items-center">
        <button onClick={() => handleNavClick('home')} className="flex items-center cursor-pointer">
          <img 
            src={logoUrl} 
            alt="CodeCut Logo" 
            className="h-8 md:h-9 w-auto object-contain"
          />
        </button>
        
        {/* Desktop Navigation */}
        <nav className={`hidden lg:flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-6`}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-base font-medium transition-colors duration-300 relative group ${
                activeSection === link.id ? 'text-red-500' : 'text-gray-300 hover:text-white'
              }`}
            >
              {getTranslation(language, link.titleKey)}
              <span
                className={`absolute bottom-0 ${language === 'ar' ? 'right-0' : 'left-0'} w-full h-0.5 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                  activeSection === link.id ? 'scale-x-100' : ''
                }`}
              ></span>
            </button>
          ))}
          
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className={`${language === 'ar' ? 'mr-4' : 'ml-4'} px-3 py-1 text-sm font-medium bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300`}
            style={{
              boxShadow: '0 0 10px rgba(239, 68, 68, 0.3)',
            }}
          >
            {language === 'en' ? 'AR' : 'EN'}
          </button>
        </nav>

        {/* Mobile Controls: Language Toggle + Menu Button */}
        <div className="lg:hidden flex items-center gap-3">
          {/* Mobile Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors duration-300 text-sm"
          >
            {language === 'en' ? 'AR' : 'EN'}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Menu - Full Screen */}
      <div
        className={`fixed inset-0 w-full h-full transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.95) 0%, rgba(0, 0, 0, 0.98) 100%)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="flex flex-col items-center justify-center h-full px-6 text-center relative">
          {/* Close button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Logo */}
          <div className="mb-8">
            <img src={logoUrl} alt="CodeCut Logo" className="h-16 w-auto mx-auto" />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4 mb-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-xl font-bold transition-all duration-300 py-2 ${
                  activeSection === link.id 
                    ? 'text-white scale-110' 
                    : 'text-gray-300 hover:text-white hover:scale-105'
                }`}
                style={{
                  textShadow: activeSection === link.id 
                    ? '0 0 20px rgba(255, 255, 255, 0.5)' 
                    : 'none',
                }}
              >
                {getTranslation(language, link.titleKey)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay - Not needed as menu is full screen now */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 lg:hidden"
          style={{ zIndex: -1 }}
        ></div>
      )}
    </header>
  );
};

export default Header;