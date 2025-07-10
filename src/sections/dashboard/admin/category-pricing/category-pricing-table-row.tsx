// src/sections/dashboard/admin/category-pricing/category-pricing-table-row.tsx

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
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// locales
import { useLocales } from 'src/locales';
// types
import { CategoryPricingData } from 'src/_types/reality/admin/categoryPricing';
// components
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
// utils
import { fPriceLocale } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  row: CategoryPricingData;
};

export default function CategoryPricingTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { t, currentLang } = useLocales();

  const { price_per_product_per_month, storage_per_product_mb, category, created_at } = row;

  const confirm = useBoolean();

  const popover = usePopover();

  const formatPrice = (priceValue: number) => fPriceLocale(priceValue, currentLang.value);

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              alt={category.title}
              src={category.icon_url}
              variant="rounded"
              sx={{ width: 48, height: 48 }}
            >
              {category.title.charAt(0).toUpperCase()}
            </Avatar>
            <ListItemText
              primary={t(`category.${category.title}`)}
              secondary={`ID: ${category.ID}`}
              primaryTypographyProps={{ typography: 'body2', fontWeight: 600 }}
              secondaryTypographyProps={{
                component: 'span',
                color: 'text.disabled',
                typography: 'caption',
              }}
            />
          </Stack>
        </TableCell>

        <TableCell>
          <Stack>
            <ListItemText
              primary={formatPrice(price_per_product_per_month)}
              secondary={t('admin.per_product_per_month')}
              primaryTypographyProps={{
                typography: 'body2',
                fontWeight: 600,
                color: 'primary.main',
              }}
              secondaryTypographyProps={{
                component: 'span',
                color: 'text.disabled',
                typography: 'caption',
              }}
            />
          </Stack>
        </TableCell>

        {/* Storage Column */}
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Chip
              label={`${storage_per_product_mb} MB`}
              size="small"
              variant="outlined"
              color="primary"
              icon={<Iconify icon="solar:database-bold" />}
            />
            <ListItemText
              secondary={t('admin.per_product')}
              secondaryTypographyProps={{
                component: 'span',
                color: 'text.disabled',
                typography: 'caption',
              }}
            />
          </Stack>
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
        content={t('admin.delete_pricing_confirm', { category: category.title })}
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            {t('admin.delete')}
          </Button>
        }
      />
    </>
  );
}
