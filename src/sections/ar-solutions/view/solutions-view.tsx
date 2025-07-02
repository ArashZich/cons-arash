'use client';

// layouts
import { CallToAction } from 'src/layouts/_common';
//
import SolutionsHero from '../solutions-hero';
import SolutionsDescription from '../solutions-description';
import HowToUseAR from '../solutions-how-to-use';
// ----------------------------------------------------------------------

export default function SolutionsView() {
  return (
    <>
      <SolutionsHero />
      <HowToUseAR />
      <SolutionsDescription />
      <CallToAction />
    </>
  );
}
