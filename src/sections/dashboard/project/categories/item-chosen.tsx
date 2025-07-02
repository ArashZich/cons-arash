// react
import React, { Dispatch, SetStateAction } from 'react';
// @mui
import Typography from '@mui/material/Typography';
import { experimentalStyled as styled, useTheme, alpha } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
// components
import SvgColor from 'src/components/svg-color';
// types
import { CategoryData } from 'src/_types/reality/category/categoryData';

interface ItemProps {
  item: CategoryData;
  setActive: Dispatch<SetStateAction<CategoryData | undefined>>;
  active: boolean;
  label: string;
}

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  borderRadius: '16px',
  '&:hover': { cursor: 'pointer', opacity: 0.9 },
  '&:active': { border: `2px solid ${theme.palette.info.main}` },
  minHeight: 225,
}));

function ItemChosen(props: ItemProps) {
  const { item, active, setActive, label } = props;
  const theme = useTheme();
  const handelChoosePlane = () => {
    setActive(item);
  };

  return (
    <Item
      onClick={handelChoosePlane}
      sx={{
        bgcolor: active ? alpha(theme.palette.secondary.main, 0.08) : theme.palette.common.white,
        border: `2px solid ${active ? theme.palette.info.main : theme.palette.grey[300]}`,
      }}
    >
      <SvgColor
        sx={{ width: 120, height: 120, mb: 1 }}
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
