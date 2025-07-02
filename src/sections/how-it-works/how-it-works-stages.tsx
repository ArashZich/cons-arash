import React from 'react';
// framer-motion
import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// constants
import { software_3d } from 'src/constants';
// locales
import { useLocales } from 'src/locales';
// components
import { MotionContainer, varFade } from 'src/components/animate';
import Image from 'src/components/image';
// ----------------------------------------------------------------------

const MethodText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '120px',
  lineHeight: 1,
  background: 'linear-gradient(135deg, #61F3F3 0%, #00B8D9 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  [theme.breakpoints.down('md')]: {
    fontSize: '90px',
  },
}));

const Logo = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  maxWidth: '150px',
  marginBottom: theme.spacing(2),
  objectFit: 'contain',
}));

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function HowItWorksStages() {
  const { t } = useLocales();
  return (
    <Box
      sx={{
        textAlign: 'center',
      }}
    >
      <Container
        sx={{
          py: 5,

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
        component={MotionContainer}
      >
        <Stack alignItems="center" mt={10}>
          <m.div variants={varFade().inUp}>
            <Typography variant="h2" color="secondary.light">
              {t('how_it_works.intro_products')}
            </Typography>
          </m.div>
          <m.div variants={varFade().inUp}>
            <Typography mt={1} variant="body1" color="grey.100">
              {t('how_it_works.bring_digital')}
            </Typography>
          </m.div>
        </Stack>

        <Stack
          sx={{ py: 5, mt: 10 }}
          flexDirection="row"
          spacing={2}
          component={m.div}
          variants={itemVariants}
          justifyContent="center"
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.3 }}
          maxWidth="md"
        >
          <MethodText>1</MethodText>
          <Stack alignItems="flex-start" textAlign="left" pt={2}>
            <m.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Typography variant="h5" color="secondary.light">
                {t('how_it_works.method1')}
              </Typography>
            </m.div>
            <m.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Typography variant="h3" color="grey.100">
                {t('how_it_works.upload_3d')}
              </Typography>
            </m.div>
            <m.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Typography variant="body1" color="white" mt={2}>
                {t('how_it_works.upload_instructions')}
              </Typography>
            </m.div>
          </Stack>
        </Stack>

        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="flex-start"
          sx={{ my: 5 }}
          component={m.div}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Grid item xs={12} sm={6} md={3}>
            <Stack spacing={2} alignItems="center">
              {software_3d.slice(0, 4).map((src, index) => (
                <m.div
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Logo src={src} alt={`logo${index + 1}`} />
                </m.div>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Stack spacing={2} alignItems="center">
              {software_3d.slice(4, 6).map((src, index) => (
                <m.div
                  key={index + 4}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <Logo src={src} alt={`logo${index + 5}`} />
                </m.div>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Stack spacing={2} alignItems="center">
              {software_3d.slice(6, 9).map((src, index) => (
                <m.div
                  key={index + 6}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                >
                  <Logo src={src} alt={`logo${index + 7}`} />
                </m.div>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Stack spacing={2} alignItems="center">
              {software_3d.slice(9, 11).map((src, index) => (
                <m.div
                  key={index + 9}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                >
                  <Logo src={src} alt={`logo${index + 10}`} />
                </m.div>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Stack
          sx={{ py: 5 }}
          flexDirection="row"
          justifyContent="center"
          spacing={2}
          component={m.div}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.7 }}
          maxWidth="md"
        >
          <MethodText>2</MethodText>
          <Stack alignItems="flex-start" textAlign="left" pt={2}>
            <m.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Typography variant="h5" color="secondary.light">
                {t('how_it_works.method2')}
              </Typography>
            </m.div>
            <m.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <Typography variant="h3" color="grey.100">
                {t('how_it_works.convert_images')}
              </Typography>
            </m.div>
            <m.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <Typography variant="body1" color="white" mt={2}>
                {t('how_it_works.convert_instructions')}
              </Typography>
            </m.div>
          </Stack>
        </Stack>
        <Image
          src={`${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/how-it-works/monitor.webp`}
          alt="monitor"
        />
      </Container>
    </Box>
  );
}
