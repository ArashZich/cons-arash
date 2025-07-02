// react
import React from 'react';
// @mui
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
// iconify
import Iconify from 'src/components/iconify/iconify';
// locales
import { useLocales } from 'src/locales';
import { CustomInformationModalItem } from 'src/components/custom-information-modal-item';

export interface TermOfUseDialogProps {
  open: boolean;

  onClose: () => void;
}

export default function TermsOfUseModal(props: TermOfUseDialogProps) {
  const { t } = useLocales();
  const { onClose, open } = props;
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog maxWidth="xl" onClose={handleClose} open={open}>
      <Stack direction="row" alignItems="center">
        <DialogTitle variant="h4">{t('terms_of_use.title')}</DialogTitle>
        <Button
          onClick={handleClose}
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
      <Stack px={3} pb={3} spacing={2}>
        <Typography variant="body2" sx={{ textAlign: 'justify', pl: 3 }}>
          {t('terms_of_use.content')}
        </Typography>

        <CustomInformationModalItem
          title={t('terms_of_use.acceptance')}
          description={t('terms_of_use.acceptance_description')}
        />

        <CustomInformationModalItem
          title={t('terms_of_use.confirmation')}
          description={t('terms_of_use.confirmation_description')}
        />

        <CustomInformationModalItem
          title={t('terms_of_use.document')}
          description={t('terms_of_use.document_description')}
        />

        <CustomInformationModalItem
          title={t('terms_of_use.intellectual')}
          description={t('terms_of_use.intellectual_description')}
        />

        <CustomInformationModalItem
          title={t('terms_of_use.confidential')}
          description={t('terms_of_use.confidential_description')}
        />

        <CustomInformationModalItem
          title={t('terms_of_use.non_confidential')}
          description={t('terms_of_use.non_confidential_description')}
        />

        <CustomInformationModalItem
          title={t('terms_of_use.password')}
          description={t('terms_of_use.password_description')}
        />

        <CustomInformationModalItem
          title={t('terms_of_use.digital')}
          description={t('terms_of_use.digital_description')}
        />

        <CustomInformationModalItem
          title={t('terms_of_use.newsletter')}
          description={t('terms_of_use.newsletter_description')}
        />

        <CustomInformationModalItem
          title={t('terms_of_use.gift')}
          description={t('terms_of_use.gift_description')}
        />

        <CustomInformationModalItem
          title={t('terms_of_use.termination')}
          description={t('terms_of_use.termination_description')}
        />

        <CustomInformationModalItem
          title={t('terms_of_use.refund')}
          description={t('terms_of_use.refund_description')}
        />

        <CustomInformationModalItem
          title={t('terms_of_use.pricing')}
          description={t('terms_of_use.pricing_description')}
        />

        <CustomInformationModalItem
          title={t('terms_of_use.unavoidable')}
          description={t('terms_of_use.unavoidable_description')}
        />

        <Typography variant="body2" sx={{ pl: 3 }}>
          {t('terms_of_use.last_updated')}
        </Typography>
      </Stack>
    </Dialog>
  );
}
