'use client';

// react
import React from 'react';
// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';
// form
import ProjectSubmitted from '../project-submitted';

function ProjectSubmittedView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ height: '100%' }}>
      <ProjectSubmitted />
    </Container>
  );
}

export default ProjectSubmittedView;
