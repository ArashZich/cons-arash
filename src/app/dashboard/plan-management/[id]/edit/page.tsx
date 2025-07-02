import React from 'react';
import { PlanEditView } from 'src/sections/plan/view';
import { buildSiteTitle } from 'src/utils/build-site-title';

export const metadata = {
  title: buildSiteTitle('ویرایش دسته بندی'),
};

type Props = {
  params: {
    id: string;
  };
};
export default function PlanEditPage({ params }: Props) {
  const { id } = params;

  return <PlanEditView id={id} />;
}
