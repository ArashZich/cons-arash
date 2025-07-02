// react
import React from 'react';
// framer-motion
import { m } from 'framer-motion';

// @mui
import { styled } from '@mui/material/styles';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

// locals
import { useLocales } from 'src/locales';

// components
import { MotionViewport, varZoom } from 'src/components/animate';

// constants
import { customersList } from 'src/constants/landing';

const HighlightText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '88px',
  lineHeight: 1,

  [theme.breakpoints.down('md')]: {
    fontSize: '64px',
  },
}));

export default function HomeCustomers() {
  const { t } = useLocales();
  return (
    <Container
      component={MotionViewport}
      maxWidth="md"
      sx={{
        backgroundColor: 'common.black',
        color: 'grey.500',
        pb: { xs: 5, md: 10 },
        mt: 10,
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <m.div variants={varZoom().inDown}>
          <HighlightText color="grey.700">{t('landing.trusted_by')}</HighlightText>
        </m.div>
      </Box>
      <Grid container spacing={5} justifyContent="center" alignItems="center">
        {customersList.map((logo, index) => (
          <Grid xs={6} sm={4} md={3} key={logo} sx={{ display: 'flex', justifyContent: 'center' }}>
            <m.div variants={varZoom().inUp}>
              <Box
                sx={{
                  padding: 2, // فاصله داخلی
                  borderRadius: 2, // گوشه‌های گرد
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.5)', // پس‌زمینه سفید کم‌رنگ هنگام هاور
                  },
                }}
              >
                <Box
                  component="img"
                  src={logo}
                  alt={`Customer logo ${index + 1}`}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: { xs: 80, md: 120 },
                    objectFit: 'contain',
                    filter: 'grayscale(100%)',
                    '&:hover': {
                      filter: 'grayscale(0%)',
                    },
                    transition: 'all 0.3s ease-in-out',
                  }}
                />
              </Box>
            </m.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
