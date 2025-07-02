// react
import { format } from 'date-fns';
// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

// locales
import { useLocales } from 'src/locales';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// types
import { UserData } from 'src/_types/reality/user/userData';

// components
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
// utils
import { fDate, jfDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

type Props = {
  row: UserData;
  selected: boolean;
  onViewRow: VoidFunction;
  onSelectRow: VoidFunction;
};

export default function UserTableRow({ row, selected, onSelectRow, onViewRow }: Props) {
  const { t, isRtl } = useLocales();
  const { name, organizations, last_name, avatar_url, created_at, phone, email } = row;

  const confirm = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt={name}
            src={avatar_url}
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
                {name} {last_name}
              </Link>
            }
          />
        </TableCell>
        <TableCell>
          <ListItemText disableTypography primary={organizations.length} />
        </TableCell>
        <TableCell>
          <ListItemText
            disableTypography
            primary={email}
            secondary={
              <Box component="div" sx={{ typography: 'body2', color: 'text.disabled' }}>
                {phone}
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
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          {t('project.delete')}
        </MenuItem>
      </CustomPopover>
    </>
  );
}
