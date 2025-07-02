// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';

import Typography from '@mui/material/Typography';

// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// theme
import { bgGradient } from 'src/theme/css';
// components
import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  image?: string;
  children: React.ReactNode;
};

export default function AuthClassicLayout({ children, image, title }: Props) {
  const theme = useTheme();

  const upMd = useResponsive('up', 'md');

  const renderLogo = (
    <Logo
      sx={{
        zIndex: 9,
        position: 'absolute',
        m: { xs: 2, md: 5 },
      }}
    />
  );

  const renderContent = (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        // width: 1,
        width: '50%',
        // maxWidth: 480,
        px: { xs: 2, md: 8 },
        py: { xs: 15, md: 30 },
        [theme.breakpoints.down('md')]: {
          width: '100%',
          height: '100vh',
        },
      }}
    >
      <Stack sx={{ width: 360 }}>{children}</Stack>
    </Stack>
  );

  const renderSection = (
    <Stack
      flexGrow={1}
      alignItems="center"
      justifyContent="center"
      spacing={10}
      sx={{
        height: '100vh',
        width: '50%',
        ...bgGradient({
          color: alpha(
            theme.palette.background.default,
            theme.palette.mode === 'light' ? 0.88 : 0.94
          ),
          imgUrl: '/assets/background/overlay_2.jpg',
        }),
      }}
    >
      <Typography
        variant="h3"
        sx={{ maxWidth: 480, textAlign: 'center', whiteSpace: 'break-spaces' }}
      >
        {title}
      </Typography>

      <Box
        component="img"
        alt="auth"
        src={image || '/assets/illustrations/illustration_dashboard.svg'}
        sx={{ maxWidth: 600 }}
      />
    </Stack>
  );

  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        maxHeight: '100vh',
      }}
    >
      {renderLogo}

      {upMd && renderSection}

      {renderContent}
    </Stack>
  );
}
