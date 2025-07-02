import { forwardRef } from 'react';
// @mui
import Box, { BoxProps } from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
// ----------------------------------------------------------------------

export interface SvgColorProps extends BoxProps {
  src: string;
  color?: string;
}

const SvgColor = forwardRef<HTMLSpanElement, SvgColorProps>(({ src, sx, color, ...other }, ref) => {
  const theme = useTheme();
  return (
    <Box
      component="span"
      className="svg-color"
      ref={ref}
      sx={{
        width: 24,
        height: 24,
        display: 'inline-block',
        bgcolor: color || theme.palette.grey[700],
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx,
      }}
      {...other}
    />
  );
});

export default SvgColor;
