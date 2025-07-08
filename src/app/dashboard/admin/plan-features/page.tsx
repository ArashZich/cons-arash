// src/app/dashboard/admin/plan-features/page.tsx

import React from 'react';
import { PlanFeaturesListView } from 'src/sections/dashboard/admin/plan-features/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Admin: Plan Features Management',
};

export default function PlanFeaturesPage() {
  return <PlanFeaturesListView />;
}
