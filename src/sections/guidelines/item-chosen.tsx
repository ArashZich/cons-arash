// react
import React, { Dispatch, SetStateAction } from 'react';
// @mui
import Typography from '@mui/material/Typography';
import { experimentalStyled as styled, useTheme, alpha } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
// routes
import { useRouter } from 'src/routes/hooks';
// components
import SvgColor from 'src/components/svg-color';
// types
import { CategoryData } from 'src/_types/reality/category/categoryData';

interface ItemProps {
  item: CategoryData;
  path: string;
  label: string;
}

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  borderRadius: '16px',
  minHeight: 150,
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  '&:hover': {
    cursor: 'pointer',
    opacity: 0.9,
    bgcolor: alpha(theme.palette.info.main, 0.08), // پس‌زمینه hover
    border: `2px solid ${theme.palette.info.main}`, // border hover
  },
  '&:active': {
    border: `2px solid ${theme.palette.info.main}`,
  },
}));

function ItemChosen(props: ItemProps) {
  const { item, label, path } = props;
  const theme = useTheme();
  const router = useRouter();

  const handelChoosePlane = () => {
    router.push(path);
  };

  return (
    <Item
      onClick={handelChoosePlane}
      sx={{
        bgcolor: theme.palette.common.white,
        border: `2px solid ${theme.palette.grey[300]}`,
      }}
    >
      <SvgColor
        sx={{ width: 50, height: 50 }}
        color={theme.palette.info.main}
        src={item.icon_url}
      />

      <Typography variant="subtitle2" sx={{ mt: 1 }}>
        {label}
      </Typography>
    </Item>
  );
}

export default ItemChosen;
