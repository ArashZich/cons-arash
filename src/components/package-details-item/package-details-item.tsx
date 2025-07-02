// react
import React from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// redux
import { useSelector, useDispatch } from 'src/redux/store';
import { organizationSelector, planPurchaseChanged } from 'src/redux/slices/organization';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// locals
import { useLocales } from 'src/locales';
// req-hooks
import { usePackagesQuery } from 'src/_req-hooks/reality/package/usePackagesQuery';
// utils
import { calculateRemainingDays } from 'src/utils/calculate-remaining-days';
// _types
import { FilterOperatorsEnum } from 'src/_types/site/filters';

function PackageDetailsItem() {
  const { t } = useLocales();
  const organization = useSelector(organizationSelector);
  const router = useRouter();
  const dispatch = useDispatch();

  const { data } = usePackagesQuery(
    {
      per_page: 1,
      filters: {
        organization_id: { op: FilterOperatorsEnum._, value: organization?.ID },
      },
    },
    { enabled: !!organization?.ID }
  );

  // Assuming expired_at is in a valid date format that JavaScript can parse
  const remainingDays = data?.data?.items[0]?.expired_at
    ? calculateRemainingDays(data.data.items[0].expired_at as string)
    : null;

  const handleRoute = () => {
    dispatch(planPurchaseChanged('plan_and_purchasing'));
    router.push(paths.dashboard.organization_management);
  };

  return (
    <Stack spacing={1} sx={{ mb: 2 }}>
      <Stack spacing={0.5}>
        <Stack
          spacing={0.5}
          sx={{ flexDirection: 'row', alignItems: 'center', color: 'text.disabled' }}
        >
          <Typography variant="body2">{data?.data?.items[0]?.product_limit}</Typography>
          <Typography variant="body2">{t('dashboard.remaining_projects')}</Typography>
        </Stack>
        {remainingDays !== null && (
          <Stack
            spacing={0.5}
            sx={{ flexDirection: 'row', alignItems: 'center', color: 'text.disabled' }}
          >
            <Typography variant="body2">{remainingDays}</Typography>
            <Typography variant="body2">{t('dashboard.until_expiration')}</Typography>
          </Stack>
        )}
      </Stack>
      <Stack alignItems="self-start">
        <Button onClick={handleRoute} sx={{ bgcolor: 'rgba(145, 158, 171, 0.08)' }}>
          {t('dashboard.manage_plan')}
        </Button>
      </Stack>
    </Stack>
  );
}

export default PackageDetailsItem;
