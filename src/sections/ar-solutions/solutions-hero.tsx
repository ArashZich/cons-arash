import Link from 'next/link';
// framer-motion
import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// locales
import { useLocales } from 'src/locales';
// routes
import { paths } from 'src/routes/paths';
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
    url('${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/landing/our-solutions-banner.webp')
  `,
  height: '400px', // ارتفاع ثابت برای دسکتاپ
  overflow: 'hidden',
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',

  [theme.breakpoints.down('sm')]: {
    height: '200px', // ارتفاع کمتر برای موبایل
    backgroundSize: '100% 90%',
  },
}));

export default function SolutionsHero() {
  const { t } = useLocales();
  return (
    <Box
      sx={{
        textAlign: 'center',
      }}
    >
      <Container sx={{ py: 10 }} component={MotionContainer}>
        <Stack alignItems="center" px={5} mt={10}>
          <m.div variants={varFade().inDown}>
            <HighlightText color="grey.700">{t('our_solutions.ar_solutions_title')}</HighlightText>
          </m.div>
          <m.div variants={varFade().inUp}>
            <Typography mt={2} variant="h3" color="secondary.light">
              {t('our_solutions.ar_solutions_description1')}
            </Typography>
          </m.div>
        </Stack>

        <StyledBox />
        <Stack alignItems="center" px={5}>
          <m.div variants={varFade().inUp}>
            <Typography variant="body1" color="grey.100">
              {t('our_solutions.ar_solutions_description2')}
            </Typography>
          </m.div>
          <Button
            LinkComponent={Link}
            href={paths.dashboard.root}
            variant="contained"
            color="secondary"
            size="large"
            sx={{ width: 240, mt: 3 }}
          >
            {t('landing.get_started')}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
