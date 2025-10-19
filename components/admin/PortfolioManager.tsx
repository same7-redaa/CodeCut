import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { convertImageUrl, getPlatformFromUrl } from '../../utils/mediaConverter';
import { clearCache } from '../../utils/dataPrefetch';

interface Category {
  id?: string;
  serviceId: string;
  titleEn: string;
  titleAr: string;
}

interface PortfolioItem {
  id?: string;
  serviceId: string;
  categoryId: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

const PortfolioManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [selectedService, setSelectedService] = useState('video-shooting');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'categories' | 'items'>('categories');
  
  // Modals
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(false);

  // Forms
  const [categoryForm, setCategoryForm] = useState({
    titleEn: '',
    titleAr: '',
  });

  const [itemForm, setItemForm] = useState({
    mediaUrl: '',
    mediaType: 'image' as 'image' | 'video',
    title: '',
    description: '',
    buttonText: '',
    buttonLink: '',
  });

  const services = [
    { id: 'video-shooting', name: 'تصوير الفيديوهات' },
    { id: 'video-editing', name: 'مونتاج الفيديوهات' },
    { id: 'graphic-design', name: 'تصميم الجرافيك' },
    { id: 'motion-graphics', name: 'الموشن جرافيك' },
    { id: 'ugc-content', name: 'محتوى UGC/EGC/AGC' },
    { id: 'voice-over', name: 'التعليق الصوتي' },
    { id: 'ads-management', name: 'إدارة الإعلانات' },
    { id: 'visual-identity', name: 'الهوية البصرية' },
    { id: 'web-development', name: 'تطوير المواقع' },
  ];

  useEffect(() => {
    fetchCategories();
  }, [selectedService]);

  useEffect(() => {
    if (selectedCategory) {
      fetchPortfolioItems();
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'categories'), where('serviceId', '==', selectedService));
      const querySnapshot = await getDocs(q);
      const items: Category[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as Category);
      });
      setCategories(items);
      setSelectedCategory(null);
      setActiveView('categories');
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPortfolioItems = async () => {
    if (!selectedCategory) return;
    
    setLoading(true);
    try {
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
    } catch (error) {
      console.error('Error fetching portfolio items:', error);
    } finally {
      setLoading(false);
    }
  };

  // Category Functions
  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const categoryData = {
        ...categoryForm,
        serviceId: selectedService,
      };

      if (editingCategory && editingCategory.id) {
        await updateDoc(doc(db, 'categories', editingCategory.id), categoryData);
      } else {
        await addDoc(collection(db, 'categories'), categoryData);
      }
      
      // مسح الكاش بعد التعديل
      clearCache();
      
      setIsCategoryModalOpen(false);
      resetCategoryForm();
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      alert('حدث خطأ أثناء الحفظ');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الفئة؟ سيتم حذف جميع الأعمال بداخلها.')) return;

    setLoading(true);
    try {
      // Delete all items in this category
      const q = query(collection(db, 'portfolioItems'), where('categoryId', '==', id));
      const querySnapshot = await getDocs(q);
      const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);

      // Delete category
      await deleteDoc(doc(db, 'categories', id));
      
      // مسح الكاش بعد الحذف
      clearCache();
      
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('حدث خطأ أثناء الحذف');
    } finally {
      setLoading(false);
    }
  };

  const openCategoryModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setCategoryForm({
        titleEn: category.titleEn,
        titleAr: category.titleAr,
      });
    } else {
      resetCategoryForm();
    }
    setIsCategoryModalOpen(true);
  };

  const resetCategoryForm = () => {
    setEditingCategory(null);
    setCategoryForm({
      titleEn: '',
      titleAr: '',
    });
  };

  // Portfolio Item Functions
  const handleItemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;

    setLoading(true);
    try {
      // تحويل الرابط تلقائياً إلى الصيغة الصحيحة
      const convertedUrl = convertImageUrl(itemForm.mediaUrl);
      
      const itemData = {
        ...itemForm,
        mediaUrl: convertedUrl, // استخدام الرابط المحول
        categoryId: selectedCategory,
        serviceId: selectedService,
      };

      if (editingItem && editingItem.id) {
        await updateDoc(doc(db, 'portfolioItems', editingItem.id), itemData);
      } else {
        await addDoc(collection(db, 'portfolioItems'), itemData);
      }
      
      // مسح الكاش بعد التعديل
      clearCache();
      
      setIsItemModalOpen(false);
      resetItemForm();
      fetchPortfolioItems();
    } catch (error) {
      console.error('Error saving item:', error);
      alert('حدث خطأ أثناء الحفظ');
    } finally {
      setLoading(false);
    }
  };

  const handleItemDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا العنصر؟')) return;

    setLoading(true);
    try {
      await deleteDoc(doc(db, 'portfolioItems', id));
      
      // مسح الكاش بعد الحذف
      clearCache();
      
      fetchPortfolioItems();
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('حدث خطأ أثناء الحذف');
    } finally {
      setLoading(false);
    }
  };

  const openItemModal = (item?: PortfolioItem) => {
    if (item) {
      setEditingItem(item);
      setItemForm({
        mediaUrl: item.mediaUrl,
        mediaType: item.mediaType,
        title: item.title || '',
        description: item.description || '',
        buttonText: item.buttonText || '',
        buttonLink: item.buttonLink || '',
      });
    } else {
      resetItemForm();
    }
    setIsItemModalOpen(true);
  };

  const resetItemForm = () => {
    setEditingItem(null);
    setItemForm({
      mediaUrl: '',
      mediaType: 'image',
      title: '',
      description: '',
      buttonText: '',
      buttonLink: '',
    });
  };

  const selectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setActiveView('items');
  };

  const backToCategories = () => {
    setSelectedCategory(null);
    setActiveView('categories');
  };

  return (
    <div>
      {/* Service Selector */}
      <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          اختر الخدمة
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className={`p-3 rounded-lg font-semibold transition-all ${
                selectedService === service.id
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {service.name}
            </button>
          ))}
        </div>
      </div>

      {/* Breadcrumb */}
      {selectedCategory && (
        <div className="mb-4 flex items-center gap-2 text-gray-400">
          <button onClick={backToCategories} className="hover:text-white transition-colors flex items-center gap-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            العودة للفئات
          </button>
          <span>/</span>
          <span className="text-white font-semibold">
            {categories.find(c => c.id === selectedCategory)?.titleAr}
          </span>
        </div>
      )}

      {/* Categories View */}
      {activeView === 'categories' && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              فئات: {services.find(s => s.id === selectedService)?.name}
            </h2>
            <button
              onClick={() => openCategoryModal()}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              إضافة فئة جديدة
            </button>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">جاري تحميل الفئات...</p>
            </div>
          )}
          
          {!loading && categories.length === 0 && (
            <div className="bg-gray-900 rounded-xl p-12 text-center border border-gray-800">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <p className="text-xl text-gray-400">لا توجد فئات في هذه الخدمة</p>
              <p className="text-gray-500 mt-2">ابدأ بإضافة فئة جديدة</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-red-500 transition-all group cursor-pointer"
                onClick={() => category.id && selectCategory(category.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  </div>
                  <svg className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{category.titleAr}</h3>
                <p className="text-gray-400 text-sm mb-4">{category.titleEn}</p>
                
                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => openCategoryModal(category)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all text-sm flex items-center justify-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    تعديل
                  </button>
                  <button
                    onClick={() => category.id && handleCategoryDelete(category.id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-all text-sm flex items-center justify-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Portfolio Items View */}
      {activeView === 'items' && selectedCategory && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              الأعمال في: {categories.find(c => c.id === selectedCategory)?.titleAr}
            </h2>
            <button
              onClick={() => openItemModal()}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              إضافة عمل جديد
            </button>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">جاري تحميل الأعمال...</p>
            </div>
          )}
          
          {!loading && portfolioItems.length === 0 && (
            <div className="bg-gray-900 rounded-xl p-12 text-center border border-gray-800">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-xl text-gray-400">لا توجد أعمال في هذه الفئة</p>
              <p className="text-gray-500 mt-2">ابدأ بإضافة عمل جديد</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item) => (
              <div key={item.id} className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-red-500 transition-all group">
                <div className="relative aspect-video bg-gray-800">
                  {item.mediaType === 'image' ? (
                    <img 
                      src={item.mediaUrl} 
                      alt={item.title || ''} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-16 h-16 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                    {item.mediaType === 'image' ? '📷 صورة' : '🎬 فيديو'}
                  </div>
                </div>
                
                <div className="p-4">
                  {item.title && (
                    <h4 className="text-white font-bold text-sm mb-2">{item.title}</h4>
                  )}
                  {item.description && (
                    <p className="text-gray-400 text-xs mb-3 line-clamp-2">{item.description}</p>
                  )}
                  {item.buttonText && (
                    <p className="text-red-400 text-xs mb-3">🔗 {item.buttonText}</p>
                  )}
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => openItemModal(item)}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all text-sm flex items-center justify-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      تعديل
                    </button>
                    <button
                      onClick={() => item.id && handleItemDelete(item.id)}
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-all text-sm flex items-center justify-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50" onClick={() => setIsCategoryModalOpen(false)}>
          <div className="bg-gray-900 rounded-xl p-8 max-w-md w-full border border-gray-800" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-6">
              {editingCategory ? 'تعديل الفئة' : 'إضافة فئة جديدة'}
            </h3>
            
            <form onSubmit={handleCategorySubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">الاسم بالعربية</label>
                <input
                  type="text"
                  value={categoryForm.titleAr}
                  onChange={(e) => setCategoryForm({ ...categoryForm, titleAr: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
                  placeholder="مثال: تصوير المنتجات"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Name in English</label>
                <input
                  type="text"
                  value={categoryForm.titleEn}
                  onChange={(e) => setCategoryForm({ ...categoryForm, titleEn: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
                  placeholder="Example: Product Photography"
                  required
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-all disabled:opacity-50"
                >
                  {loading ? 'جاري الحفظ...' : (editingCategory ? 'تحديث' : 'إضافة')}
                </button>
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="flex-1 bg-gray-800 text-white py-3 rounded-lg font-bold hover:bg-gray-700 transition-all"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Item Modal */}
      {isItemModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50" onClick={() => setIsItemModalOpen(false)}>
          <div className="bg-gray-900 rounded-xl p-8 max-w-md w-full border border-gray-800" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-6">
              {editingItem ? 'تعديل العمل' : 'إضافة عمل جديد'}
            </h3>
            
            <form onSubmit={handleItemSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">نوع الوسائط</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setItemForm({ ...itemForm, mediaType: 'image' })}
                    className={`py-3 rounded-lg font-semibold transition-all ${
                      itemForm.mediaType === 'image'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    📷 صورة
                  </button>
                  <button
                    type="button"
                    onClick={() => setItemForm({ ...itemForm, mediaType: 'video' })}
                    className={`py-3 rounded-lg font-semibold transition-all ${
                      itemForm.mediaType === 'video'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    🎬 فيديو
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  {itemForm.mediaType === 'image' ? 'رابط الصورة' : 'رابط الفيديو (YouTube)'}
                </label>
                <input
                  type="url"
                  value={itemForm.mediaUrl}
                  onChange={(e) => setItemForm({ ...itemForm, mediaUrl: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
                  placeholder={itemForm.mediaType === 'image' 
                    ? 'الصق أي رابط صورة من Google Drive, Imgur, Dropbox...' 
                    : 'https://youtube.com/watch?v=... أو https://youtube.com/shorts/...'}
                  required
                />
                
                {/* مؤشر نوع المنصة */}
                {itemForm.mediaUrl && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-xs">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      سيتم تحويل الرابط تلقائياً
                    </div>
                    <span className="text-xs text-gray-400">
                      المنصة: {getPlatformFromUrl(itemForm.mediaUrl)}
                    </span>
                  </div>
                )}
                
                {itemForm.mediaType === 'image' ? (
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-gray-400 font-semibold">✅ المنصات المدعومة (موصى بها):</p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                      <div>• <a href="https://imgbb.com" target="_blank" className="text-blue-400 hover:underline">ImgBB</a> - الأسهل ⭐</div>
                      <div>• <a href="https://imgur.com" target="_blank" className="text-blue-400 hover:underline">Imgur</a> - سريع</div>
                      <div>• Google Drive - أي رابط</div>
                      <div>• روابط مباشرة (.jpg, .png)</div>
                    </div>
                    <p className="text-xs text-blue-400 mt-2">
                      💡 <strong>موصى به:</strong> استخدم ImgBB أو Imgur للأداء الأفضل
                    </p>
                    <p className="text-xs text-amber-400">
                      ⚠️ Google Drive: تأكد من تفعيل "أي شخص لديه الرابط" في إعدادات المشاركة
                    </p>
                  </div>
                ) : (
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-gray-400 font-semibold">✅ أنواع روابط YouTube المدعومة:</p>
                    <div className="space-y-1 text-xs text-gray-500">
                      <div>• فيديوهات عادية: <code className="text-blue-400">youtube.com/watch?v=...</code></div>
                      <div>• روابط قصيرة: <code className="text-blue-400">youtu.be/...</code></div>
                      <div>• YouTube Shorts: <code className="text-blue-400">youtube.com/shorts/...</code> 🆕</div>
                    </div>
                    <p className="text-xs text-green-400 mt-2">
                      ✨ <strong>جديد!</strong> الآن يدعم YouTube Shorts
                    </p>
                    <p className="text-xs text-blue-400">
                      💡 انسخ أي رابط YouTube وسيتم تحويله تلقائياً
                    </p>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  عنوان العمل (اختياري)
                  <span className="text-xs text-gray-500 font-normal mr-2">- يمكن تركه فارغاً</span>
                </label>
                <input
                  type="text"
                  value={itemForm.title}
                  onChange={(e) => setItemForm({ ...itemForm, title: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
                  placeholder="مثال: تصميم موقع شركة ABC"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  وصف (اختياري)
                  <span className="text-xs text-gray-500 font-normal mr-2">- يمكن تركه فارغاً</span>
                </label>
                <textarea
                  value={itemForm.description}
                  onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
                  placeholder="اكتب وصف للعمل إذا أردت... (يمكن تركه فارغاً)"
                  rows={3}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  نص الزر (اختياري)
                  <span className="text-xs text-gray-500 font-normal mr-2">- إذا أردت إضافة زر</span>
                </label>
                <input
                  type="text"
                  value={itemForm.buttonText}
                  onChange={(e) => setItemForm({ ...itemForm, buttonText: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
                  placeholder="مثال: زيارة الموقع | شاهد المزيد | تفاصيل أكثر"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">
                  رابط الزر (اختياري)
                  <span className="text-xs text-gray-500 font-normal mr-2">- رابط عند الضغط على الزر</span>
                </label>
                <input
                  type="url"
                  value={itemForm.buttonLink}
                  onChange={(e) => setItemForm({ ...itemForm, buttonLink: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
                  placeholder="https://example.com"
                />
                {itemForm.buttonText && !itemForm.buttonLink && (
                  <p className="text-xs text-amber-400 mt-1">⚠️ أضف رابط الزر إذا كتبت نص الزر</p>
                )}
              </div>
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-all disabled:opacity-50"
                >
                  {loading ? 'جاري الحفظ...' : (editingItem ? 'تحديث' : 'إضافة')}
                </button>
                <button
                  type="button"
                  onClick={() => setIsItemModalOpen(false)}
                  className="flex-1 bg-gray-800 text-white py-3 rounded-lg font-bold hover:bg-gray-700 transition-all"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioManager;
