import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// react
import React from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
// lodash
import { useSnackbar } from 'notistack';
// iconify
import Iconify from 'src/components/iconify/iconify';
// locales
import { useLocales } from 'src/locales';
// components
// routes
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import FormProvider from 'src/components/hook-form/form-provider';

// hook-form
import { RHFTextField } from 'src/components/hook-form';

// ////////////////////////////////

import { CreateCategoryRequestBodyType } from 'src/_types/reality/category/createCategory';
import { useCategoriesQuery } from 'src/_req-hooks/reality/category/useCategoriesQuery';
import { CategoryData } from 'src/_types/reality/category/categoryData';

import { setErrors } from 'src/utils/errors';

export interface OrganizationDialogProps {
  open: boolean;

  onClose: () => void;
}

interface ExtendedCreateCategoryRequestBodyType extends CreateCategoryRequestBodyType {
  parent_category?: CategoryData | null;
}

type CreateCategoryRequestBodySchema = {
  [K in keyof ExtendedCreateCategoryRequestBodyType]: Yup.AnySchema;
};

export default function ChangeButtonModal(props: OrganizationDialogProps) {
  const { t } = useLocales();
  const router = useRouter();
  const { onClose, open } = props;
  const handleClose = () => {
    onClose();
  };

  const { enqueueSnackbar } = useSnackbar();

  const NewCategorySchema = Yup.object().shape<CreateCategoryRequestBodySchema>({});

  const methods = useForm<ExtendedCreateCategoryRequestBodyType>({
    resolver: yupResolver(NewCategorySchema) as any,
    // defaultValues,
    mode: 'onChange',
  });

  const { handleSubmit, setError } = methods;

  const { data: categories } = useCategoriesQuery({
    page: 1,
    per_page: 10000,
    // TODO: auto complete search server side
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (categories) {
        enqueueSnackbar('با موفقیت به روز رسانی شد', {
          variant: 'success',
        });
      } else {
        // TODO call api
        enqueueSnackbar('با موفقیت ایجاد شد', { variant: 'success' });
        router.push(paths.dashboard.category_management.root);
      }
    } catch (error) {
      setError('root', {
        message: error.message || t('user_management.problem_creating_user'),
      });
      setErrors(error.data, setError);
    }
  });

  return (
    <Dialog fullWidth onClose={handleClose} open={open}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack direction="row" alignItems="center">
          <DialogTitle>{t('organization_management.change_email_address')}</DialogTitle>
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
        <Stack px={2} spacing={2}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="body2">
              {t('organization_management.current_email_address')}
            </Typography>
            <Typography>info@quitzon.com</Typography>
          </Stack>
          <RHFTextField name="email" label="Email" />
          <RHFTextField name="confirm_email" label="Confirm Email" />
        </Stack>
        <Stack m={2}>
          <Stack direction="row" ml="auto" spacing={2}>
            <Button variant="outlined">{t('organization_management.cancel')}</Button>
            <Button variant="contained">{t('organization_management.save_change')}</Button>
          </Stack>
        </Stack>
      </FormProvider>
    </Dialog>
  );
}
