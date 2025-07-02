import { useFormContext, Controller } from 'react-hook-form';
// @mui
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';

// locales
import React from 'react';
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

type Props = RadioGroupProps & {
  name: string;
  options: { label: string; value: any; children: { label: string; value: any }[] }[];
  label?: string;
  spacing?: number;
  helperText?: React.ReactNode;
};

export default function RHFRadioGroupCustom({
  row,
  name,
  label,
  options,
  spacing,
  helperText,
  ...other
}: Props) {
  const { control } = useFormContext();
  const { t } = useLocales();

  const labelledby = label ? `${name}-${label}` : '';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset">
          {label && (
            <FormLabel component="legend" id={labelledby} sx={{ typography: 'body2' }}>
              {label}
            </FormLabel>
          )}

          <RadioGroup {...field} aria-labelledby={labelledby} row={row} {...other}>
            {options.map((option) => (
              <Stack
                key={option.value}
                sx={{
                  '&:not(:last-of-type)': {
                    mb: spacing || 0,
                  },
                  ...(row && {
                    mr: 0,
                    '&:not(:last-of-type)': {
                      mr: spacing || 2,
                    },
                  }),
                }}
              >
                <FormControlLabel
                  value={option.value}
                  control={<Radio />}
                  label={t(`category.${option.label}`)}
                />
                <Stack direction="row" sx={{ flexWrap: 'wrap', whiteSpace: 'break-spaces' }}>
                  {option.children.map((child, index) => (
                    <React.Fragment key={child.value}>
                      <Typography variant="caption" color="text.disabled">
                        {t(`category.${child.label}`)}
                      </Typography>
                      {index < option.children.length - 1 && (
                        <Typography variant="caption" color="text.disabled">
                          {', '}
                        </Typography>
                      )}
                    </React.Fragment>
                  ))}
                </Stack>
              </Stack>
            ))}
          </RadioGroup>

          {(!!error || helperText) && (
            <FormHelperText error={!!error} sx={{ mx: 0 }}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
