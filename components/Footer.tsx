import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../i18n';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <footer className="bg-black py-8 border-t border-gray-800">
      <div className="container mx-auto px-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} CodeCut. {getTranslation(language, 'allRightsReserved')}</p>
        <p className="text-sm mt-2">{getTranslation(language, 'digitalMarketing')}</p>
      </div>
    </footer>
  );
};

export default Footer;