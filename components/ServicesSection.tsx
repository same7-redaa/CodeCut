import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../i18n';
import AnimatedSection from './AnimatedSection';
import servicesImageUrl from '../OC (2).png?url';

const ServicesSection: React.FC = () => {
  const { language } = useLanguage();
  
  const services = [
  {
    id: 'video-shooting',
    image: '/services/تصوير.jpg',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    titleEn: 'Video Shooting',
    titleAr: 'تصوير الفيديوهات',
    descriptionEn: 'Professional shooting for advertising and promotional content using high-quality equipment, focusing on angles and lighting that reflect your brand identity.',
    descriptionAr: 'تصوير احترافي للمحتوى الإعلاني والترويجي باستخدام معدات عالية الجودة، مع التركيز على الزوايا والإضاءة التي تعكس هوية البراند.',
  },
  {
    id: 'video-editing',
    image: '/services/مونتاج الفيديوهات.jpg',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    titleEn: 'Video Editing',
    titleAr: 'مونتاج الفيديوهات',
    descriptionEn: 'Professional video editing including scene cutting, color correction, visual and audio effects, transforming raw footage into a compelling story.',
    descriptionAr: 'تحرير احترافي للفيديوهات يشمل تقطيع المشاهد، تصحيح الألوان، إضافة مؤثرات بصرية وصوتية، وتحويل المادة الخام إلى قصة جذابة.',
  },
  {
    id: 'graphic-design',
    image: '/services/تصميم جرافيك.jpg',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    titleEn: 'Graphic Design',
    titleAr: 'تصميم الجرافيك',
    descriptionEn: 'Distinctive static designs including posters, banners, social media posts, and visual elements that express your brand identity.',
    descriptionAr: 'تصميمات ثابتة مميزة تشمل البوسترات، البنرات، منشورات السوشيال ميديا، والعناصر البصرية التي تعبر عن هوية البراند.',
  },
  {
    id: 'motion-graphics',
    image: '/services/موشن جرافيك.jpg',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    titleEn: 'Motion Graphics',
    titleAr: 'الموشن جرافيك',
    descriptionEn: 'Animated motion videos that explain ideas and services in a visually appealing way, using animations and dynamic text.',
    descriptionAr: 'فيديوهات موشن متحركة تشرح الأفكار والخدمات بشكل بصري جذاب، باستخدام الرسوم المتحركة والنصوص الديناميكية.',
  },
  {
    id: 'content-creation',
    image: '/services/صناعة محتوي.jpg',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    titleEn: 'Content Creation',
    titleAr: 'صناعة المحتوى',
    descriptionEn: 'Professional content creation for social media, blogs, and marketing campaigns that engages your audience and drives results.',
    descriptionAr: 'صناعة محتوى احترافي لمنصات التواصل الاجتماعي والمدونات والحملات التسويقية بما يجذب جمهورك ويحقق النتائج.',
  },
  {
    id: 'voice-over',
    image: '/services/صناعة محتوي.jpg',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    titleEn: 'Voice Over',
    titleAr: 'التعليق الصوتي',
    descriptionEn: 'Professional voice recordings for ads, explainer videos, and motion graphics with diverse voices and high quality.',
    descriptionAr: 'تسجيلات صوتية احترافية تناسب الإعلانات، الفيديوهات التوضيحية، والموشن جرافيك، بأصوات متنوعة وجودة عالية.',
  },
  {
    id: 'ads-management',
    image: '/services/اعلانات ممولة.jpg',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    titleEn: 'Ads Management',
    titleAr: 'إدارة الإعلانات الممولة',
    descriptionEn: 'Planning and managing ad campaigns on social media and search engines to achieve the best ROI.',
    descriptionAr: 'إعداد وإدارة الحملات الإعلانية على منصات التواصل الاجتماعي ومحركات البحث لتحقيق أفضل عائد على الاستثمار.',
  },
  {
    id: 'visual-identity',
    image: '/services/هوية بصرية.jpg',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    titleEn: 'Visual Identity & Logo Design & Branding',
    titleAr: 'الهوية البصرية وتصميم الشعار والبراندينج',
    descriptionEn: 'Building a complete visual identity and designing professional logos that express your brand personality and leave a strong impression.',
    descriptionAr: 'بناء هوية بصرية متكاملة وتصميم شعارات احترافية تعبر عن شخصية البراند وتترك انطباعًا قويًا في ذهن الجمهور.',
  },
  {
    id: 'web-development',
    image: '/services/مواقع.jpg',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    titleEn: 'Web Design & Development',
    titleAr: 'تصميم وتطوير المواقع',
    descriptionEn: 'Creating modern, responsive websites with attractive designs and smooth user experience, from landing pages to complete e-commerce platforms.',
    descriptionAr: 'إنشاء مواقع إلكترونية عصرية ومتجاوبة مع تصاميم جذابة وتجربة مستخدم سلسة، من الصفحات التعريفية إلى منصات التجارة الإلكترونية الكاملة.',
  },
];
  
  return (
    <section id="services" className="py-20 md:py-32 bg-black">
      <div className="container mx-auto px-6">
        {/* Header and Image Section - Side by Side on Large Screens */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Text on Left */}
          <AnimatedSection className="text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {language === 'en' ? (
                <>Our <span 
                  className="text-red-500"
                  style={{
                    textShadow: '0 0 15px rgba(239, 68, 68, 0.7), 0 0 30px rgba(239, 68, 68, 0.4)',
                  }}
                >Services</span></>
              ) : (
                <><span 
                  className="text-red-500"
                  style={{
                    textShadow: '0 0 15px rgba(239, 68, 68, 0.7), 0 0 30px rgba(239, 68, 68, 0.4)',
                  }}
                >خدماتنا</span></>
              )}
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto lg:mx-0 mb-6 leading-relaxed font-medium">
              {language === 'en' 
                ? 'We specialize in delivering comprehensive creative and marketing solutions that transform your brand and drive real results.'
                : 'نتخصص في تقديم حلول إبداعية وتسويقية شاملة تحول علامتك التجارية وتحقق نتائج حقيقية.'}
            </p>
            <p className="text-base text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {language === 'en'
                ? 'From captivating social media designs and comprehensive visual identities to professional video production and strategic advertising campaigns — we transform your vision into reality through creativity, precision, and results that exceed expectations.'
                : 'من التصاميم الجذابة للسوشيال ميديا والهويات البصرية المتكاملة، إلى الإنتاج الاحترافي للفيديو والحملات الإعلانية الاستراتيجية — نحوّل رؤيتك إلى واقع ملموس بالإبداع والدقة ونتائج تفوق التوقعات.'}
            </p>
          </AnimatedSection>

          {/* Image on Right */}
          <AnimatedSection>
            <div className="relative max-w-2xl mx-auto lg:mx-0 group">
              <img
                src={servicesImageUrl}
                alt="Our Services"
                className="w-full h-auto object-contain transform transition-all duration-700 group-hover:scale-105"
                style={{
                  animation: 'fadeInSlideUp 1s ease-out',
                }}
              />
              {/* Animated accent elements */}
              <div 
                className="absolute -top-4 -right-4 w-24 h-24 border-4 border-red-500 opacity-50 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
                style={{
                  animation: 'fadeIn 1.2s ease-out 0.3s both',
                }}
              ></div>
              <div 
                className="absolute -bottom-4 -left-4 w-32 h-32 border-4 border-red-500/30 transition-all duration-500 group-hover:scale-110 group-hover:border-red-500/60"
                style={{
                  animation: 'fadeIn 1.2s ease-out 0.5s both',
                }}
              ></div>
            </div>
          </AnimatedSection>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <AnimatedSection key={index}>
              <div 
                className="bg-red-600 p-0 rounded-lg h-full border border-transparent hover:border-red-400 transition-all duration-300 transform hover:-translate-y-2 flex flex-col overflow-hidden"
                style={{
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(239, 68, 68, 0.6), 0 0 60px rgba(239, 68, 68, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.3)';
                }}
              >
                {/* Service Image */}
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={language === 'en' ? service.titleEn : service.titleAr}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div 
                    className="mb-4 text-white"
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))',
                    }}
                  >{service.icon}</div>
                  <h3 className="text-xl font-bold mb-4 text-black">{language === 'en' ? service.titleEn : service.titleAr}</h3>
                  <p className="text-black mb-6 flex-grow text-sm leading-relaxed">{language === 'en' ? service.descriptionEn : service.descriptionAr}</p>
                  
                  {/* Portfolio Button */}
                  <Link to={`/portfolio/${service.id}`}>
                    <button 
                      className="w-full bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                      style={{
                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.6), 0 0 40px rgba(255, 255, 255, 0.3)';
                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.3)';
                        e.currentTarget.style.backgroundColor = '#ffffff';
                      }}
                    >
                      {/* Portfolio Icon */}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <span>{language === 'en' ? 'View Portfolio' : 'عرض الأعمال'}</span>
                    </button>
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;