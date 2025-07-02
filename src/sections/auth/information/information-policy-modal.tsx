// react
import React from 'react';
// @mui
import Stack from '@mui/material/Stack';
import { List, ListItem, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
// iconify
import Iconify from 'src/components/iconify/iconify';
// locales
import { useLocales } from 'src/locales';
import { CustomInformationModalItem } from 'src/components/custom-information-modal-item';

export interface PolicyDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function TermsOfUseModal(props: PolicyDialogProps) {
  const { t } = useLocales();
  const { onClose, open } = props;
  const handleClose = () => {
    onClose();
  };

  const information_list = [
    t('privacy_policy.information1'),
    t('privacy_policy.information2'),
    t('privacy_policy.information3'),
    t('privacy_policy.information4'),
    t('privacy_policy.information5'),
  ];
  const utilize_list = [
    t('privacy_policy.utilize1'),
    t('privacy_policy.utilize2'),
    t('privacy_policy.utilize3'),
    t('privacy_policy.utilize4'),
    t('privacy_policy.utilize5'),
  ];

  return (
    <Dialog maxWidth="xl" onClose={handleClose} open={open}>
      <Stack direction="row" alignItems="center">
        <DialogTitle variant="h4">{t('privacy_policy.title')}</DialogTitle>
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
          {t('privacy_policy.content')}
        </Typography>

        <CustomInformationModalItem
          title={t('privacy_policy.commitments')}
          description={t('privacy_policy.armo_description')}
        />
        <CustomInformationModalItem
          title={t('privacy_policy.collect_information')}
          content={
            <List>
              {React.Children.toArray(
                information_list.map((text) => (
                  <Stack direction="row" alignItems="center" ml={2}>
                    <Iconify icon="bi:dot" />
                    <ListItem>
                      <Typography variant="body2" sx={{ textAlign: 'justify' }}>
                        {text}
                      </Typography>
                    </ListItem>
                  </Stack>
                ))
              )}
            </List>
          }
        />

        <CustomInformationModalItem
          title={t('privacy_policy.utilize_information')}
          content={
            <List>
              {React.Children.toArray(
                utilize_list.map((text) => (
                  <Stack direction="row" alignItems="center" ml={2}>
                    <Iconify icon="bi:dot" />
                    <ListItem>
                      <Typography variant="body2" sx={{ textAlign: 'justify' }}>
                        {text}
                      </Typography>
                    </ListItem>
                  </Stack>
                ))
              )}
            </List>
          }
        />

        <CustomInformationModalItem
          title={t('privacy_policy.additional_notes')}
          description={t('privacy_policy.additional_notes_description')}
        />

        <Typography variant="body2" sx={{ pl: 3 }}>
          {t('privacy_policy.last_updated')}
        </Typography>
      </Stack>
    </Dialog>
  );
}
