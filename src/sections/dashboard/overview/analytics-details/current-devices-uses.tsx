// apexcharts
import { ApexOptions } from 'apexcharts';
// @mui
import CardHeader from '@mui/material/CardHeader';
import ButtonBase from '@mui/material/ButtonBase';
import Card, { CardProps } from '@mui/material/Card';
import { useTheme, styled } from '@mui/material/styles';
// utils
import { fNumber } from 'src/utils/format-number';
// locales
import { useLocales } from 'src/locales';
// components
import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 400;

const LEGEND_HEIGHT = 72;

const StyledChart = styled(Chart)(({ theme }) => ({
  height: CHART_HEIGHT,
  '& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject': {
    height: `100% !important`,
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    borderTop: `dashed 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    series: {
      label: string;
      value: number;
    }[];
    options?: ApexOptions;
  };
}

export default function CurrentDevicesUses({ title, subheader, chart, ...other }: Props) {
  const theme = useTheme();
  const { t } = useLocales();

  const { colors, series, options } = chart;

  const chartSeries = series.map((i) => i.value);

  const chartOptions = useChart({
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    colors,
    series: chartSeries,
    labels: series.map((i) => i.label),
    stroke: { colors: [theme.palette.background.paper] },
    legend: {
      offsetY: 0,
      floating: true,
      position: 'bottom',
      horizontalAlign: 'center',
    },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (value: number) => fNumber(value),
        title: {
          formatter: (seriesName: string) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '90%',
          labels: {
            value: {
              formatter: (value: number | string) => fNumber(value),
            },
            total: {
              formatter: (w: { globals: { seriesTotals: number[] } }) => {
                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return fNumber(sum);
              },
            },
          },
        },
      },
    },
    ...options,
  });

  return (
    <Card {...other} sx={{ minHeight: 500 }}>
      <CardHeader
        title={title}
        subheader={subheader}
        sx={{ mb: 5 }}
        action={
          <ButtonBase
            sx={{
              px: 1,
              py: 0.5,
              borderRadius: 1,
              typography: 'subtitle2',
              bgcolor: 'background.neutral',
            }}
          >
            {t('analytics.one_month')}
          </ButtonBase>
        }
      />
      <StyledChart
        dir="ltr"
        type="donut"
        series={chartOptions.series}
        options={chartOptions}
        height={280}
        width="100%"
      />
    </Card>
  );
}
