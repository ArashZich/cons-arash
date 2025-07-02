import localFont from 'next/font/local';

export const primaryFontFa = localFont({
  src: [
    {
      path: '../assets/fonts/IRANSansX-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/IRANSansX-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
});

export const primaryFontEn = localFont({
  src: [
    {
      path: '../assets/fonts/Montserrat-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Montserrat-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
});
