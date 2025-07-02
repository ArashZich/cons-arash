'use client';

import MakeupHero from '../makeup-hero';
import MakeupChooseARTechnology from '../makeup-choose-ar-technology';
import MakeupWhyARMO from '../makeup-why-armo';
import MakeupOurSolutions from '../makeup-our-solutions';
import MakeupFAQ from '../makeup-faq';
import CallToAction from '../makeup-call-to-action';
import { MakeupTryOn } from '../makeup-try-on';

// ----------------------------------------------------------------------

export default function MakeupView() {
  return (
    <>
      <MakeupTryOn />
      <MakeupHero />

      <MakeupChooseARTechnology />

      <MakeupWhyARMO />

      <MakeupOurSolutions />

      <MakeupFAQ />

      <CallToAction />
    </>
  );
}
