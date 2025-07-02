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
import { business_applications_of_3D_modeling } from 'src/constants';

interface PlatformItemProps {
  title: string;
  icon: string;
  list?: string[];
  video: string;
  isVideoRight?: boolean;
}

const VideoContainer = ({ video }: { video: string }) => (
  <Box
    component="video"
    autoPlay
    muted
    loop
    playsInline
    sx={{
      maxWidth: '720px',
      height: '400px',
      borderRadius: '2px',
      objectFit: 'cover',
      width: '100%',
    }}
    src={video}
  />
);

const PlatformItem: React.FC<PlatformItemProps> = ({ title, icon, list, video, isVideoRight }) => {
  const theme = useTheme();

  const ContentSection = (
    <Stack spacing={2} mt={5} alignItems={{ xs: 'center', md: 'flex-start' }}>
      <SvgColor sx={{ width: 88, height: 88 }} color={theme.palette.secondary.main} src={icon} />
      <Stack sx={{ alignItems: { xs: 'center', md: 'flex-start' } }}>
        <Typography variant="h3" color="grey.300" textAlign={{ xs: 'center', md: 'left' }}>
          {title}
        </Typography>

        {list && (
          <List
            sx={{
              marginTop: 8,
              listStyleType: 'disc',
              color: 'white',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' },
            }}
          >
            {list.map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  m: 0,
                  p: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  width: 'auto',
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
                <Typography
                  variant="body2"
                  color="grey.100"
                  textAlign={{ xs: 'center', md: 'left' }}
                >
                  {item}
                </Typography>
              </ListItem>
            ))}
          </List>
        )}
      </Stack>
    </Stack>
  );

  return (
    <Grid
      container
      spacing={{ xs: 3, md: 5 }}
      alignItems="center"
      justifyContent="center"
      mt={8}
      sx={{
        flexDirection: { xs: 'column', md: isVideoRight ? 'row' : 'row-reverse' },
      }}
    >
      <Grid
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {ContentSection}
      </Grid>
      <Grid
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <VideoContainer video={video} />
      </Grid>
    </Grid>
  );
};

export default function Modeling3DBusinessApplications() {
  const { t } = useLocales();
  const items = business_applications_of_3D_modeling(t);

  return (
    <Box mt={15}>
      <Container component={MotionContainer}>
        <Stack alignItems="center">
          <Typography variant="h2" color="grey.300">
            {t('3d_modeling.applications')}
          </Typography>
          <Stack alignItems="center" maxWidth="lg">
            <Box maxWidth="lg" sx={{ width: '100%' }}>
              <Stack spacing={4} mt={8}>
                {items.map((item, index) => (
                  <Box key={index}>
                    <m.div variants={varFade().inUp}>
                      <PlatformItem
                        title={item.title}
                        icon={item.icon}
                        list={item.list}
                        video={item.video}
                        isVideoRight={index % 2 === 0}
                      />
                    </m.div>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
