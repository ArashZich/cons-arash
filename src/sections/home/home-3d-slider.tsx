// react
import { useState } from 'react';
// framer-motion
import { m } from 'framer-motion';
// qr code
import { QRCodeSVG } from 'qrcode.react';
// device-detect
import { isMobile, isTablet } from 'react-device-detect';

// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useTheme } from '@mui/material/styles';

// locales
import { useLocales } from 'src/locales';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';

// components
import { CarouselCenter3D } from 'src/components/carousel-view';
import { MotionViewport, varFade } from 'src/components/animate';
import Iconify from 'src/components/iconify/iconify';
// constants
import { ar_model } from 'src/constants/landing';

export default function Home3DSlider() {
  const { t } = useLocales();
  const [activeUrl, setActiveUrl] = useState('');
  const toggle = useBoolean();
  const theme = useTheme();

  const handleClick = (url: string) => {
    // Check if the device is not a mobile or tablet
    if (!isMobile && !isTablet) {
      setActiveUrl(url);
      toggle.onTrue();
    } else {
      // If the device is a mobile or tablet, navigate to the URL directly
      window.location.href = url;
    }
  };

  const handleClose = () => {
    toggle.onFalse();
  };

  return (
    <Stack
      component={MotionViewport}
      sx={{
        py: { xs: 5, md: 10 },
        mt: 5,
      }}
    >
      <Stack
        spacing={3}
        sx={{
          textAlign: 'center',
        }}
      >
        <m.div variants={varFade().inUp}>
          <CarouselCenter3D data={ar_model(t)} handleClick={handleClick} />
        </m.div>
      </Stack>
      <Dialog
        open={toggle.value}
        onClose={handleClose}
        aria-labelledby="qr-code-dialog-title"
        aria-describedby="qr-code-dialog-description"
        sx={{
          '& .MuiDialog-container': {
            alignItems: 'center', // Center the dialog vertically
            justifyContent: 'center', // Center the dialog horizontally
          },
        }}
      >
        <Button
          onClick={toggle.onFalse}
          sx={{
            mt: 2,
            ml: 'auto',
            // FIXME: hover
            '&:hover': {
              backgroundColor: 'white',
            },
          }}
        >
          <Iconify icon="mdi:window-close" />
        </Button>

        <DialogContent
          dividers
          sx={{
            display: 'flex', // Use flexbox for alignment
            flexDirection: 'column', // Stack children vertically
            alignItems: 'center', // Center children horizontally
            justifyContent: 'center', // Center children vertically
            py: 4, // Padding on the top and bottom
          }}
        >
          <QRCodeSVG
            value={activeUrl}
            size={256}
            fgColor={theme.palette.primary.main} // Change this to desired foreground color
          />
          <Typography variant="body1" sx={{ mt: 2 }}>
            {t('landing.scan_qrcode')}
          </Typography>
        </DialogContent>
      </Dialog>
    </Stack>
  );
}
