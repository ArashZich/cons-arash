// react
import React, { memo } from 'react';
// framer-motion
import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// next/image
import Image from 'next/image';
// locals
import { useLocales } from 'src/locales';
// components
import { MotionViewport, varFade, varZoom } from 'src/components/animate';

const BackgroundImageBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  backgroundImage: `
    linear-gradient(to bottom, ${theme.palette.common.black}, transparent 5%, transparent 95%, ${theme.palette.common.black}),
    linear-gradient(to right, ${theme.palette.common.black}, transparent 5%, transparent 85%, ${theme.palette.common.black}),
    url('${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/landing/MakeupAR.webp')
  `,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  width: '100%',
  height: '65vh',
}));

const HighlightTextComponent = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '88px',
  lineHeight: 1,

  [theme.breakpoints.down('md')]: {
    fontSize: '64px',
  },
}));

const GridItemComponent = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));

const HomeWhyAR = memo(() => {
  const { t } = useLocales();

  return (
    <Container
      component={MotionViewport}
      disableGutters
      maxWidth="lg"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'common.black',
        position: 'relative',
      }}
    >
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ height: '100%' }}
      >
        <Grid xs={12} md={6}>
          <BackgroundImageBox />
        </Grid>
        <GridItemComponent xs={12} md={6}>
          <Stack spacing={2}>
            <m.div variants={varFade().inUp}>
              <HighlightTextComponent color="grey.700">
                {t('landing.why_ar')}
              </HighlightTextComponent>
            </m.div>
            <m.div variants={varZoom().inUp}>
              <Stack direction="row" spacing={2} mt={4} alignItems="center">
                <Image
                  src={`${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/landing/fast_digitalization.webp`}
                  alt="Fast Digitalization"
                  width={70}
                  height={70}
                />
                <Stack>
                  <Typography color="grey.100" variant="h3">
                    {t('landing.innovative_marketing')}
                  </Typography>
                  <Typography color="grey.300" variant="body1">
                    {t('landing.innovative_marketing_description')}
                  </Typography>
                </Stack>
              </Stack>
            </m.div>
            <m.div variants={varZoom().inUp}>
              <Stack direction="row" spacing={2} mt={4} alignItems="center">
                <Image
                  src={`${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/landing/competitive_advantage.webp`}
                  alt="Competitive Advantage"
                  width={70}
                  height={70}
                />
                <Stack>
                  <Typography color="grey.100" variant="h3">
                    {t('landing.increased_sales')}
                  </Typography>
                  <Typography color="grey.300" variant="body1">
                    {t('landing.increased_sales_description')}
                  </Typography>
                </Stack>
              </Stack>
            </m.div>
            <m.div variants={varZoom().inUp}>
              <Stack direction="row" spacing={2} mt={4} alignItems="center">
                <Image
                  src={`${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/landing/build_brand_loyalty.webp`}
                  alt="Build Brand Loyalty"
                  width={70}
                  height={70}
                />
                <Stack>
                  <Typography color="grey.100" variant="h3">
                    {t('landing.enriched_user_experience')}
                  </Typography>
                  <Typography color="grey.300" variant="body1">
                    {t('landing.enriched_user_experience_description')}
                  </Typography>
                </Stack>
              </Stack>
            </m.div>
          </Stack>
        </GridItemComponent>
      </Grid>
    </Container>
  );
});

export default HomeWhyAR;
