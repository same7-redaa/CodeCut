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

  // Auto-rotate clients every 3 seconds
  useEffect(() => {
    if (clients.length <= 6) return; // Don't rotate if we have 6 or fewer clients
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.max(1, clients.length - 5));
    }, 3000); // Change every 3 seconds

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
                .client-item {
                  opacity: 0;
                  animation: slideInRotate 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }
                
                .client-item:nth-child(1) { animation-delay: 0.1s; }
                .client-item:nth-child(2) { animation-delay: 0.2s; }
                .client-item:nth-child(3) { animation-delay: 0.3s; }
                .client-item:nth-child(4) { animation-delay: 0.4s; }
                .client-item:nth-child(5) { animation-delay: 0.5s; }
                .client-item:nth-child(6) { animation-delay: 0.6s; }
                
                @keyframes slideInRotate {
                  0% {
                    opacity: 0;
                    transform: scale(0.6) translateY(50px) rotateY(-90deg);
                  }
                  50% {
                    opacity: 0.7;
                    transform: scale(1.1) translateY(-10px) rotateY(10deg);
                  }
                  100% {
                    opacity: 1;
                    transform: scale(1) translateY(0) rotateY(0deg);
                  }
                }

                .client-item img {
                  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                  border: 2px solid transparent;
                }

                .client-item:hover img {
                  transform: scale(1.15) rotate(5deg);
                  box-shadow: 0 15px 35px rgba(239, 68, 68, 0.4);
                  border-color: rgba(239, 68, 68, 0.3);
                  filter: brightness(1.1) contrast(1.1);
                }

                /* Responsive adjustments */
                @media (max-width: 767px) {
                  .client-item img {
                    border-radius: 16px;
                  }
                }

                @media (min-width: 768px) {
                  .client-item img {
                    border-radius: 20px;
                  }
                }
              `
            }} />
            
            {/* Clients with rotation - Show 4 on mobile, 6 on desktop */}
            <div className="w-full overflow-hidden">
              <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 py-8 max-w-6xl mx-auto px-4">
                {(() => {
                  // Show 4 on mobile, 6 on desktop based on total clients
                  const mobileCount = 4;
                  const desktopCount = 6;
                  
                  // If we have fewer clients than needed, show all
                  if (clients.length <= desktopCount) {
                    return clients.map((client, index) => (
                      <div 
                        key={client.id}
                        className="client-item flex justify-center flex-shrink-0"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <img 
                          src={client.imageUrl} 
                          alt={client.name}
                          loading="lazy"
                          className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain rounded-2xl transition-all duration-300 hover:scale-105 filter brightness-95 hover:brightness-110 shadow-lg hover:shadow-xl"
                        />
                      </div>
                    ));
                  }
                  
                  // Show rotating subset - desktop gets 6, mobile gets 4
                  const displayClients = [];
                  for (let i = 0; i < desktopCount; i++) {
                    const index = (currentIndex + i) % clients.length;
                    displayClients.push(clients[index]);
                  }
                  
                  return displayClients.map((client, index) => (
                    <div 
                      key={`${client.id}-${currentIndex}-${index}`}
                      className={`client-item flex justify-center flex-shrink-0 ${
                        index >= mobileCount ? 'hidden md:flex' : ''
                      }`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <img 
                        src={client.imageUrl} 
                        alt={client.name}
                        loading="lazy"
                        className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain rounded-2xl transition-all duration-700 hover:scale-105 filter brightness-95 hover:brightness-110 shadow-lg hover:shadow-xl"
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
