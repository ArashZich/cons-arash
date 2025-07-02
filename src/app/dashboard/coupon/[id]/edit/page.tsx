import React from 'react';
import { CouponEditView } from 'src/sections/dashboard/coupon/view';
import { buildSiteTitle } from 'src/utils/build-site-title';

export const metadata = {
  title: buildSiteTitle('ویرایش کد تخفیف'),
};

type Props = {
  params: {
    id: string;
  };
};
export default function CouponEditPage({ params }: Props) {
  const { id } = params;

  return <CouponEditView id={id} />;
}
