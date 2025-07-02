// next
import Link from 'next/link';
// @mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
// i18n
import { useLocales } from 'src/locales';
// components
import Image from 'src/components/image/image';
// iconify
import Iconify from 'src/components/iconify/iconify';
import { paths } from 'src/routes/paths';

interface InvoiceCheckDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewProjectDialog({ isOpen, onClose }: InvoiceCheckDialogProps) {
  const { t } = useLocales();
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: '400px', // Adjust the width as needed
          m: 'auto',
          p: 2,
        },
      }}
    >
      <Stack direction="row" alignItems="center">
        <DialogTitle width="100%" align="center" variant="h6">
          {t('organization.organization_added')}
        </DialogTitle>
        <Button
          onClick={onClose}
          sx={{
            ml: 'auto',
            color: 'text.secondary',
            position: 'absolute',
            right: '8px',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <Iconify icon="mdi:window-close" width={24} height={24} />
        </Button>
      </Stack>

      <DialogContent
        sx={{
          color: 'text.secondary',
          textAlign: 'center',
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Image src="/assets/icons/home/ic_job.svg" sx={{ width: '80px', height: '80px' }} />
          <p>{t('organization.before_adding')}</p>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', paddingBottom: '24px' }}>
        <Button variant="contained" LinkComponent={Link} href={paths.organization.company_info}>
          {t('organization.add_organization_or_company')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
