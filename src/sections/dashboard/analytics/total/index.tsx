// react
import React, { useCallback, useState, useEffect } from 'react';

// @mui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import ButtonBase from '@mui/material/ButtonBase';
// lodash
import { isEmpty } from 'lodash';
// _req-hooks
import { useViewsQuery } from 'src/_req-hooks/reality/view/useViewsQuery';
// utils
import { serializeDevicesData, serializeBrowserData } from 'src/utils/views-serializer';
// locales
import { useLocales } from 'src/locales';
// constants
import { duration_list, DurationType } from 'src/constants';
// components
import Iconify from 'src/components/iconify/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
// _types
import { FilterOperatorsEnum } from 'src/_types/site/filters';
// redux
import { useDispatch } from 'src/redux/store';
import { analyticsChanged } from 'src/redux/slices/analytics';
//
import TotalImpression from './total-impression';
import CurrentDevicesUses from './current-devices-uses';
import BrowsersUsed from './browsers-used';
// import LocationUsed from './locations-used';

type Props = {
  organization_id: number;
};

function TotalView({ organization_id }: Props) {
  const { t } = useLocales();
  const dispatch = useDispatch();

  const [durationData, setDurationData] = useState<DurationType>('one_week');

  // console.log(organization_id, 'organization_id');

  const { data: viewData, isSuccess } = useViewsQuery({
    order: 'asc',
    duration: durationData,
    filters: {
      organization_id: { op: FilterOperatorsEnum._, value: organization_id },
    },
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(analyticsChanged(viewData.data.items.views));
    }
  }, [dispatch, viewData, isSuccess]);

  const popover = usePopover();

  const handleChangeSeries = useCallback(
    (newValue: DurationType) => {
      popover.onClose();

      setDurationData(newValue);
    },
    [popover]
  );

  return (
    <Stack spacing={1}>
      <Stack ml="auto">
        <ButtonBase
          onClick={popover.onOpen}
          sx={{
            pl: 1,
            py: 0.5,
            pr: 0.5,
            borderRadius: 1,
            typography: 'subtitle2',
            bgcolor: 'background.neutral',
          }}
        >
          {t(`analytics.${durationData}`)}

          <Iconify
            width={16}
            icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
            sx={{ ml: 0.5 }}
          />
        </ButtonBase>
        <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 140 }}>
          {duration_list.map((option) => (
            <MenuItem
              key={option.label}
              selected={option.value === durationData}
              onClick={() => handleChangeSeries(option.value)}
            >
              {t(`analytics.${option.label}`)}
            </MenuItem>
          ))}
        </CustomPopover>
      </Stack>
      {isSuccess && !isEmpty(viewData.data.items.views) && (
        <Stack spacing={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TotalImpression
                title={t('overview.total_impression')}
                total={viewData.data.items.total}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TotalImpression
                title={t('overview.total_3d_views')}
                total={viewData.data.items.is_3d_len}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TotalImpression
                title={t('overview.total_ar_views')}
                total={viewData.data.items.is_ar_len}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <CurrentDevicesUses
                title={t('overview.devices')}
                chart={{
                  series: serializeDevicesData(viewData.data.items.operating_sys),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <BrowsersUsed
                title={t('overview.browsers')}
                list={serializeBrowserData(viewData.data.items.browsers)}
              />
            </Grid>
            {/* <Grid item xs={12} md={4}>
             <LocationUsed title={t('overview.location')} data={viewData.data.items.ips} />
          </Grid> */}
          </Grid>
        </Stack>
      )}
    </Stack>
  );
}

export default TotalView;
