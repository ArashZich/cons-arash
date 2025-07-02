'use client';

// next
import Link from 'next/link';
// react
import React, { useState, memo } from 'react';
// @mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { styled, keyframes } from '@mui/material/styles';
import Box from '@mui/material/Box';
// framer-motion
import { m } from 'framer-motion';
// routes
import { paths } from 'src/routes/paths';
// components
import { varFade, varZoom } from 'src/components/animate';

// انیمیشن ساده برای بک‌گراند
const subtleBackground = keyframes`
  0%, 100% { 
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  }
  50% { 
    background: linear-gradient(135deg, #252525 0%, #1a1a1a 100%);
  }
`;

const unityPulse = keyframes`
  0%, 100% { 
    color: #00ACC1;
    text-shadow: 0 0 15px rgba(0, 172, 193, 0.6);
    transform: scale(1);
  }
  50% { 
    color: #80DEEA;
    text-shadow: 0 0 20px rgba(128, 222, 234, 0.8);
    transform: scale(1.02);
  }
`;

const buttonPulse = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(0, 172, 193, 0.4);
    transform: scale(1);
  }
  50% { 
    box-shadow: 0 0 30px rgba(0, 172, 193, 0.6);
    transform: scale(1.02);
  }
`;

const imageGlow = keyframes`
  0%, 100% { 
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.2));
  }
  50% { 
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3));
  }
`;

const DialogContainer = styled(DialogContent)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.common.white,
  overflow: 'hidden',
  position: 'relative',
  background: '#1a1a1a',
  animation: `${subtleBackground} 6s ease-in-out infinite`,
  padding: '40px 32px !important',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 50% 20%, rgba(0, 172, 193, 0.08) 0%, transparent 60%),
      radial-gradient(circle at 50% 80%, rgba(128, 222, 234, 0.05) 0%, transparent 60%)
    `,
    pointerEvents: 'none',
  },
}));

const IranImage = styled('img')({
  width: '120px',
  height: 'auto',
  marginBottom: '20px',
  animation: `${imageGlow} 4s ease-in-out infinite`,
  borderRadius: '8px',
});

const UnityTitle = styled(m.div)({
  fontSize: '1.6rem',
  fontWeight: 'bold',
  marginBottom: '16px',
  animation: `${unityPulse} 4s ease-in-out infinite`,
  lineHeight: 1.4,
});

const DiscountText = styled(m.div)({
  fontSize: '2.5rem',
  fontWeight: 'bold',
  margin: '20px 0',
  background: 'linear-gradient(45deg, #00ACC1 0%, #80DEEA 50%, #B2EBF2 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  filter: 'drop-shadow(0 0 10px rgba(0, 172, 193, 0.3))',
});

const PlanText = styled(m.div)({
  fontSize: '1.2rem',
  fontWeight: '500',
  margin: '12px 0',
  color: '#80DEEA',
  textShadow: '0 0 8px rgba(128, 222, 234, 0.4)',
});

const SeasonText = styled(m.div)({
  fontSize: '1.1rem',
  fontWeight: '500',
  margin: '12px 0 20px 0',
  color: '#B2EBF2',
  textShadow: '0 0 6px rgba(178, 235, 242, 0.4)',
});

const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: 'bold',
  padding: '16px 32px',
  fontSize: '1.2rem',
  borderRadius: '25px',
  background: 'linear-gradient(45deg, #00ACC1 0%, #80DEEA 100%)',
  color: '#FFFFFF',
  border: '2px solid transparent',
  animation: `${buttonPulse} 3s ease-in-out infinite`,
  transition: 'all 0.3s ease',
  textTransform: 'none',
  position: 'relative',
  zIndex: 1,
  fontFamily: 'inherit',
  '&:hover': {
    background: 'linear-gradient(45deg, #00838F 0%, #00ACC1 100%)',
    transform: 'scale(1.05)',
    boxShadow: '0 8px 25px rgba(0, 172, 193, 0.4)',
  },
}));

const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

const IranSupportDialog = memo(() => {
  const [open, setOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload تصویر
  React.useEffect(() => {
    const img = new Image();
    img.src = '/assets/iran.webp';
    img.onload = () => {
      setImageLoaded(true);
    };
    img.onerror = () => {
      // اگر webp لود نشد، fallback به png
      const fallbackImg = new Image();
      fallbackImg.src = '/assets/iran.png';
      fallbackImg.onload = () => setImageLoaded(true);
    };
  }, []);

  React.useEffect(() => {
    // فقط وقتی تصویر لود شده مدال رو نشون بده
    if (imageLoaded) {
      const timer = setTimeout(() => {
        setIsReady(true);
        setOpen(true);
      }, 100); // زمان کمتر چون تصویر از قبل لود شده

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [imageLoaded]);

  const handleClose = () => {
    setOpen(false);
  };

  if (!isReady) {
    return null;
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      aria-describedby="iran-support-dialog"
      PaperProps={{
        sx: {
          borderRadius: 4,
          padding: 0,
          overflow: 'hidden',
          backgroundColor: 'transparent',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
        },
      }}
    >
      <DialogContainer>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <m.div variants={varZoom().in}>
            <IranImage
              src="/assets/iran.webp"
              alt="Iran"
              loading="eager"
              style={{
                opacity: imageLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
              }}
            />
          </m.div>

          <m.div variants={varFade().inUp}>
            <UnityTitle>💙 در کنار هم، قوی‌تر از همیشه</UnityTitle>
          </m.div>

          <m.div variants={varZoom().in}>
            <DiscountText>٪۵۰ تخفیف</DiscountText>
          </m.div>

          <m.div variants={varFade().inLeft}>
            <PlanText>برای تمام پلن‌های واقعیت افزوده</PlanText>
          </m.div>

          <m.div variants={varFade().inRight}>
            <SeasonText>تا پایان تابستان</SeasonText>
          </m.div>

          <Box sx={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
            <m.div variants={varZoom().inUp}>
              <StyledButton
                onClick={handleClose}
                variant="contained"
                LinkComponent={Link}
                href={paths.dashboard.root}
              >
                همین حالا شروع کن
              </StyledButton>
            </m.div>
          </Box>
        </Box>
      </DialogContainer>
    </Dialog>
  );
});

export default IranSupportDialog;
