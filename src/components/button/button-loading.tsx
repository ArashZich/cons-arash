// react
import React from 'react';
// @mui
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';
// locales
import { useLocales } from 'src/locales';
// components
import Iconify from './iconify-button';

interface ButtonLoadingProps extends LoadingButtonProps {
  title: string;
}

function ButtonLoading(props: ButtonLoadingProps) {
  const { title, ...other } = props;
  const { currentLang } = useLocales();

  return (
    <LoadingButton
      type="submit"
      color="inherit"
      variant="contained"
      size="large"
      endIcon={
        currentLang.isRtl ? (
          <Iconify icon="zondicons:cheveron-left" />
        ) : (
          <Iconify icon="zondicons:cheveron-right" />
        )
      }
      {...other}
    >
      {title}
    </LoadingButton>
  );
}

export default ButtonLoading;
