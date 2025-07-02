// react
import { useCallback } from 'react';
import { format } from 'date-fns';
// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
// utils
import { fNumber } from 'src/utils/format-number';
import { getShortenedLink } from 'src/utils/shorted-link';
// locales
import { useLocales } from 'src/locales';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';
// types
import { ProductData } from 'src/_types/reality/product/productData';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSnackbar } from 'src/components/snackbar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { fDate, jfDate } from 'src/utils/format-time';
// redux
import { useSelector } from 'src/redux/store';
import { organizationSelector } from 'src/redux/slices/organization';

// ----------------------------------------------------------------------

type Props = {
  row: ProductData;
  selected: boolean;
  onViewRow: VoidFunction;
  onInsightRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onEditRow: VoidFunction; // پراپ جدید اضافه شده
};

export default function ProductTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onViewRow,
  onInsightRow,
  onEditRow, // پراپ جدید اضافه شده
}: Props) {
  const { t, isRtl } = useLocales();
  const { name, thumbnail_uri, created_at, view_count, category, product_uid } = row;
  const organization = useSelector(organizationSelector);
  const confirm = useBoolean();

  const popover = usePopover();

  const { enqueueSnackbar } = useSnackbar();
  const { copy } = useCopyToClipboard();

  const getDynamicLink = useCallback(
    (UID: string) => {
      const specialCategories = new Set(['watch', 'bracelet', 'ring', 'shoes', 'hat']);
      const baseURL = organization?.domain ? `https://${organization?.domain}` : category.url;
      return specialCategories.has(category.title.toLowerCase())
        ? `https://webar.armogroup.tech/${UID}`
        : `${baseURL}/${UID}`;
    },
    [category.url, category.title, organization?.domain]
  );

  const handleCopyLink = useCallback(
    (UID: string) => {
      const dynamicLink = getDynamicLink(UID);

      if (dynamicLink) {
        copy(dynamicLink);
      }

      enqueueSnackbar(t('project.copied'), { variant: 'info' });
    },
    [getDynamicLink, copy, enqueueSnackbar, t]
  );

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt={name}
            src={thumbnail_uri}
            variant="rounded"
            sx={{ width: 64, height: 64, mr: 2 }}
          />

          <ListItemText
            disableTypography
            primary={
              <Link
                noWrap
                color="inherit"
                variant="subtitle2"
                onClick={onViewRow}
                sx={{ cursor: 'pointer' }}
              >
                {name}
              </Link>
            }
            secondary={
              <Box component="div" sx={{ typography: 'body2', color: 'text.disabled' }}>
                {t(`category.${category.title}`)}
              </Box>
            }
          />
        </TableCell>

        <TableCell>
          <ListItemText
            primary={isRtl ? jfDate(created_at) : fDate(created_at)}
            secondary={format(new Date(created_at), 'p')}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>

        <TableCell>{fNumber(view_count)}</TableCell>

        <TableCell onClick={() => handleCopyLink(product_uid)}>
          <Label
            sx={{
              ':hover': {
                cursor: 'pointer',
              },
            }}
            variant="soft"
          >
            <Iconify icon="solar:copy-outline" />
            {getShortenedLink(getDynamicLink(product_uid) || '', 30)}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
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
            onViewRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          {t('project.view')}
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow(); // منو آیتم جدید اضافه شده
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          {t('project.edit')}
        </MenuItem>

        <MenuItem
          disabled={view_count === 0}
          onClick={() => {
            onInsightRow();
            popover.onClose();
          }}
        >
          <Iconify icon="eva:trending-up-fill" />
          {t('project.view_insights')}
        </MenuItem>

        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          {t('project.delete')}
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title={t('project.delete_project')}
        content={t('project.are_you_sure')}
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            {t('project.delete')}
          </Button>
        }
      />
    </>
  );
}
