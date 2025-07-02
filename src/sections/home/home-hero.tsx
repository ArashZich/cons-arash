import Link from 'next/link';
import { useScroll } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
// @mui
import { styled, keyframes } from '@mui/material/styles'; // اضافه کردن keyframes
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid2 from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';
// locales
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

interface StyledRootProps {
  imageUrl: string;
  imageUrlMobile: string;
}

const glow = (theme: any) => keyframes`
  0% {
    box-shadow: 0 0 5px #fff, 0 0 10px ${theme.palette.secondary.main};
  }
  50% {
    box-shadow: 0 0 10px #fff, 0 0 20px ${theme.palette.secondary.main};
  }
  100% {
    box-shadow: 0 0 5px #fff, 0 0 10px ${theme.palette.secondary.main};
  }
`;

// استایل دکمه با انیمیشن
const GlowingButton = styled(Button)(({ theme }) => ({
  animation: `${glow(theme)} 3s infinite`, // سرعت انیمیشن را کندتر کردیم
  '&:hover': {
    animation: `${glow(theme)} 2s infinite`, // سرعت انیمیشن در حالت hover
  },
}));

const StyledRoot = styled('div')<StyledRootProps>(({ theme, imageUrl, imageUrlMobile }) => ({
  backgroundColor: theme.palette.common.black,
  backgroundImage: `url(${imageUrl})`,
  backgroundPosition: 'center', // Ensure the image is centered
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover', // Cover ensures that the background covers the entire container
  width: '100%',
  height: '70vh',
  display: 'flex', // Use flex to center children
  alignItems: 'center', // Center children vertically
  justifyContent: 'center', // Center children horizontally
  position: 'relative',
  bottom: 10,

  [theme.breakpoints.down('md')]: {
    backgroundImage: `url(${imageUrlMobile})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    bottom: 0,
    height: '55vh',
  },
}));

// ----------------------------------------------------------------------
type Props = {
  goProjects: () => void;
};

export default function HomeHero({ goProjects }: Props) {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { isRtl } = useLocales();
  const { t } = useLocales();
  const { scrollY } = useScroll();

  const [percent, setPercent] = useState(0);

  const getScroll = useCallback(() => {
    let heroHeight = 0;

    if (heroRef.current) {
      heroHeight = heroRef.current.offsetHeight;
    }

    scrollY.on('change', (scrollHeight) => {
      const scrollPercent = (scrollHeight * 100) / heroHeight;

      setPercent(Math.floor(scrollPercent));
    });
  }, [scrollY]);

  useEffect(() => {
    getScroll();
  }, [getScroll]);

  const hide = percent > 120;

  return (
    <>
      <StyledRoot
        imageUrl={
          isRtl
            ? `${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/landing/home_banner_fa.webp`
            : `${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/landing/home_banner_en.webp`
        }
        imageUrlMobile={
          isRtl
            ? `${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/landing/home_banner_mobile_fa.webp`
            : `${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/landing/home_banner_mobile_en.webp`
        }
        ref={heroRef}
        sx={{
          ...(hide && {
            opacity: 0,
          }),
        }}
      />
      <Stack
        spacing={3}
        sx={{
          textAlign: 'center',
          alignItems: 'center',
          mt: 4,
        }}
      >
        <Typography
          component="div"
          sx={{ color: 'common.white', whiteSpace: 'break-spaces', fontSize: 20 }}
        >
          {t('landing.empower_online_shoppers_to_visualize_products')}
        </Typography>

        <Grid2
          container
          spacing={2}
          direction={{ xs: 'column', md: 'row' }} // در موبایل عمودی، در دسکتاپ افقی
          justifyContent="center" // وسط‌چین کردن دکمه‌ها
          alignItems="center" // وسط‌چین کردن دکمه‌ها
        >
          <Grid2>
            <Button
              LinkComponent={Link}
              href={paths.contact}
              variant="contained"
              color="secondary"
              size="large"
              sx={{ width: 240 }}
            >
              {t('landing.book_demo')}
            </Button>
          </Grid2>
          <Grid2>
            <GlowingButton
              onClick={goProjects}
              variant="outlined"
              color="secondary"
              size="large"
              sx={{ width: 240 }}
              endIcon={
                <Iconify icon="mdi:arrow-down" sx={{ width: 24, height: 24 }} color="secondary" />
              }
            >
              {t('landing.projects')}
            </GlowingButton>
          </Grid2>
        </Grid2>
      </Stack>
    </>
  );
}
