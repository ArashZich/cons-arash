// src/_types/global.d.ts

declare global {
  interface Window {
    dataLayer: Array<Record<string, any>>;
    gtag: (...args: any[]) => void;
  }
}

export {};
