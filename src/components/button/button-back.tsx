// react
import React from 'react';
// @mui
import Button from '@mui/material/Button';
import { ButtonProps } from '@mui/material';

// next
import Link from 'next/link';
// locales
import { useLocales } from 'src/locales';
// components
import Iconify from './iconify-button';

interface ButtonBackProps extends ButtonProps {
  title?: string;
}

function ButtonBack(props: ButtonBackProps) {
  const { title, ...other } = props;
  const { currentLang } = useLocales();

  return (
    <Button
      variant="text"
      startIcon={
        currentLang.isRtl ? (
          <Iconify icon="zondicons:cheveron-right" />
        ) : (
          <Iconify icon="zondicons:cheveron-left" />
        )
      }
      LinkComponent={Link}
      {...other}
    >
      {title}
    </Button>
  );
}

export default ButtonBack;
