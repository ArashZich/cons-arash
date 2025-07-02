import React from 'react';
import { CategoryListView } from 'src/sections/category/view';
import { buildSiteTitle } from 'src/utils/build-site-title';

export const metadata = {
  title: buildSiteTitle('دسته بندی'),
};

export default function CategoryList() {
  return <CategoryListView />;
}
