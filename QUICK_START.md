# 🚀 بدء استخدام لوحة التحكم

## خطوات الإعداد الأولية

### 1. إعداد Firebase (مرة واحدة فقط)

#### أ) تفعيل Authentication
1. افتح [Firebase Console](https://console.firebase.google.com/)
2. اختر مشروع **code-cut**
3. اذهب إلى **Authentication** من القائمة اليسرى
4. اضغط **Get Started**
5. فعّل **Email/Password**
6. اضغط **Users** → **Add User**
7. أدخل بريدك الإلكتروني وكلمة مرور قوية (سيكون هذا حساب الأدمن)

#### ب) إنشاء Firestore Database
1. اذهب إلى **Firestore Database** من القائمة اليسرى
2. اضغط **Create Database**
3. اختر **Production Mode**
4. اختر المنطقة الأقرب (مثل: europe-west)
5. اضغط **Enable**

#### ج) تعديل قواعد الأمان
في صفحة Firestore، اذهب إلى **Rules** والصق هذا الكود:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Categories - read for all, write for authenticated users
    match /categories/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Portfolio Items - read for all, write for authenticated users
    match /portfolioItems/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Clients - read for all, write for authenticated users
    match /clients/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

اضغط **Publish**

---

## 🎯 استخدام لوحة التحكم

### تسجيل الدخول
1. شغّل المشروع: `npm run dev`
2. افتح المتصفح: `http://localhost:5173/admin/login`
3. أدخل البريد الإلكتروني وكلمة المرور
4. اضغط **تسجيل الدخول**

---

## 📝 إدارة معرض الأعمال

### إضافة فئة جديدة:
1. اختر تبويب **معرض الأعمال**
2. اختر الخدمة من الأعلى (مثل: تصوير الفيديوهات)
3. اضغط **إضافة فئة جديدة**
4. املأ البيانات:
   - الاسم بالعربية: مثل "إعلانات تجارية"
   - Name in English: مثل "Commercial Ads"
5. اضغط **إضافة**

### إضافة عمل (صورة/فيديو):
1. اضغط على الفئة التي تريد إضافة عمل لها
2. اضغط **إضافة عمل جديد**
3. اختر نوع الوسائط (صورة أو فيديو)
4. أدخل الرابط:
   - **للصور**: ارفع على Google Drive واستخدم:
     ```
     https://drive.google.com/uc?id=FILE_ID
     ```
   - **للفيديوهات**: استخدم رابط YouTube العادي:
     ```
     https://www.youtube.com/watch?v=VIDEO_ID
     ```
5. أضف وصف (اختياري)
6. اضغط **إضافة**

---

## 👥 إدارة صور العملاء

### إضافة عميل:
1. اختر تبويب **صور العملاء**
2. اضغط **إضافة عميل جديد**
3. أدخل:
   - اسم العميل
   - رابط صورة الشعار (Google Drive):
     ```
     https://drive.google.com/uc?id=FILE_ID
     ```
4. اضغط **إضافة**

### حذف عميل:
- مرر الماوس على الشعار واضغط زر **X**

---

## 📸 كيفية رفع الصور على Google Drive

1. ارفع الصورة على Google Drive
2. اضغط بزر الماوس الأيمن على الصورة → **مشاركة**
3. غيّر الإعدادات إلى **"أي شخص لديه الرابط"**
4. انسخ الرابط (سيكون بهذا الشكل):
   ```
   https://drive.google.com/file/d/1abc_xyz_FILE_ID/view?usp=sharing
   ```
5. استخرج `FILE_ID` واستخدم هذا الشكل:
   ```
   https://drive.google.com/uc?id=1abc_xyz_FILE_ID
   ```

---

## ✅ التحقق من الربط

بعد إضافة البيانات من لوحة التحكم:

1. **معرض الأعمال**: اذهب إلى الصفحة الرئيسية → اضغط على خدمة → سترى الفئات والأعمال
2. **العملاء**: في الصفحة الرئيسية، قسم "عملاؤنا" → سترى الشعارات

**كل شيء يتحدث تلقائياً!** ✨

---

## 🆘 حل المشاكل

### لا يمكنني تسجيل الدخول:
- تأكد من إنشاء حساب في Firebase Authentication
- تأكد من أن البريد الإلكتروني وكلمة المرور صحيحة

### الصور لا تظهر:
- تأكد من أن رابط Google Drive بالصيغة الصحيحة: `https://drive.google.com/uc?id=FILE_ID`
- تأكد من أن الصورة مشتركة مع "أي شخص لديه الرابط"

### الفيديوهات لا تعمل:
- استخدم رابط YouTube العادي (ليس Embed)
- مثال: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`

---

## 📱 للتواصل

إذا واجهت أي مشكلة، تحقق من:
1. Console في المتصفح (F12 → Console)
2. Firebase Console → قواعد الأمان

---

**جاهز للانطلاق! 🚀**
