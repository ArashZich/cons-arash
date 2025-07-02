// react
import React from 'react';
// @mui
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// locales
import { useLocales } from 'src/locales';

type Props = {
  isOpen: boolean;
  onClick: () => void;
};

function InvoiceDialog({ isOpen, onClick }: Props) {
  const router = useRouter();
  const { t } = useLocales();

  const handleAgree = () => {
    router.push(paths.dashboard.organization_management);
    onClick();
  };

  return (
    <Dialog open={isOpen} onClose={onClick}>
      <DialogTitle>{t('billing.dialog_complete_information')}</DialogTitle>

      <DialogContent sx={{ color: 'text.secondary' }}>{t('billing.dialog_content')}</DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={onClick}>
          {t('billing.cancel')}
        </Button>
        <Button variant="contained" onClick={handleAgree} autoFocus>
          {t('billing.ok')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default InvoiceDialog;
