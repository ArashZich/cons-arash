import { Theme } from '@mui/material/styles';
import { checkboxClasses } from '@mui/material/Checkbox';

// ----------------------------------------------------------------------

export function checkbox(theme: Theme) {
  return {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
          color: theme.palette.text.primary,
          [`&.${checkboxClasses.checked}`]: {
            color: theme.palette.text.primary,
          },
        },
      },
    },
  };
}
