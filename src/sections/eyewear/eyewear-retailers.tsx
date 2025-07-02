import React from 'react';
import { m } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Grid from '@mui/system/Unstable_Grid';

import { useLocales } from 'src/locales';
import { MotionContainer, varFade } from 'src/components/animate';
import SvgColor from 'src/components/svg-color';
import IPhone15Frame from 'src/components/device-frame/IPhone15Frame';
import { eyewear_retailers } from 'src/constants';

interface PlatformItemProps {
  title: string;
  icon: string;
  subtitle: string; // اضافه کردن لیست به عنوان یک prop اختیاری
}

const PlatformItem: React.FC<PlatformItemProps> = ({ title, icon, subtitle }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" spacing={3} mt={5} alignItems="flex-start">
      <SvgColor sx={{ width: 88, height: 88 }} color={theme.palette.secondary.main} src={icon} />
      <Stack>
        <Typography variant="h3" color="grey.300">
          {title}
        </Typography>
        <Typography variant="body1" color="grey.100">
          {subtitle}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default function EyewearRetailers() {
  const { t } = useLocales();
  return (
    <Box mt={15}>
      <Container component={MotionContainer}>
        <Stack alignItems="center">
          <Stack alignItems="center" maxWidth="lg">
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
                    justifyContent: { xs: 'center', md: 'flex-start' },
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
                      sx={{ textAlign: { xs: 'center', md: 'left' } }}
                    >
                      {t('eyewear.why_do_eyewear_retailers_need')}
                    </Typography>

                    {React.Children.toArray(
                      eyewear_retailers(t).map((item) => (
                        <m.div key={item.title} variants={varFade().inUp}>
                          <PlatformItem
                            title={item.title}
                            icon={item.icon}
                            subtitle={item.subtitle} // اضافه کردن لیست به PlatformItem
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
                      videoSource={`${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/glasses-landing/glasses2.webm`}
                    />
                  </m.div>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
