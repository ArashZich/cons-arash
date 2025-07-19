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
import Stack from '@mui/material/Stack';
// framer-motion
import { m } from 'framer-motion';
// routes
import { paths } from 'src/routes/paths';
// locales
import { useLocales } from 'src/locales';
// components
import { varFade, varZoom } from 'src/components/animate';
import Iconify from 'src/components/iconify';

// انیمیشن ساده برای بک‌گراند
const subtleBackground = keyframes`
  0%, 100% { 
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  }
  50% { 
    background: linear-gradient(135deg, #252525 0%, #1a1a1a 100%);
  }
`;

const titlePulse = keyframes`
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

const iconGlow = keyframes`
  0%, 100% { 
    filter: drop-shadow(0 0 10px rgba(0, 172, 193, 0.4));
  }
  50% { 
    filter: drop-shadow(0 0 15px rgba(128, 222, 234, 0.6));
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

const MainIcon = styled(Box)({
  fontSize: '4rem',
  marginBottom: '20px',
  animation: `${iconGlow} 4s ease-in-out infinite`,
  filter: 'drop-shadow(0 0 10px rgba(0, 172, 193, 0.4))',
});

const MainTitle = styled(m.div)({
  fontSize: '1.8rem',
  fontWeight: 'bold',
  marginBottom: '8px',
  animation: `${titlePulse} 4s ease-in-out infinite`,
  lineHeight: 1.4,
});

const SubTitle = styled(m.div)({
  fontSize: '1.3rem',
  fontWeight: '600',
  margin: '8px 0 24px 0',
  background: 'linear-gradient(45deg, #00ACC1 0%, #80DEEA 50%, #B2EBF2 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  filter: 'drop-shadow(0 0 8px rgba(0, 172, 193, 0.3))',
});

const FeatureItem = styled(m.div)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '12px 0',
  fontSize: '1.1rem',
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

const CustomPlanDialog = memo(() => {
  const [open, setOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { t } = useLocales();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
      setOpen(true);
    }, 4000); // نمایش مدال بعد از 4 ثانیه

    return () => clearTimeout(timer);
  }, []);

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
      aria-describedby="custom-plan-dialog"
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
            <MainIcon>🎯</MainIcon>
          </m.div>

          <m.div variants={varFade().inUp}>
            <MainTitle>{t('pricing.custom_plan_title')}</MainTitle>
          </m.div>

          <m.div variants={varZoom().in}>
            <SubTitle>{t('pricing.custom_plan_subtitle')}</SubTitle>
          </m.div>

          <Stack spacing={2} sx={{ margin: '20px 0' }}>
            <m.div variants={varFade().inLeft}>
              <FeatureItem>
                <Iconify icon="mdi:check-circle" sx={{ mr: 1, color: '#80DEEA' }} width={20} />
                {t('pricing.custom_plan_feature_1')}
              </FeatureItem>
            </m.div>

            <m.div variants={varFade().inRight}>
              <FeatureItem>
                <Iconify icon="mdi:check-circle" sx={{ mr: 1, color: '#80DEEA' }} width={20} />
                {t('pricing.custom_plan_feature_2')}
              </FeatureItem>
            </m.div>

            <m.div variants={varFade().inLeft}>
              <FeatureItem>
                <Iconify icon="mdi:check-circle" sx={{ mr: 1, color: '#80DEEA' }} width={20} />
                {t('pricing.custom_plan_feature_3')}
              </FeatureItem>
            </m.div>
          </Stack>

          <Box sx={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
            <m.div variants={varZoom().inUp}>
              <StyledButton
                onClick={handleClose}
                variant="contained"
                LinkComponent={Link}
                href={paths.dashboard.root}
              >
                {t('pricing.custom_plan_button')}
              </StyledButton>
            </m.div>
          </Box>
        </Box>
      </DialogContainer>
    </Dialog>
  );
});

export default CustomPlanDialog;
