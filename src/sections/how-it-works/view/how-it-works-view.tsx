'use client';

// layouts
import { CallToAction } from 'src/layouts/_common';
//
import HowItWorksHeader from '../how-it-works-header';
import HowItWorksManage from '../how-it-works-manage';
import HowItWorksStages from '../how-it-works-stages';
import HowItWorksAnalyze from '../how-it-works-analyze';
import HowItWorksDescriptions from '../how-it-works-descriptions';

// ----------------------------------------------------------------------

export default function HowItWorksView() {
  return (
    <>
      <HowItWorksHeader />
      <HowItWorksStages />
      <HowItWorksManage />
      <HowItWorksAnalyze />
      <HowItWorksDescriptions />
      <CallToAction />
    </>
  );
}
