// @mui
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import { Typography } from '@mui/material';
// locales
import { useLocales } from 'src/locales';

//
import OverviewTopProjects from './overview-top-projects';
import OverviewAnalytics from './overview-analytics';
import OverviewBilling from './overview-billing';
import OverviewRecommendation from './overview-recommendation';

// ----------------------------------------------------------------------

type OverviewProps = {
  organizationType?: string;
  organizationUid?: string;
};

function Overview({ organizationType, organizationUid }: OverviewProps) {
  const { t } = useLocales();
  const showRecommendation = ['recommender', 'enterprise', 'admin'].includes(
    organizationType || ''
  );

  return (
    <Stack spacing={3}>
      <Typography variant="h4">{t('overview.overview')}</Typography>
      <OverviewTopProjects />
      <OverviewAnalytics />
      {showRecommendation && <OverviewRecommendation organizationUid={organizationUid} />}
      <Card sx={{ width: 1 }}>
        <CardHeader title={t('overview.billing')} />
        <OverviewBilling />
      </Card>
    </Stack>
  );
}
export default Overview;
