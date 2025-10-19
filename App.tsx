import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ClientsSection from './components/ClientsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ServicePortfolio from './pages/ServicePortfolio';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PaymentSection from './components/PaymentSection';
import DeveloperSection from './components/DeveloperSection';
import { prefetchAllData } from './utils/dataPrefetch';

const HomePage: React.FC = () => {
  return (
    <div className="bg-black text-white font-sans overflow-x-hidden">
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ClientsSection />
        <ContactSection />
        <PaymentSection />
      </main>
      <Footer />
      <DeveloperSection />
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
                <Route path="/portfolio/:serviceId" element={<ServicePortfolio />} />
              </Routes>
            </>
          } />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;