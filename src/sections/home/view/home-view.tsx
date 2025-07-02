'use client';

import { useRef } from 'react'; // اضافه کردن useState و useEffect
// @mui
import Box from '@mui/material/Box';

// layouts
import { CallToAction } from 'src/layouts/_common';
import MainLayout from 'src/layouts/main';

//
import HomeHero from '../home-hero';
import Home3DSlider from '../home-3d-slider';
import HomeWhyAR from '../home-why-ar';
import HomeCustomers from '../home-customers';
import StatisticsSection from '../home-Statistics';
import HowToUseAR from '../home-how-to-use';
import HomeBlog from '../home-blog';
import SpecialOfferDialog from '../special-offer';
// components

// ----------------------------------------------------------------------

export default function HomeView() {
  const home3DSliderRef = useRef<HTMLDivElement>(null);
  const homeHeroRef = useRef<HTMLDivElement>(null);

  const handleScrollTo3DSlider = () => {
    home3DSliderRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <MainLayout>
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'common.black',
        }}
      >
        <SpecialOfferDialog />
        <Box ref={homeHeroRef}>
          <HomeHero goProjects={handleScrollTo3DSlider} />
        </Box>

        <Box ref={home3DSliderRef}>
          <Home3DSlider />
        </Box>
        <HomeWhyAR />
        <HomeCustomers />
        <StatisticsSection />
        <HowToUseAR />
        <CallToAction />
        <HomeBlog />
      </Box>
    </MainLayout>
  );
}
