import React from 'react';
// framer-motion
import { m } from 'framer-motion';
// @mui
import { useTheme } from '@mui/material/styles';
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
import { eyewear_benefits } from 'src/constants';

// ----------------------------------------------------------------------

interface SpecializedItemProps {
  title: string;
  subtitle: string;
  icon: string;
}

const SpecializedItem: React.FC<SpecializedItemProps> = ({ title, subtitle, icon }) => {
  const theme = useTheme();

  return (
    <Stack alignItems="flex-start" direction="row" spacing={2}>
      <SvgColor sx={{ width: 88, height: 88 }} color={theme.palette.secondary.main} src={icon} />
      <Stack alignItems="flex-start" sx={{ width: '100%' }}>
        <Typography variant="h3" color="grey.300">
          {title}
        </Typography>
        <Typography variant="body1" color="grey.100" mt={1}>
          {subtitle}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default function EyewearBenefits() {
  const { t } = useLocales();
  return (
    <Box mt={15}>
      <Container component={MotionContainer}>
        <Stack alignItems="center">
          <Stack mt={5} alignItems="center" maxWidth="sm" sx={{ width: '100%' }}>
            <m.div variants={varFade().inUp}>
              <Stack alignItems="flex-start">
                <Typography variant="h3" color="grey.300" mt={2}>
                  {t('eyewear.virtual_tryon_solution')}
                </Typography>
                <Typography variant="body1" paragraph color="grey.100" mt={2} align="left">
                  {t('eyewear.our_virtual_tryon_technology_enables_customers_preview')}
                </Typography>
              </Stack>
            </m.div>
          </Stack>

          <Stack mt={15} alignItems="flex-start" spacing={4} sx={{ width: '100%' }} maxWidth="sm">
            <Typography variant="h3" color="grey.300" mb={4}>
              {t('eyewear.benefits_for_your_business')}
            </Typography>
            {React.Children.toArray(
              eyewear_benefits(t).map((item) => (
                <m.div key={item.title} variants={varFade().inUp}>
                  <SpecializedItem title={item.title} subtitle={item.subtitle} icon={item.icon} />
                </m.div>
              ))
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
