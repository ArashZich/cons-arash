import React from 'react';
import { m } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import Grid from '@mui/system/Unstable_Grid';

import { useLocales } from 'src/locales';
import { MotionContainer, varFade } from 'src/components/animate';
import SvgColor from 'src/components/svg-color';
import IPhone15Frame from 'src/components/device-frame/IPhone15Frame';
import { choose_ar_technology } from 'src/constants';

interface PlatformItemProps {
  title: string;
  icon: string;
  list?: string[]; // اضافه کردن لیست به عنوان یک prop اختیاری
}

const PlatformItem: React.FC<PlatformItemProps> = ({ title, icon, list }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" spacing={3} mt={5} alignItems="flex-start">
      <SvgColor sx={{ width: 64, height: 64 }} color={theme.palette.secondary.main} src={icon} />
      <Stack>
        <Typography variant="h4" color="grey.300">
          {title}
        </Typography>

        {list && (
          // <List sx={{ color: 'grey.100' }}>
          <List style={{ marginTop: 8, paddingLeft: 20, listStyleType: 'disc', color: 'white' }}>
            {list.map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  m: 0,
                  p: 0,
                  display: 'flex',
                  alignItems: 'center',
                  '&::before': {
                    content: '""',
                    width: '6px',
                    height: '6px',
                    marginRight: '12px',
                    borderRadius: '50%',
                    backgroundColor: theme.palette.secondary.light,
                  },
                }}
              >
                <Typography variant="body2" color="grey.100">
                  {item}
                </Typography>
              </ListItem>
            ))}
          </List>
        )}
      </Stack>
    </Stack>
  );
};

export default function MakeupChooseARTechnology() {
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
                      {t('makeup.why_beauty_brands_choose_ar')}
                    </Typography>

                    {React.Children.toArray(
                      choose_ar_technology(t).map((item) => (
                        <m.div key={item.title} variants={varFade().inUp}>
                          <PlatformItem
                            title={item.title}
                            icon={item.icon}
                            list={item.list} // اضافه کردن لیست به PlatformItem
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
                      videoSource={`${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/landing-makeup/makeup01.webm`}
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
