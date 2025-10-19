import React, { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { convertImageUrl, getPlatformFromUrl } from '../../utils/mediaConverter';
import { clearCache } from '../../utils/dataPrefetch';

interface Client {
  id?: string;
  imageUrl: string;
  name: string;
}

const ClientsManager: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    imageUrl: '',
    name: '',
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'clients'));
      const items: Client[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as Client);
      });
      setClients(items);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // تحويل الرابط تلقائياً
      const convertedUrl = convertImageUrl(formData.imageUrl);
      
      await addDoc(collection(db, 'clients'), {
        ...formData,
        imageUrl: convertedUrl,
      });
      
      // مسح الكاش بعد الإضافة
      clearCache();
      
      setIsModalOpen(false);
      resetForm();
      fetchClients();
    } catch (error) {
      console.error('Error adding client:', error);
      alert('حدث خطأ أثناء الإضافة');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا العميل؟')) return;

    setLoading(true);
    try {
      await deleteDoc(doc(db, 'clients', id));
      
      // مسح الكاش بعد الحذف
      clearCache();
      
      fetchClients();
    } catch (error) {
      console.error('Error deleting client:', error);
      alert('حدث خطأ أثناء الحذف');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      imageUrl: '',
      name: '',
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          إدارة صور العملاء
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          إضافة عميل جديد
        </button>
      </div>

      {/* Info Box */}
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-gray-300">
            <p className="font-semibold mb-1">ملاحظة:</p>
            <p>استخدم روابط Google Drive للصور. تأكد من أن الصور متاحة للعرض العام.</p>
          </div>
        </div>
      </div>

      {/* Clients Grid */}
      {loading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">جاري تحميل العملاء...</p>
        </div>
      )}
      
      {!loading && clients.length === 0 && (
        <div className="bg-gray-900 rounded-xl p-12 text-center border border-gray-800">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-xl text-gray-400">لا توجد صور عملاء</p>
          <p className="text-gray-500 mt-2">ابدأ بإضافة عميل جديد</p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {clients.map((client) => (
          <div key={client.id} className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-red-500 transition-all group">
            {/* Image */}
            <div className="aspect-square bg-gray-800 relative">
              {client.imageUrl ? (
                <img 
                  src={client.imageUrl} 
                  alt={client.name} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain p-4"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              
              {/* Delete Button Overlay */}
              <button
                onClick={() => client.id && handleDelete(client.id)}
                className="absolute top-2 left-2 bg-red-600 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>

            {/* Name */}
            <div className="p-3 bg-gray-800">
              <p className="text-sm text-center text-gray-300 truncate">{client.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Client Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl max-w-md w-full border border-red-500/30">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">إضافة عميل جديد</h3>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">
                    اسم العميل (اختياري)
                    <span className="text-xs text-gray-500 font-normal mr-2">- يمكن تركه فارغاً</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                    placeholder="اسم العميل (اختياري)"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">رابط شعار العميل</label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                    placeholder="الصق أي رابط من Google Drive, Imgur, Dropbox..."
                    required
                    dir="ltr"
                  />
                  
                  {/* مؤشر المنصة */}
                  {formData.imageUrl && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-xs">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        سيتم تحويل الرابط تلقائياً
                      </div>
                      <span className="text-xs text-gray-400">
                        المنصة: {getPlatformFromUrl(formData.imageUrl)}
                      </span>
                    </div>
                  )}
                  
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-gray-400">✅ يدعم: <strong className="text-blue-400">ImgBB ⭐</strong> • Imgur • Google Drive • روابط مباشرة</p>
                    <p className="text-xs text-blue-400">💡 موصى به: <a href="https://imgbb.com" target="_blank" className="underline">ImgBB.com</a> (أسرع وأسهل)</p>
                    <p className="text-xs text-amber-400">⚠️ Google Drive: فعّل المشاركة العامة</p>
                  </div>
                </div>

                {/* Preview */}
                {formData.imageUrl && (
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">معاينة</label>
                    <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-center h-32">
                      <img 
                        src={formData.imageUrl} 
                        alt="Preview" 
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-all disabled:opacity-50"
                  >
                    {loading ? 'جاري الإضافة...' : 'إضافة'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      resetForm();
                    }}
                    className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-bold hover:bg-gray-600 transition-all"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientsManager;
