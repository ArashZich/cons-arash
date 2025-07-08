// src/app/dashboard/admin/discount-rules/page.tsx

import React from 'react';
import { DiscountRulesListView } from 'src/sections/dashboard/admin/discount-rules/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Admin: Discount Rules Management',
};

export default function DiscountRulesPage() {
  return <DiscountRulesListView />;
}
