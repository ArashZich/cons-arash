import React from 'react';
import { m } from 'framer-motion';
import { useTheme, styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { useLocales } from 'src/locales';
import { MotionContainer, varFade } from 'src/components/animate';
import SvgColor from 'src/components/svg-color';
import { our_3d_modeling_process } from 'src/constants';

const HighlightText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '80px',
  lineHeight: 1,

  [theme.breakpoints.down('md')]: {
    fontSize: '56px',
  },
}));

interface PlatformItemProps {
  title: string;
  icon: string;
  list?: string[];
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
      mt: 10,
    }}
    src={video}
  />
);

const PlatformItem: React.FC<PlatformItemProps> = ({ title, icon, list }) => {
  const theme = useTheme();

  return (
    <Stack direction="row" spacing={2} mt={5} alignItems="flex-start">
      <SvgColor sx={{ width: 88, height: 88 }} color={theme.palette.secondary.main} src={icon} />
      <Stack>
        <m.div variants={varFade().inDown}>
          <Typography variant="h3" color="grey.300">
            {title}
          </Typography>
        </m.div>

        {list && (
          <List style={{ marginTop: 8, listStyleType: 'disc', color: 'white' }}>
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

export default function Modeling3DBusinessApplications() {
  const { t } = useLocales();
  return (
    <Box mt={15}>
      <Container component={MotionContainer}>
        <Stack alignItems="center">
          <m.div variants={varFade().inDown}>
            <HighlightText color="grey.700" align="center">
              {t('3d_modeling.process')}
            </HighlightText>
          </m.div>

          <Stack alignItems="center" maxWidth="md">
            <Box maxWidth="lg" sx={{ width: '100%' }}>
              <Stack spacing={4} mt={8}>
                {React.Children.toArray(
                  our_3d_modeling_process(t).map((item, index) => (
                    <m.div variants={varFade().inUp}>
                      <PlatformItem title={item.title} icon={item.icon} list={item.list} />
                    </m.div>
                  ))
                )}
              </Stack>
            </Box>
          </Stack>
          <VideoContainer video="https://armogroup.storage.iran.liara.space/landing-3d-modeling/snowglobe.webm" />
        </Stack>
      </Container>
    </Box>
  );
}
