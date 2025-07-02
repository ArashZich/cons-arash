// @mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

// locales
import { useLocales } from 'src/locales';
// ----------------------------------------------------------------------

type DialogProps = {
  open: boolean;
  onClick: () => void;
};

export default function LogoutDialog({ open, onClick }: DialogProps) {
  const { t } = useLocales();
  return (
    <Dialog open={open}>
      <DialogContent sx={{ color: 'text.secondary', p: 3 }}>
        {t('settings.password_successfully_change')}
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={onClick} autoFocus>
          {t('settings.ok')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
