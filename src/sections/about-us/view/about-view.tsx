'use client';

import AboutHero from '../about-hero';
import AboutJoin from '../about-join';
import AboutMission from '../about-mission';
import AboutStory from '../about-story';
import AboutTeam from '../about-team';

// ----------------------------------------------------------------------

export default function AboutView() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutMission />
      <AboutTeam />
      <AboutJoin />
    </>
  );
}
