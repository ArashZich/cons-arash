// src/app/dashboard/admin/category-pricing/page.tsx

import React from 'react';
import { CategoryPricingListView } from 'src/sections/dashboard/admin/category-pricing/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Admin: Category Pricing Management',
};

export default function CategoryPricingPage() {
  return <CategoryPricingListView />;
}
