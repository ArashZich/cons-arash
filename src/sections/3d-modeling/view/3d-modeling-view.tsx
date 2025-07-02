'use client';

import Modeling3DHero from '../3d-modeling-hero';
import Modeling3DBusinessApplications from '../3d-modeling-business-applications';
import Modeling3DProcess from '../3d-modeling-process';
import Modeling3DWhyARMO from '../3d-modeling-why-armo';
import Modeling3DFAQ from '../3d-modeling-faq';
import CallToAction from '../3d-modeling-call-to-action';

// ----------------------------------------------------------------------

export default function Modeling3DView() {
  return (
    <>
      <Modeling3DHero />

      <Modeling3DBusinessApplications />

      <Modeling3DProcess />

      <Modeling3DWhyARMO />

      <Modeling3DFAQ />

      <CallToAction />
    </>
  );
}
