'use client';

// react
import React, { useEffect } from 'react';
// @mui
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// lodash
import { toInteger, isEmpty } from 'lodash';
// immer
import { useImmerReducer } from 'use-immer';
// locales
import { useLocales } from 'src/locales';
// _req-hooks
import { usePlansQuery } from 'src/_req-hooks/reality/plan/usePlansQuery';
import { useCouponsQuery } from 'src/_req-hooks/reality/coupon/useCouponsQuery';
// _types
import { State, Action } from 'src/_types/sections/organization/choose-plan';
import { FilterOperatorsEnum } from 'src/_types/site/filters';
// components
import { useSnackbar } from 'src/components/snackbar';
// constants
import { data_length } from 'src/constants';
//
import PricingSession from '../pricing-session';

type Props = {
  id: string;
};

const initialState = {
  days: 90,
  voucher_code: '',
  is_coupon_enabled: false,
  plan_items: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'days':
    case 'voucher_code':
    case 'is_coupon_enabled':
    case 'plan_items':
      return { ...state, [action.type]: action.payload };
    default:
      return state;
  }
}

function ChoosePackageView({ id }: Props) {
  const { t } = useLocales();
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const { enqueueSnackbar } = useSnackbar();

  const { data: planData, isSuccess } = usePlansQuery(
    {
      order: 'asc',
      filters: {
        category_id: { op: FilterOperatorsEnum._, value: toInteger(id) },
        day_length: { op: FilterOperatorsEnum._, value: state.days },
      },
    },
    { enabled: !!id }
  );

  const {
    data: voucherData,
    refetch,
    isSuccess: isSuccessCoupon,
  } = useCouponsQuery(
    {
      per_page: 1,
      filters: { code: { op: FilterOperatorsEnum.EQUALS, value: state.voucher_code } },
    },
    {
      enabled: state.is_coupon_enabled,
    }
  );

  const handleDays = (days: number) => {
    dispatch({ type: 'days', payload: days });
  };

  const handleVoucherCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'is_coupon_enabled', payload: false });
    dispatch({ type: 'voucher_code', payload: e.target.value });
  };

  // console.log(planData);

  const handleCoupon = () => {
    dispatch({ type: 'is_coupon_enabled', payload: true });
  };

  // console.log(voucherData?.data);

  const handleCheckVoucher = () => {
    if (state.is_coupon_enabled) {
      refetch();
    } else {
      handleCoupon();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: 'plan_items', payload: planData.data.items });
    }
  }, [dispatch, isSuccess, planData?.data.items]);

  useEffect(() => {
    if (isSuccessCoupon) {
      const planIds = planData?.data?.items.map((item) => item.ID) || [];
      const isPlanIdValid = planIds.includes(voucherData?.data?.items[0]?.plan_id);
      if (!voucherData?.data?.items[0]?.plan_id) {
        const planPrices = planData?.data?.items || [];
        const discountAmount = voucherData?.data?.items[0]?.discounting_amount || 0;
        const maximumDiscountAmount = voucherData?.data?.items[0]?.maximum_discount_amount || 0;

        const updatedPlanItems = planPrices.map((item, index) => {
          // discountAmount is percent
          const discountValue = (item.price * discountAmount) / 100;
          const effectiveDiscount = Math.min(discountValue, maximumDiscountAmount);
          // Apply discountAmount to the price
          const discountedPrice = item.price - effectiveDiscount;

          // Create a new object with the updated price
          return {
            ...item,
            price_discounted: discountedPrice,
            discount_code: voucherData?.data?.items[0]?.code,
          };
        });
        dispatch({ type: 'plan_items', payload: updatedPlanItems });
      } else if (!isPlanIdValid) {
        dispatch({ type: 'plan_items', payload: planData?.data?.items });
        enqueueSnackbar(t('organization.voucher_code_not_valid'), { variant: 'error' });
      } else if (isPlanIdValid) {
        const voucherPlanId = voucherData?.data?.items[0]?.plan_id;
        const discountAmount = voucherData?.data?.items[0]?.discounting_amount || 0;
        const maximumDiscountAmount = voucherData?.data?.items[0]?.maximum_discount_amount || 0;

        const updatedPlanItems = planData?.data?.items.map((item) => {
          if (item.ID === voucherPlanId) {
            // discountAmount is percent
            const discountValue = (item.price * discountAmount) / 100;
            const effectiveDiscount = Math.min(discountValue, maximumDiscountAmount);
            // Apply discountAmount to the price
            const discountedPrice = item.price - effectiveDiscount;

            // Create a new object with the updated price
            return {
              ...item,
              price_discounted: discountedPrice,
              discount_code: voucherData?.data?.items[0].code,
            };
          }
          return item;
        });

        dispatch({ type: 'plan_items', payload: updatedPlanItems });
      }
    }
  }, [
    dispatch,
    enqueueSnackbar,
    id,
    isSuccessCoupon,
    planData?.data?.items,
    t,
    voucherData?.data?.items,
  ]);

  return (
    <Stack maxWidth={1200} sx={{ height: '100%' }}>
      <Typography variant="h3" align="center" sx={{ mb: 2 }}>
        {t('organization.which_package')}
      </Typography>
      <Typography
        variant="body2"
        textAlign="center"
        color="text.disabled"
        sx={{ whiteSpace: 'break-spaces' }}
      >
        {t('organization.select_the_package')}
      </Typography>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        spacing={1}
        marginTop={3}
      >
        {data_length.map((item, ind) => (
          <Chip
            key={ind}
            label={t(`organization.${item.label}`)}
            variant={state.days === item.value ? 'filled' : 'outlined'}
            onClick={() => handleDays(item.value)}
          />
        ))}
      </Stack>
      <Stack flexDirection="row" justifyContent="center" marginTop={5} spacing={1}>
        <TextField
          variant="outlined"
          placeholder={t('organization.voucher_code')}
          size="medium"
          onChange={handleVoucherCode}
          value={state.voucher_code}
        />
        <Button
          variant="contained"
          disabled={isEmpty(state.voucher_code)}
          size="medium"
          onClick={handleCheckVoucher}
        >
          {t('organization.apply')}
        </Button>
      </Stack>
      {isSuccess && (
        <PricingSession
          data={state.plan_items}
          categoryId={id}
          discountCode={state.voucher_code}
          discountAmount={voucherData?.data?.items[0]?.discounting_amount || 0}
          maximumDiscountAmount={voucherData?.data?.items[0]?.maximum_discount_amount || 0}
        />
      )}{' '}
    </Stack>
  );
}

export default ChoosePackageView;
