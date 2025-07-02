import { forwardRef } from 'react';
// @mui
import Link from '@mui/material/Link';
import Box, { BoxProps } from '@mui/material/Box';
// routes
import { RouterLink } from 'src/routes/components';
import { usePathname } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
  isWhite?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, isWhite = false, sx, ...other }, ref) => {
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

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 40,
          height: 40,
          display: 'inline-flex',
          ...sx,
        }}
        {...other}
      >
        <svg width={40} height={40} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22.317 2.834a1.872 1.872 0 0 0-2.135 1.552 1.854 1.854 0 0 0 1.572 2.108 13.853 13.853 0 0 1 5.71 2.225 13.642 13.642 0 0 1 4.16 4.457 13.416 13.416 0 0 1 .825 11.787 13.572 13.572 0 0 1-3.498 4.98 13.797 13.797 0 0 1-5.346 2.98 13.923 13.923 0 0 1-6.128.386 13.849 13.849 0 0 1-5.686-2.285 1.89 1.89 0 0 0-2.612.452 1.836 1.836 0 0 0 .458 2.578 17.626 17.626 0 0 0 7.238 2.909c2.603.418 5.269.25 7.798-.491a17.56 17.56 0 0 0 6.804-3.793 17.273 17.273 0 0 0 4.454-6.338 17.075 17.075 0 0 0-1.05-15.002c-1.31-2.26-3.12-4.2-5.295-5.673a17.632 17.632 0 0 0-7.268-2.832Z"
            fill={isWhite ? '#ffffff' : '#5E35B1'}
          />
          <path
            d="m15.41 10.228.98 1.94c.106.208.323.34.56.34h2.69c.459 0 .761-.47.566-.879l-2.604-5.466c-.926-1.92-3.715-1.862-4.558.096L2.962 29.676c-.405.941.04 2.028.993 2.428.953.4 2.054-.039 2.459-.98l4.301-9.99c.073.008.148.012.223.012h8.125a1.863 1.863 0 0 0 1.875-1.85c0-1.023-.84-1.852-1.875-1.852h-6.76l3.107-7.216Z"
            fill={isWhite ? '#ffffff' : '#5E35B1'}
          />
          <path
            d="m19.99 25.465 2.034 4.567c.1.224.324.369.572.369h2.7c.45 0 .753-.456.573-.864l-1.797-4.072c3.448-.005 6.24-2.765 6.24-6.17 0-3.407-2.797-6.17-6.25-6.17h-6.874a1.863 1.863 0 0 0-1.875 1.851c0 1.023.84 1.851 1.875 1.851h6.875c1.38 0 2.5 1.105 2.5 2.468s-1.12 2.468-2.5 2.468h-8.75a1.863 1.863 0 0 0-1.875 1.85c0 1.023.84 1.852 1.875 1.852h4.676Z"
            fill={isWhite ? '#ffffff' : '#5E35B1'}
          />
        </svg>
      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link
        component={RouterLink}
        href={isHome ? '/' : paths.dashboard.root}
        sx={{ display: 'contents' }}
      >
        {logo}
      </Link>
    );
  }
);

export default Logo;
