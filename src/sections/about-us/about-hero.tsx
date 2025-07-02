import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// locales
import { useLocales } from 'src/locales';
// components
import { MotionContainer, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

// Define the props type
interface StyledBoxProps {
  isRtl: boolean;
  backgroundImage: string;
  imageUrlMobile: string;
}

const HighlightText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '88px',
  lineHeight: 1,

  [theme.breakpoints.down('md')]: {
    fontSize: '64px',
  },
}));

const StyledBox = styled(Box)<StyledBoxProps>(
  ({ theme, isRtl, backgroundImage, imageUrlMobile }) => ({
    direction: isRtl ? 'rtl' : 'ltr',
    height: theme.breakpoints.values.md ? 560 : 'auto',
    py: theme.breakpoints.values.md ? 0 : theme.spacing(10),
    overflow: 'hidden',
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',

    [theme.breakpoints.down('md')]: {
      backgroundImage: `url(${imageUrlMobile})`,
      backgroundSize: '80%', // Here you can adjust the size
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
    },
  })
);

export default function AboutHero() {
  const { t, isRtl } = useLocales();
  return (
    <StyledBox
      isRtl={isRtl}
      backgroundImage={`${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/landing/about-us-banner.webp`}
      imageUrlMobile={`${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/landing/about-us-banner-mobile.webp`}
    >
      <Container component={MotionContainer}>
        <Box
          maxWidth="sm"
          sx={{
            position: { xs: 'absolute', md: 'absolute' },
            bottom: { xs: 0, md: 80 }, // Align to bottom on all screen sizes, with specific adjustments
            textAlign: { xs: 'center', md: 'left' },
            left: { xs: '50%', md: 'initial' },
            transform: { xs: 'translateX(-50%)', md: 'none' }, // Center horizontally on smaller screens
            width: { xs: '100%', md: 'initial' }, // Ensure it takes the full width on smaller screens if necessary
          }}
        >
          <m.div variants={varFade().inRight}>
            <HighlightText color="grey.700">{t('about.about_us')}</HighlightText>
          </m.div>

          <br />

          <m.div variants={varFade().inRight}>
            <Typography variant="h5" mt={2} color="grey.300">
              {t('about.about_us_description')}
            </Typography>
          </m.div>
        </Box>
      </Container>
    </StyledBox>
  );
}
