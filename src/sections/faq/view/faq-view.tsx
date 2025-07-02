'use client';

// layouts
import { CallToAction } from 'src/layouts/_common';
//
import FAQList from '../faq-list';

// ----------------------------------------------------------------------

export default function FAQView() {
  return (
    <>
      <FAQList />

      <CallToAction />
    </>
  );
}
