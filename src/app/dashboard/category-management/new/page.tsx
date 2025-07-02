import React from 'react';
import { CategoryCreateView } from 'src/sections/category/view';
import { buildSiteTitle } from 'src/utils/build-site-title';

export const metadata = {
  title: buildSiteTitle('دسته بندی: دسته جدید'),
};

export default function CategoryCreatePage() {
  return <CategoryCreateView />;
}
