// @hookform/resolvers
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
// react
import React, { useEffect, useMemo } from 'react';
// react-hook-form
import { useForm } from 'react-hook-form';
// yup
import * as Yup from 'yup';
// routes
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
// components
import { useSnackbar } from 'src/components/snackbar';
import NewFormCard from 'src/components/form-card/new-form-card';
// hook-form
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFAutocomplete, RHFSelect, RHFTextField } from 'src/components/hook-form';

// _types
import { PlanData } from 'src/_types/reality/plan/planData';
import { CreatePlanRequestBodyType } from 'src/_types/reality/plan/createPlan';
import { FilterOperatorsEnum } from 'src/_types/site/filters';
// req-hooks
import { useCreatePlanMutation } from 'src/_req-hooks/reality/plan/useCreatePlanMutation';
import { useUpdatePlanMutation } from 'src/_req-hooks/reality/plan/useUpdatePlanMutation';
import { useCategoriesQuery } from 'src/_req-hooks/reality/category/useCategoriesQuery';
// i18n
import { useLocales } from 'src/locales';
// utils
import { transformDataParent } from 'src/utils/transform-data';
// constants
import { data_length } from 'src/constants/plans';

type CreateCategoryRequestBodySchema = {
  [K in keyof CreatePlanRequestBodyType]: Yup.AnySchema;
};

type PlanNewFormProps = {
  currentPlan?: PlanData;
};

export default function PlanNewEditForm({ currentPlan }: PlanNewFormProps) {
  const { t } = useLocales();

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const NewPlanSchema = Yup.object().shape<CreateCategoryRequestBodySchema>({
    title: Yup.string().min(2).max(200).required().label(t('plan_management.title')),
    description: Yup.string().min(2).max(200).required().label(t('plan_management.description')),
    price: Yup.number().required().label(t('plan_management.price_toman')),
    discounted_price: Yup.number().required().label(t('plan_management.discounted_price')),
    categories: Yup.array().label(t('plan_management.category_id')),
    day_length: Yup.number().required().label(t('plan_management.day_length')),
    product_limit: Yup.number().required().label(t('plan_management.product_limit')),
    storage_limit_mb: Yup.number().required().label(t('plan_management.storage_limit_mb')),
    icon_url: Yup.string().label(t('plan_management.icon_url')),
  });

  const defaultValues: any = useMemo(
    () => ({
      title: currentPlan?.title || '',
      description: currentPlan?.description || '',
      price: currentPlan?.price || 0,
      discounted_price: currentPlan?.discounted_price || 0,
      categories: currentPlan?.categories.map((item) => item.ID) || [],
      day_length: currentPlan?.day_length || 90,
      product_limit: currentPlan?.product_limit || 0,
      storage_limit_mb: currentPlan?.storage_limit_mb || 0,
      icon_url:
        currentPlan?.icon_url ||
        `${process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL_DOWNLOAD}53818d21-e919-4a56-8bf3-385bf422b02e-@carpet.svg`,
    }),
    [
      currentPlan?.categories,
      currentPlan?.day_length,
      currentPlan?.description,
      currentPlan?.discounted_price,
      currentPlan?.icon_url,
      currentPlan?.price,
      currentPlan?.product_limit,
      currentPlan?.storage_limit_mb,
      currentPlan?.title,
    ]
  );

  const methods = useForm<CreatePlanRequestBodyType>({
    resolver: yupResolver(NewPlanSchema) as any,
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (currentPlan) {
      reset(defaultValues);
    }
  }, [currentPlan, defaultValues, reset]);

  const { data: mainCategory, isSuccess: categorySuccess } = useCategoriesQuery({
    order: 'asc',
    filters: { parent_id: { op: FilterOperatorsEnum.IS_EMPTY, value: 0 } },
  });

  const { mutateAsync: createPlan } = useCreatePlanMutation();
  const { mutateAsync: updatePlan } = useUpdatePlanMutation();

  const onSubmit = handleSubmit(async (values) => {
    try {
      if (currentPlan) {
        await updatePlan({
          data: values,
          ID: currentPlan.ID,
        });
        enqueueSnackbar(t('plan_management.update_success'), {
          variant: 'success',
        });
        router.push(paths.dashboard.plan_management.root);
      } else {
        await createPlan(values);
        enqueueSnackbar(t('plan_management.create_success'), { variant: 'success' });
        router.push(paths.dashboard.plan_management.root);
      }
    } catch (error) {
      setError('root', { message: error.message });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <NewFormCard
        title={
          currentPlan
            ? `${t('plan_management.edit_plan')} ${currentPlan.title} `
            : t('plan_management.new_plan')
        }
      >
        {errors.root && <Alert severity="error">{errors.root?.message}</Alert>}

        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
            <RHFTextField name="title" label={t('plan_management.title')} />
            {categorySuccess && (
              <RHFAutocomplete
                fullWidth
                multiple
                name="categories"
                options={transformDataParent(mainCategory).map((option) => option.value) || []}
                getOptionLabel={(option) =>
                  typeof option === 'string'
                    ? t(`category.${option}`)
                    : t(`category.${option}`) || ''
                }
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
                label={t('plan_management.categories')}
                renderTags={(selected, getTagProps) =>
                  selected.map((selectedId, index) => {
                    const selectedOption = transformDataParent(mainCategory).find(
                      (option) => option.value === selectedId
                    );

                    return (
                      <Chip
                        {...getTagProps({ index })}
                        key={selectedId}
                        label={selectedOption ? t(`category.${selectedOption.label}`) : ''}
                        size="small"
                        color="primary"
                        variant="soft"
                      />
                    );
                  })
                }
              />
            )}
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
            <RHFTextField name="price" label={t('plan_management.price')} />
            <RHFSelect name="day_length" label={t('plan_management.day_length')}>
              {data_length.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {t(`organization.${option.label}`)}
                </MenuItem>
              ))}
            </RHFSelect>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
            <RHFTextField name="product_limit" label={t('plan_management.product_limit')} />
            <RHFTextField name="storage_limit_mb" label={t('plan_management.storage_limit_mb')} />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
            <RHFTextField name="discounted_price" label={t('plan_management.discounted_price')} />
          </Stack>
          <RHFTextField name="description" label={t('plan_management.description')} />
        </Stack>
      </NewFormCard>
    </FormProvider>
  );
}
