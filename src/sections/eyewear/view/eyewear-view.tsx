'use client';

import EyewearHero from '../eyewear-hero';
import EyewearRetailers from '../eyewear-retailers';
import EyewearBenefits from '../eyewear-benefits';
import EyewearWhyARMO from '../eyewear-why-armo';
import EyewearFAQ from '../eyewear-faq';
import CallToAction from '../eyewear-call-to-action';
import { EyewearTryOn } from '../eyewear-try-on';

// ----------------------------------------------------------------------

export default function EyewearView() {
  return (
    <>
      <EyewearTryOn />
      <EyewearHero />

      <EyewearRetailers />

      <EyewearBenefits />

      <EyewearWhyARMO />

      <EyewearFAQ />

      <CallToAction />
    </>
  );
}
