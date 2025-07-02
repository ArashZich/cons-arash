/* eslint-disable no-nested-ternary */
// @mui
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
// _types
import { PlanData } from 'src/_types/reality/plan/planData';
// locales
import { useLocales } from 'src/locales';
// routes
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
// iconify
import Iconify from 'src/components/iconify';
// utils
import { fPriceLocale } from 'src/utils/format-number';

// ----------------------------------------------------------------------
const StyledCard = styled(Card)(({ theme }) => ({
  border: '1px solid #80DEEA',
  boxShadow: '0px 8px 16px 0px #919EAB29',
  background: 'transparent',
  textAlign: 'left',
  padding: theme.spacing(2),
  color: '#ffffff',
}));

interface PlanPackageProps {
  data: PlanData | undefined;
}

export default function PricingCard(props: PlanPackageProps) {
  const { data } = props;
  const { t, currentLang } = useLocales();
  const router = useRouter();

  const handleContactUs = () => {
    router.push(paths.contact);
  };

  // Helper function برای فرمت کردن قیمت
  const formatPrice = (price: number) => fPriceLocale(price, currentLang.value);

  const renderSubscription = (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" sx={{ textTransform: 'capitalize', color: 'secondary.lighter' }}>
          {t(`plan.${data?.title}`)}
        </Typography>
        {/* نمایش درصد تخفیف ثابت */}
        {data?.discounted_price && data?.discounted_price < data?.price && (
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
              {formatPrice(Math.round(((data.price - data.discounted_price) / data.price) * 100))}%{' '}
              {t('organization.discount')}
            </Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  );

  const renderPrice = (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Stack>
        {/* قیمت اصلی - اگه تخفیف داره خط خورده نشون بده */}
        {data?.discounted_price && data?.discounted_price < data?.price && (
          <Typography
            variant="body2"
            sx={{
              textDecoration: 'line-through',
              textDecorationColor: (theme) => theme.palette.error.main,
              color: 'text.disabled',
            }}
          >
            {formatPrice(data?.price || 0)}
          </Typography>
        )}

        {/* قیمت بعد از تخفیف یا قیمت اصلی */}
        <Typography variant="h4">
          {data?.discounted_price && data?.discounted_price < data?.price
            ? formatPrice(data.discounted_price)
            : formatPrice(data?.price || 0)}
        </Typography>
      </Stack>
      <Typography variant="h6">{t('organization.toman')}</Typography>
    </Stack>
  );

  const renderList = (
    <Stack>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Iconify icon="eva:checkmark-fill" width={16} sx={{ mr: 1 }} color="secondary.light" />
        <Typography variant="body2">{formatPrice(data?.product_limit || 0)}</Typography>
        <Typography variant="body2">{t('organization.projects')}</Typography>
      </Stack>
      {data?.description.split(',').map((item, index) => (
        <Stack key={index} spacing={0.5} direction="row" alignItems="center">
          <Iconify icon="eva:checkmark-fill" width={16} sx={{ mr: 1 }} color="secondary.light" />
          <Typography variant="body2">{t(`plan.${item}`)}</Typography>
        </Stack>
      ))}
    </Stack>
  );

  return (
    <StyledCard
      sx={{
        p: 5,
        borderRadius: 2,
        boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <Stack
        spacing={3}
        sx={{
          minHeight: 460,
        }}
      >
        {renderSubscription}
        {renderPrice}
        {renderList}

        <Button
          fullWidth
          size="large"
          variant="outlined"
          color="inherit"
          sx={{ mt: 'auto' }}
          onClick={handleContactUs}
        >
          {t('pricing.learn_more')}
        </Button>
      </Stack>
    </StyledCard>
  );
}
