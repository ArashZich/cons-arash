import React from 'react';
import { PlanCreateView } from 'src/sections/plan/view';
import { buildSiteTitle } from 'src/utils/build-site-title';

export const metadata = {
  title: buildSiteTitle('دسته بندی: دسته جدید'),
};

export default function PlanCreatePage() {
  return <PlanCreateView />;
}
