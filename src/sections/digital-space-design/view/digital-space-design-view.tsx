'use client';

import DigitalSpaceDesignHero from '../digital-space-design-hero';
import DigitalSpaceDesignSolutions from '../digital-space-design-solutions';
import DigitalSpaceDesignWhyARMO from '../digital-space-design-why-armo';
import Modeling3DFAQ from '../digital-space-design-faq';
import CallToAction from '../digital-space-design-call-to-action';

// ----------------------------------------------------------------------

export default function DigitalSpaceDesignView() {
  return (
    <>
      <DigitalSpaceDesignHero />

      <DigitalSpaceDesignSolutions />

      <DigitalSpaceDesignWhyARMO />

      <Modeling3DFAQ />

      <CallToAction />
    </>
  );
}
