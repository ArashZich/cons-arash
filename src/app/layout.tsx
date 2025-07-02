// locales
import 'src/locales/i18n';

// scrollbar
import 'simplebar-react/dist/simplebar.min.css';

// lightbox
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// editor
import 'react-quill/dist/quill.snow.css';

// carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// image
import 'react-lazy-load-image-component/src/effects/blur.css';

// fonts
import '../../public/fonts/index.css';

// ----------------------------------------------------------------------

// locales
import { LocalizationProvider } from 'src/locales';
// theme
import ThemeProvider from 'src/theme';
import { primaryFontFa } from 'src/theme/typography';
// components
import ProgressBar from 'src/components/progress-bar';
import { DisableDevTools } from 'src/components/disable-dev-tools';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';
import { SettingsProvider } from 'src/components/settings';
import { ScrollToTopButton } from 'src/components/scroll-to-top/ScrollToTopButton';
// clarity analysis
import { TrackerProvider, ClarityAnalytics } from 'src/analytics';
// redux
import { AuthConsumer, AuthProvider } from 'src/auth/jwt-context';
import { ReduxProvider, TanStackProvider } from './_context-providers';
// ----------------------------------------------------------------------

export const metadata = {
  metadataBase: new URL('https://armogroup.tech'), // اضافه کردن این خط
  title: 'AR/VR/3D',
  description: 'AR/VR/3D Solutions Provider',
  keywords:
    'AR technology, AR user experience, AR applications, Virtual reality and augmented reality, AR hardware (headsets, glasses, smartphones), AR developers, AR applications (education, marketing, industry, entertainment, etc.), Benefits of using AR, Challenges of AR implementation, AR standards, تکنولوژی AR, تجربه کاربری AR, اپلیکیشن‌های AR, واقعیت مجازی و واقعیت افزوده, سخت‌افزار AR (هدست‌ها، عینک‌ها، گوشی‌های هوشمند), توسعه‌دهندگان AR, کاربردهای AR (آموزش، بازاریابی، صنعت، سرگرمی و ...), مزایای استفاده از AR, چالش‌های پیاده‌سازی AR, استانداردهای AR',
  themeColor: '#000000',
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: [
    {
      rel: 'icon',
      url: '/favicon/favicon.ico',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/favicon-32x32.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicon/apple-touch-icon.png',
    },
  ],
  openGraph: {
    title: 'ARmo - AR/VR/3D Solutions Provider',
    description: 'Explore the latest in AR, VR, and 3D technology with ARmo.',
    url: 'https://armogroup.tech',
    siteName: 'ARmo',
    images: [
      {
        url: 'https://bytebase.armogroup.tech/api/v1/files/download/armo-logo-main.jpg',
        width: 800,
        height: 600,
        alt: 'ARmo Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="fa" className={primaryFontFa.className} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <DisableDevTools />
        <ReduxProvider>
          <TanStackProvider>
            <AuthProvider>
              <LocalizationProvider>
                <SettingsProvider
                  defaultSettings={{
                    themeMode: 'light', // 'light' | 'dark'
                    themeDirection: 'ltr', //  'rtl' | 'ltr'
                    themeContrast: 'default', // 'default' | 'bold'
                    themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
                    themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                    themeStretch: false,
                  }}
                >
                  <ThemeProvider>
                    <ClarityAnalytics />
                    <MotionLazy>
                      <SnackbarProvider>
                        <ProgressBar />
                        <AuthConsumer>
                          {/* GoogleAnalytics حذف شد */}
                          <TrackerProvider>
                            <ScrollToTopButton />
                            {children}
                          </TrackerProvider>
                        </AuthConsumer>
                      </SnackbarProvider>
                    </MotionLazy>
                  </ThemeProvider>
                </SettingsProvider>
              </LocalizationProvider>
            </AuthProvider>
          </TanStackProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
