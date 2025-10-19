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

  const serviceNames: { [key: string]: { en: string; ar: string } } = {
    'video-shooting': { en: 'Video Shooting', ar: 'تصوير الفيديوهات' },
    'video-editing': { en: 'Video Editing', ar: 'مونتاج الفيديوهات' },
    'graphic-design': { en: 'Graphic Design', ar: 'تصميم الجرافيك' },
    'motion-graphics': { en: 'Motion Graphics', ar: 'الموشن جرافيك' },
    'ugc-content': { en: 'UGC / EGC / AGC Content', ar: 'محتوى مُنتج من الجمهور والمجتمع' },
    'voice-over': { en: 'Voice Over', ar: 'التعليق الصوتي' },
    'ads-management': { en: 'Ads Management', ar: 'إدارة الإعلانات الممولة' },
    'visual-identity': { en: 'Visual Identity & Logo Design', ar: 'الهوية البصرية وتصميم الشعار' },
    'web-development': { en: 'Web Design & Development', ar: 'تصميم وتطوير المواقع' },
  };

  const serviceName = serviceNames[serviceId || ''] || { en: 'Portfolio', ar: 'معرض الأعمال' };

  // Fetch categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      if (!serviceId) return;
      
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
                {language === 'en' 
                  ? 'Explore our portfolio of successful projects and see the quality of our work'
                  : 'استكشف معرض أعمالنا من المشاريع الناجحة وشاهد جودة عملنا'}
              </p>
            </AnimatedSection>

            {/* Category Buttons */}
            {!loading && categories.length > 0 && (
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
            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
                <p className="mt-4 text-gray-400">
                  {language === 'en' ? 'Loading...' : 'جاري التحميل...'}
                </p>
              </div>
            )}

            {/* No Categories Message */}
            {!loading && categories.length === 0 && (
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
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 mt-8 space-y-6">
                  {portfolioItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="break-inside-avoid mb-6"
                    >
                      <div className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-red-500 transition-all group relative">
                        {item.mediaType === 'image' ? (
                          <img 
                            src={item.mediaUrl} 
                            alt={item.description || ''} 
                            className="w-full h-auto object-contain"
                            loading="lazy"
                          />
                        ) : (
                          // للفيديو: اكتشاف إذا كان Shorts (رابط يحتوي على /shorts/) أو فيديو عادي
                          <div 
                            className="relative w-full" 
                            style={{ 
                              paddingBottom: item.mediaUrl.includes('/shorts/') ? '177.78%' : '56.25%' 
                            }}
                          >
                            <iframe
                              src={getYouTubeEmbedUrl(item.mediaUrl)}
                              className="absolute top-0 left-0 w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        )}
                        
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
                        
                        {/* معلومات العمل */}
                        {(item.title || item.description || item.buttonText) && (
                          <div className="p-6 bg-gray-900/80 backdrop-blur-sm space-y-4 text-center">
                            {/* العنوان */}
                            {item.title && item.title.trim() && (
                              <h3 className="text-white text-xl font-bold">{item.title}</h3>
                            )}
                            
                            {/* الوصف */}
                            {item.description && item.description.trim() && (
                              <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                            )}
                            
                            {/* زر زيارة الموقع */}
                            {item.buttonText && item.buttonText.trim() && item.buttonLink && item.buttonLink.trim() && (
                              <div className="flex justify-center pt-2">
                                <a
                                  href={item.buttonLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-all group/btn shadow-lg hover:shadow-red-500/50"
                                >
                                  <span>{item.buttonText}</span>
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
                  ))}
                </div>
              </AnimatedSection>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicePortfolio;
