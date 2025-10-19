import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

// Cache للبيانات المحملة مسبقاً
const dataCache: {
  clients: any[] | null;
  categories: Map<string, any[]>;
  portfolioItems: Map<string, any[]>;
  lastFetch: number;
} = {
  clients: null,
  categories: new Map(),
  portfolioItems: new Map(),
  lastFetch: 0,
};

// مدة صلاحية الكاش (5 دقائق)
const CACHE_DURATION = 5 * 60 * 1000;

// التحقق من صلاحية الكاش
const isCacheValid = () => {
  return Date.now() - dataCache.lastFetch < CACHE_DURATION;
};

// تحميل جميع البيانات مسبقاً
export const prefetchAllData = async () => {
  try {
    console.log('🚀 بدء التحميل المسبق للبيانات...');
    
    const startTime = Date.now();

    // تحميل جميع البيانات بشكل متوازي
    const [clientsSnapshot, categoriesSnapshot, portfolioSnapshot] = await Promise.all([
      getDocs(collection(db, 'clients')),
      getDocs(collection(db, 'categories')),
      getDocs(collection(db, 'portfolioItems')),
    ]);

    // حفظ العملاء
    dataCache.clients = [];
    clientsSnapshot.forEach((doc) => {
      dataCache.clients!.push({ id: doc.id, ...doc.data() });
    });

    // حفظ الفئات حسب الخدمة
    dataCache.categories.clear();
    console.log('🔍 تحليل الفئات المحملة مسبقاً:');
    categoriesSnapshot.forEach((doc) => {
      const data: any = { id: doc.id, ...doc.data() };
      const serviceId = data.serviceId;
      
      console.log(`- الفئة: ${data.titleAr || data.titleEn}, Service ID: [${serviceId}]`);

      if (!dataCache.categories.has(serviceId)) {
        dataCache.categories.set(serviceId, []);
      }
      dataCache.categories.get(serviceId)!.push(data);
    });

    // حفظ أعمال البورتفوليو حسب الفئة
    dataCache.portfolioItems.clear();
    console.log('🔍 تحليل أعمال المعرض المحملة مسبقاً:');
    portfolioSnapshot.forEach((doc) => {
      const data: any = { id: doc.id, ...doc.data() };
      const categoryId = data.categoryId;

      console.log(`- العمل: ${data.title || doc.id}, Category ID: [${categoryId}]`);
      
      if (!dataCache.portfolioItems.has(categoryId)) {
        dataCache.portfolioItems.set(categoryId, []);
      }
      dataCache.portfolioItems.get(categoryId)!.push(data);
    });

    dataCache.lastFetch = Date.now();
    
    const duration = Date.now() - startTime;
    console.log(`✅ تم التحميل المسبق بنجاح في ${duration}ms`);
    console.log(`📊 العملاء: ${dataCache.clients.length}`);
    console.log(`📁 الفئات: ${categoriesSnapshot.size}`);
    console.log(`🎨 الأعمال: ${portfolioSnapshot.size}`);
    
    return true;
  } catch (error) {
    console.error('❌ خطأ في التحميل المسبق:', error);
    return false;
  }
};

// الحصول على العملاء من الكاش
export const getCachedClients = () => {
  if (isCacheValid() && dataCache.clients) {
    console.log('📦 استخدام العملاء من الكاش');
    return dataCache.clients;
  }
  return null;
};

// الحصول على الفئات من الكاش
export const getCachedCategories = (serviceId: string) => {
  if (isCacheValid() && dataCache.categories.has(serviceId)) {
    console.log(`📦 استخدام الفئات من الكاش للخدمة: ${serviceId}`);
    return dataCache.categories.get(serviceId)!;
  }
  return null;
};

// الحصول على أعمال البورتفوليو من الكاش
export const getCachedPortfolioItems = (categoryId: string) => {
  if (isCacheValid() && dataCache.portfolioItems.has(categoryId)) {
    console.log(`📦 استخدام الأعمال من الكاش للفئة: ${categoryId}`);
    return dataCache.portfolioItems.get(categoryId)!;
  }
  return null;
};

// مسح الكاش (للاستخدام بعد التعديلات في لوحة التحكم)
export const clearCache = () => {
  dataCache.clients = null;
  dataCache.categories.clear();
  dataCache.portfolioItems.clear();
  dataCache.lastFetch = 0;
  console.log('🗑️ تم مسح الكاش');
};

// إعادة تحميل البيانات
export const refreshCache = async () => {
  clearCache();
  return await prefetchAllData();
};
