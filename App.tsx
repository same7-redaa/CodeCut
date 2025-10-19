import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CompanyVideoSection from './components/CompanyVideoSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ClientsSection from './components/ClientsSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ServicePortfolio from './pages/ServicePortfolio';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PaymentSection from './components/PaymentSection';
import { prefetchAllData } from './utils/dataPrefetch';

// Component to scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Multiple attempts to ensure scroll to top works
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    // Immediate scroll
    scrollToTop();
    
    // Fallback scroll after a short delay
    setTimeout(scrollToTop, 10);
    setTimeout(scrollToTop, 50);
  }, [pathname]);

  return null;
};

const HomePage: React.FC = () => {
  return (
    <div className="bg-black text-white font-sans overflow-x-hidden">
      <main>
        <HeroSection />
        <CompanyVideoSection />
        <AboutSection />
        <ServicesSection />
        <ClientsSection />
        <TestimonialsSection />
        <ContactSection />
        <PaymentSection />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  const [dataPreloaded, setDataPreloaded] = useState(false);

  // تحميل البيانات مسبقاً عند بدء التطبيق
  useEffect(() => {
    const loadData = async () => {
      // بدء التحميل في الخلفية
      prefetchAllData().then((success) => {
        setDataPreloaded(success);
      });
    };

    // تأخير بسيط للسماح للصفحة الرئيسية بالعرض أولاً
    const timer = setTimeout(loadData, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Admin Routes - No Header */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          
          {/* Public Routes - With Header */}
          <Route path="/*" element={
            <>
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/portfolio" element={<ServicePortfolio />} />
                <Route path="/portfolio/:serviceId" element={<ServicePortfolio key={window.location.pathname} />} />
              </Routes>
            </>
          } />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;