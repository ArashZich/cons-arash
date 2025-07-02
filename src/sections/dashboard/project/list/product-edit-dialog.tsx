'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// @mui
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
// components
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
// locales
import { useLocales } from 'src/locales';
// hooks
import { useUpdateDocumentMutation } from 'src/_req-hooks/reality/document/useUpdateDocumentMutation';
// types
import { DocumentDataType } from 'src/_types/reality/document/documentData';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  document: DocumentDataType | null;
  onSuccess?: VoidFunction;
};

type FormValuesProps = {
  title: string;
  shop_link: string;
};

export default function ProductEditDialog({ open, onClose, document, onSuccess }: Props) {
  const { t } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync: updateDocument, isLoading } = useUpdateDocumentMutation();

  const NewDocumentSchema = Yup.object().shape({
    title: Yup.string().required(t('validation.title_required')),
    shop_link: Yup.string().url(t('validation.url_invalid')),
  });

  const defaultValues = {
    title: '',
    shop_link: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewDocumentSchema) as any,
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (document && open) {
      reset({
        title: document.title || '',
        shop_link: document.shop_link || '',
      });
    }
  }, [document, open, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!document) return;

      const updateData: any = {};

      if (data.title !== document.title) {
        updateData.title = data.title;
      }

      if (data.shop_link !== document.shop_link) {
        updateData.shop_link = data.shop_link;
      }

      if (Object.keys(updateData).length === 0) {
        onClose();
        return;
      }

      await updateDocument({
        documentId: document.ID,
        data: updateData,
      });

      enqueueSnackbar(t('project.update_success'));
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error(error);
      enqueueSnackbar(t('document.update_error'), { variant: 'error' });
    }
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>{t('project.edit_title')}</DialogTitle>

        <DialogContent>
          <Stack spacing={3} sx={{ pt: 1 }}>
            <RHFTextField name="title" label={t('project.title')} />
            <RHFTextField name="shop_link" label={t('project.shop_link')} />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>{t('project.cancel')}</Button>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting || isLoading}>
            {t('project.save')}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
