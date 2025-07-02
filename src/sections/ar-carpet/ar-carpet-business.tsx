import React from 'react';
// framer-motion
import { m } from 'framer-motion';
// @mui
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme, styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// locales
import { useLocales } from 'src/locales';
// components
import { MotionContainer, varFade } from 'src/components/animate';
import SvgColor from 'src/components/svg-color';
// constants
import { business_benefits } from 'src/constants';

//
const HighlightText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '88px',
  lineHeight: 1,

  [theme.breakpoints.down('md')]: {
    fontSize: '64px',
  },
}));
// ----------------------------------------------------------------------

interface BusinessItemProps {
  title: string;
  subtitle: string;
  icon: string;
}

const BusinessItem: React.FC<BusinessItemProps> = ({ title, subtitle, icon }) => {
  const theme = useTheme();

  return (
    <Stack
      alignItems="flex-start"
      spacing={2}
      sx={{
        borderRadius: 5,
        border: `solid 2px ${theme.palette.secondary.darker}`,
        p: 5,
      }}
    >
      <SvgColor sx={{ width: 88, height: 88 }} color={theme.palette.secondary.main} src={icon} />

      <Typography variant="h3" color="grey.300">
        {title}
      </Typography>
      <Typography variant="body1" color="grey.100" sx={{ minHeight: { xs: 'auto', sm: '80px' } }}>
        {subtitle}
      </Typography>
    </Stack>
  );
};

export default function ARCarpetBusinessBenefits() {
  const { t } = useLocales();
  return (
    <Box mt={15}>
      <Container component={MotionContainer}>
        <Stack alignItems="center">
          <Stack mt={5} maxWidth="lg" alignItems="center" sx={{ width: '100%' }}>
            <m.div variants={varFade().inUp}>
              <HighlightText color="grey.700">{t('ar_carpet.benefits.title')}</HighlightText>
            </m.div>
          </Stack>

          <Stack mt={8} maxWidth="lg" alignItems="flex-start" sx={{ width: '100%' }}>
            <Grid container spacing={3} justifyContent={{ xs: 'flex-start', md: 'space-between' }}>
              {React.Children.toArray(
                business_benefits(t).map((item) => (
                  <Grid xs={12} sm={6} md={6} key={item.title}>
                    <m.div variants={varFade().inUp}>
                      <BusinessItem title={item.title} subtitle={item.subtitle} icon={item.icon} />
                    </m.div>
                  </Grid>
                ))
              )}
            </Grid>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
