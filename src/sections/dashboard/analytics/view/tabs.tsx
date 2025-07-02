// component
import Iconify from 'src/components/iconify/iconify';

//
import ImpressionView from '../impression';
import TotalView from '../total';
import Views3D from '../views_3d';
import ARViews from '../ar_views';
import BrowsersView from '../browsers';
import DevicesView from '../devices';
import RecommendationView from '../recommendation';
import CarpetInsights from '../carpet-insights';
// import LocationView from '../location';

//----------------------------------------------------------------

const icon = (name: string) => <Iconify icon={name} sx={{ width: 24, height: 24 }} />;

const ICONS = {
  browsers: icon('mdi:web'),
  devices: icon('mdi:cellphone'),
  impression: icon('mdi:eye-outline'),
  views3d: icon('mdi:rotate-3d-variant'),
  location: icon('mdi:map-marker-outline'),
  total: icon('material-symbols:finance-mode'),
  ar_views: icon('material-symbols:view-in-ar-outline'),
  ai_advisor: icon('mdi:robot-outline'),
  carpet_insights: icon('mdi:carpet'),
};
//----------------------------------------------------------------
export const TABS = (t: Function, showRecommendation: boolean, organization_id: number) => {
  const tabs = [
    {
      value: 'total',
      label: t('analytics.total'),
      icon: ICONS.total,
      component: <TotalView organization_id={organization_id} />,
    },
    {
      value: 'impression',
      label: t('analytics.impression'),

      icon: ICONS.impression,
      component: (
        <ImpressionView title={t('analytics.impression')} organization_id={organization_id} />
      ),
    },
    {
      value: 'views3d',
      label: t('analytics.views3d'),
      icon: ICONS.views3d,
      component: <Views3D title={t('analytics.views3d')} organization_id={organization_id} />,
    },
    {
      value: 'ar_views',
      label: t('analytics.ar_views'),
      icon: ICONS.ar_views,
      component: <ARViews title={t('analytics.ar_views')} organization_id={organization_id} />,
    },
    {
      value: 'devices',
      label: t('analytics.devices'),
      icon: ICONS.devices,
      component: <DevicesView title={t('analytics.devices')} organization_id={organization_id} />,
    },
    {
      value: 'browsers',
      label: t('analytics.browsers'),
      icon: ICONS.browsers,
      component: <BrowsersView title={t('analytics.browsers')} organization_id={organization_id} />,
    },
  ];
  if (showRecommendation) {
    tabs.push(
      {
        value: 'ai_advisor',
        label: t('analytics.ai_advisor'),
        icon: ICONS.ai_advisor,
        component: <RecommendationView />,
      },
      {
        value: 'carpet_insights',
        label: t('analytics.carpet_insights'),
        icon: ICONS.carpet_insights,
        component: <CarpetInsights />,
      }
    );
  }

  // {
  //   value: 'location',
  //   label: t('analytics.location'),
  //   icon: ICONS.location,
  //   component: <LocationView title={t('analytics.location')} />,
  // },

  return tabs;
};
