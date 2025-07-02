// export const LocalText = {
//   // toolbarColumns: 'ستون ها',
//   toolbarColumns: "columns",
//   toolbarDensity: 'تراکم',
//   toolbarExport: 'خروجی',
//   toolbarExportCSV: 'دانلود به عنوان فایل CSV',
//   toolbarExportPrint: 'چاپ',
//   toolbarFilters: ' فیلتر ها',
// };

import { useLocales } from 'src/locales';

export const LocalText = () => {
  const { t } = useLocales();

  return {
    toolbarColumns: t('category_management.columns'),
    toolbarDensity: t('category_management.density'),
    toolbarExport: t('category_management.export'),
    toolbarExportCSV: t('category_management.export_csv'),
    toolbarExportPrint: t('category_management.export_print'),
    toolbarFilters: t('category_management.filters'),
  };
};
