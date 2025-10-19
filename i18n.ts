export type Language = 'en' | 'ar';

export const translations = {
  en: {
    // Header
    home: 'Home',
    about: 'About',
    services: 'Services',
    clients: 'Clients',
    contact: 'Contact',
    
    // Hero Section
    brandName: 'Code Cut',
    tagline: '"It\'s a Matter Of Time No More"',
    orderNow: 'Order Now',
    
    // About Section
    aboutTitle: 'About Us',
    aboutSubtitle: 'Your Partner in Digital Success',
    aboutDescription: 'At Code Cut, we\'re a Social Media Marketing Agency that transforms your ideas into a real, high-quality experience. We don\'t just create — we bring your vision to life with strategy, creativity, and results that speak for themselves.',
    aboutVision: 'With over 4 years of experience, we\'ve proudly worked with 350+ clients and 70+ companies, delivering remarkable results in record time.',
    yearsExperience: 'Years Experience',
    happyClients: 'Happy Clients',
    companiesTrusted: 'Companies',
    
    // Services Section
    servicesTitle: 'Our Services',
    servicesSubtitle: 'Comprehensive Digital Solutions',
    service1Title: 'Social Media Marketing',
    service1Desc: 'Strategic campaigns across all major platforms to boost your brand visibility and engagement.',
    service2Title: 'Content Creation',
    service2Desc: 'Compelling content that resonates with your audience and drives meaningful interactions.',
    service3Title: 'Brand Strategy',
    service3Desc: 'Comprehensive brand development and positioning to stand out in the market.',
    service4Title: 'Paid Advertising',
    service4Desc: 'ROI-focused ad campaigns that convert viewers into customers.',
    service5Title: 'Analytics & Insights',
    service5Desc: 'Data-driven insights to optimize your marketing performance continuously.',
    service6Title: 'Community Management',
    service6Desc: 'Building and nurturing engaged communities around your brand.',
    
    // Clients Section
    clientsTitle: 'Our Clients',
    clientsSubtitle: 'Trusted by Leading Brands',
    clientsDescription: 'Trusted by leading brands and companies worldwide. We\'re proud to partner with innovative businesses that value quality and results.',
    
    // Contact Section
    contactTitle: 'Let\'s Connect',
    contactSubtitle: 'Ready to elevate your brand? Reach out to us on social media and let\'s create something amazing together.',
    readyToStart: 'Ready to Start Your Project?',
    connectWithUs: 'Connect with us on social media',
    
    // Footer
    digitalMarketing: 'Crafting Digital Excellence',
    quickLinks: 'Quick Links',
    followUs: 'Follow Us',
    allRightsReserved: 'All Rights Reserved.',
  },
  ar: {
    // Header
    home: 'الرئيسية',
    about: 'مين احنا',
    services: 'خدماتنا',
    clients: 'عملائنا',
    contact: 'كلمنا',
    
    // Hero Section
    brandName: 'كود كت',
    tagline: '"مسألة وقت لا أكثر"',
    orderNow: 'اطلب دلوقتي',
    
    // About Section
    aboutTitle: 'مين احنا',
    aboutSubtitle: 'شريكك في النجاح الرقمي',
    aboutDescription: 'في كود كت، احنا وكالة تسويق إلكتروني بنحول أفكارك لتجربة حقيقية بجودة عالية. مش بس بننفذ، احنا بنحقق رؤيتك باستراتيجية وإبداع ونتائج بتتكلم عن نفسها.',
    aboutVision: 'بخبرة أكتر من 4 سنين، اشتغلنا مع أكتر من 350 عميل و70+ شركة، وقدمنا نتائج مميزة في وقت قياسي.',
    yearsExperience: 'سنين خبرة',
    happyClients: 'عميل راضي',
    companiesTrusted: 'شركة',
    
    // Services Section
    servicesTitle: 'خدماتنا',
    servicesSubtitle: 'حلول رقمية متكاملة',
    service1Title: 'التسويق على السوشيال ميديا',
    service1Desc: 'حملات احترافية على كل المنصات الرئيسية عشان نزود انتشار براندك والتفاعل مع جمهورك.',
    service2Title: 'صناعة المحتوى',
    service2Desc: 'محتوى جذاب يلمس جمهورك ويخليهم يتفاعلوا بشكل فعلي مع براندك.',
    service3Title: 'استراتيجية البراند',
    service3Desc: 'تطوير هوية براندك بشكل كامل وتميزه في السوق بطريقة احترافية.',
    service4Title: 'الإعلانات الممولة',
    service4Desc: 'حملات إعلانية مدروسة بتحول المشاهدين لعملاء حقيقيين وبتديك أعلى عائد.',
    service5Title: 'التحليلات والإحصائيات',
    service5Desc: 'نتائج قائمة على البيانات عشان نطور أداء التسويق بتاعك باستمرار.',
    service6Title: 'إدارة المجتمع',
    service6Desc: 'بناء مجتمع متفاعل ومخلص حوالين براندك وإدارته بشكل احترافي.',
    
    // Clients Section
    clientsTitle: 'عملائنا',
    clientsSubtitle: 'بنشتغل مع براندات رائدة',
    clientsDescription: 'بنفتخر إننا شغالين مع براندات وشركات رائدة في مصر والوطن العربي. شركاء نجاح بيقدروا الجودة والنتائج الحقيقية.',
    
    // Contact Section
    contactTitle: 'يلا نتكلم',
    contactSubtitle: 'جاهز تطور براندك؟ كلمنا على السوشيال ميديا ويلا نعمل حاجة مميزة سوا.',
    readyToStart: 'جاهز تبدأ مشروعك؟',
    connectWithUs: 'تواصل معانا على السوشيال ميديا',
    
    // Footer
    digitalMarketing: 'بنصنع التميز الرقمي',
    quickLinks: 'لينكات سريعة',
    followUs: 'تابعنا',
    allRightsReserved: 'جميع الحقوق محفوظة.',
  },
};

export const getTranslation = (lang: Language, key: keyof typeof translations.en): string => {
  return translations[lang][key] || translations.en[key];
};
