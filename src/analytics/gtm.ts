// src/lib/gtm.ts
export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER;

export const pageview = (url: string) => {
  if (typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({
      event: 'pageview',
      page: url,
    });
  }
};
