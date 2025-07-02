// payment-dialog.tsx
// react
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
// utils
import { fPriceLocale } from 'src/utils/format-number';
// component
import Iconify from 'src/components/iconify/iconify';
// locales
import { useLocales } from 'src/locales';

interface PaymentDialogProps {
  open: boolean;
  onClose: () => void;
  onPay: () => void;
  price: number;
  discount: number;
  tax: number;
  finalPrice: number;
  title: string;
  loading: boolean;
}

export default function PaymentDialog({
  open,
  onClose,
  onPay,
  price,
  discount,
  tax,
  finalPrice,
  title,
  loading,
}: PaymentDialogProps) {
  const { t, currentLang } = useLocales();

  // Helper function برای فرمت کردن قیمت
  const formatPrice = (priceValue: number) => fPriceLocale(priceValue, currentLang.value);

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Stack direction="row-reverse" justifyContent="space-between" alignItems="center">
          <IconButton onClick={onClose}>
            <Iconify icon="mdi:window-close" />
          </IconButton>
          <Typography variant="h6" sx={{ textTransform: 'capitalize', color: 'secondary.dark' }}>
            {t(`plan.${title}`)}
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack direction="row-reverse" justifyContent="space-between" alignItems="center">
          <Typography variant="body2">{formatPrice(price)}</Typography>
          <Typography variant="body2">{t('organization.original_price')}:</Typography>
        </Stack>

        {discount > 0 && (
          <Stack mt={2} direction="row-reverse" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="error.main">
              -{formatPrice(discount)}
            </Typography>
            <Typography variant="body2">{t('organization.total_discount')}(-):</Typography>
          </Stack>
        )}

        <Stack mt={2} direction="row-reverse" justifyContent="space-between" alignItems="center">
          <Typography variant="body2">{formatPrice(price - discount)}</Typography>
          <Typography variant="body2">{t('organization.price_after_discount')}:</Typography>
        </Stack>

        <Stack mt={2} direction="row-reverse" justifyContent="space-between" alignItems="center">
          <Typography variant="body2">{formatPrice(tax)}</Typography>
          <Typography variant="body2">{t('organization.tax')}(+):</Typography>
        </Stack>

        <Divider sx={{ mt: 2 }} />

        <Stack mt={2} direction="row-reverse" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" color="success.main">
            {formatPrice(finalPrice)}
          </Typography>
          <Typography variant="body2">{t('organization.final_price')}:</Typography>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ mt: 2 }}>
        <LoadingButton
          fullWidth
          onClick={onPay}
          color="inherit"
          variant="contained"
          loading={loading}
        >
          {t('organization.pay')}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
