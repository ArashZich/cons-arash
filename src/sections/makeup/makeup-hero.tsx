// framer-motion
import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// locales
import { useLocales } from 'src/locales';

// components
import { MotionContainer, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const HighlightText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '88px',
  lineHeight: 1,

  [theme.breakpoints.down('md')]: {
    fontSize: '64px',
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundImage: `
    linear-gradient(to bottom, ${theme.palette.common.black}, transparent 5%, transparent 90%, ${theme.palette.common.black}),
    linear-gradient(to right, ${theme.palette.common.black}, transparent 5%, transparent 85%, ${theme.palette.common.black}),
    url('${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/landing-makeup/hero-makeup.webp')
  `,
  height: '720px', // ارتفاع ثابت برای دسکتاپ
  overflow: 'hidden',
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  maxWidth: theme.breakpoints.values.lg,
  margin: '0 auto',

  [theme.breakpoints.down('sm')]: {
    height: '300px', // ارتفاع کمتر برای موبایل
    // backgroundSize: '100% 90%',
    marginTop: theme.spacing(10),
  },
}));

export default function MakeupHero() {
  const { t } = useLocales();
  return (
    <Box
      sx={{
        textAlign: 'center',
      }}
    >
      <Container component={MotionContainer}>
        <StyledBox />
        <Stack alignItems="center">
          <Stack alignItems="center" maxWidth="lg">
            <Stack alignItems="center" maxWidth="md" sx={{ whiteSpace: 'break-spaces' }}>
              <m.div variants={varFade().inDown}>
                <HighlightText color="grey.700">{t('makeup.virtual_makeup')}</HighlightText>
              </m.div>
              <m.div variants={varFade().inUp}>
                <Typography variant="h2" color="secondary.light" mt={2}>
                  {t('makeup.virtual_makeup_revolutionizing')}
                </Typography>
              </m.div>
              <m.div variants={varFade().inUp}>
                <Typography mt={1} variant="body1" color="grey.100">
                  {t('makeup.transform_your_online_beauty_retail_experience')}
                </Typography>
              </m.div>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
