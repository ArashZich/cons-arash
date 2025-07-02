'use client';

// layouts
import { CallToAction } from 'src/layouts/_common';
//
import PricingForm from '../pricing-form';
import PricingDescription from '../pricing-description';

// ----------------------------------------------------------------------

export default function PricingView() {
  return (
    <>
      <PricingForm />
      <PricingDescription />
      <CallToAction />
    </>
  );
}
