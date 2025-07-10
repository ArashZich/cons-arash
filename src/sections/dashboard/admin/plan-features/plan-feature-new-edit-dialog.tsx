// src/sections/dashboard/admin/plan-features/plan-feature-new-edit-dialog.tsx

import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
// react-hook-form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
// locales
import { useLocales } from 'src/locales';
// hooks
import { useSnackbar } from 'src/components/snackbar';
// req-hooks
import { useCreatePlanFeatureMutation } from 'src/_req-hooks/reality/admin/useCreatePlanFeatureMutation';
import { useUpdatePlanFeatureMutation } from 'src/_req-hooks/reality/admin/useUpdatePlanFeatureMutation';
import { useCategoriesQuery } from 'src/_req-hooks/reality/category/useCategoriesQuery';
// types
import { PlanFeatureData } from 'src/_types/reality/admin/planFeatures';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFSelect, RHFTextField, RHFMultiSelect } from 'src/components/hook-form';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentFeature?: PlanFeatureData | null;
};

export default function PlanFeatureNewEditDialog({ open, onClose, currentFeature }: Props) {
  const { t } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const isEdit = !!currentFeature;

  // API hooks
  const { mutateAsync: createFeature, isLoading: createLoading } = useCreatePlanFeatureMutation();
  const { mutateAsync: updateFeature, isLoading: updateLoading } = useUpdatePlanFeatureMutation();
  const { data: categoriesData } = useCategoriesQuery({
    per_page: 1000,
  });

  const NewFeatureSchema = Yup.object().shape({
    name: Yup.string().required(t('admin.feature_name_required')),
    title: Yup.string().required(t('admin.feature_title_required')),
    description: Yup.string().required(t('admin.feature_description_required')),
    pricing_type: Yup.string().required(t('admin.pricing_type_required')),
    price: Yup.number()
      .min(0, t('admin.price_must_be_positive'))
      .required(t('admin.price_required')),
    category_ids: Yup.array()
      .of(Yup.number())
      .min(1, t('admin.select_at_least_one_category'))
      .required(t('admin.categories_required')),
    is_active: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentFeature?.name || '',
      title: currentFeature?.title || '',
      description: currentFeature?.description || '',
      pricing_type: currentFeature?.pricing_type || 'fixed',
      price: currentFeature?.price || 0,
      category_ids: currentFeature?.category_ids || [],
      is_active: currentFeature?.is_active ?? true,
    }),
    [currentFeature]
  );

  const methods = useForm({
    resolver: yupResolver(NewFeatureSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (isEdit && currentFeature) {
        await updateFeature({
          id: currentFeature.ID,
          data: {
            name: data.name,
            title: data.title,
            description: data.description,
            pricing_type: data.pricing_type as 'fixed' | 'per_month' | 'per_product',
            price: data.price,
            category_ids: data.category_ids.filter((id): id is number => id !== undefined),
            is_active: data.is_active ?? true,
          },
        });
        enqueueSnackbar(t('admin.feature_updated_successfully'), { variant: 'success' });
      } else {
        await createFeature({
          name: data.name,
          title: data.title,
          description: data.description,
          pricing_type: data.pricing_type as 'fixed' | 'per_month' | 'per_product',
          price: data.price,
          category_ids: data.category_ids.filter((id): id is number => id !== undefined),
          is_active: data.is_active ?? true,
        });
        enqueueSnackbar(t('admin.feature_created_successfully'), { variant: 'success' });
      }
      reset();
      onClose();
    } catch (error) {
      enqueueSnackbar(error?.message || t('admin.operation_failed'), { variant: 'error' });
    }
  });

  const categoryOptions =
    categoriesData?.data?.items?.map((category) => ({
      label: category.title,
      value: category.ID.toString(),
    })) || [];

  const pricingTypeOptions = [
    { label: t('admin.pricing_type_fixed'), value: 'fixed' },
    { label: t('admin.pricing_type_per_month'), value: 'per_month' },
    { label: t('admin.pricing_type_per_product'), value: 'per_product' },
  ];

  useEffect(() => {
    if (currentFeature) {
      reset(defaultValues);
    }
  }, [currentFeature, defaultValues, reset]);

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxHeight: '90vh' },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon={isEdit ? 'solar:pen-bold' : 'mingcute:add-line'} width={24} />
            {isEdit ? t('admin.edit_feature') : t('admin.new_feature')}
          </Stack>
        </DialogTitle>

        <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField
                name="name"
                label={t('admin.feature_name')}
                placeholder={t('admin.feature_name_placeholder')}
              />

              <RHFTextField
                name="title"
                label={t('admin.feature_title')}
                placeholder={t('admin.feature_title_placeholder')}
              />

              <Box sx={{ gridColumn: '1 / -1' }}>
                <RHFTextField
                  name="description"
                  label={t('admin.feature_description')}
                  placeholder={t('admin.feature_description_placeholder')}
                  multiline
                  rows={3}
                />
              </Box>

              <RHFSelect
                name="pricing_type"
                label={t('admin.pricing_type')}
                placeholder={t('admin.select_pricing_type')}
              >
                {pricingTypeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFTextField
                name="price"
                label={t('admin.price')}
                placeholder="0"
                type="number"
                InputProps={{
                  startAdornment: t('admin.currency_symbol'),
                }}
              />

              <Box sx={{ gridColumn: '1 / -1' }}>
                <RHFMultiSelect
                  name="category_ids"
                  label={t('admin.categories')}
                  options={categoryOptions}
                  placeholder={t('admin.select_categories')}
                />
              </Box>

              <Box sx={{ gridColumn: '1 / -1' }}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label={t('admin.feature_active')}
                  sx={{ mt: 1 }}
                />
              </Box>
            </Box>
          </Card>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            {t('admin.cancel')}
          </Button>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting || createLoading || updateLoading}
            startIcon={<Iconify icon="solar:check-bold" />}
          >
            {isEdit ? t('admin.update') : t('admin.create')}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
