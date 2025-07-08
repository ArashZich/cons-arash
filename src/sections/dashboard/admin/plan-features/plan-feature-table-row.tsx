// src/sections/dashboard/admin/plan-features/plan-feature-table-row.tsx

// @mui
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// locales
import { useLocales } from 'src/locales';
// types
import { PlanFeatureData } from 'src/_types/reality/admin/planFeatures';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
// utils
import { fPriceLocale } from 'src/utils/format-number';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  row: PlanFeatureData;
};

export default function PlanFeatureTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { t, currentLang } = useLocales();

  const { id, name, title, description, pricing_type, price, category_ids, is_active } = row;

  const confirm = useBoolean();

  const popover = usePopover();

  const formatPrice = (priceValue: number) => fPriceLocale(priceValue, currentLang.value);

  const getPricingTypeColor = (type: string) => {
    switch (type) {
      case 'fixed':
        return 'info';
      case 'per_month':
        return 'warning';
      case 'per_product':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <ListItemText
            primary={name}
            secondary={description}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
              typography: 'caption',
            }}
          />
        </TableCell>

        <TableCell>
          <ListItemText primary={title} primaryTypographyProps={{ typography: 'body2' }} />
        </TableCell>

        <TableCell>
          <Chip
            label={t(`admin.pricing_type_${pricing_type}`)}
            color={getPricingTypeColor(pricing_type)}
            variant="soft"
            size="small"
          />
        </TableCell>

        <TableCell>
          <ListItemText
            primary={formatPrice(price)}
            primaryTypographyProps={{ typography: 'body2', fontWeight: 600 }}
          />
        </TableCell>

        <TableCell>
          <Stack direction="row" spacing={0.5} flexWrap="wrap">
            {category_ids.slice(0, 3).map((categoryId) => (
              <Chip
                key={categoryId}
                label={categoryId}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.7rem' }}
              />
            ))}
            {category_ids.length > 3 && (
              <Chip
                label={`+${category_ids.length - 3}`}
                size="small"
                variant="outlined"
                color="default"
                sx={{ fontSize: '0.7rem' }}
              />
            )}
          </Stack>
        </TableCell>

        <TableCell>
          <Label variant="soft" color={is_active ? 'success' : 'error'}>
            {t(is_active ? 'admin.active' : 'admin.inactive')}
          </Label>
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
        content={t('admin.delete_feature_confirm', { name: title })}
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            {t('admin.delete')}
          </Button>
        }
      />
    </>
  );
}
