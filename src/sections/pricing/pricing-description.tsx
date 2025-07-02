import React from 'react';

// @mui
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
// framer-motion
import { m } from 'framer-motion';
// components
import { MotionContainer, varFade } from 'src/components/animate';
// locals
import { useLocales } from 'src/locales';

const PricingDescription = () => {
  const { t } = useLocales();

  return (
    <Box>
      <Container sx={{ py: 5 }} component={MotionContainer}>
        <Stack justifyContent="center" alignItems="center">
          <Stack maxWidth="sm">
            <m.div variants={varFade().inUp}>
              <Typography variant="h3" color="grey.300">
                {t('pricing.pricing_title_1')}
              </Typography>
            </m.div>
            <m.div variants={varFade().inDown}>
              <Typography mt={2} variant="body1" color="grey.100">
                {t('pricing.pricing_description_1')}
              </Typography>
            </m.div>
          </Stack>
          <Stack mt={10} maxWidth="sm">
            <m.div variants={varFade().inUp}>
              <Typography variant="h3" color="grey.300">
                {t('pricing.pricing_title_2')}
              </Typography>
            </m.div>
            <m.div variants={varFade().inDown}>
              <Typography mt={2} variant="body1" color="grey.100">
                {t('pricing.pricing_description_2')}
              </Typography>
            </m.div>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default PricingDescription;
