// src/sections/dashboard/admin/category-pricing/category-pricing-new-edit-dialog.tsx

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
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
// locales
import { useLocales } from 'src/locales';
// hooks
import { useSnackbar } from 'src/components/snackbar';
// req-hooks
import { useCreateCategoryPricingMutation } from 'src/_req-hooks/reality/admin/useCreateCategoryPricingMutation';
import { useCategoriesQuery } from 'src/_req-hooks/reality/category/useCategoriesQuery';
// types
import { CategoryPricingData } from 'src/_types/reality/admin/categoryPricing';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentPricing?: CategoryPricingData | null;
};

export default function CategoryPricingNewEditDialog({ open, onClose, currentPricing }: Props) {
  const { t } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const isEdit = !!currentPricing;

  // API hooks
  const { mutateAsync: createPricing, isLoading: createLoading } =
    useCreateCategoryPricingMutation();
  const { data: categoriesData } = useCategoriesQuery({
    per_page: 1000,
  });

  const NewPricingSchema = Yup.object().shape({
    category_id: Yup.number().required(t('admin.category_required')),
    price_per_product_per_month: Yup.number()
      .min(0, t('admin.price_must_be_positive'))
      .required(t('admin.price_required')),
  });

  const defaultValues = useMemo(
    () => ({
      category_id: currentPricing?.category_id || 0,
      price_per_product_per_month: currentPricing?.price_per_product_per_month || 0,
    }),
    [currentPricing]
  );

  const methods = useForm({
    resolver: yupResolver(NewPricingSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const watchedCategoryId = watch('category_id');

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createPricing({
        category_id: data.category_id,
        price_per_product_per_month: data.price_per_product_per_month,
      });

      enqueueSnackbar(
        isEdit ? t('admin.pricing_updated_successfully') : t('admin.pricing_created_successfully'),
        { variant: 'success' }
      );
      reset();
      onClose();
    } catch (error) {
      enqueueSnackbar(error?.message || t('admin.operation_failed'), { variant: 'error' });
    }
  });

  // Filter out categories that already have pricing (except current one in edit mode)
  const availableCategories =
    categoriesData?.data?.items?.filter((category) => {
      if (isEdit && currentPricing) {
        return category.ID === currentPricing.category_id;
      }
      return true; // In create mode, show all categories (API will handle duplicates)
    }) || [];

  const selectedCategory = availableCategories.find((cat) => cat.ID === watchedCategoryId);

  useEffect(() => {
    if (currentPricing) {
      reset(defaultValues);
    }
  }, [currentPricing, defaultValues, reset]);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxHeight: '90vh' },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon={isEdit ? 'solar:pen-bold' : 'solar:settings-bold'} width={24} />
            {isEdit ? t('admin.edit_category_pricing') : t('admin.set_category_pricing')}
          </Stack>
        </DialogTitle>

        <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              {/* Category Selection */}
              <RHFSelect
                name="category_id"
                label={t('admin.category')}
                placeholder={t('admin.select_category')}
                disabled={isEdit} // Disable in edit mode
              >
                {availableCategories.map((category) => (
                  <MenuItem key={category.ID} value={category.ID}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar
                        src={category.icon_url}
                        alt={category.title}
                        sx={{ width: 32, height: 32 }}
                      >
                        {category.title.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="body2">{category.title}</Typography>
                    </Stack>
                  </MenuItem>
                ))}
              </RHFSelect>

              {/* Selected Category Preview */}
              {selectedCategory && (
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    bgcolor: 'grey.50',
                    border: '1px solid',
                    borderColor: 'grey.300',
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                      src={selectedCategory.icon_url}
                      alt={selectedCategory.title}
                      sx={{ width: 48, height: 48 }}
                    >
                      {selectedCategory.title.charAt(0).toUpperCase()}
                    </Avatar>
                    <Stack>
                      <Typography variant="subtitle2">{selectedCategory.title}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {t('admin.category_id')}: {selectedCategory.ID}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              )}

              {/* Price Input */}
              <RHFTextField
                name="price_per_product_per_month"
                label={t('admin.price_per_product_per_month')}
                placeholder="0"
                type="number"
                InputProps={{
                  startAdornment: t('admin.currency_symbol'),
                  endAdornment: t('admin.per_product_per_month_unit'),
                }}
                helperText={t('admin.price_per_product_per_month_helper')}
              />
            </Stack>
          </Card>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            {t('admin.cancel')}
          </Button>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting || createLoading}
            startIcon={<Iconify icon="solar:check-bold" />}
            disabled={!watchedCategoryId}
          >
            {isEdit ? t('admin.update') : t('admin.set_pricing')}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
