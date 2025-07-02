'use client';

import React from 'react';
import Fab from '@mui/material/Fab';
import { useTheme, keyframes } from '@mui/material/styles';

import SvgColor from 'src/components/svg-color';
import { RouterLink } from 'src/routes/components';

const glowButton = (theme: any) => keyframes`
  0% {
    box-shadow: 0 0 5px #fff,
                0 0 10px #fff,
                0 0 15px ${theme.palette.primary.main},
                0 0 20px ${theme.palette.primary.main};
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 10px #fff,
                0 0 20px #fff,
                0 0 25px ${theme.palette.primary.main},
                0 0 30px ${theme.palette.primary.main};
    transform: scale(1.05);
  }
  100% {
    box-shadow: 0 0 5px #fff,
                0 0 10px #fff,
                0 0 15px $=> theme.palette.primary.main},
                0 0 20px $=> theme.palette.primary.main};
    transform: scale(1);
  }
`;

export const MakeupTryOn: React.FC = () => {
  const theme = useTheme();
  return (
    <Fab
      LinkComponent={RouterLink}
      color="primary"
      aria-label="trye_on_makeup"
      href="http://makeup.armogroup.tech/"
      target="_blank" // باز شدن لینک در تب جدید
      rel="noopener noreferrer" // بهبود امنیت
      sx={{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        zIndex: 1000,
        transition: 'all 0.5s ease-in-out',
        animation: `${glowButton(theme)} 3s ease-in-out infinite`,
      }}
    >
      <SvgColor
        sx={{
          width: 40,
          height: 40,
        }}
        color={theme.palette.common.white}
        src="https://armogroup.storage.iran.liara.space/icons/beauty.svg"
      />
    </Fab>
  );
};
