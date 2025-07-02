import { fDate } from './format-time';

const handleExport = (analytics: any[]) => {
  const result: Record<string, any> = {};

  analytics.forEach((item) => {
    const key = item.name;
    // Consider names as case-insensitive
    result[key] = result[key] || { is_ar_count: 0, is_3d_count: 0, impression: 0 };

    // Count true values for is_ar
    if (item.is_ar) {
      result[key].is_ar_count++;
    }

    // Count true values for is_3d
    if (item.is_3d) {
      result[key].is_3d_count++;
    }

    // Increase impression count
    result[key].impression++;

    // Count browsers
    const browserKey = item.browser_agent.toLowerCase();
    result[key][browserKey] = (result[key][browserKey] || 0) + 1;

    const os = item.operating_sys.toLowerCase();
    result[key][os] = (result[key][os] || 0) + 1;
  });

  // Output the result as a JSON string
  const flattenedResult: Record<string, any> = {};

  // Flatten browsers object
  Object.keys(result).forEach((key) => {
    const browsers = result[key].browsers || {};
    const os = result[key].os || {};
    flattenedResult[key] = { ...result[key], ...browsers, ...os };
  });

  const csvData = [];

  // Add header
  const allKeys = new Set([
    'name',
    'is_ar_count',
    'is_3d_count',
    'impression',
    ...Object.keys(flattenedResult[Object.keys(flattenedResult)[0]] || {}),
  ]);
  const header = Array.from(allKeys);
  csvData.push(header.join(','));

  // Add data
  Object.keys(flattenedResult).forEach((key) => {
    const row = header.map((column) => flattenedResult[key][column] || 0);
    csvData.push([key, ...row].join(','));
  });

  // Convert to CSV format
  const csv = csvData.join('\n');

  // Create a Blob object and trigger the download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `Analytics-${fDate(new Date())}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export { handleExport };
