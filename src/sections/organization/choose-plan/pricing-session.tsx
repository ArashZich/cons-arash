// src/sections/organization/choose-plan/pricing-session.tsx

import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { isEmpty } from 'lodash';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useSnackbar } from 'src/components/snackbar';
import { useAuthContext } from 'src/auth/hooks';
import { useLocales } from 'src/locales';
import { NewPlanData } from 'src/_types/sections/organization/choose-plan';
import { useSelector } from 'src/redux/store';
import { organizationSelector } from 'src/redux/slices/organization';
import { useBuyPackageMutation } from 'src/_req-hooks/reality/package/useBuyPackageMutation';
import { useBuyDynamicMutation } from 'src/_req-hooks/reality/package/useBuyDynamicMutation';
import { useCreatePackageMutation } from 'src/_req-hooks/reality/package/useCreatePackageMutation';
import { useAddAffiliateCodeUserMutation } from 'src/_req-hooks/reality/user/useAddAffiliateCodeUserMutation';
import { CalculatePriceResponseType } from 'src/_types/reality/package/calculatePrice';
import { data_length } from 'src/constants';
import PricingCard from './pricing-card';
import EnterpriseCard from './enterprise-card';
import DynamicPlanCard from './dynamic-plan-card';
import PaymentDialog from './payment-dialog';
import DynamicPaymentDialog from './dynamic-payment-dialog';

interface PricingSessionProps {
  data: NewPlanData[];
  categoryId: string;
  discountCode: string;
  discountAmount: number;
  maximumDiscountAmount: number;
  onVoucherChange: (code: string) => void;
  onDaysChange: (days: number) => void;
  onApplyCoupon: () => void;
  currentDays: number;
}

interface SelectedPlanWithDiscount extends NewPlanData {
  discountedPrice: number;
  effectiveDiscount: number;
  taxAmount: number;
  finalPrice: number;
}

interface DynamicPlanParams {
  months: number;
  product_count: number;
  feature_ids: number[];
  pricing?: CalculatePriceResponseType['data'];
}

type PlanType = 'static' | 'dynamic';

const TAX_RATE = 0.1; // 10% tax rate

export default function PricingSession({
  data,
  categoryId,
  discountCode,
  discountAmount,
  maximumDiscountAmount,
  onVoucherChange,
  onDaysChange,
  onApplyCoupon,
  currentDays,
}: PricingSessionProps) {
  const { t } = useLocales();
  const organization = useSelector(organizationSelector);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { user } = useAuthContext();
  const isSuperAdmin = user?.roles.some((role) => role.title === 'SuperAdmin');

  // Plan type state
  const [planType, setPlanType] = useState<PlanType>('static');
  const [voucherInput, setVoucherInput] = useState(discountCode);

  // Static plan states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlanWithDiscount | null>(null);

  // Dynamic plan states
  const [dynamicDialogOpen, setDynamicDialogOpen] = useState(false);
  const [dynamicPlanParams, setDynamicPlanParams] = useState<DynamicPlanParams | null>(null);

  const excludedCategoryIDs = [5, 12, 25];

  const filterData = data?.filter((item) => {
    if (
      organization?.category_id !== undefined &&
      excludedCategoryIDs.includes(organization.category_id) &&
      item.title === 'premium'
    ) {
      return false;
    }
    return true;
  });

  const { mutateAsync: createPackage } = useCreatePackageMutation();
  const { mutateAsync: buyPackage, isLoading: buyPackageLoading } = useBuyPackageMutation();
  const { mutateAsync: buyDynamic, isLoading: buyDynamicLoading } = useBuyDynamicMutation();
  const { mutateAsync: addAffiliateCode } = useAddAffiliateCodeUserMutation();

  // Update voucher input when prop changes
  useEffect(() => {
    setVoucherInput(discountCode);
  }, [discountCode]);

  // Plan type handlers
  const handlePlanTypeChange = (type: PlanType) => {
    setPlanType(type);
  };

  // Voucher handlers
  const handleVoucherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVoucherInput(e.target.value);
    onVoucherChange(e.target.value);
  };

  const handleApplyVoucher = () => {
    onApplyCoupon();
  };

  // Days handlers
  const handleDaysChange = (days: number) => {
    onDaysChange(days);
  };

  // Static plan handlers
  const handleClick = (plan: NewPlanData) => {
    const basePrice =
      plan.discounted_price && plan.discounted_price < plan.price
        ? plan.discounted_price
        : plan.price;

    const discountValue = (basePrice * discountAmount) / 100;
    const effectiveDiscount = Math.min(discountValue, maximumDiscountAmount);
    const finalDiscountedPrice = basePrice - effectiveDiscount;

    const taxAmount = Math.round(finalDiscountedPrice * TAX_RATE);
    const finalPrice = finalDiscountedPrice + taxAmount;

    const totalDiscount = plan.price - finalDiscountedPrice;

    setSelectedPlan({
      ...plan,
      discountedPrice: finalDiscountedPrice,
      effectiveDiscount: totalDiscount,
      taxAmount,
      finalPrice,
    });
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedPlan(null);
  };

  const handlePay = async () => {
    if (!selectedPlan) return;

    try {
      if (isSuperAdmin) {
        await createPackage({
          organization_id: organization?.ID || 0,
          plan_id: selectedPlan.ID,
        });
        window.location.href = '/dashboard';
      } else {
        const { data: url } = await buyPackage({
          organization_id: organization?.ID || 0,
          plan_id: selectedPlan.ID,
          coupon_code: discountCode || '',
        });
        if (discountCode) {
          await addAffiliateCode({
            affiliate_code: discountCode,
            id: user?.ID || 0,
          });
        }

        router.push(url);
      }
    } catch (e) {
      enqueueSnackbar(e?.message, { variant: 'error' });
    }
    handleDialogClose();
  };

  // Dynamic plan handlers
  const handleDynamicBuy = (params: DynamicPlanParams) => {
    setDynamicPlanParams(params);
    setDynamicDialogOpen(true);
  };

  const handleDynamicDialogClose = () => {
    setDynamicDialogOpen(false);
    setDynamicPlanParams(null);
  };

  const handleDynamicPay = async () => {
    if (!dynamicPlanParams) return;

    try {
      const { data: url } = await buyDynamic({
        category_id: parseInt(categoryId, 10),
        months: dynamicPlanParams.months,
        product_count: dynamicPlanParams.product_count,
        feature_ids: dynamicPlanParams.feature_ids,
        organization_id: organization?.ID || 0,
        coupon_code: discountCode || '',
      });

      if (discountCode) {
        await addAffiliateCode({
          affiliate_code: discountCode,
          id: user?.ID || 0,
        });
      }

      router.push(url);
    } catch (e) {
      enqueueSnackbar(e?.message, { variant: 'error', autoHideDuration: 5000 });
    }
    handleDynamicDialogClose();
  };

  const handleContactUs = () => {
    router.push(paths.contact);
  };

  // Render plan type selector
  const renderPlanTypeSelector = (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mb: 3 }}>
      <Chip
        label={t('organization.static_plans')}
        variant={planType === 'static' ? 'filled' : 'outlined'}
        onClick={() => handlePlanTypeChange('static')}
        color="secondary"
        sx={{ px: 2, py: 1 }}
      />
      <Chip
        label={t('organization.dynamic_plan')}
        variant={planType === 'dynamic' ? 'filled' : 'outlined'}
        onClick={() => handlePlanTypeChange('dynamic')}
        color="secondary"
        sx={{ px: 2, py: 1 }}
      />
    </Stack>
  );

  // Render static plan controls (days selector and voucher code)
  const renderStaticPlanControls = planType === 'static' && (
    <Stack spacing={3} sx={{ mb: 4 }}>
      {/* Days Selector */}
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
        {data_length.map((item, ind) => (
          <Chip
            key={ind}
            label={t(`organization.${item.label}`)}
            variant={currentDays === item.value ? 'filled' : 'outlined'}
            onClick={() => handleDaysChange(item.value)}
          />
        ))}
      </Stack>

      {/* Voucher Code */}
      <Stack direction="row" justifyContent="center" spacing={1}>
        <TextField
          variant="outlined"
          placeholder={t('organization.voucher_code')}
          size="medium"
          onChange={handleVoucherInputChange}
          value={voucherInput}
        />
        <Button
          variant="contained"
          disabled={isEmpty(voucherInput)}
          size="medium"
          onClick={handleApplyVoucher}
        >
          {t('organization.apply')}
        </Button>
      </Stack>
    </Stack>
  );

  return (
    <Stack spacing={3} width={{ md: 1152 }} sx={{ mt: 3 }}>
      {renderPlanTypeSelector}
      {renderStaticPlanControls}

      <Grid container spacing={4} justifyContent="center">
        {/* Dynamic Plan Card - only show when dynamic is selected */}
        {planType === 'dynamic' && (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <DynamicPlanCard
              categoryId={parseInt(categoryId, 10)}
              onBuy={handleDynamicBuy}
              loading={buyDynamicLoading}
            />
          </Grid>
        )}

        {/* Static Plan Cards - only show when static is selected */}
        {planType === 'static' && (
          <>
            {filterData?.map((items, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <PricingCard ind={index} data={items} onClick={() => handleClick(items)} />
              </Grid>
            ))}

            {/* Enterprise Card */}
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <EnterpriseCard onClick={handleContactUs} categoryId={categoryId} />
            </Grid>
          </>
        )}
      </Grid>

      {/* Static Plan Payment Dialog */}
      {selectedPlan && (
        <PaymentDialog
          open={dialogOpen}
          onClose={handleDialogClose}
          onPay={handlePay}
          title={selectedPlan.title}
          price={selectedPlan.price}
          discount={selectedPlan.effectiveDiscount}
          tax={selectedPlan.taxAmount}
          finalPrice={selectedPlan.finalPrice}
          loading={buyPackageLoading}
        />
      )}

      {/* Dynamic Plan Payment Dialog */}
      {dynamicPlanParams?.pricing && (
        <DynamicPaymentDialog
          open={dynamicDialogOpen}
          onClose={handleDynamicDialogClose}
          onPay={handleDynamicPay}
          loading={buyDynamicLoading}
          pricing={dynamicPlanParams.pricing}
        />
      )}
    </Stack>
  );
}
