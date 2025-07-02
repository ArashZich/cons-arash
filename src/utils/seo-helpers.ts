// src/utils/seo-helpers.ts

/**
 * تابع تبدیل متن به slug برای استفاده در URL
 * برای عنوان‌های فارسی، تعداد کلمات محدودی را کدگذاری می‌کند
 * برای عنوان‌های انگلیسی، متن را به شکل استاندارد slug تبدیل می‌کند
 */
export const slugify = (text: string) => {
  if (!text) return '';

  // گرفتن فقط چند کلمه اول عنوان (مثلاً 3 کلمه اول)
  const firstFewWords = text.split(' ').slice(0, 3).join(' ');

  // تشخیص متن فارسی با استفاده از محدوده یونیکد حروف فارسی و عربی
  const persianPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

  if (persianPattern.test(firstFewWords)) {
    // برای متن فارسی: تبدیل فاصله‌ها به خط تیره و کدگذاری URL
    const persianSlug = firstFewWords.trim().replace(/\s+/g, '-');
    return encodeURIComponent(persianSlug);
  }

  // برای متن انگلیسی: تبدیل به slug استاندارد
  return firstFewWords
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // حذف اعراب
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // تبدیل فاصله‌ها به خط تیره
    .replace(/[^\w-]+/g, '') // حذف کاراکترهای غیرمجاز
    .replace(/--+/g, '-'); // تبدیل چند خط تیره متوالی به یک خط تیره
};

/**
 * تابع رمزگشایی slug برای استفاده در درخواست‌های API
 * خط تیره‌ها را به فاصله تبدیل می‌کند تا با عنوان اصلی مطابقت داشته باشد
 */
export const deslugify = (slug: string): string => {
  if (!slug) return '';

  try {
    // رمزگشایی URL و تبدیل خط تیره‌ها به فاصله
    const decoded = decodeURIComponent(slug);
    return decoded.replace(/-/g, ' ');
  } catch (error) {
    // در صورت خطا در رمزگشایی، همان slug را برگرداند
    console.error('Error decoding slug:', error);
    return slug.replace(/-/g, ' ');
  }
};

// محاسبه زمان تقریبی مطالعه
export const readingTime = (content: string) => {
  const wordsPerMinute = 200;
  // حذف تگ‌های HTML
  const text = content.replace(/<[^>]*>/g, '');
  const textLength = text.split(/\s+/).length;
  if (textLength > 0) {
    return Math.ceil(textLength / wordsPerMinute);
  }
  return 0;
};
