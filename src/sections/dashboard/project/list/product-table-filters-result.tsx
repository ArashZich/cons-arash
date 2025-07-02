// @mui
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Stack, { StackProps } from '@mui/material/Stack';
// components
// import Iconify from 'src/components/iconify';
// locales
import { useLocales } from 'src/locales';
// types
import {
  IProjectTableFilterValue,
  IProjectTableFilters,
} from 'src/_types/sections/project/project-filter';

// ----------------------------------------------------------------------

type Props = StackProps & {
  filters: IProjectTableFilters;
  onFilters: (name: string, value: IProjectTableFilterValue) => void;
  //
  onResetFilters: VoidFunction;
  //
  results: number;
};

export default function ProductTableFiltersResult({
  filters,
  onFilters,
  //
  onResetFilters,
  //
  results,
  ...other
}: Props) {
  const { t } = useLocales();
  return (
    <Stack spacing={1.5} {...other}>
      <Box sx={{ typography: 'body2' }}>
        <strong>{results}</strong>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
          {t('project.results_found')}
        </Box>
      </Box>
      {/* 
      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        <Button
          color="error"
          onClick={onResetFilters}
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        >
          {t('project.clear')}
        </Button>
      </Stack> */}
    </Stack>
  );
}
