import React from 'react';
import AnalyticsView from 'src/sections/dashboard/analytics/view/analytics-view';

export const metadata = {
  title: 'Dashboard: Analytics',
};

type Props = {
  params?: {
    id?: string;
  };
};

function AnalyticsPage({ params }: Props) {
  return <AnalyticsView id={params?.id} />;
}

export default AnalyticsPage;
