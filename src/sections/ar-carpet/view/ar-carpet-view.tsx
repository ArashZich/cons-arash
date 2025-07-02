'use client';

import ARCarpetHero from '../ar-carpet-hero';
import ARCarpetPlatform from '../ar-carpet-platform';
import ARCarpetSpecializedSales from '../ar-carpet-specialized-sales';
import ARCarpetBusinessBenefits from '../ar-carpet-business';
import ArCarpetFAQ from '../ar-carpet-faq';
import CallToAction from '../ar-carpet-call-to-action';

// ----------------------------------------------------------------------

export default function ARCarpetView() {
  return (
    <>
      <ARCarpetHero />

      <ARCarpetPlatform />

      <ARCarpetSpecializedSales />

      <ARCarpetBusinessBenefits />

      <ArCarpetFAQ />

      <CallToAction />
    </>
  );
}
