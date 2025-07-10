// src/sections/dashboard/admin/discount-rules/discount-rule-table-row.tsx

// @mui
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// locales
import { useLocales } from 'src/locales';
// types
import { DiscountRuleData } from 'src/_types/reality/admin/discountRules';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
// utils
import { fDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  row: DiscountRuleData;
};

export default function DiscountRuleTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { t } = useLocales();

  const {
    name,
    min_months,
    min_products,
    min_features,
    discount_percentage,
    is_active,
    created_at,
  } = row;

  const confirm = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <ListItemText
            primary={name}
            primaryTypographyProps={{ typography: 'body2', fontWeight: 600 }}
          />
        </TableCell>

        <TableCell>
          <Stack spacing={0.5}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              <Chip
                label={`${min_months}+ ${t('admin.months')}`}
                size="small"
                variant="outlined"
                color="primary"
                sx={{ fontSize: '0.7rem' }}
              />
              <Chip
                label={`${min_products}+ ${t('admin.products')}`}
                size="small"
                variant="outlined"
                color="secondary"
                sx={{ fontSize: '0.7rem' }}
              />
              <Chip
                label={`${min_features}+ ${t('admin.features')}`}
                size="small"
                variant="outlined"
                color="info"
                sx={{ fontSize: '0.7rem' }}
              />
            </Box>
          </Stack>
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon="solar:percent-bold" width={16} sx={{ color: 'success.main' }} />
            <ListItemText
              primary={`${discount_percentage}%`}
              primaryTypographyProps={{
                typography: 'body2',
                fontWeight: 600,
                color: 'success.main',
              }}
            />
          </Stack>
        </TableCell>

        <TableCell>
          <Label variant="soft" color={is_active ? 'success' : 'error'}>
            {t(is_active ? 'admin.active' : 'admin.inactive')}
          </Label>
        </TableCell>

        <TableCell>
          <ListItemText
            primary={fDate(created_at)}
            primaryTypographyProps={{ typography: 'body2' }}
          />
        </TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title={t('admin.edit')} placement="top" arrow>
            <IconButton onClick={onEditRow}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>

          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          {t('admin.delete')}
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title={t('admin.delete')}
        content={t('admin.delete_rule_confirm', { name })}
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            {t('admin.delete')}
          </Button>
        }
      />
    </>
  );
}
