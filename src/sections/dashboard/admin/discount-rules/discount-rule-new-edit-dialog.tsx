// src/sections/dashboard/admin/discount-rules/discount-rule-new-edit-dialog.tsx

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
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
// locales
import { useLocales } from 'src/locales';
// hooks
import { useSnackbar } from 'src/components/snackbar';
// req-hooks
import { useCreateDiscountRuleMutation } from 'src/_req-hooks/reality/admin/useCreateDiscountRuleMutation';
import { useUpdateDiscountRuleMutation } from 'src/_req-hooks/reality/admin/useUpdateDiscountRuleMutation';
// types
import { DiscountRuleData } from 'src/_types/reality/admin/discountRules';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField, RHFSwitch } from 'src/components/hook-form';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentRule?: DiscountRuleData | null;
};

export default function DiscountRuleNewEditDialog({ open, onClose, currentRule }: Props) {
  const { t } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const isEdit = !!currentRule;

  // API hooks
  const { mutateAsync: createRule, isLoading: createLoading } = useCreateDiscountRuleMutation();
  const { mutateAsync: updateRule, isLoading: updateLoading } = useUpdateDiscountRuleMutation();

  const NewRuleSchema = Yup.object().shape({
    name: Yup.string().required(t('admin.rule_name_required')),
    min_months: Yup.number()
      .min(1, t('admin.min_months_must_be_positive'))
      .max(24, t('admin.min_months_max_24'))
      .required(t('admin.min_months_required')),
    min_products: Yup.number()
      .min(1, t('admin.min_products_must_be_positive'))
      .max(1000, t('admin.min_products_max_1000'))
      .required(t('admin.min_products_required')),
    min_features: Yup.number()
      .min(0, t('admin.min_features_must_be_positive'))
      .max(20, t('admin.min_features_max_20'))
      .required(t('admin.min_features_required')),
    discount_percentage: Yup.number()
      .min(1, t('admin.discount_percentage_min_1'))
      .max(99, t('admin.discount_percentage_max_99'))
      .required(t('admin.discount_percentage_required')),
    is_active: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentRule?.name || '',
      min_months: currentRule?.min_months || 1,
      min_products: currentRule?.min_products || 1,
      min_features: currentRule?.min_features || 0,
      discount_percentage: currentRule?.discount_percentage || 1,
      is_active: currentRule?.is_active ?? true,
    }),
    [currentRule]
  );

  const methods = useForm({
    resolver: yupResolver(NewRuleSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const watchedValues = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (isEdit && currentRule) {
        await updateRule({
          id: currentRule.id,
          data: {
            name: data.name,
            min_months: data.min_months,
            min_products: data.min_products,
            min_features: data.min_features,
            discount_percentage: data.discount_percentage,
            is_active: data.is_active ?? true,
          },
        });
        enqueueSnackbar(t('admin.rule_updated_successfully'), { variant: 'success' });
      } else {
        await createRule({
          name: data.name,
          min_months: data.min_months,
          min_products: data.min_products,
          min_features: data.min_features,
          discount_percentage: data.discount_percentage,
          is_active: data.is_active ?? true,
        });
        enqueueSnackbar(t('admin.rule_created_successfully'), { variant: 'success' });
      }
      reset();
      onClose();
    } catch (error) {
      enqueueSnackbar(error?.message || t('admin.operation_failed'), { variant: 'error' });
    }
  });

  useEffect(() => {
    if (currentRule) {
      reset(defaultValues);
    }
  }, [currentRule, defaultValues, reset]);

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
            <Iconify icon={isEdit ? 'solar:pen-bold' : 'solar:percent-bold'} width={24} />
            {isEdit ? t('admin.edit_discount_rule') : t('admin.new_discount_rule')}
          </Stack>
        </DialogTitle>

        <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              {/* Rule Name */}
              <RHFTextField
                name="name"
                label={t('admin.rule_name')}
                placeholder={t('admin.rule_name_placeholder')}
              />

              {/* Conditions */}
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  {t('admin.discount_conditions')}
                </Typography>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(3, 1fr)',
                  }}
                >
                  <RHFTextField
                    name="min_months"
                    label={t('admin.minimum_months')}
                    placeholder="1"
                    type="number"
                    InputProps={{
                      endAdornment: t('admin.months'),
                    }}
                    helperText={t('admin.min_months_helper')}
                  />

                  <RHFTextField
                    name="min_products"
                    label={t('admin.minimum_products')}
                    placeholder="1"
                    type="number"
                    InputProps={{
                      endAdornment: t('admin.products'),
                    }}
                    helperText={t('admin.min_products_helper')}
                  />

                  <RHFTextField
                    name="min_features"
                    label={t('admin.minimum_features')}
                    placeholder="0"
                    type="number"
                    InputProps={{
                      endAdornment: t('admin.features'),
                    }}
                    helperText={t('admin.min_features_helper')}
                  />
                </Box>
              </Box>

              {/* Discount Percentage */}
              <RHFTextField
                name="discount_percentage"
                label={t('admin.discount_percentage')}
                placeholder="10"
                type="number"
                InputProps={{
                  endAdornment: '%',
                }}
                helperText={t('admin.discount_percentage_helper')}
              />

              {/* Preview */}
              <Box
                sx={{
                  p: 2,
                  borderRadius: 1,
                  bgcolor: 'grey.50',
                  border: '1px solid',
                  borderColor: 'grey.300',
                }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  {t('admin.rule_preview')}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Chip
                    label={`${watchedValues.min_months || 0}+ ${t('admin.months')}`}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    label={`${watchedValues.min_products || 0}+ ${t('admin.products')}`}
                    size="small"
                    color="secondary"
                  />
                  <Chip
                    label={`${watchedValues.min_features || 0}+ ${t('admin.features')}`}
                    size="small"
                    color="info"
                  />
                  <Chip
                    label={`${watchedValues.discount_percentage || 0}% ${t('admin.discount')}`}
                    size="small"
                    color="success"
                  />
                </Stack>
              </Box>

              {/* Active Status */}
              <RHFSwitch
                name="is_active"
                label={t('admin.rule_active')}
                helperText={t('admin.rule_active_helper')}
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
