// src/sections/organization/choose-plan/pricing-session.tsx

import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useSnackbar } from 'src/components/snackbar';
import { useAuthContext } from 'src/auth/hooks';
import { NewPlanData } from 'src/_types/sections/organization/choose-plan';
import { useSelector } from 'src/redux/store';
import { organizationSelector } from 'src/redux/slices/organization';
import { useBuyPackageMutation } from 'src/_req-hooks/reality/package/useBuyPackageMutation';
import { useBuyDynamicMutation } from 'src/_req-hooks/reality/package/useBuyDynamicMutation';
import { useCreatePackageMutation } from 'src/_req-hooks/reality/package/useCreatePackageMutation';
import { useAddAffiliateCodeUserMutation } from 'src/_req-hooks/reality/user/useAddAffiliateCodeUserMutation';
import { CalculatePriceResponseType } from 'src/_types/reality/package/calculatePrice';
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

const TAX_RATE = 0.1; // 10% tax rate

export default function PricingSession({
  data,
  categoryId,
  discountCode,
  discountAmount,
  maximumDiscountAmount,
}: PricingSessionProps) {
  const organization = useSelector(organizationSelector);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { user } = useAuthContext();
  const isSuperAdmin = user?.roles.some((role) => role.title === 'SuperAdmin');

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
        category_id: parseInt(categoryId),
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
      enqueueSnackbar(e?.message, { variant: 'error' });
    }
    handleDynamicDialogClose();
  };

  const handleContactUs = () => {
    router.push(paths.contact);
  };

  return (
    <Stack spacing={5} width={{ md: 1152 }} sx={{ mt: 3 }}>
      <Grid container spacing={2} justifyContent="center">
        {/* Dynamic Plan Card */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DynamicPlanCard
            categoryId={parseInt(categoryId)}
            onBuy={handleDynamicBuy}
            loading={buyDynamicLoading}
          />
        </Grid>

        {/* Static Plan Cards */}
        {filterData?.map((items, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <PricingCard ind={index} data={items} onClick={() => handleClick(items)} />
          </Grid>
        ))}

        {/* Enterprise Card */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <EnterpriseCard onClick={handleContactUs} categoryId={categoryId} />
        </Grid>
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
