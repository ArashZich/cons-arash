/* eslint-disable import/no-cycle */
// react
import React, { Dispatch, SetStateAction } from 'react';
// @mui
import { alpha, styled, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// locales
import { useLocales } from 'src/locales';
// components
import Iconify from 'src/components/iconify/iconify';
import { DataType } from './check-3d-model';

interface Check3DProps {
  data: DataType;
  setActive: Dispatch<SetStateAction<DataType | undefined>>;
  active: boolean;
}

const CardsStyles = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: 16,
  padding: theme.spacing(3),
  justifyContent: 'start',
  cursor: 'pointer',
  [theme.breakpoints.up('lg')]: {
    width: 352,
  },
}));

function Check3D(props: Check3DProps) {
  const { data, setActive, active } = props;

  const { t } = useLocales();

  const theme = useTheme();

  const handelCheck3d = () => {
    setActive(data);
  };

  return (
    <CardsStyles
      onClick={handelCheck3d}
      sx={{
        bgcolor: active ? alpha(theme.palette.secondary.main, 0.08) : 'unset',
        borderColor: active
          ? alpha(theme.palette.secondary.main, 1)
          : alpha(theme.palette.grey[300], 1),
      }}
    >
      <Stack spacing={1} alignItems="center">
        <Iconify icon={data.icon} width={48} sx={{ color: theme.palette.grey[700] }} />
        <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
          {t(`project.${data.title}`)}
        </Typography>
      </Stack>
    </CardsStyles>
  );
}

export default Check3D;
