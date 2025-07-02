// next
import Link from 'next/link';
// react
import React from 'react';
// framer-motion
import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
// locales
import { useLocales } from 'src/locales';
// components
import { MotionViewport, varZoom } from 'src/components/animate';
// routes
import { paths } from 'src/routes/paths';

const StatBox = styled(Box)(() => ({
  textAlign: 'center',
}));

const HighlightText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '100px',
  lineHeight: 1,

  [theme.breakpoints.down('md')]: {
    fontSize: '64px',
  },
}));

// Import icons from the provided URLs
const icons = {
  digitalization: `${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/landing/digitalization.webp`,
  manageEmbed: `${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/landing/manage_embed.webp`,
  analyze: `${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/landing/analyze.webp`,
};

const FeatureBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  backgroundColor: 'transparent', // assuming a dark background
  boxShadow: 'none', // no shadow for a flat design
}));

const FeatureIcon = styled('img')({
  marginBottom: 16,
  height: 'auto',
  width: 80,
});

const HowToUseAR: React.FC = () => {
  const { t } = useLocales();
  return (
    <Container
      maxWidth="md"
      component={MotionViewport}
      sx={{
        backgroundColor: 'common.black',
        color: 'grey.500',
        pb: { xs: 5, md: 10 },
        mt: 10,
        mb: 10,
      }}
    >
      <StatBox>
        <HighlightText color="grey.700">{t('landing.how_to_use_ar')}</HighlightText>
        <Grid container spacing={2} justifyContent="center" mt={5}>
          {Object.entries(icons).map(([key, src], index) => (
            <Grid item xs={12} sm={4} key={key}>
              <m.div variants={varZoom().inUp}>
                <FeatureBox>
                  <FeatureIcon src={src} alt={key} />
                  <Typography variant="h5" color="grey.100">
                    {key === 'digitalization' && t('landing.physical_to_digital')}
                    {key === 'manageEmbed' && t('landing.manage_everywhere')}
                    {key === 'analyze' && t('landing.analyze_data')}
                  </Typography>
                  <Typography variant="body1" color="grey.300" mt={1}>
                    {key === 'digitalization' && t('landing.physical_to_digital_description')}
                    {key === 'manageEmbed' && t('landing.manage_everywhere_description')}
                    {key === 'analyze' && t('landing.analyze_data_description')}
                  </Typography>
                </FeatureBox>
              </m.div>
            </Grid>
          ))}
        </Grid>
        <Box mt={4} display="flex" justifyContent="center">
          <Button
            variant="outlined"
            color="secondary"
            sx={{ width: 240 }}
            LinkComponent={Link}
            href={paths.how_it_works}
          >
            {t('landing.learn_more')}
          </Button>
        </Box>
      </StatBox>
    </Container>
  );
};

export default HowToUseAR;
