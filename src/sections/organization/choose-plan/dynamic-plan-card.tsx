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
  { value: 6, label: '6' },
  { value: 12, label: '12' },
  { value: 24, label: '24' },
];

const PRODUCT_MARKS = [
  { value: 5, label: '5' },
  { value: 25, label: '25' },
  { value: 100, label: '100' },
  { value: 500, label: '500' },
  { value: 1000, label: '1000' },
];

export default function DynamicPlanCard({ categoryId, onBuy, loading }: DynamicPlanCardProps) {
  const { t, currentLang } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const [months, setMonths] = useState(6);
  const [productCount, setProductCount] = useState(25);
  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([]);
  const [calculatedPricing, setCalculatedPricing] = useState<
    CalculatePriceResponseType['data'] | null
  >(null);

  // Fetch available features for this category
  const { data: featuresData, isLoading: featuresLoading } = useCategoryFeaturesQuery(
    { categoryId },
    { enabled: !!categoryId }
  );

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
      const response = await calculatePrice({
        category_id: categoryId,
        months,
        product_count: productCount,
        feature_ids: selectedFeatures,
      });

      if (response.success) {
        setCalculatedPricing(response.data);
      }
    } catch (error) {
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
  }, [months, productCount, selectedFeatures]);

  const renderHeader = (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Iconify icon="solar:settings-bold-duotone" width={24} sx={{ color: 'primary.main' }} />
        <Typography variant="h6" sx={{ color: 'primary.main' }}>
          {t('organization.dynamic_plan')}
        </Typography>
      </Stack>
      <Typography variant="body2" color="text.secondary">
        {t('organization.customize_your_plan')}
      </Typography>
    </Stack>
  );

  const renderConfiguration = (
    <Stack spacing={3}>
      {/* Month Selector */}
      <Stack spacing={2}>
        <Typography variant="subtitle2">{t('organization.duration_months')}</Typography>
        <Box px={1}>
          <Slider
            value={months}
            onChange={(_, value) => setMonths(value as number)}
            min={1}
            max={24}
            marks={MONTH_MARKS}
            valueLabelDisplay="on"
            sx={{ color: 'primary.main' }}
          />
        </Box>
      </Stack>

      {/* Product Count Selector */}
      <Stack spacing={2}>
        <Typography variant="subtitle2">{t('organization.product_count')}</Typography>
        <Box px={1}>
          <Slider
            value={productCount}
            onChange={(_, value) => setProductCount(value as number)}
            min={5}
            max={1000}
            step={5}
            marks={PRODUCT_MARKS}
            valueLabelDisplay="on"
            sx={{ color: 'secondary.main' }}
          />
        </Box>
      </Stack>

      {/* Features Selection */}
      {featuresLoading ? (
        <Stack alignItems="center" py={2}>
          <CircularProgress size={24} />
        </Stack>
      ) : (
        <Stack spacing={2}>
          <Typography variant="subtitle2">{t('organization.additional_features')}</Typography>
          <FormGroup>
            {featuresData?.data?.map((feature) => (
              <FormControlLabel
                key={feature.id}
                control={
                  <Checkbox
                    checked={selectedFeatures.includes(feature.id)}
                    onChange={() => handleFeatureToggle(feature.id)}
                    size="small"
                  />
                }
                label={
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ flex: 1 }}>
                    <Typography variant="body2">{feature.title}</Typography>
                    <Chip
                      label={formatPrice(feature.price)}
                      size="small"
                      variant="outlined"
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
          <CircularProgress size={24} />
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
          {calculatedPricing.pricing.features.length > 0 && (
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2">{t('organization.features_total')}</Typography>
              <Typography variant="body2" fontWeight={600}>
                {formatPrice(calculatedPricing.pricing.total_features)}
              </Typography>
            </Stack>
          )}

          {/* Discount */}
          {calculatedPricing.discounts.auto_discount.total_discount > 0 && (
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
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{t('organization.final_price')}</Typography>
            <Typography variant="h5" color="primary.main" fontWeight={700}>
              {formatPrice(calculatedPricing.summary.final_price)}
            </Typography>
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

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 2,
        border: '2px solid',
        borderColor: 'primary.light',
        position: 'relative',
        minHeight: 600,
      }}
    >
      <Stack spacing={3} sx={{ height: '100%' }}>
        {renderHeader}
        {renderConfiguration}
        {renderPricing}

        <Button
          fullWidth
          size="large"
          variant="contained"
          onClick={handleBuyClick}
          disabled={!calculatedPricing || loading}
          sx={{ mt: 'auto' }}
          startIcon={
            loading ? <CircularProgress size={20} /> : <Iconify icon="solar:cart-plus-bold" />
          }
        >
          {t('organization.buy_dynamic_plan')}
        </Button>
      </Stack>
    </Card>
  );
}
