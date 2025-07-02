import React from 'react';
// framer-motion
import { m } from 'framer-motion';
// @mui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/system/Unstable_Grid';

// locales
import { useLocales } from 'src/locales';
// components
import { MotionContainer, varFade } from 'src/components/animate';
import SvgColor from 'src/components/svg-color';
import IPhone15Frame from 'src/components/device-frame/IPhone15Frame';
// constants
import { key_features, smart_management } from 'src/constants';

// ----------------------------------------------------------------------

interface PlatformItemProps {
  title: string;
  subtitle: string;
  icon: string;
}

const PlatformItem: React.FC<PlatformItemProps> = ({ title, subtitle, icon }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" spacing={3} mt={5} alignItems="center">
      <SvgColor sx={{ width: 64, height: 64 }} color={theme.palette.secondary.main} src={icon} />
      <Stack>
        <Typography variant="h4" color="grey.300">
          {title}
        </Typography>
        <Typography mt={1 / 2} variant="body1" color="grey.100">
          {subtitle}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default function ARCarpetPlatform() {
  const { t } = useLocales();
  return (
    <Box mt={15}>
      <Container component={MotionContainer}>
        <Stack alignItems="center">
          <Stack alignItems="center" maxWidth="lg">
            <Stack
              mt={5}
              maxWidth="md"
              alignItems="center"
              sx={{ width: '100%', whiteSpace: 'break-spaces' }}
            >
              <Box>
                <m.div variants={varFade().inUp}>
                  <Typography variant="h3" color="grey.300">
                    {t('ar_carpet.platform.title')}
                  </Typography>
                </m.div>
                <m.div variants={varFade().inUp}>
                  <Typography mt={2} variant="body1" color="grey.100">
                    {t('ar_carpet.platform.description')}
                  </Typography>
                </m.div>
              </Box>
            </Stack>
            <Box maxWidth="lg" sx={{ width: '100%' }}>
              <Grid
                container
                spacing={{ md: 5 }}
                mt={8}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  whiteSpace: 'break-spaces',
                }}
              >
                <Grid
                  xs={12}
                  md={8}
                  sx={{
                    display: 'flex',
                    justifyContent: { xs: 'center', md: 'flex-start' }, // اضافه شد
                  }}
                >
                  <Stack
                    maxWidth="sm"
                    sx={{
                      width: '100%',
                    }}
                  >
                    <Typography
                      variant="h3"
                      color="grey.300"
                      sx={{ textAlign: { xs: 'center', md: 'left' } }} // اضافه شد
                    >
                      {t('ar_carpet.platform.features.title')}
                    </Typography>

                    {React.Children.toArray(
                      key_features(t).map((item) => (
                        <m.div key={item.title} variants={varFade().inUp}>
                          <PlatformItem
                            title={item.title}
                            subtitle={item.subtitle}
                            icon={item.icon}
                          />
                        </m.div>
                      ))
                    )}
                  </Stack>
                </Grid>

                <Grid
                  xs={12}
                  md={4}
                  sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 3, md: 0 } }}
                >
                  <m.div variants={varFade().inLeft}>
                    <IPhone15Frame
                      videoSource={`${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/ar-carpet/carpet-ar-1.webm`}
                    />
                  </m.div>
                </Grid>
              </Grid>
            </Box>
            <Box maxWidth="lg" sx={{ width: '100%' }}>
              <Grid
                container
                spacing={{ md: 5 }}
                mt={8}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  whiteSpace: 'break-spaces',
                }}
              >
                <Grid
                  xs={12}
                  md={5}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: { xs: 3, md: 0 },
                    order: { xs: 2, md: 1 }, // اضافه شد
                  }}
                >
                  <m.div variants={varFade().inLeft}>
                    <IPhone15Frame
                      videoSource={`${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/ar-carpet/carpet-ar-2.webm`}
                    />
                  </m.div>
                </Grid>
                <Grid
                  xs={12}
                  md={7}
                  sx={{
                    display: 'flex',
                    justifyContent: { xs: 'center', md: 'flex-start' },
                    order: { xs: 1, md: 2 }, // اضافه شد
                  }}
                >
                  <Stack
                    maxWidth="sm"
                    sx={{
                      width: '100%',
                    }}
                  >
                    <Typography
                      variant="h3"
                      color="grey.300"
                      sx={{ textAlign: { xs: 'center', md: 'left' } }} // اضافه شد
                    >
                      {t('ar_carpet.platform.dashboard.title')}
                    </Typography>

                    {React.Children.toArray(
                      smart_management(t).map((item) => (
                        <m.div key={item.title} variants={varFade().inUp}>
                          <PlatformItem
                            title={item.title}
                            subtitle={item.subtitle}
                            icon={item.icon}
                          />
                        </m.div>
                      ))
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
