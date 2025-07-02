import React from 'react';
// framer-motion
import { m } from 'framer-motion';
// @mui
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
import { makeup_our_solutions } from 'src/constants';

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

interface SpecializedItemProps {
  title: string;
  subtitle: string;
  icon: string;
}

const StyledBox = styled(Box)(({ theme }) => ({
  height: '400px',
  overflow: 'hidden',
  position: 'relative',
  maxWidth: '720px',
  margin: theme.spacing(10),
  width: '100%',
  borderRadius: '2px',

  [theme.breakpoints.down('sm')]: {
    height: '300px',
    marginTop: theme.spacing(10),
  },

  '& video': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
  },
}));

const SpecializedItem: React.FC<SpecializedItemProps> = ({ title, subtitle, icon }) => {
  const theme = useTheme();

  return (
    <Stack alignItems="flex-start" direction="row" spacing={2}>
      <SvgColor sx={{ width: 88, height: 88 }} color={theme.palette.secondary.main} src={icon} />
      <Stack alignItems="flex-start" sx={{ width: '100%' }}>
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

export default function MakeupOurSolutions() {
  const { t } = useLocales();
  return (
    <Box mt={15}>
      <Container component={MotionContainer}>
        <Stack alignItems="center">
          <Stack mt={5} alignItems="center" sx={{ width: '100%' }}>
            <m.div variants={varFade().inUp}>
              <HighlightText color="grey.700">{t('makeup.our_solutions')}</HighlightText>
            </m.div>
          </Stack>

          <Stack mt={8} alignItems="center" spacing={4} sx={{ width: '100%' }} maxWidth="sm">
            {React.Children.toArray(
              makeup_our_solutions(t).map((item) => (
                <m.div key={item.title} variants={varFade().inUp}>
                  <SpecializedItem title={item.title} subtitle={item.subtitle} icon={item.icon} />
                </m.div>
              ))
            )}
          </Stack>

          <StyledBox>
            <video autoPlay loop muted playsInline>
              <source
                src={`${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/landing-makeup/makeup03.webm`}
                type="video/webm"
              />
            </video>
          </StyledBox>
        </Stack>
      </Container>
    </Box>
  );
}
