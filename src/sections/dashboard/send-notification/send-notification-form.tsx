// @hookform/resolvers
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
// react
import React, { useState } from 'react';
// react-hook-form
import { useForm } from 'react-hook-form';
// yup
import * as Yup from 'yup';
// components
import { useSnackbar } from 'src/components/snackbar';
import NewFormCard from 'src/components/form-card/new-form-card';
// hook-form
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';

// req-hooks
import { useCreateNotificationMutation } from 'src/_req-hooks/reality/notification/useCreateNotificationMutation';
import { useCategoriesQuery } from 'src/_req-hooks/reality/category/useCategoriesQuery';

// i18n
import { useLocales } from 'src/locales';

// types
import { CreateNotificationsRequestBodyType } from 'src/_types/reality/notification/createNotifications';
import { FilterOperatorsEnum } from 'src/_types/site/filters';

// constants
import { typeOptions } from 'src/constants/dashboard';

type CreateNotificationRequestBodySchema = {
  [K in keyof CreateNotificationsRequestBodyType]: Yup.AnySchema;
};

export default function SendNotificationForm() {
  const { t } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const [ignoreCategory, setIgnoreCategory] = useState(false);

  const NotificationSchema = Yup.object().shape<CreateNotificationRequestBodySchema>({
    title: Yup.string()
      .min(2, t('send_notification.title_min_error'))
      .max(200, t('send_notification.title_max_error'))
      .required(t('send_notification.title_required')),
    message: Yup.string()
      .min(2, t('send_notification.message_min_error'))
      .max(500, t('send_notification.message_max_error'))
      .required(t('send_notification.message_required')),
    type: Yup.string().required(t('send_notification.type_required')),
    category_id: Yup.number().nullable().label(t('send_notification.category')),
  });

  const defaultValues: CreateNotificationsRequestBodyType = {
    title: '',
    message: '',
    type: '',
    user_ids: [],
    category_id: '',
    organization_id: null,
  };

  const methods = useForm<CreateNotificationsRequestBodyType>({
    resolver: yupResolver(NotificationSchema) as any,
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = methods;

  const { mutateAsync: createNotification } = useCreateNotificationMutation();

  const onSubmit = handleSubmit(async (values) => {
    if (ignoreCategory) {
      values.category_id = null;
    }

    try {
      await createNotification(values);
      enqueueSnackbar(t('send_notification.send_success'), { variant: 'success' });
      reset(defaultValues);
    } catch (error) {
      setError('root', { message: error.message });
    }
  });

  const { data: CategoryData, isSuccess: isSuccessCategory } = useCategoriesQuery({
    order: 'asc',
    filters: { parent_id: { op: FilterOperatorsEnum.IS_EMPTY, value: 0 } },
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <NewFormCard title={t('send_notification.new_notification')}>
        {errors.root && <Alert severity="error">{errors.root?.message}</Alert>}

        <Stack spacing={3}>
          <RHFTextField name="title" label={t('send_notification.title')} />
          <RHFTextField multiline rows={4} name="message" label={t('send_notification.message')} />
          <RHFSelect name="type" label={t('send_notification.type')}>
            {typeOptions(t).map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </RHFSelect>

          {!ignoreCategory && isSuccessCategory && (
            <RHFSelect name="category_id" label={t('send_notification.category')}>
              {CategoryData?.data.items.map((option) => (
                <MenuItem key={option.ID} value={option.ID}>
                  {t(`category.${option.title}`)}
                </MenuItem>
              ))}
            </RHFSelect>
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={ignoreCategory}
                onChange={(e) => {
                  setIgnoreCategory(e.target.checked);
                  if (e.target.checked) {
                    setValue('category_id', null);
                  } else {
                    setValue('category_id', '');
                  }
                }}
              />
            }
            label={t('send_notification.send_to_all')}
          />
        </Stack>
      </NewFormCard>
    </FormProvider>
  );
}
