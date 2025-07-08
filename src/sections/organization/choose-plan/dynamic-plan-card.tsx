// src/sections/organization/choose-plan/dynamic-plan-card.tsx

import React, { useState, useEffect } from 'react';
// @mui
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
// locales
import { useLocales } from 'src/locales';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
// hooks
import { useCalculatePriceMutation } from 'src/_req-hooks/reality/package/useCalculatePriceMutation';
import { useCategoryFeaturesQuery } from 'src/_req-hooks/reality/category/useCategoryFeaturesQuery';
// types
import { CalculatePriceResponseType } from 'src/_types/reality/package/calculatePrice';
// utils
import { fPriceLocale } from 'src/utils/format-number';

// ----------------------------------------------------------------------

interface DynamicPlanCardProps {
  categoryId: number;
  onBuy: (params: {
    months: number;
    product_count: number;
    feature_ids: number[];
    pricing?: CalculatePriceResponseType['data'];
  }) => void;
  loading?: boolean;
}

const MONTH_MARKS = [
  { value: 1, label: '1' },
  { value: 3, label: '3' },
  { value: 6, label: '6' },
  { value: 12, label: '12' },
];

const PRODUCT_MARKS = [
  { value: 1, label: '1' },
  { value: 25, label: '25' },
  { value: 100, label: '100' },
  { value: 500, label: '500' },
  { value: 1000, label: '1000' },
];

export default function DynamicPlanCard({ categoryId, onBuy, loading }: DynamicPlanCardProps) {
  const { t, currentLang } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const [months, setMonths] = useState(3);
  const [productCount, setProductCount] = useState(10);
  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([]);
  const [calculatedPricing, setCalculatedPricing] = useState<
    CalculatePriceResponseType['data'] | null
  >(null);

  // Fetch available features for this category
  const { data: featuresData, isLoading: featuresLoading } = useCategoryFeaturesQuery(
    { categoryId },
    { enabled: !!categoryId }
  );

  // Debug features data
  console.log('🎯 Features data:', featuresData);
  console.log('🏷️ Category ID:', categoryId);

  // Calculate price mutation
  const { mutateAsync: calculatePrice, isLoading: calculating } = useCalculatePriceMutation();

  const formatPrice = (price: number) => fPriceLocale(price, currentLang.value);

  const handleFeatureToggle = (featureId: number) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId) ? prev.filter((id) => id !== featureId) : [...prev, featureId]
    );
  };

  const handleCalculatePrice = async () => {
    try {
      console.log('🔄 Calculating price...', {
        category_id: categoryId,
        months,
        product_count: productCount,
        feature_ids: selectedFeatures,
      });

      const response = await calculatePrice({
        category_id: categoryId,
        months,
        product_count: productCount,
        feature_ids: selectedFeatures,
      });

      console.log('💰 Price response:', response);

      if (response?.data) {
        setCalculatedPricing(response.data);
        console.log('✅ Pricing set successfully');
      } else {
        console.error('❌ No data in response');
      }
    } catch (error) {
      console.error('❌ Calculate price error:', error);
      enqueueSnackbar(error?.message || t('organization.calculation_error'), {
        variant: 'error',
      });
    }
  };

  const handleBuyClick = () => {
    if (calculatedPricing) {
      onBuy({
        months,
        product_count: productCount,
        feature_ids: selectedFeatures,
        pricing: calculatedPricing,
      });
    }
  };

  // Auto calculate when parameters change
  useEffect(() => {
    const timer = setTimeout(() => {
      handleCalculatePrice();
    }, 500);

    return () => clearTimeout(timer);
  }, [months, productCount, selectedFeatures, categoryId]);

  const renderHeader = (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" sx={{ textTransform: 'capitalize', color: 'secondary.dark' }}>
          {t('organization.dynamic_plan')}
        </Typography>
      </Stack>
    </Stack>
  );

  const renderConfiguration = (
    <Stack spacing={3}>
      {/* Month Selector */}
      <Stack spacing={2}>
        <Typography variant="subtitle2">
          {t('organization.duration_months')} ({months} {t('organization.months')})
        </Typography>
        <Box px={1}>
          <Slider
            value={months}
            onChange={(_, value) => setMonths(value as number)}
            min={1}
            max={12}
            step={1}
            marks={[
              { value: 1, label: '1' },
              { value: 3, label: '3' },
              { value: 6, label: '6' },
              { value: 12, label: '12' },
            ]}
            valueLabelDisplay="auto"
            sx={{ color: 'secondary.main' }}
          />
        </Box>
      </Stack>

      {/* Product Count Selector */}
      <Stack spacing={2}>
        <Typography variant="subtitle2">
          {t('organization.product_count')} ({productCount} {t('organization.products')})
        </Typography>
        <Box px={1}>
          <Slider
            value={productCount}
            onChange={(_, value) => setProductCount(value as number)}
            min={1}
            max={1000}
            step={1}
            marks={[
              { value: 1, label: '1' },
              { value: 25, label: '25' },
              { value: 100, label: '100' },
              { value: 500, label: '500' },
              { value: 1000, label: '1000' },
            ]}
            valueLabelDisplay="auto"
            sx={{ color: 'secondary.main' }}
          />
        </Box>
      </Stack>

      {/* Features Selection */}
      {featuresLoading ? (
        <Stack alignItems="center" py={2}>
          <CircularProgress size={24} color="secondary" />
        </Stack>
      ) : (
        <Stack spacing={2}>
          <Typography variant="subtitle2">{t('organization.additional_features')}</Typography>
          <FormGroup>
            {featuresData?.data
              ?.filter((feature) => feature.ID && feature.category_ids.includes(categoryId))
              ?.map((feature) => (
                <FormControlLabel
                  key={`feature-${feature.ID}`}
                  control={
                    <Checkbox
                      checked={selectedFeatures.includes(feature.ID)}
                      onChange={() => handleFeatureToggle(feature.ID)}
                      size="small"
                      color="secondary"
                      value={feature.ID}
                      name={`feature-${feature.ID}`}
                    />
                  }
                  label={
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ flex: 1 }}>
                      <Typography variant="body2">{feature.title}</Typography>
                      <Chip
                        label={formatPrice(feature.price)}
                        size="small"
                        variant="outlined"
                        color="secondary"
                        sx={{ ml: 'auto' }}
                      />
                    </Stack>
                  }
                />
              ))}
          </FormGroup>
        </Stack>
      )}
    </Stack>
  );

  const renderPricing = calculatedPricing && (
    <Stack spacing={2}>
      <Divider />

      {calculating ? (
        <Stack alignItems="center" py={2}>
          <CircularProgress size={24} color="secondary" />
          <Typography variant="caption" color="text.secondary">
            {t('organization.calculating')}
          </Typography>
        </Stack>
      ) : (
        <>
          {/* Base Package */}
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">{t('organization.base_package')}</Typography>
            <Typography variant="body2" fontWeight={600}>
              {formatPrice(calculatedPricing.pricing.base_package.amount)}
            </Typography>
          </Stack>

          {/* Features */}
          {calculatedPricing.pricing.features && calculatedPricing.pricing.features.length > 0 && (
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2">{t('organization.features_total')}</Typography>
              <Typography variant="body2" fontWeight={600}>
                {formatPrice(calculatedPricing.pricing.total_features)}
              </Typography>
            </Stack>
          )}

          {/* Discount */}
          {calculatedPricing.discounts.auto_discount &&
            calculatedPricing.discounts.auto_discount.total_discount > 0 && (
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="success.main">
                  {t('organization.auto_discount')} (
                  {calculatedPricing.discounts.auto_discount.percentage}%)
                </Typography>
                <Typography variant="body2" color="success.main" fontWeight={600}>
                  -{formatPrice(calculatedPricing.discounts.auto_discount.total_discount)}
                </Typography>
              </Stack>
            )}

          <Divider />

          {/* Final Price */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Stack>
              <Typography variant="h4" color="secondary.main" fontWeight={700}>
                {formatPrice(calculatedPricing.summary.final_price)}
              </Typography>
            </Stack>
            <Typography variant="h6">{t('organization.toman')}</Typography>
          </Stack>

          {/* Savings */}
          {calculatedPricing.summary.auto_discount > 0 && (
            <Stack alignItems="center">
              <Chip
                label={calculatedPricing.summary.savings}
                color="success"
                size="small"
                icon={<Iconify icon="solar:tag-bold" />}
              />
            </Stack>
          )}
        </>
      )}
    </Stack>
  );

  // Check if buy button should be enabled
  const isBuyButtonEnabled = !calculating && !!calculatedPricing && !loading;

  console.log('🔘 Buy button state:', {
    calculating,
    calculatedPricing: !!calculatedPricing,
    loading,
    isBuyButtonEnabled,
  });

  return (
    <Card
      sx={{
        p: 5,
        borderRadius: 2,
        boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
        position: 'relative',
        overflow: 'visible',
        minHeight: 460,
      }}
    >
      <Stack spacing={3} sx={{ height: '100%' }}>
        {renderHeader}
        {renderConfiguration}
        {renderPricing}

        <Button
          fullWidth
          size="large"
          variant="outlined"
          color="inherit"
          onClick={handleBuyClick}
          disabled={!isBuyButtonEnabled}
          sx={{ mt: 'auto' }}
          startIcon={
            loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <Iconify icon="solar:cart-plus-bold" />
            )
          }
        >
          {t('organization.buy_dynamic_plan')}
        </Button>
      </Stack>
    </Card>
  );
}
