import { useCallback } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
// locales
import { useLocales } from 'src/locales';
// components
import Iconify from 'src/components/iconify';
// types
import {
  IProjectTableFilterValue,
  IProjectTableFilters,
} from 'src/_types/sections/project/project-filter';

// ----------------------------------------------------------------------

type Props = {
  filters: IProjectTableFilters;
  onFilters: (name: string, value: IProjectTableFilterValue) => void;
  handleExport: () => void;
};

export default function ProductTableToolbar({ filters, onFilters, handleExport }: Props) {
  const { t } = useLocales();

  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('name', event.target.value);
    },
    [onFilters]
  );

  return (
    <Stack
      spacing={2}
      alignItems={{ xs: 'flex-end', md: 'center' }}
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{
        p: 2.5,
        pr: { xs: 2.5, md: 1 },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
        <TextField
          fullWidth
          value={filters.name}
          onChange={handleFilterName}
          placeholder={t('project.search')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />

        <IconButton onClick={handleExport}>
          <Iconify icon="mdi:export-variant" />
        </IconButton>
      </Stack>
    </Stack>
  );
}
