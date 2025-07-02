// src/components/Analytics/AnalyticsProvider.tsx

'use client';

import Script from 'next/script';
import { GTM_ID, GA_ID } from './analytics';

export function AnalyticsScripts() {
  return (
    <>
      {GTM_ID && (
        // اسکریپت GTM - برای مدیریت تگ‌ها
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              (function(w,d,s,l,i){
                w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
      )}

      {GA_ID && (
        // اسکریپت GA4 - برای آنالیتیکس گوگل
        <>
          <Script
            id="ga-base"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script
            id="ga-config"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  send_page_view: true,
                  cookie_flags: 'SameSite=None;Secure'
                });
              `,
            }}
          />
        </>
      )}
    </>
  );
}

export function AnalyticsNoScript() {
  if (!GTM_ID) return null;

  return (
    <noscript>
      <iframe
        title="Google Tag Manager"
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}
