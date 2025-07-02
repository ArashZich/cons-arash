// src/lib/analytics.ts
// این فایل توابع اصلی برای ارسال رویدادها به GTM و GA4 را تعریف می‌کند

// تعریف ساختار رویدادها - همه فیلدها اختیاری هستند بجز action
type EventProps = {
  action: string; // نوع عمل - اجباری
  category?: string; // دسته‌بندی رویداد
  event_label?: string | undefined; // برچسب توضیحی
  value?: number; // مقدار عددی (مثل زمان یا تعداد)
  element_type?: string; // نوع المان HTML
  page_path?: string | undefined; // مسیر صفحه
  search_params?: string | undefined; // پارامترهای URL
  link_text?: string | undefined; // متن لینک
  button_type?: string | undefined; // نوع دکمه
  form_name?: string | undefined; // نام فرم
  error_source?: string; // منبع خطا
  error_line?: number; // شماره خط خطا
  [key: string]: any; // سایر فیلدهای اضافی
};

// دریافت شناسه‌های گوگل از متغیرهای محیطی
export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER;
// clarity
export const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
// تابع ثبت رویدادهای سفارشی - هم به GTM و هم به GA4 ارسال می‌کند
export const trackEvent = (eventProps: EventProps) => {
  if (typeof window !== 'undefined') {
    // ارسال به GTM

    window.dataLayer?.push({
      event: 'custom_event',
      ...eventProps,
    });

    // ارسال به GA4
    window.gtag?.('event', eventProps.action, {
      ...eventProps,
    });
  }
};

// تابع ثبت بازدید از صفحات
export const trackPageview = (url: string | undefined, title: string) => {
  if (!url) return;

  if (typeof window !== 'undefined') {
    // ارسال به GTM
    window.dataLayer?.push({
      event: 'page_view',
      page_path: url,
      page_title: title,
      page_location: window.location.href,
    });

    // ارسال به GA4
    window.gtag?.('config', GA_ID!, {
      page_path: url,
      page_title: title,
    });
  }
};
