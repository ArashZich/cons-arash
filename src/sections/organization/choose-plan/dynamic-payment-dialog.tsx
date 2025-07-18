// src/sections/organization/choose-plan/dynamic-payment-dialog.tsx

import React from 'react';
// @mui
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
// locales
import { useLocales } from 'src/locales';
// components
import Iconify from 'src/components/iconify';
// types
import { CalculatePriceResponseType } from 'src/_types/reality/package/calculatePrice';
// utils
import { fPriceLocale } from 'src/utils/format-number';

// ----------------------------------------------------------------------

interface DynamicPaymentDialogProps {
  open: boolean;
  onClose: () => void;
  onPay: () => void;
  loading: boolean;
  pricing: CalculatePriceResponseType['data'];
}

export default function DynamicPaymentDialog({
  open,
  onClose,
  onPay,
  loading,
  pricing,
}: DynamicPaymentDialogProps) {
  const { t, currentLang } = useLocales();

  const formatPrice = (price: number) => fPriceLocale(price, currentLang.value);

  // محاسبه 10% ارزش افزوده (فقط برای نمایش)
  const VAT_RATE = 0.1;
  const vatAmount = Math.round(pricing.summary.final_price * VAT_RATE);
  const finalPriceWithVAT = pricing.summary.final_price + vatAmount;

  const renderHeader = (
    <Stack direction="row-reverse" justifyContent="space-between" alignItems="center">
      <IconButton onClick={onClose}>
        <Iconify icon="mdi:window-close" />
      </IconButton>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Iconify icon="solar:settings-bold-duotone" width={20} sx={{ color: 'primary.main' }} />
        <Typography variant="h6" sx={{ color: 'primary.main' }}>
          {t('organization.dynamic_plan')}
        </Typography>
      </Stack>
    </Stack>
  );

  const renderConfiguration = (
    <Box
      sx={{
        bgcolor: 'grey.50',
        p: 2,
        borderRadius: 1,
        mb: 2,
      }}
    >
      <Typography variant="subtitle2" gutterBottom>
        {t('organization.plan_configuration')}
      </Typography>
      <Stack spacing={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2">{t('organization.category')}:</Typography>
          <Typography variant="body2" fontWeight={600}>
            {t(`category.${pricing.configuration.category_name}`)}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2">{t('organization.duration')}:</Typography>
          <Typography variant="body2" fontWeight={600}>
            {pricing.configuration.months} {t('organization.months')}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2">{t('organization.products')}:</Typography>
          <Typography variant="body2" fontWeight={600}>
            {pricing.configuration.product_count} {t('organization.items')}
          </Typography>
        </Stack>
        {pricing.configuration.selected_features &&
          pricing.configuration.selected_features.length > 0 && (
            <Stack spacing={1}>
              <Typography variant="body2">{t('organization.selected_features')}:</Typography>
              <Stack direction="row" flexWrap="wrap" gap={0.5}>
                {pricing.configuration.selected_features.map((feature) => (
                  <Chip
                    key={feature.id}
                    label={feature.title}
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
                ))}
              </Stack>
            </Stack>
          )}
      </Stack>
    </Box>
  );

  const renderPricingDetails = (
    <Stack spacing={2}>
      {/* Base Package */}
      <Stack direction="row-reverse" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" fontWeight={600}>
          {formatPrice(pricing.pricing.base_package.amount)}
        </Typography>
        <Stack>
          <Typography variant="body2">{t('organization.base_package')}</Typography>
          <Typography variant="caption" color="text.secondary">
            {pricing.pricing.base_package.calculation}
          </Typography>
        </Stack>
      </Stack>

      {/* Features */}
      {pricing.pricing.features &&
        pricing.pricing.features.map((feature) => (
          <Stack
            key={feature.feature_id}
            direction="row-reverse"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body2" fontWeight={600}>
              {formatPrice(feature.amount)}
            </Typography>
            <Stack>
              <Typography variant="body2">{feature.title}</Typography>
              <Typography variant="caption" color="text.secondary">
                {feature.calculation}
              </Typography>
            </Stack>
          </Stack>
        ))}

      {/* Subtotal */}
      <Divider />
      <Stack direction="row-reverse" justifyContent="space-between" alignItems="center">
        <Typography variant="body1" fontWeight={600}>
          {formatPrice(pricing.summary.subtotal)}
        </Typography>
        <Typography variant="body1">{t('organization.subtotal')}</Typography>
      </Stack>
      {/* Auto Discount */}
      {pricing.discounts.auto_discount && pricing.discounts.auto_discount.total_discount > 0 && (
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              bgcolor: 'error.lighter',
              color: 'error.dark',
              px: 1,
              py: 0.5,
              borderRadius: 1,
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            <Iconify icon="solar:tag-bold" width={14} sx={{ mr: 0.5 }} />
            <Typography variant="caption" fontWeight={600}>
              {t('organization.auto_discount')} ({pricing.discounts.auto_discount.percentage}%)
            </Typography>
          </Stack>

          <Typography variant="body2" color="error.dark" fontWeight={600}>
            {formatPrice(pricing.discounts.auto_discount.total_discount)}-
          </Typography>
        </Stack>
      )}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {/* Price before VAT */}
      <Stack direction="row-reverse" justifyContent="space-between" alignItems="center">
        <Typography variant="body1" fontWeight={600}>
          {formatPrice(pricing.summary.final_price)}
        </Typography>
        <Typography variant="body1">{t('organization.price_before_vat')}</Typography>
      </Stack>

      {/* VAT (10%) */}
      <Stack direction="row-reverse" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" fontWeight={600}>
          {formatPrice(vatAmount)}
        </Typography>
        <Typography variant="body2">{t('organization.vat')} (10%)</Typography>
      </Stack>

      <Divider />

      {/* Final Price with VAT */}
      <Stack direction="row-reverse" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" color="primary.main" fontWeight={700}>
          {formatPrice(finalPriceWithVAT)}
        </Typography>
        <Typography variant="h6">{t('organization.final_price')}</Typography>
      </Stack>
    </Stack>
  );

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>{renderHeader}</DialogTitle>

      <DialogContent>
        {renderConfiguration}
        {renderPricingDetails}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        <LoadingButton
          fullWidth
          size="large"
          onClick={onPay}
          color="primary"
          variant="contained"
          loading={loading}
          startIcon={<Iconify icon="solar:card-bold" />}
        >
          {t('organization.proceed_to_payment')}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
