import React from 'react';
import { PlanListView } from 'src/sections/plan/view';
import { buildSiteTitle } from 'src/utils/build-site-title';

export const metadata = {
  title: buildSiteTitle('دسته بندی'),
};

export default function PlanList() {
  return <PlanListView />;
}
