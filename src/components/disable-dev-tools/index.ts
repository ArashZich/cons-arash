'use client';

import { useEffect, FC } from 'react';

export const DisableDevTools: FC = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      // جلوگیری از راست کلیک
      const preventContextMenu = (event: MouseEvent): void => {
        event.preventDefault();
      };
      document.addEventListener('contextmenu', preventContextMenu);

      // جلوگیری از استفاده از کلیدهای توسعه‌دهنده
      const preventDevTools = (event: KeyboardEvent): void => {
        if (
          event.key === 'F12' ||
          (event.ctrlKey && event.shiftKey && event.key === 'I') ||
          (event.ctrlKey && event.shiftKey && event.key === 'C') ||
          (event.ctrlKey && event.shiftKey && event.key === 'J') ||
          (event.ctrlKey && event.key === 'U')
        ) {
          event.preventDefault();
        }
      };
      document.addEventListener('keydown', preventDevTools);

      // پاکسازی برای جلوگیری از خطا در زمانی که کامپوننت حذف می‌شود
      return () => {
        document.removeEventListener('contextmenu', preventContextMenu);
        document.removeEventListener('keydown', preventDevTools);
      };
    }

    // برگشتن undefined در صورت فعال نبودن شرط production
    return undefined;
  }, []);

  return null; // این کامپوننت چیزی را در UI نمایش نمی‌دهد
};
