import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// locales
import { useLocales } from 'src/locales';
// components
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const HighlightText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '88px',
  lineHeight: 1,

  [theme.breakpoints.down('md')]: {
    fontSize: '64px',
  },
}));

// ----------------------------------------------------------------------

export default function AboutStory() {
  const { t } = useLocales();

  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 10, md: 15 },
        textAlign: { xs: 'center', md: 'unset' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 10,
      }}
    >
      <Box maxWidth="md">
        <m.div variants={varFade().inDown}>
          <HighlightText color="grey.700" align="center">
            {t('about.our_story')}
          </HighlightText>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Typography variant="body1" mt={4} color="grey.300">
            {t('about.our_story_description1')}
          </Typography>
          <Typography variant="body1" color="grey.300">
            {t('about.our_story_description2')}
          </Typography>
        </m.div>
      </Box>
    </Container>
  );
}
