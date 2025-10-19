# لوحة التحكم - دليل الاستخدام

## الوصول إلى لوحة التحكم

1. افتح المتصفح واذهب إلى: `http://localhost:5173/admin/login`
2. قم بتسجيل الدخول باستخدام بريدك الإلكتروني وكلمة المرور

## إعداد Firebase

### 1. إنشاء حساب مستخدم في Firebase Console

1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. اختر مشروع `code-cut`
3. من القائمة الجانبية، اختر **Authentication**
4. اضغط على **Get Started**
5. فعّل **Email/Password** كطريقة تسجيل دخول
6. اضغط على **Add User** وأضف بريدك الإلكتروني وكلمة المرور

### 2. إعداد Firestore Database

1. من القائمة الجانبية، اختر **Firestore Database**
2. اضغط على **Create Database**
3. اختر **Start in production mode** (سنعدل القواعد لاحقاً)
4. اختر المنطقة الأقرب لك
5. اضغط على **Enable**

### 3. تعديل قواعد الأمان في Firestore

اذهب إلى **Rules** وضع هذه القواعد:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Portfolio collection - read for all, write for authenticated users only
    match /portfolio/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Clients collection - read for all, write for authenticated users only
    match /clients/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## مميزات لوحة التحكم

### 1. إدارة معرض الأعمال

- **عرض الأعمال حسب الخدمة**: اختر الخدمة لعرض أعمالها
- **إضافة عمل جديد**:
  - العنوان (عربي وإنجليزي)
  - الوصف (عربي وإنجليزي)
  - نوع الوسائط (صورة أو فيديو)
  - رابط الوسائط (Google Drive للصور، YouTube للفيديوهات)
- **تعديل عمل**: انقر على زر "تعديل" في البطاقة
- **حذف عمل**: انقر على زر "حذف" في البطاقة

#### روابط Google Drive للصور

1. ارفع الصورة على Google Drive
2. انقر بزر الماوس الأيمن على الصورة واختر "Get Link"
3. اجعل الرابط **Anyone with the link can view**
4. انسخ الرابط بهذا الشكل: `https://drive.google.com/file/d/FILE_ID/view`
5. حوّل الرابط إلى رابط مباشر: `https://drive.google.com/uc?export=view&id=FILE_ID`

#### روابط YouTube للفيديوهات

استخدم الرابط الكامل للفيديو مباشرة:
`https://www.youtube.com/watch?v=VIDEO_ID`

### 2. إدارة صور العملاء

- **إضافة عميل جديد**:
  - اسم العميل
  - رابط صورة الشعار (Google Drive)
- **حذف عميل**: مرر الماوس على الصورة واضغط على أيقونة الحذف

## الخدمات المتاحة

1. تصوير الفيديوهات (video-shooting)
2. مونتاج الفيديوهات (video-editing)
3. تصميم الجرافيك (graphic-design)
4. الموشن جرافيك (motion-graphics)
5. محتوى UGC/EGC/AGC (ugc-content)
6. التعليق الصوتي (voice-over)
7. إدارة الإعلانات (ads-management)
8. الهوية البصرية (visual-identity)
9. تطوير المواقع (web-development)

## نصائح

- تأكد من أن جميع الروابط متاحة للعرض العام
- استخدم صور بجودة عالية للعملاء (يفضل PNG بخلفية شفافة)
- اكتب أوصاف واضحة ومختصرة
- راجع المحتوى على الموقع بعد الإضافة للتأكد من ظهوره بشكل صحيح

## تسجيل الخروج

- اضغط على زر "تسجيل الخروج" في أعلى الصفحة
- سيتم توجيهك تلقائياً لصفحة تسجيل الدخول
