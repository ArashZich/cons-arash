import React from 'react';
import { CouponCreateView } from 'src/sections/dashboard/coupon/view';
import { buildSiteTitle } from 'src/utils/build-site-title';

export const metadata = {
  title: buildSiteTitle('کد تخفیف: ایجاد کد تخفیف'),
};

export default function CouponCreatePage() {
  return <CouponCreateView />;
}
