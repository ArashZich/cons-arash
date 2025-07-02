'use client';

import React from 'react';
import Fab from '@mui/material/Fab';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { usePathname } from 'src/routes/hooks';
import { useLocales } from 'src/locales';
import Iconify from '../iconify/iconify';

const EXCLUDED_PATHS = ['/project', '/dashboard', '/organization'];

export const ScrollToTopButton: React.FC = () => {
  const { showButton, scrollToTop } = useScrollToTop();
  const pathname = usePathname();
  const { isRtl } = useLocales();

  const isExcludedPath = EXCLUDED_PATHS.some((path) => pathname?.startsWith(path));

  if (isExcludedPath) {
    return null;
  }

  return (
    <>
      {showButton && (
        <Fab
          color="secondary"
          aria-label="scroll to top"
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: isRtl ? 'unset' : '2rem', // در حالت LTR در سمت راست
            left: isRtl ? '2rem' : 'unset', // در حالت RTL در سمت چپ
            zIndex: 1000,
          }}
        >
          <Iconify icon="mdi:arrow-up" sx={{ width: 24, height: 24 }} />
        </Fab>
      )}
    </>
  );
};
