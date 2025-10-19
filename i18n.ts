export type Language = 'en' | 'ar';

export const translations = {
  en: {
    // Header
    home: 'Home',
    about: 'About Us',
    services: 'Our Services',
    clients: 'Our Clients',
    contact: 'Contact Us',
    
    // Hero Section
    brandName: 'Code Cut',
    tagline: '"It\'s a Matter Of Time, Nothing More"',
    orderNow: 'Our Services',
    
    // About Section
    aboutTitle: 'Who We Are',
    aboutSubtitle: 'Your Partner in Digital Success',
    aboutDescription: 'At Code Cut, we\'re a digital marketing agency that transforms your ideas into real, high-quality experiences. We don\'t just execute — we bring your vision to life with strategy, creativity, and results that speak for themselves.',
    aboutVision: 'With over 4 years of experience, we\'ve proudly worked with 350+ satisfied clients and 70+ companies, delivering exceptional results in record time.',
    yearsExperience: 'Years of Experience',
    happyClients: 'Satisfied Clients',
    companiesTrusted: 'Companies',
    
    // Services Section
    servicesTitle: 'Our Services',
    servicesSubtitle: 'Comprehensive Digital Solutions',
    service1Title: 'Social Media Marketing',
    service1Desc: 'Professional campaigns across all major platforms to boost your brand visibility and engagement with your audience.',
    service2Title: 'Content Creation',
    service2Desc: 'Engaging content that connects with your audience and drives real interaction with your brand.',
    service3Title: 'Brand Strategy & Identity',
    service3Desc: 'Complete brand development and professional positioning to make you stand out in the market.',
    service4Title: 'Paid Advertising',
    service4Desc: 'Strategic ad campaigns that convert viewers into real customers and give you maximum ROI.',
    service5Title: 'Analytics & Insights',
    service5Desc: 'Data-driven results to continuously improve your marketing performance.',
    service6Title: 'Community Management',
    service6Desc: 'Building and managing an engaged and loyal community around your brand professionally.',
    
    // Clients Section
    clientsTitle: 'Our Clients',
    clientsSubtitle: 'We Work with Leading Brands',
    clientsDescription: 'We\'re proud to work with leading brands and companies in Egypt and the Arab world. Success partners who value quality and real results.',
    
    // Contact Section
    contactTitle: 'Let\'s Talk',
    contactSubtitle: 'Ready to develop your brand? Contact us on social media and let\'s create something special together.',
    readyToStart: 'Ready to Start Your Project?',
    connectWithUs: 'Connect with us on social media',
    
    // Footer
    digitalMarketing: 'We Create Digital Excellence',
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
    contact: 'تواصل معنا',
    
    // Hero Section
    brandName: 'كود كت',
    tagline: '"مسألة وقت مش اكتر"',
    orderNow: 'خدماتنا',
    
    // About Section
    aboutTitle: 'مين احنا',
    aboutSubtitle: 'شريكك في النجاح الرقمي',
    aboutDescription: 'في كود كت، احنا وكالة تسويق رقمي بنحول أفكارك لتجربة حقيقية بجودة عالية. مش بس بننفذ، احنا بنحقق رؤيتك باستراتيجية وإبداع ونتائج بتتكلم عن نفسها.',
    aboutVision: 'بخبرة أكتر من 4 سنين، اشتغلنا مع أكتر من 350 عميل راضي و70+ شركة، وقدمنا نتائج استثنائية في وقت قياسي.',
    yearsExperience: 'سنة خبرة',
    happyClients: 'عميل راضي',
    companiesTrusted: 'شركة',
    
    // Services Section
    servicesTitle: 'خدماتنا',
    servicesSubtitle: 'حلول رقمية متكاملة',
    service1Title: 'التسويق على السوشيال ميديا',
    service1Desc: 'حملات احترافية على كل المنصات الرئيسية عشان نزود انتشار براندك والتفاعل مع جمهورك.',
    service2Title: 'صناعة المحتوى',
    service2Desc: 'محتوى جذاب يتواصل مع جمهورك ويخلي التفاعل الحقيقي مع براندك.',
    service3Title: 'استراتيجية البراند والهوية',
    service3Desc: 'تطوير براندك بشكل كامل وتموضع احترافي عشان تتميز في السوق.',
    service4Title: 'الإعلانات الممولة',
    service4Desc: 'حملات إعلانية استراتيجية بتحول المشاهدين لعملاء حقيقيين وبتديك أقصى عائد.',
    service5Title: 'التحليلات والإحصائيات',
    service5Desc: 'نتائج قائمة على البيانات عشان نحسن أداء التسويق بتاعك باستمرار.',
    service6Title: 'إدارة المجتمع',
    service6Desc: 'بناء وإدارة مجتمع متفاعل ومخلص حوالين براندك بشكل احترافي.',
    
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
