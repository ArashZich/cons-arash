import React from 'react';
import { CategoryEditView } from 'src/sections/category/view';
import { buildSiteTitle } from 'src/utils/build-site-title';

export const metadata = {
  title: buildSiteTitle('ویرایش دسته بندی'),
};

type Props = {
  params: {
    id: string;
  };
};
export default function CategoryEditPage({ params }: Props) {
  const { id } = params;

  return <CategoryEditView id={id} />;
}
