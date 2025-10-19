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
  
  return (
    <section id="clients" className="py-20 md:py-32 bg-black">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center">
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
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-16">
            {getTranslation(language, 'clientsDescription')}
          </p>
        </AnimatedSection>

        {/* Main Clients Image - Smaller */}
        <AnimatedSection className="mb-12">
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 max-w-5xl mx-auto">
            {clients.map((client) => (
              <AnimatedSection key={client.id}>
                <div 
                  className="bg-gray-900/50 p-4 md:p-6 rounded-lg flex items-center justify-center h-24 md:h-28 border border-gray-800 hover:border-red-500/50 transition-all duration-300 transform hover:-translate-y-1 group backdrop-blur-sm"
                  style={{
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(239, 68, 68, 0.25), 0 0 30px rgba(239, 68, 68, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <img 
                    src={client.imageUrl} 
                    alt={client.name}
                    loading="lazy"
                    decoding="async"
                    className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-110"
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
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
