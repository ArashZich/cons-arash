// react
import React, { useCallback } from 'react';

// @mui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
// lodash
import { isEmpty } from 'lodash';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// redux
import { useDispatch } from 'src/redux/store';
import { analyticsViewChanged } from 'src/redux/slices/analytics-view';
// locales
import { useLocales } from 'src/locales';
// hooks
import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';
// _req-hooks
import { useAnalyticsQuery } from 'src/_req-hooks/recommender/useAnalyticsQuery';
import { useAnalyticsExportQuery } from 'src/_req-hooks/recommender/useAnalyticsExportQuery';

// components
import { useSnackbar } from 'src/components/snackbar';
import Iconify from 'src/components/iconify';

//
import TotalRecommendation from './analytics-details/total-recommendation';

type OverviewRecommendationProps = {
  organizationUid?: string;
};

function OverviewRecommendation({ organizationUid }: OverviewRecommendationProps) {
  const { t } = useLocales();
  const { copy } = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const dispatch = useDispatch();

  const format = 'csv' as 'json' | 'csv'; // یا می‌تونه از props گرفته بشه

  const { data: analyticsData, isSuccess } = useAnalyticsQuery(
    {
      organization_uid: organizationUid,
      period: 'week',
    },
    {
      enabled: !isEmpty(organizationUid),
    }
  );

  const handleCopyLink = useCallback(
    (link: string) => {
      copy(link);

      enqueueSnackbar(t('project.copied'), { variant: 'info' });
    },
    [copy, enqueueSnackbar, t]
  );

  const handleShare = useCallback(async () => {
    const shareUrl = `${process.env.NEXT_PUBLIC_RECOMMENDER_CARPET_URL}/${organizationUid}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Recommender Link',
          url: shareUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // اگر Web Share API پشتیبانی نمیشد، لینک رو کپی میکنیم
      copy(shareUrl);
      enqueueSnackbar(t('project.copied'), { variant: 'info' });
    }
  }, [organizationUid, copy, enqueueSnackbar, t]);

  // برای نمایش خلاصه‌تر لینک
  const getShortenedUrl = useCallback((url: string, uid: string) => {
    const shortUid = `${uid.slice(0, 8)}...`;
    return `${url}/${shortUid}`;
  }, []);

  const { data, isLoading, refetch } = useAnalyticsExportQuery(
    {
      period: 'year',
      organization_uid: organizationUid,
      format,
    },
    {
      enabled: false, // برای جلوگیری از درخواست خودکار
    }
  );

  const handleExport = async () => {
    await refetch();

    if (data) {
      // ایجاد URL برای دانلود
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `analytics_export.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    }
  };

  const handleShowMore = useCallback(() => {
    dispatch(analyticsViewChanged({ currentTab: 'ai_advisor' }));
    router.push(paths.dashboard.analytics.root);
  }, [dispatch, router]);

  return (
    isSuccess &&
    !isEmpty(analyticsData) && (
      <Card>
        <CardHeader
          title={
            <Stack direction="row" alignItems="center">
              <Box>
                <Typography variant="h6">{t('overview.ai_advisor')}</Typography>
              </Box>
            </Stack>
          }
          action={
            <Button onClick={handleShowMore} sx={{ color: 'primary.main' }}>
              {t('overview.see_more')}
            </Button>
          }
        />

        <Stack sx={{ p: 3 }} direction="row" spacing={2} alignItems="center">
          <Typography variant="h6" noWrap>
            {getShortenedUrl(
              process.env.NEXT_PUBLIC_RECOMMENDER_CARPET_URL || '',
              organizationUid || ''
            )}
          </Typography>

          <Button
            variant="soft"
            startIcon={<Iconify icon="mdi:content-copy" />}
            onClick={() =>
              handleCopyLink(`${process.env.NEXT_PUBLIC_RECOMMENDER_CARPET_URL}/${organizationUid}`)
            }
          >
            {t('overview.copy_link')}
          </Button>

          <Button
            variant="soft"
            startIcon={<Iconify icon="mdi:share-variant" />}
            onClick={handleShare}
          >
            {t('overview.share')}
          </Button>
          <Button
            disabled={isLoading}
            variant="soft"
            startIcon={<Iconify icon="mdi:export-variant" />}
            onClick={handleExport}
          >
            {t('overview.export_analytics')}
          </Button>
        </Stack>

        <Box sx={{ p: 3, pt: 0 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TotalRecommendation
                title={t('overview.total_requests')}
                total={analyticsData.overview.total_requests}
              />
            </Grid>

            {/* <Grid item xs={12} md={4}>
              <TotalRecommendation
                title={t('overview.avg_response_time')}
                total={`${Number(analyticsData.overview.avg_response_time.toFixed(2))}ms`}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TotalRecommendation
                title={t('overview.success_rate')}
                total={`${Number((analyticsData.overview.success_rate * 100).toFixed(0))}%`}
              />
            </Grid> */}
          </Grid>
        </Box>
      </Card>
    )
  );
}

export default OverviewRecommendation;
