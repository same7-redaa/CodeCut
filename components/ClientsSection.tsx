import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../i18n';
import AnimatedSection from './AnimatedSection';
import clientsImageUrl from '../OC (4).png?url';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { getCachedClients } from '../utils/dataPrefetch';

interface Client {
  id: string;
  name: string;
  imageUrl: string;
}

const ClientsSection: React.FC = () => {
  const { language } = useLanguage();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const fetchClients = async () => {
      try {
        // محاولة الحصول على البيانات من الكاش أولاً
        const cachedClients = getCachedClients();
        
        if (cachedClients) {
          // استخدام البيانات المحملة مسبقاً
          setClients(cachedClients);
          setLoading(false);
          console.log('⚡ تم تحميل العملاء فوراً من الكاش');
        } else {
          // تحميل من Firebase إذا لم يكن هناك كاش
          const querySnapshot = await getDocs(collection(db, 'clients'));
          const items: Client[] = [];
          querySnapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() } as Client);
          });
          setClients(items);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Auto-rotate clients every 2 seconds in sequential order
  useEffect(() => {
    if (clients.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // Move to next client in sequence, restart from 0 when reaching end
        const nextIndex = (prevIndex + 1) % clients.length;
        return nextIndex;
      });
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, [clients.length]);
  
  return (
    <section id="clients" className="py-20 md:py-32 bg-black">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {language === 'en' ? (
              <>Our <span 
                className="text-red-500"
                style={{
                  textShadow: '0 0 15px rgba(239, 68, 68, 0.7), 0 0 30px rgba(239, 68, 68, 0.4)',
                }}
              >Clients</span></>
            ) : (
              <><span 
                className="text-red-500"
                style={{
                  textShadow: '0 0 15px rgba(239, 68, 68, 0.7), 0 0 30px rgba(239, 68, 68, 0.4)',
                }}
              >عملاؤنا</span></>
            )}
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            {getTranslation(language, 'clientsDescription')}
          </p>
        </AnimatedSection>
      </div>

      {/* Full width clients strip - outside container for full width */}
      <div className="w-full">
        {/* Main Clients Image - Centered */}
        <AnimatedSection className="mb-12">
          <div className="container mx-auto px-6">
            <div className="relative max-w-md lg:max-w-lg mx-auto group">
              <img
                src={clientsImageUrl}
                alt="Our Clients"
                className="w-full h-auto object-contain transform transition-all duration-700 group-hover:scale-105"
                style={{
                  animation: 'fadeInSlideUp 1s ease-out',
                }}
              />
              {/* Animated accent elements */}
              <div 
                className="absolute -top-3 -left-3 w-20 h-20 border-4 border-red-500 opacity-50 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
                style={{
                  animation: 'fadeIn 1.2s ease-out 0.3s both',
                }}
              ></div>
              <div 
                className="absolute -bottom-3 -right-3 w-24 h-24 border-4 border-red-500/30 transition-all duration-500 group-hover:scale-110 group-hover:border-red-500/60"
                style={{
                  animation: 'fadeIn 1.2s ease-out 0.5s both',
                }}
              ></div>
            </div>
          </div>
        </AnimatedSection>

        {/* Additional Client Logos Grid */}
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            <p className="mt-4 text-gray-400">
              {language === 'en' ? 'Loading clients...' : 'جاري تحميل العملاء...'}
            </p>
          </div>
        ) : clients.length > 0 ? (
          <>
            {/* Add CSS for smooth transitions */}
            <style dangerouslySetInnerHTML={{
              __html: `
                .clients-grid {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  gap: 1rem;
                  flex-wrap: wrap;
                  width: 100%;
                  padding: 2rem 1rem;
                  transition: all 0.5s ease-in-out;
                  animation: fadeInUp 0.5s ease-out;
                }
                
                @keyframes fadeInUp {
                  0% {
                    opacity: 0;
                    transform: translateY(20px);
                  }
                  100% {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
                
                .client-item {
                  flex: 0 0 auto;
                  opacity: 0;
                  animation: slideIn 0.6s ease-out forwards;
                }
                
                .client-item:nth-child(1) { animation-delay: 0.1s; }
                .client-item:nth-child(2) { animation-delay: 0.2s; }
                .client-item:nth-child(3) { animation-delay: 0.3s; }
                .client-item:nth-child(4) { animation-delay: 0.4s; }
                .client-item:nth-child(5) { animation-delay: 0.5s; }
                .client-item:nth-child(6) { animation-delay: 0.6s; }
                
                .client-item img {
                  max-width: 200px;
                  max-height: 150px;
                  min-width: 150px;
                  min-height: 100px;
                }
                
                @keyframes slideIn {
                  0% {
                    opacity: 0;
                    transform: translateX(-20px);
                  }
                  100% {
                    opacity: 1;
                    transform: translateX(0);
                  }
                }
                
                @media (min-width: 640px) {
                  .clients-grid { gap: 1.5rem; }
                  .client-item img {
                    max-width: 250px;
                    max-height: 180px;
                    min-width: 180px;
                    min-height: 120px;
                  }
                }
                
                @media (min-width: 1024px) {
                  .clients-grid { gap: 2rem; }
                  .client-item img {
                    max-width: 300px;
                    max-height: 220px;
                    min-width: 220px;
                    min-height: 150px;
                  }
                }
              `
            }} />
            
            {/* Static clients grid with auto-rotation */}
            <div className="w-full">
              <div className="clients-grid">
                {(() => {
                  // Show clients in sequential order, cycling through all clients
                  const clientsPerView = Math.min(4, clients.length); // Show 4 at a time
                  const displayClients = [];
                  
                  // Get consecutive clients starting from currentIndex
                  for (let i = 0; i < clientsPerView; i++) {
                    const index = (currentIndex + i) % clients.length;
                    displayClients.push(clients[index]);
                  }
                  
                  return displayClients.map((client, index) => (
                    <div 
                      key={`${client.id}-${currentIndex}-${index}`}
                      className="client-item"
                    >
                      <img 
                        src={client.imageUrl} 
                        alt={client.name}
                        loading="lazy"
                        className="w-full h-full object-contain rounded-2xl transition-all duration-300 hover:scale-105 filter brightness-95 hover:brightness-110 shadow-lg hover:shadow-xl"
                      />
                    </div>
                  ));
                })()}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>{language === 'en' ? 'No clients yet' : 'لا يوجد عملاء بعد'}</p>
          </div>
        )}

        {/* Stats below clients */}
        <AnimatedSection>
          <div className="mt-16 text-center">
            <p className="text-2xl md:text-3xl font-bold text-white mb-2">
              {language === 'en' ? (
                <>Join <span className="text-red-500">350+</span> Happy Clients</>
              ) : (
                <>انضم إلى <span className="text-red-500">350+</span> عميل سعيد</>
              )}
            </p>
            <p className="text-gray-400">
              {language === 'en' 
                ? 'Delivering exceptional results since 2020'
                : 'نقدم نتائج استثنائية منذ 2020'}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ClientsSection;
