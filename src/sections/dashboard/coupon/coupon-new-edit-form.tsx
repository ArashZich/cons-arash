// @hookform/resolvers
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
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
import { RHFSelect, RHFTextField } from 'src/components/hook-form';

// _types
import { CouponData } from 'src/_types/reality/coupon/couponData';
import { CreateCouponRequestBodyType } from 'src/_types/reality/coupon/createCoupon';
// req-hooks
import { useCreateCouponMutation } from 'src/_req-hooks/reality/coupon/useCreateCouponMutation';
import { useUpdateCouponMutation } from 'src/_req-hooks/reality/coupon/useUpdateCouponMutation';
import { usePlansQuery } from 'src/_req-hooks/reality/plan/usePlansQuery';

// i18n
import { useLocales } from 'src/locales';
// utils
import { formatDateToISO, formatDateForInput } from 'src/utils/format-time';

type CreateCouponRequestBodySchema = {
  [K in keyof CreateCouponRequestBodyType]: Yup.AnySchema;
};

type CouponNewFormProps = {
  currentCoupon?: CouponData;
};

export default function CouponNewEditForm({ currentCoupon }: CouponNewFormProps) {
  const { t } = useLocales();

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const NewCouponSchema = Yup.object().shape<CreateCouponRequestBodySchema>({
    code: Yup.string()
      .min(6, t('coupon.code_min_length'))
      .required(t('coupon.code_required'))
      .label(t('coupon.code')),
    description: Yup.string()
      .required(t('coupon.description_required'))
      .label(t('coupon.description')),
    discount_type: Yup.string()
      .required(t('coupon.discount_type_required'))
      .label(t('coupon.discount_type')),
    status: Yup.string().required(t('coupon.status_required')).label(t('coupon.status')),
    discounting_amount: Yup.number()
      .required(t('coupon.discounting_amount_required'))
      .label(t('coupon.discounting_amount')),
    usage_limit: Yup.number()
      .required(t('coupon.usage_limit_required'))
      .label(t('coupon.usage_limit')),
    maximum_discount_amount: Yup.number()
      .required(t('coupon.maximum_discount_amount_required'))
      .label(t('coupon.maximum_discount_amount')),
    plan_id: Yup.mixed()
      .transform((value) => (value === '' ? null : Number(value)))
      .nullable()
      .label(t('coupon.plan_id')),
    expire_date: Yup.date()
      .required(t('coupon.expire_date_required'))
      .label(t('coupon.expire_date')),
  });

  const defaultValues: CreateCouponRequestBodyType = useMemo(
    () => ({
      code: currentCoupon?.code || '',
      description: currentCoupon?.description || '',
      discount_type: currentCoupon?.discount_type || '',
      status: currentCoupon?.status || '',
      discounting_amount: currentCoupon?.discounting_amount || 0,
      usage_limit: currentCoupon?.usage_limit || 0,
      maximum_discount_amount: currentCoupon?.maximum_discount_amount || 0,
      plan_id: currentCoupon?.plan_id ?? '', // از '' به جای null استفاده می‌کنیم
      expire_date: currentCoupon?.expire_date
        ? formatDateForInput(currentCoupon.expire_date)
        : formatDateForInput(new Date().toISOString()),
    }),
    [currentCoupon]
  );

  const methods = useForm<CreateCouponRequestBodyType>({
    resolver: yupResolver(NewCouponSchema) as any,
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (currentCoupon) {
      reset(defaultValues);
    }
  }, [currentCoupon, defaultValues, reset]);

  const { data: plansData } = usePlansQuery({ per_page: 40 });

  const { mutateAsync: createCoupon } = useCreateCouponMutation();
  const { mutateAsync: updateCoupon } = useUpdateCouponMutation();

  const onSubmit = handleSubmit(async (values) => {
    try {
      const formattedValues = {
        ...values,
        expire_date: formatDateToISO(new Date(values.expire_date)),
        plan_id: values.plan_id === '' ? null : Number(values.plan_id),
      };

      if (currentCoupon) {
        await updateCoupon({
          data: formattedValues,
          ID: currentCoupon.ID,
        });
        enqueueSnackbar(t('coupon.update_success'), {
          variant: 'success',
        });
      } else {
        await createCoupon(formattedValues);
        enqueueSnackbar(t('coupon.create_success'), { variant: 'success' });
      }
      router.push(paths.dashboard.coupon.root);
    } catch (error) {
      setError('root', { message: error.message });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <NewFormCard
        title={
          currentCoupon
            ? `${t('coupon.edit_coupon')} ${currentCoupon.code} `
            : t('coupon.new_coupon')
        }
      >
        {errors.root && <Alert severity="error">{errors.root?.message}</Alert>}

        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
            <RHFTextField name="code" label={t('coupon.code')} />
            <RHFSelect name="discount_type" label={t('coupon.discount_type')}>
              <MenuItem value="percent">{t('coupon.percent')}</MenuItem>
              <MenuItem value="fixed_amount">{t('coupon.fixed_amount')}</MenuItem>
            </RHFSelect>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
            <RHFTextField
              name="discounting_amount"
              label={t('coupon.discounting_amount')}
              type="number"
            />
            <RHFTextField
              name="maximum_discount_amount"
              label={t('coupon.maximum_discount_amount')}
              type="number"
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
            <RHFTextField name="usage_limit" label={t('coupon.usage_limit')} type="number" />
            <RHFSelect name="plan_id" label={t('coupon.plan_id')}>
              <MenuItem value="">{t('coupon.all_plans')}</MenuItem>
              {plansData?.data.items.map((plan) => (
                <MenuItem key={plan.ID} value={plan.ID.toString()}>
                  {`${t(`category.${plan.categories[0]?.title}`)} - ${t(`plan.${plan.title}`)} - ${
                    plan.day_length
                  }`}
                </MenuItem>
              ))}
            </RHFSelect>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
            <RHFTextField
              name="expire_date"
              label={t('coupon.expire_date')}
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <RHFSelect name="status" label={t('coupon.status')}>
              <MenuItem value="publish">{t('coupon.publish')}</MenuItem>
              <MenuItem value="draft">{t('coupon.draft')}</MenuItem>
              <MenuItem value="pending">{t('coupon.pending')}</MenuItem>
              <MenuItem value="trash">{t('coupon.trash')}</MenuItem>
            </RHFSelect>
          </Stack>

          <RHFTextField name="description" label={t('coupon.description')} multiline rows={3} />
        </Stack>
      </NewFormCard>
    </FormProvider>
  );
}
