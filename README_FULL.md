# 🎨 Code Cut - SMM Agency Website

![Code Cut Logo](logo%20(2).png)

موقع ويب احترافي كامل لوكالة التسويق الإلكتروني **Code Cut** مع لوحة تحكم متكاملة لإدارة المحتوى.

## ✨ المميزات الرئيسية

### 🌐 الموقع العام
- ✅ **تصميم حديث وجذاب** بألوان أحمر وأسود احترافية
- ✅ **دعم كامل للغتين** (عربي 🇪🇬 / إنجليزي 🇺🇸)
- ✅ **Responsive Design** - متجاوب مع جميع الأجهزة
- ✅ **تأثيرات حركية** (Animations) سلسة وجميلة
- ✅ **SEO Optimized** - محسّن لمحركات البحث

### 📱 الأقسام
1. **Hero Section** - قسم البطل بتأثيرات ضوئية
2. **About Us** - من نحن مع تأثيرات بصرية
3. **Services** - 9 خدمات مع معارض أعمال لكل خدمة
4. **Portfolio** - معارض الأعمال بنظام Masonry
5. **Clients** - شعارات العملاء مع دعم Firestore
6. **Contact** - وسائل التواصل والتواصل المباشر
7. **Payment Methods** - طرق الدفع المتاحة

### 🎯 الخدمات المتاحة
1. 🎬 تصوير الفيديوهات
2. ✂️ مونتاج الفيديوهات
3. 🎨 تصميم الجرافيك
4. 🎭 الموشن جرافيك
5. 👥 محتوى UGC/EGC/AGC
6. 🎤 التعليق الصوتي
7. 📊 إدارة الإعلانات الممولة
8. 🎯 الهوية البصرية وتصميم الشعار
9. 💻 تصميم وتطوير المواقع

### 🔐 لوحة التحكم (Admin Dashboard)
- ✅ **مصادقة آمنة** بـ Firebase Authentication
- ✅ **إدارة معارض الأعمال** بنظام هرمي (خدمة → فئة → عمل)
- ✅ **إدارة العملاء** - إضافة وحذف شعارات العملاء
- ✅ **رفع الصور** من Google Drive, Imgur, ImgBB, Dropbox
- ✅ **دعم الفيديوهات** من YouTube (عادي + Shorts)
- ✅ **محول روابط ذكي** - تحويل تلقائي للروابط
- ✅ **حقول إضافية**: عنوان، وصف، زر مخصص برابط

### 🚀 نظام التحميل المسبق الذكي
- ⚡ **تحميل فوري** - صفر وقت انتظار
- 📦 **Caching System** - حفظ البيانات لمدة 5 دقائق
- 🔄 **تحديث تلقائي** - مسح الكاش عند التعديل
- 💾 **تحميل متوازي** - Promise.all لأفضل أداء

## 🛠️ التقنيات المستخدمة

### Frontend
- **React 19.2.0** - أحدث إصدار
- **TypeScript** - نوع آمن
- **Vite 6.2.0** - أسرع أداة بناء
- **Tailwind CSS** - عبر CDN
- **React Router DOM** - للتنقل
- **Google Fonts (Rubik)** - خط عربي احترافي

### Backend & Database
- **Firebase Authentication** - مصادقة آمنة
- **Cloud Firestore** - قاعدة بيانات NoSQL
- **Firebase SDK 12.4.0** - أحدث إصدار

### المكتبات والأدوات
- **Vitest** - اختبارات الوحدة
- **ESLint** - فحص الكود
- **TypeScript 5.7.3** - نظام الأنواع

## 📦 التثبيت والتشغيل

### المتطلبات
- Node.js (v18 أو أحدث)
- npm أو yarn
- حساب Firebase

### خطوات التثبيت

1. **استنساخ المشروع**
```bash
git clone https://github.com/same7-redaa/CodeCut.git
cd CodeCut
```

2. **تثبيت التبعيات**
```bash
npm install
```

3. **إعداد Firebase**
- انسخ ملف `.env.example` إلى `.env`
- أضف بيانات Firebase الخاصة بك في `firebase.ts`:
```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

4. **تشغيل الموقع**
```bash
npm run dev
```

5. **بناء للإنتاج**
```bash
npm run build
```

## 🔥 إعداد Firebase

### 1. Authentication
- افتح Firebase Console → Authentication
- فعّل **Email/Password**
- أنشئ حساب أدمن

### 2. Firestore Database
قم بإنشاء 3 مجموعات (Collections):

#### `categories`
```javascript
{
  serviceId: "video-shooting",
  titleEn: "Wedding Videos",
  titleAr: "فيديوهات الأفراح"
}
```

#### `portfolioItems`
```javascript
{
  serviceId: "video-shooting",
  categoryId: "category_id_here",
  mediaUrl: "converted_url",
  mediaType: "image" | "video",
  title: "عنوان العمل",
  description: "وصف العمل",
  buttonText: "زيارة الموقع",
  buttonLink: "https://example.com"
}
```

#### `clients`
```javascript
{
  name: "اسم العميل",
  imageUrl: "converted_image_url"
}
```

### 3. قواعد الأمان (Security Rules)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // السماح بالقراءة للجميع
    match /{document=**} {
      allow read: if true;
    }
    
    // السماح بالكتابة للمستخدمين المصادق عليهم فقط
    match /categories/{category} {
      allow write: if request.auth != null;
    }
    
    match /portfolioItems/{item} {
      allow write: if request.auth != null;
    }
    
    match /clients/{client} {
      allow write: if request.auth != null;
    }
  }
}
```

## 📱 الروابط ومعلومات التواصل

### Code Cut Agency
- 📧 Email: diaamahfouz229@gmail.com
- 💬 WhatsApp: 01002740110
- 📱 Phone: 01012819721
- 📘 Facebook: [Code Cut](https://www.facebook.com/share/19kqSVvSjP/)
- 📷 Instagram: [@code_cut.agency](https://www.instagram.com/code_cut.agency)
- 📺 YouTube: [@Code-cut](https://www.youtube.com/@Code-cut)

### Developer
**Sameh Reda | سامح رضا**
- 💬 WhatsApp: 01023160657
- 📘 Facebook: [SAME7.REDAA](https://www.facebook.com/SAME7.REDAA)
- 🌐 Website: [doc-digital.online](https://www.doc-digital.online/)

## 📂 هيكل المشروع

```
codecut-smm-agency/
├── components/
│   ├── AboutSection.tsx
│   ├── AnimatedSection.tsx
│   ├── ClientsSection.tsx
│   ├── ContactSection.tsx
│   ├── DeveloperSection.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── PaymentSection.tsx
│   ├── ServicesSection.tsx
│   └── admin/
│       ├── ClientsManager.tsx
│       └── PortfolioManager.tsx
├── contexts/
│   └── LanguageContext.tsx
├── pages/
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   └── ServicePortfolio.tsx
├── utils/
│   ├── dataPrefetch.ts      # نظام التحميل المسبق
│   └── mediaConverter.ts    # محول الروابط
├── public/
│   ├── favicon.jpg
│   ├── favicon.svg
│   └── icon-192.jpg
├── App.tsx
├── firebase.ts
├── i18n.ts
├── index.html
├── index.tsx
└── package.json
```

## 🎨 الألوان المستخدمة

- **Primary**: Red `#DC2626` / `#EF4444`
- **Background**: Black `#000000`
- **Surface**: Gray-900 `#111827`
- **Text**: White `#FFFFFF`
- **Accent Colors**:
  - WhatsApp: `#25D366`
  - Facebook: `#1877F2`
  - Instagram: Gradient
  - YouTube: `#FF0000`

## 📸 لقطات الشاشة

### الصفحة الرئيسية
![Homepage](screenshot-home.png)

### لوحة التحكم
![Dashboard](screenshot-dashboard.png)

### معارض الأعمال
![Portfolio](screenshot-portfolio.png)

## 🚀 الرفع على Vercel

1. **استورد من GitHub**:
   - افتح [Vercel](https://vercel.com)
   - Import من GitHub
   - اختر `same7-redaa/CodeCut`

2. **إعدادات البيئة**:
   - أضف متغيرات Firebase في Environment Variables

3. **Build Settings**:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Deploy** 🎉

## 📝 الترخيص

هذا المشروع مطور بواسطة **Sameh Reda** لصالح **Code Cut Agency**.

## 🤝 المساهمة

نرحب بالمساهمات! يرجى فتح Issue أو Pull Request.

## 📞 الدعم

للدعم والاستفسارات:
- 📧 diaamahfouz229@gmail.com
- 💬 WhatsApp: 01002740110

---

<div align="center">
  
**تم التصميم والتطوير بواسطة** 🎨

**[Sameh Reda | سامح رضا](https://www.doc-digital.online/)**

اطلب موقعك الآن! 🚀

[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/201023160657)
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/SAME7.REDAA)
[![Website](https://img.shields.io/badge/Website-DC2626?style=for-the-badge&logo=google-chrome&logoColor=white)](https://www.doc-digital.online/)

</div>
