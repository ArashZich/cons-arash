'use client';

// @mui
import Box from '@mui/material/Box';
// routes
import { usePathname } from 'src/routes/hooks';
//
import Footer from './footer';
import Header from './header';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  light?: boolean;
};

export default function MainLayout({ children, light = false }: Props) {
  const pathname = usePathname() ?? '';

  const homePaths = [
    '/',
    '/about-us/',
    '/ar-solutions/',
    '/contact-us/',
    '/how-it-works/',
    '/error/403/',
    '/error/404/',
    '/error/500/',
    '/faq/',
    '/pricing/',
    '/ar-carpet/',
    '/makeup/',
    '/3d-modeling/',
    '/digital-space-design/',
  ];

  const isHome = homePaths.includes(pathname) || pathname.includes('/blog/');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 1,
        bgcolor: (theme) => (light ? theme.palette.common.white : theme.palette.common.black),
      }}
    >
      <Header light={light} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: (theme) => (light ? theme.palette.common.white : theme.palette.common.black),
          ...(!isHome && {
            pt: { xs: 8, md: 10 },
          }),
        }}
      >
        {children}
      </Box>

      <Footer light={light} />
    </Box>
  );
}
