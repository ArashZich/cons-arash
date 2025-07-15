/* eslint-disable no-nested-ternary */
// @mui
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// _types
import { PlanData } from 'src/_types/reality/plan/planData';
// locales
import { useLocales } from 'src/locales';
// iconify
import Iconify from 'src/components/iconify';
// utils
import { fPriceLocale } from 'src/utils/format-number';

// ----------------------------------------------------------------------

interface PlanPackageProps {
  data: PlanData | undefined;
  onClick: () => void;
  ind: number;
}

export default function PricingCard(props: PlanPackageProps) {
  const { data, onClick, ind } = props;
  const { t, currentLang } = useLocales();

  // Helper function برای فرمت کردن قیمت
  const formatPrice = (price: number) => fPriceLocale(price, currentLang.value);

  const renderSubscription = (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" sx={{ textTransform: 'capitalize', color: 'secondary.dark' }}>
          {t(`plan.${data?.title}`)}
        </Typography>
        {/* نمایش درصد تخفیف ثابت با دیزاین بهتر */}
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
        {/* قیمت اصلی - همیشه خط خورده نمایش داده میشه اگه تخفیف داشته باشیم */}
        {((data?.discounted_price && data?.discounted_price < data?.price) ||
          data?.price_discounted) && (
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

        {/* قیمت بعد از تخفیف ثابت */}
        {data?.discounted_price && data?.discounted_price < data?.price ? (
          <Typography
            variant="h4"
            sx={{
              textDecoration: data?.price_discounted ? 'line-through' : 'none',
              textDecorationColor: (theme) => theme.palette.warning.main,
              color: data?.price_discounted ? 'text.secondary' : 'text.primary',
            }}
          >
            {formatPrice(data?.discounted_price)}
          </Typography>
        ) : null}

        {/* قیمت نهایی بعد از کد تخفیف */}
        {data?.price_discounted && (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h4" color="success.main">
              {formatPrice(data?.price_discounted)}
            </Typography>
          </Stack>
        )}

        {/* اگه هیچ تخفیفی نداریم، قیمت اصلی رو نشون بده */}
        {!data?.discounted_price && !data?.price_discounted && (
          <Typography variant="h4">{formatPrice(data?.price || 0)}</Typography>
        )}
      </Stack>
      <Typography variant="h6">{t('organization.toman')}</Typography>
    </Stack>
  );

  const renderList = (
    <Stack>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Iconify icon="eva:checkmark-fill" width={16} sx={{ mr: 1 }} />
        <Typography variant="body2">{formatPrice(data?.product_limit || 0)}</Typography>
        <Typography variant="body2">{t('organization.projects')}</Typography>
      </Stack>
      {data?.description.split(',').map((item, index) => (
        <Stack key={index} spacing={0.5} direction="row" alignItems="center">
          <Iconify icon="eva:checkmark-fill" width={16} sx={{ mr: 1 }} />
          <Typography variant="body2">{t(`plan.${item}`)}</Typography>
        </Stack>
      ))}
    </Stack>
  );

  return (
    <Card
      sx={{
        p: 5,
        borderRadius: 2,
        boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      {/* Badge برای نمایش تخفیف ویژه - دیزاین بهتر */}
      {data?.price_discounted && (
        <Stack
          sx={{
            position: 'absolute',
            top: -12,
            right: -12,
            bgcolor: 'success.main',
            color: 'white',
            px: 2,
            py: 0.5,
            borderRadius: '16px',
            zIndex: 1,
            transform: 'rotate(15deg)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          <Typography variant="caption" fontWeight={700} fontSize="0.7rem">
            {t('organization.special_discount')}
          </Typography>
        </Stack>
      )}

      <Stack
        spacing={3}
        sx={{
          minHeight: ind === 0 ? 460 : ind === 1 ? 460 : 460,
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
          onClick={onClick}
        >
          {t('organization.choose_plan')}
        </Button>
      </Stack>
    </Card>
  );
}
