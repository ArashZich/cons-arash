// yup
import * as Yup from 'yup';
// @hookform
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
// react
import React, { useEffect, useMemo } from 'react';
// react-hook-form
import { useForm } from 'react-hook-form';

// components
import { useSnackbar } from 'src/components/snackbar';
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import NewFormCard from 'src/components/form-card/new-form-card';
// routes
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
// types
import { CreateCategoryRequestBodyType } from 'src/_types/reality/category/createCategory';
import { CategoryData } from 'src/_types/reality/category/categoryData';
import { FilterOperatorsEnum } from 'src/_types/site/filters';
// req-hook
import { useUpdateCategoryMutation } from 'src/_req-hooks/reality/category/useUpdateCategoryMutation';
import { useCreateCategoryMutation } from 'src/_req-hooks/reality/category/useCreateCategoryMutation';
import { useCategoriesQuery } from 'src/_req-hooks/reality/category/useCategoriesQuery';
// locales
import { useLocales } from 'src/locales';
// utils
import { setErrors } from 'src/utils/errors';

type CreateCategoryRequestBodySchema = {
  [K in keyof CreateCategoryRequestBodyType]: Yup.AnySchema;
};

type CategoryNewFormProps = {
  currentCategory?: CategoryData;
};

export default function CategoryNewEditForm({ currentCategory }: CategoryNewFormProps) {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { t } = useLocales();

  const NewCategorySchema = Yup.object().shape<CreateCategoryRequestBodySchema>({
    parent_id: Yup.number().label(t('category_management.categories')).nullable(),
    title: Yup.string().min(2).max(200).required().label(t('category_management.title')),
    icon_url: Yup.string().required().label(t('category_management.icon_url')),
    accepted_file_type: Yup.string().required().label(t('category_management.accepted_file_types')),
    url: Yup.string().required().label(t('category_management.url')),
    ar_placement: Yup.string().required().label(t('category_management.ar_placement')),
  });

  const defaultValues: any = useMemo(
    () => ({
      title: currentCategory?.title || '',
      icon_url: currentCategory?.icon_url || '',
      parent_id: currentCategory?.parent_id ?? '',
      accepted_file_type: currentCategory?.accepted_file_type || '',
      url: currentCategory?.url || '',
      ar_placement: currentCategory?.ar_placement || '',
    }),
    [currentCategory]
  );

  const methods = useForm<CreateCategoryRequestBodyType>({
    resolver: yupResolver(NewCategorySchema) as any,
    defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  useEffect(() => {
    if (currentCategory) {
      reset(defaultValues);
    }
  }, [currentCategory, defaultValues, reset]);

  const { data: categories, isSuccess: categoriesIsSuccess } = useCategoriesQuery({
    order: 'asc',
    filters: { parent_id: { op: FilterOperatorsEnum.IS_EMPTY, value: 0 } },
  });

  const { mutateAsync: createCategory } = useCreateCategoryMutation();
  const { mutateAsync: updateCategory } = useUpdateCategoryMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentCategory) {
        await updateCategory({
          category: {
            title: data.title!,
            parent_id: data.parent_id || 0,
            icon_url: data.icon_url!,
            accepted_file_type: data.accepted_file_type || '',
            url: data.url!,
            ar_placement: data.ar_placement!,
          },
          ID: currentCategory.ID,
        });
        enqueueSnackbar(t('category_management.successful_updated'), {
          variant: 'success',
        });
        router.push(paths.dashboard.category_management.root);
      } else {
        await createCategory({
          title: data.title,
          parent_id: data.parent_id || null,
          icon_url: data.icon_url,
          accepted_file_type: data.accepted_file_type,
          url: data.url!,
          ar_placement: data.ar_placement!,
        });
        enqueueSnackbar(t('category_management.successful_created'), { variant: 'success' });
        router.push(paths.dashboard.category_management.root);
      }
    } catch (error) {
      setError('root', {
        message: error.message || 'ایجاد دسته بندی جدید با مشکل مواجه شد',
      });
      setErrors(error.data, setError);
    }
  });

  const disabled = watch('title') === '';

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <NewFormCard
        disable={disabled}
        title={
          currentCategory
            ? `${t('category_management.edit')} ${t(`category.${currentCategory.title}`)}`
            : t('category_management.new_category')
        }
        loading={isSubmitting}
      >
        {errors.root && <Alert severity="error">{errors.root?.message}</Alert>}

        <Divider sx={{ my: 2 }} />
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
            <RHFTextField name="title" label={t('category_management.title')} />
            {categoriesIsSuccess && (
              <RHFSelect name="parent_id" label={t('category_management.categories')}>
                <MenuItem value="">{t('category_management.none')}</MenuItem>
                {categories?.data.items.map((option) => (
                  <MenuItem key={option.ID} value={option.ID}>
                    {t(`category.${option.title}`)}
                  </MenuItem>
                ))}
              </RHFSelect>
            )}
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
            <RHFTextField name="icon_url" label={t('category_management.icon_url')} />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
            <RHFTextField
              name="accepted_file_type"
              label={t('category_management.accepted_file_types')}
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
            <RHFTextField name="url" label={t('category_management.url')} />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
            <RHFTextField name="ar_placement" label={t('category_management.ar_placement')} />
          </Stack>
        </Stack>
      </NewFormCard>
    </FormProvider>
  );
}
