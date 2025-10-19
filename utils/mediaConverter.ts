// Media URL Converter - يدعم Google Drive, Imgur, Dropbox, وروابط مباشرة

/**
 * تحويل رابط Google Drive إلى رابط مباشر
 * من: https://drive.google.com/file/d/FILE_ID/view
 * إلى: https://drive.google.com/thumbnail?id=FILE_ID&sz=w1000
 */
export const convertGoogleDriveUrl = (url: string): string => {
  // إذا كان الرابط بالفعل بصيغة thumbnail
  if (url.includes('drive.google.com/thumbnail?')) {
    return url;
  }

  // استخراج FILE_ID من أنواع روابط Google Drive المختلفة
  let fileId = '';
  
  // النوع 1: https://drive.google.com/file/d/FILE_ID/view
  const match1 = url.match(/\/file\/d\/([^\/\?]+)/);
  if (match1) {
    fileId = match1[1];
  }
  
  // النوع 2: https://drive.google.com/open?id=FILE_ID
  const match2 = url.match(/[?&]id=([^&]+)/);
  if (match2) {
    fileId = match2[1];
  }
  
  // النوع 3: https://drive.google.com/uc?id=FILE_ID
  const match3 = url.match(/uc\?.*id=([^&]+)/);
  if (match3) {
    fileId = match3[1];
  }

  if (fileId) {
    // استخدام thumbnail API مع حجم كبير
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`;
  }

  return url;
};

/**
 * تحويل رابط Imgur إلى رابط مباشر
 * من: https://imgur.com/abc123
 * إلى: https://i.imgur.com/abc123.jpg
 */
export const convertImgurUrl = (url: string): string => {
  // إذا كان بالفعل رابط مباشر (i.imgur.com)
  if (url.includes('i.imgur.com')) {
    return url;
  }

  // استخراج المعرف من رابط Imgur
  const match = url.match(/imgur\.com\/([a-zA-Z0-9]+)/);
  if (match) {
    const imageId = match[1];
    // تجربة jpg أولاً (الأكثر شيوعاً)
    return `https://i.imgur.com/${imageId}.jpg`;
  }

  return url;
};

/**
 * تحويل رابط Dropbox إلى رابط مباشر
 * من: https://www.dropbox.com/s/FILE_ID/image.jpg?dl=0
 * إلى: https://dl.dropboxusercontent.com/s/FILE_ID/image.jpg
 */
export const convertDropboxUrl = (url: string): string => {
  if (url.includes('dropbox.com')) {
    // استبدال www.dropbox.com بـ dl.dropboxusercontent.com
    let directUrl = url.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
    directUrl = directUrl.replace('dropbox.com', 'dl.dropboxusercontent.com');
    // إزالة ?dl=0 أو تغييره إلى ?dl=1
    directUrl = directUrl.replace('?dl=0', '').replace('&dl=0', '');
    return directUrl;
  }
  return url;
};

/**
 * تحويل رابط OneDrive إلى رابط مباشر
 */
export const convertOneDriveUrl = (url: string): string => {
  if (url.includes('1drv.ms') || url.includes('onedrive.live.com')) {
    // OneDrive يحتاج إلى embed في نهاية الرابط
    if (!url.includes('embed')) {
      return url.replace('view', 'embed').replace('?', '?embed&');
    }
  }
  return url;
};

/**
 * تحويل رابط ImgBB إلى رابط مباشر
 */
export const convertImgBBUrl = (url: string): string => {
  // ImgBB روابط مباشرة بالفعل، لكن نتأكد من الصيغة
  if (url.includes('ibb.co') || url.includes('imgbb.com')) {
    // إذا كان رابط صفحة (i.ibb.co/abc123)
    if (!url.includes('/i.ibb.co/') && url.includes('ibb.co/')) {
      return url.replace('ibb.co/', 'i.ibb.co/');
    }
    return url;
  }
  return url;
};

/**
 * محول شامل - يكتشف نوع الرابط ويحوله تلقائياً
 */
export const convertImageUrl = (url: string): string => {
  if (!url) return '';

  // تنظيف الرابط
  const cleanUrl = url.trim();

  // Google Drive
  if (cleanUrl.includes('drive.google.com')) {
    return convertGoogleDriveUrl(cleanUrl);
  }

  // Imgur
  if (cleanUrl.includes('imgur.com')) {
    return convertImgurUrl(cleanUrl);
  }

  // ImgBB
  if (cleanUrl.includes('ibb.co') || cleanUrl.includes('imgbb.com')) {
    return convertImgBBUrl(cleanUrl);
  }

  // Dropbox
  if (cleanUrl.includes('dropbox.com')) {
    return convertDropboxUrl(cleanUrl);
  }

  // OneDrive
  if (cleanUrl.includes('1drv.ms') || cleanUrl.includes('onedrive.live.com')) {
    return convertOneDriveUrl(cleanUrl);
  }

  // رابط مباشر (يحتوي على امتداد صورة)
  if (/\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(cleanUrl)) {
    return cleanUrl;
  }

  // إرجاع الرابط كما هو إذا لم يتطابق مع أي نمط
  return cleanUrl;
};

/**
 * تحويل رابط YouTube إلى صيغة Embed
 * استخدام youtube-nocookie.com لتجنب مشاكل CORS
 * يدعم: فيديوهات عادية، YouTube Shorts، جميع أنواع الروابط
 */
export const convertYouTubeUrl = (url: string): string => {
  if (!url) return '';

  // إذا كان بالفعل embed URL
  if (url.includes('youtube.com/embed/') || url.includes('youtube-nocookie.com/embed/')) {
    // تحويل من youtube.com إلى youtube-nocookie.com
    return url.replace('youtube.com', 'youtube-nocookie.com');
  }

  // استخراج video ID من أنواع روابط YouTube المختلفة
  let videoId = '';

  // النوع 1: https://www.youtube.com/watch?v=VIDEO_ID
  const match1 = url.match(/[?&]v=([^&]+)/);
  if (match1) {
    videoId = match1[1];
  }

  // النوع 2: https://youtu.be/VIDEO_ID
  const match2 = url.match(/youtu\.be\/([^?&]+)/);
  if (match2) {
    videoId = match2[1];
  }

  // النوع 3: https://www.youtube.com/embed/VIDEO_ID
  const match3 = url.match(/youtube\.com\/embed\/([^?&]+)/);
  if (match3) {
    videoId = match3[1];
  }

  // النوع 4: YouTube Shorts - https://www.youtube.com/shorts/VIDEO_ID
  const match4 = url.match(/youtube\.com\/shorts\/([^?&]+)/);
  if (match4) {
    videoId = match4[1];
  }

  // النوع 5: YouTube Shorts - https://youtube.com/shorts/VIDEO_ID
  const match5 = url.match(/\/shorts\/([^?&]+)/);
  if (match5) {
    videoId = match5[1];
  }

  if (videoId) {
    // استخدام youtube-nocookie.com بدلاً من youtube.com
    return `https://www.youtube-nocookie.com/embed/${videoId}`;
  }

  return url;
};

/**
 * التحقق من صلاحية رابط الصورة
 */
export const isValidImageUrl = (url: string): boolean => {
  if (!url) return false;
  
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * الحصول على نوع المنصة من الرابط
 */
export const getPlatformFromUrl = (url: string): string => {
  if (url.includes('drive.google.com')) return 'Google Drive';
  if (url.includes('imgur.com')) return 'Imgur';
  if (url.includes('ibb.co') || url.includes('imgbb.com')) return 'ImgBB';
  if (url.includes('dropbox.com')) return 'Dropbox';
  if (url.includes('onedrive.live.com') || url.includes('1drv.ms')) return 'OneDrive';
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube';
  return 'رابط مباشر';
};
