import React from 'react';
import { CouponListView } from 'src/sections/dashboard/coupon/view';
import { buildSiteTitle } from 'src/utils/build-site-title';

export const metadata = {
  title: buildSiteTitle('کد تخفیف'),
};

export default function CouponList() {
  return <CouponListView />;
}
