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
import { digital_space_design_solutions } from 'src/constants';
import IPhone15Frame from '@/components/device-frame/IPhone15Frame';

interface PlatformItemProps {
  title: string;
  subtitle: string;
  icon: string;
  list?: string[];
  video: string;
  isVideoRight?: boolean;
}

const PlatformItem: React.FC<PlatformItemProps> = ({
  title,
  subtitle,
  icon,
  list,
  video,
  isVideoRight,
}) => {
  const theme = useTheme();

  const ContentSection = (
    <Stack spacing={2} mt={5} alignItems={{ xs: 'center', md: 'flex-start' }}>
      {' '}
      {/* تغییر اینجا */}
      <SvgColor sx={{ width: 88, height: 88 }} color={theme.palette.secondary.main} src={icon} />
      <Stack sx={{ alignItems: { xs: 'center', md: 'flex-start' } }}>
        {' '}
        {/* اضافه شد */}
        <Typography variant="h3" color="grey.300" textAlign={{ xs: 'center', md: 'left' }}>
          {' '}
          {/* تغییر اینجا */}
          {title}
        </Typography>
        <Typography
          variant="body1"
          color="grey.100"
          mt={2}
          mb={2}
          textAlign={{ xs: 'center', md: 'left' }}
        >
          {' '}
          {/* تغییر اینجا */}
          {subtitle}
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
                  justifyContent: { xs: 'center', md: 'flex-start' }, // اضافه شد
                  width: 'auto', // اضافه شد
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
                  textAlign={{ xs: 'center', md: 'left' }} // اضافه شد
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
      justifyContent="center" // اضافه شد
      mt={8}
      sx={{
        flexDirection: { xs: 'column', md: isVideoRight ? 'row' : 'row-reverse' },
      }}
    >
      <Grid
        xs={12}
        md={8}
        sx={{
          display: 'flex',
          justifyContent: 'center', // اضافه شد
        }}
      >
        {ContentSection}
      </Grid>
      <Grid
        xs={12}
        md={4}
        sx={{
          display: 'flex',
          justifyContent: 'center', // اضافه شد
        }}
      >
        <IPhone15Frame videoSource={video} />
      </Grid>
    </Grid>
  );
};

export default function DigitalSpaceDesignSolutions() {
  const { t } = useLocales();
  const items = digital_space_design_solutions(t);

  return (
    <Box mt={15}>
      <Container component={MotionContainer}>
        <Stack alignItems="center">
          <Typography variant="h2" color="grey.300">
            {t('digital_space_design.tailored_solutions_for_your_industry')}
          </Typography>

          <Box maxWidth="md" sx={{ width: '100%' }}>
            <Stack spacing={4} mt={8}>
              {items.map((item, index) => (
                <Box key={index}>
                  <m.div variants={varFade().inUp}>
                    <PlatformItem
                      title={item.title}
                      subtitle={item.subtitle}
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
      </Container>
    </Box>
  );
}
