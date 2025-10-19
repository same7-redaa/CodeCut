import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import AnimatedSection from '../components/AnimatedSection';
import Footer from '../components/Footer';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { convertYouTubeUrl } from '../utils/mediaConverter';
import { getCachedCategories, getCachedPortfolioItems } from '../utils/dataPrefetch';

interface Category {
  id: string;
  serviceId: string;
  titleEn: string;
  titleAr: string;
}

interface PortfolioItem {
  id: string;
  serviceId: string;
  categoryId: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

const ServicePortfolio: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalItem, setModalItem] = useState<PortfolioItem | null>(null);

  const serviceNames: { [key: string]: { en: string; ar: string } } = {
    'video-shooting': { en: 'Video Shooting', ar: 'تصوير الفيديوهات' },
    'video-editing': { en: 'Video Editing', ar: 'مونتاج الفيديوهات' },
    'graphic-design': { en: 'Graphic Design', ar: 'تصميم الجرافيك' },
    'motion-graphics': { en: 'Motion Graphics', ar: 'الموشن جرافيك' },
    'content-creation': { en: 'Content Creation', ar: 'صناعة المحتوى' },
    'voice-over': { en: 'Voice Over', ar: 'التعليق الصوتي' },
    'ads-management': { en: 'Ads Management', ar: 'إدارة الإعلانات الممولة' },
    'visual-identity': { en: 'Visual Identity & Logo Design', ar: 'الهوية البصرية وتصميم الشعار' },
    'web-development': { en: 'Web Design & Development', ar: 'تصميم وتطوير المواقع' },
  };

  const serviceName = serviceId 
    ? serviceNames[serviceId] || { en: 'Portfolio', ar: 'معرض الأعمال' }
    : { en: 'Our Portfolio', ar: 'معرض أعمالنا' };

  // إغلاق المودال بمفتاح Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setModalItem(null);
      }
    };

    if (modalItem) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [modalItem]);

  // Fetch categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      if (!serviceId) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        // محاولة الحصول على البيانات من الكاش أولاً
        const cachedCategories = getCachedCategories(serviceId);
        
        if (cachedCategories) {
          // استخدام البيانات المحملة مسبقاً
          setCategories(cachedCategories);
          if (cachedCategories.length > 0 && !selectedCategory) {
            setSelectedCategory(cachedCategories[0].id);
          }
          setLoading(false);
          console.log('⚡ تم تحميل الفئات فوراً من الكاش');
        } else {
          // تحميل من Firebase إذا لم يكن هناك كاش
          const q = query(collection(db, 'categories'), where('serviceId', '==', serviceId));
          const querySnapshot = await getDocs(q);
          const items: Category[] = [];
          querySnapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() } as Category);
          });
          setCategories(items);
          
          // Auto-select first category if available
          if (items.length > 0 && !selectedCategory) {
            setSelectedCategory(items[0].id);
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, [serviceId]);

  // Fetch portfolio items when category changes
  useEffect(() => {
    const fetchPortfolioItems = async () => {
      if (!selectedCategory) return;
      
      setLoading(true);
      try {
        // محاولة الحصول على البيانات من الكاش أولاً
        const cachedItems = getCachedPortfolioItems(selectedCategory);
        
        if (cachedItems) {
          // استخدام البيانات المحملة مسبقاً
          setPortfolioItems(cachedItems);
          setLoading(false);
          console.log('⚡ تم تحميل الأعمال فوراً من الكاش');
        } else {
          // تحميل من Firebase إذا لم يكن هناك كاش
          const q = query(
            collection(db, 'portfolioItems'), 
            where('categoryId', '==', selectedCategory)
          );
          const querySnapshot = await getDocs(q);
          const items: PortfolioItem[] = [];
          querySnapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() } as PortfolioItem);
          });
          setPortfolioItems(items);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching portfolio items:', error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioItems();
  }, [selectedCategory]);

  // Convert YouTube URL to embed format (using converter utility)
  const getYouTubeEmbedUrl = (url: string) => {
    return convertYouTubeUrl(url);
  };

  return (
    <div className="bg-black text-white font-sans overflow-x-hidden min-h-screen">
      <main>
        {/* Hero Section with Red Gradient */}
        <section className="min-h-screen flex items-center justify-center relative py-12 md:py-20">
          {/* Red Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/30 via-red-950/15 to-black"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <AnimatedSection className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {language === 'en' ? serviceName.en : serviceName.ar}
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                {!serviceId 
                  ? (language === 'en' 
                      ? 'Choose a service to explore our portfolio of successful projects and see the quality of our work'
                      : 'اختر خدمة لاستكشاف معرض أعمالنا من المشاريع الناجحة وشاهد جودة عملنا')
                  : (language === 'en' 
                      ? 'Explore our portfolio of successful projects and see the quality of our work'
                      : 'استكشف معرض أعمالنا من المشاريع الناجحة وشاهد جودة عملنا')
                }
              </p>
            </AnimatedSection>

            {/* Services Grid - Show when no specific service is selected */}
            {!serviceId && (
              <AnimatedSection>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {Object.entries(serviceNames).map(([id, name]) => (
                    <div
                      key={id}
                      onClick={() => navigate(`/portfolio/${id}`)}
                      className="bg-gray-900/30 rounded-2xl p-8 hover:bg-red-600/20 transition-all duration-300 cursor-pointer border border-red-500/20 hover:border-red-500/50 group"
                      style={{ boxShadow: '0 0 15px rgba(239, 68, 68, 0.2)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 30px rgba(239, 68, 68, 0.5)';
                        e.currentTarget.style.transform = 'translateY(-5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 15px rgba(239, 68, 68, 0.2)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-red-400 transition-colors">
                        {language === 'en' ? name.en : name.ar}
                      </h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                        {language === 'en' 
                          ? 'View portfolio and projects' 
                          : 'عرض المعرض والمشاريع'}
                      </p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            )}

            {/* Category Buttons */}
            {!loading && categories.length > 0 && serviceId && (
              <AnimatedSection>
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-8 py-4 rounded-xl whitespace-nowrap font-semibold transition-all duration-300 border ${
                        selectedCategory === category.id
                          ? 'bg-red-600 text-white border-red-500 scale-110'
                          : 'bg-gray-900/50 text-gray-300 hover:bg-red-600 hover:text-white hover:scale-110 border-red-500/30 hover:border-red-500'
                      }`}
                      style={{
                        boxShadow: selectedCategory === category.id 
                          ? '0 0 30px rgba(239, 68, 68, 0.7)'
                          : '0 0 15px rgba(239, 68, 68, 0.3)',
                      }}
                      onMouseEnter={(e) => {
                        if (selectedCategory !== category.id) {
                          e.currentTarget.style.boxShadow = '0 0 30px rgba(239, 68, 68, 0.7)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedCategory !== category.id) {
                          e.currentTarget.style.boxShadow = '0 0 15px rgba(239, 68, 68, 0.3)';
                        }
                      }}
                    >
                      {language === 'en' ? category.titleEn : category.titleAr}
                    </button>
                  ))}
                </div>
              </AnimatedSection>
            )}

            {/* Loading State */}
            {loading && serviceId && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
                <p className="mt-4 text-gray-400">
                  {language === 'en' ? 'Loading...' : 'جاري التحميل...'}
                </p>
              </div>
            )}

            {/* No Categories Message */}
            {!loading && categories.length === 0 && serviceId && (
              <AnimatedSection>
                <div className="text-center py-12 bg-gray-900/30 rounded-xl border border-gray-800">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  <p className="text-xl text-gray-400">
                    {language === 'en' 
                      ? 'No portfolio items yet. Check back soon!' 
                      : 'لا توجد أعمال بعد. تحقق لاحقاً!'}
                  </p>
                </div>
              </AnimatedSection>
            )}

            {/* Portfolio Items Grid */}
            {!loading && selectedCategory && portfolioItems.length > 0 && (
              <AnimatedSection>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                  {portfolioItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="group cursor-pointer"
                      onClick={() => setModalItem(item)}
                    >
                      <div className="bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-800 hover:border-red-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20">
                        <div className="relative aspect-square">
                          {item.mediaType === 'image' ? (
                            <img 
                              src={item.mediaUrl} 
                              alt={item.description || ''} 
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="relative w-full h-full bg-black flex items-center justify-center">
                              <iframe
                                src={getYouTubeEmbedUrl(item.mediaUrl)}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          )}
                          
                          {/* Overlay للتوضيح أنه قابل للنقر */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10 backdrop-blur-sm rounded-full p-4">
                              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        {/* Badge للنوع */}
                        <div className="absolute top-3 right-3 bg-black/70 px-3 py-1.5 rounded-full text-xs text-white flex items-center gap-1.5 z-10 backdrop-blur-sm">
                          {item.mediaType === 'image' ? (
                            <>
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                              </svg>
                              {language === 'en' ? 'Image' : 'صورة'}
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                              </svg>
                              {item.mediaUrl.includes('/shorts/') 
                                ? (language === 'en' ? 'Short' : 'شورت')
                                : (language === 'en' ? 'Video' : 'فيديو')}
                            </>
                          )}
                        </div>
                        
                        {/* Badge للنوع */}
                        <div className="absolute top-3 right-3 bg-black/70 px-3 py-1.5 rounded-full text-xs text-white flex items-center gap-1.5 z-10 backdrop-blur-sm">
                          {item.mediaType === 'image' ? (
                            <>
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                              </svg>
                              {language === 'en' ? 'Image' : 'صورة'}
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                              </svg>
                              {item.mediaUrl.includes('/shorts/') 
                                ? (language === 'en' ? 'Short' : 'شورت')
                                : (language === 'en' ? 'Video' : 'فيديو')}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            )}
          </div>
        </section>
      </main>

      {/* Modal للعرض بالحجم الطبيعي */}
      {modalItem && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setModalItem(null)}
        >
          <div className="relative max-w-4xl max-h-full w-full">
            {/* زر الإغلاق */}
            <button
              onClick={() => setModalItem(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* المحتوى */}
            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              {modalItem.mediaType === 'image' ? (
                <img 
                  src={modalItem.mediaUrl} 
                  alt={modalItem.description || ''} 
                  className="w-full max-h-[80vh] object-contain"
                />
              ) : (
                <div 
                  className="relative w-full bg-black" 
                  style={{ 
                    paddingBottom: modalItem.mediaUrl.includes('/shorts/') ? '177.78%' : '56.25%',
                    maxHeight: '80vh'
                  }}
                >
                  <iframe
                    src={getYouTubeEmbedUrl(modalItem.mediaUrl)}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {/* معلومات العمل في المودال */}
              {(modalItem.title || modalItem.description || modalItem.buttonText) && (
                <div className="p-6 space-y-4 text-center">
                  {modalItem.title && modalItem.title.trim() && (
                    <h3 className="text-white text-2xl font-bold">{modalItem.title}</h3>
                  )}
                  
                  {modalItem.description && modalItem.description.trim() && (
                    <p className="text-gray-300 leading-relaxed">{modalItem.description}</p>
                  )}
                  
                  {modalItem.buttonText && modalItem.buttonText.trim() && modalItem.buttonLink && modalItem.buttonLink.trim() && (
                    <div className="flex justify-center pt-2">
                      <a
                        href={modalItem.buttonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-all group/btn shadow-lg hover:shadow-red-500/50"
                      >
                        <span>{modalItem.buttonText}</span>
                        <svg 
                          className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          style={{ transform: language === 'ar' ? 'scaleX(-1)' : 'none' }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ServicePortfolio;
