// react
import { useState, useCallback, useMemo } from 'react';
// @mui
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import ButtonBase from '@mui/material/ButtonBase';
import Card, { CardProps } from '@mui/material/Card';

// _types
import { FilterOperatorsEnum } from 'src/_types/site/filters';
// components
import Iconify from 'src/components/iconify';
import Chart, { useChart } from 'src/components/chart';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
// locales
import { useLocales } from 'src/locales';
// _req-hooks
import { useViewsQuery } from 'src/_req-hooks/reality/view/useViewsQuery';
// utils
import { serializeBooleanData } from 'src/utils/views-serializer';
// constants
import { duration_list, DurationType } from 'src/constants';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  organization_id: number;
}

export default function Views3D({ title, organization_id, ...other }: Props) {
  const { t, isRtl } = useLocales();
  const [durationData, setDurationData] = useState<DurationType>('one_week');
  const theme = useTheme();

  const { data: viewData } = useViewsQuery({
    order: 'asc',
    duration: durationData,
    filters: {
      organization_id: { op: FilterOperatorsEnum._, value: organization_id },
    },
  });

  const date = useMemo(
    () => viewData?.data?.items.views.map((item) => item.created_at) || [],
    [viewData]
  );

  const data3D = useMemo(
    () => viewData?.data?.items.views.map((item) => item.is_3d) || [],
    [viewData]
  );

  const { categories, data } = serializeBooleanData(
    date as Date[],
    t('analytics.views3d'),
    data3D as boolean[],
    isRtl
  );

  const popover = usePopover();

  const colors = [
    [theme.palette.primary.light, theme.palette.primary.main],
    [theme.palette.warning.light, theme.palette.warning.main],
  ];

  const chartOptions = useChart({
    colors: colors.map((color) => color[1]),
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: colors.map((color) => [
          { offset: 0, color: color[0], opacity: 1 },
          { offset: 100, color: color[1], opacity: 1 },
        ]),
      },
    },
    xaxis: {
      categories,
    },
  });

  const handleChangeSeries = useCallback(
    (newValue: DurationType) => {
      popover.onClose();
      setDurationData(newValue);
    },
    [popover]
  );

  return (
    <>
      <Card {...other}>
        <CardHeader
          title={title}
          action={
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
          }
        />

        <Box sx={{ mt: 3, mx: 3 }}>
          <Chart
            dir="ltr"
            type="line"
            series={data}
            options={chartOptions}
            height={364}
            width="100%"
          />
        </Box>
      </Card>

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
    </>
  );
}
