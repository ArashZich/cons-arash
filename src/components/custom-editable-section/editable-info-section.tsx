// yup
import * as yup from 'yup';

// react
import React, { FC, ReactNode } from 'react';
// immer
import { useImmer } from 'use-immer';
// @mui
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// i18n
import { useLocales } from 'src/locales';
// icon
import Iconify from '../iconify';
import { usePopover } from '../custom-popover';

interface State {
  textFieldValue: string;
  error: string | null;
}

interface EditableInfoSectionProps {
  label: string;
  value: string | number;
  onChange?: (item: { value: string; id?: string }) => void; // Add a second argument for the field name
  content?: ReactNode | null;
  id?: string;
  btnDisabled?: boolean;
  iconName?: string;
  popoverTitle?: string;
  popoverDescription?: ReactNode; // Change the type to ReactNode
  warningText?: string;
}

const EditableInfoSection: FC<EditableInfoSectionProps> = ({
  label,
  value,
  onChange,
  id,
  content,
  btnDisabled,
  iconName,
  popoverTitle,
  popoverDescription,
  warningText,
}) => {
  const toggle = useBoolean();
  const hoverPopover = usePopover();
  const [state, setState] = useImmer<State>({
    textFieldValue: '',
    error: null,
  });
  const { t, isRtl } = useLocales();
  const validationSchema = yup.object().shape({
    email: yup.string().email(t('organization_management.invalid_email')),
    website: yup.string().url(t('organization.website_valid')),
    phone_number: yup.string().matches(/^(\+98|0)?9\d{9}$/, t('auth.phone_number_invalid')),
  });
  const { textFieldValue, error } = state;

  const handleSave = async () => {
    try {
      if (!id) {
        // Handle the case where id is undefined or not one of the expected values
        throw new Error();
      }
      const schema = validationSchema.pick(['email', 'website', 'phone_number'] as const).clone();
      await schema.validate({ [id]: textFieldValue });

      if (onChange) {
        onChange({ value: textFieldValue, id });
      }

      setState((draft) => {
        draft.textFieldValue = '';
        draft.error = null;
      });

      toggle.onFalse();
    } catch (errors) {
      setState((draft) => {
        draft.error = errors.message;
      });
    }
  };

  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1}>
        <Typography variant="body2" color="text.secondary">
          {label}:
        </Typography>
        {iconName && (
          <Iconify
            icon={iconName}
            color="red"
            onMouseEnter={hoverPopover.onOpen}
            onMouseLeave={hoverPopover.onClose}
          />
        )}
      </Stack>
      <Typography variant="subtitle2">{value}</Typography>
      <Stack alignItems="self-start">
        {content || (
          <Button disabled={btnDisabled} onClick={toggle.onTrue} sx={{ color: 'info.dark' }}>
            <Typography variant="caption">
              {t('organization_management.change')} {label}
            </Typography>
          </Button>
        )}
      </Stack>

      <Popover
        id="mouse-over-popover-armo"
        open={Boolean(hoverPopover.open)}
        anchorEl={hoverPopover.open}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={hoverPopover.onClose}
        disableRestoreFocus
        sx={{
          pointerEvents: 'none',
        }}
      >
        <Box sx={{ p: 2, maxWidth: 400 }}>
          <Typography variant="subtitle2" gutterBottom>
            {popoverTitle}
          </Typography>
          <Stack>{popoverDescription}</Stack>
        </Box>
      </Popover>

      {/* Dialog for editing */}
      <Dialog open={toggle.value} onClose={toggle.onFalse} fullWidth>
        <Stack direction="row" alignItems="center">
          <DialogTitle variant="h4">
            {t('organization_management.change')} {label}
          </DialogTitle>
          <Button
            onClick={toggle.onFalse}
            sx={{
              ml: 'auto',
              // FIXME: hover
              '&:hover': {
                backgroundColor: 'white',
              },
            }}
          >
            <Iconify icon="mdi:window-close" />
          </Button>
        </Stack>

        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            {isRtl
              ? `${label} ${t('organization_management.current')}`
              : `${t('organization_management.current')} ${label}`}
            :
          </Typography>
          <Typography variant="subtitle2" sx={{ mt: 1, mb: 2 }}>
            {value}
          </Typography>
          {warningText && (
            <Typography variant="caption" color="error.main">
              {warningText}
            </Typography>
          )}

          <TextField
            autoFocus
            fullWidth
            margin="dense"
            variant="outlined"
            label={label}
            value={textFieldValue}
            onChange={(e) => {
              setState((draft) => {
                draft.textFieldValue = e.target.value;
              });
            }}
            helperText={error}
            error={!!error}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={toggle.onFalse} variant="outlined" color="inherit">
            {t('organization_management.cancel')}
          </Button>
          <Button onClick={handleSave} variant="contained">
            {t('organization_management.save_change')}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export { EditableInfoSection };
