// react
import React from 'react';
// framer-motion
import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography, { TypographyProps } from '@mui/material/Typography';
// locales
import { useLocales } from 'src/locales';
// components
import { MotionViewport, varFade } from 'src/components/animate';

const StatBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  padding: theme.spacing(4),
  textAlign: 'center',
}));

// Correcting the typing for the component prop.
const GradientTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  background: 'linear-gradient(45deg, #61F3F3 30%, #00B8D9 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginTop: theme.spacing(4),
}));

const StatContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'space-around',
  },
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
  },
}));

const HighlightedNumber = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '7rem',
  lineHeight: 1,
});

const StatisticsSection: React.FC = () => {
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
      <StatBox>
        <m.div variants={varFade().inUp}>
          <HighlightedNumber color="grey.700">71%</HighlightedNumber>
          <Typography variant="body1" color="grey.300" mt={1}>
            {t('landing.description71')}
          </Typography>
        </m.div>

        <StatContainer container spacing={5} alignItems="center" mt={5}>
          {['40', '35', '50'].map((value) => (
            <Grid xs={12} sm={4} key={value}>
              <m.div variants={varFade().inUp}>
                <Typography variant="h5" color="grey.100">
                  {t(`landing.description${value}`)}
                </Typography>
                <GradientTypography variant="h1">{value}%</GradientTypography>
              </m.div>
            </Grid>
          ))}
        </StatContainer>
        <Typography variant="body1" color="grey.300" mt={5}>
          {t('landing.reported_by_brands')}
        </Typography>
      </StatBox>
    </Container>
  );
};

export default StatisticsSection;
