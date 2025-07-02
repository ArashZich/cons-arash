// src/utils/recommendation-serializer.ts

// Output interfaces
interface BrowserStats {
  label: string; // تغییر از name به label
  value: number;
  icon: string;
}

// برای CurrentDevicesUses کامپوننت
interface DeviceStats {
  label: string;
  value: number;
  icon?: string; // اختیاری کردن icon
}

interface OSStats {
  label: string; // تغییر از name به label
  value: number;
  icon?: string; // اختیاری کردن icon
}

// API Response types
interface RequestItem {
  user_agent: {
    device: {
      type: string;
      family: string;
      brand: string | null;
      model: string | null;
    };
    browser: {
      family: string;
      version: string;
      version_details: {
        major: number;
        minor: number;
        patch: number | null;
      };
    };
    os: {
      family: string;
      version: string;
      version_details: {
        major: number | null;
        minor: number | null;
        patch: number | null;
      };
      platform: string;
    };
    flags: {
      is_mobile: boolean;
      is_tablet: boolean;
      is_touch_capable: boolean;
      is_pc: boolean;
      is_bot: boolean;
    };
  };
  request_id: string;
  timestamp: number;
  session_id: string;
  organization_uid: string;
  method: string;
  path: string;
  response_time: number;
  status_code: number;
  ip_address: string;
  referer: string;
}

interface AnalyticsResponse {
  overview: {
    _id: null;
    total_requests: number;
    avg_response_time: number;
    success_rate: number;
  };
  daily_stats: Array<{
    _id: string;
    count: number;
    avg_response_time: number;
  }>;
  endpoints: Array<{
    _id: string;
    count: number;
    avg_response_time: number;
  }>;
  requests: {
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
    items: RequestItem[];
  };
}

const deviceIcons: Record<string, string> = {
  mobile: 'mdi:cellphone',
  desktop: 'mdi:desktop-classic',
  tablet: 'mdi:tablet',
  bot: 'mdi:robot',
};

const browserIcons: Record<string, string> = {
  Chrome: 'mdi:google-chrome',
  'Chrome Mobile': 'mdi:google-chrome',
  Safari: 'mdi:apple-safari',
  'Mobile Safari': 'mdi:apple-safari',
  Firefox: 'mdi:firefox',
  Edge: 'mdi:microsoft-edge',
  Opera: 'mdi:opera',
};

const osIcons: Record<string, string> = {
  Android: 'mdi:android',
  iOS: 'mdi:apple-ios',
  Windows: 'mdi:microsoft-windows',
  Linux: 'mdi:linux',
  'Mac OS': 'mdi:apple',
};

export function serializeDeviceStats(analyticsData: AnalyticsResponse): DeviceStats[] {
  if (!analyticsData?.requests?.items) return [];

  const deviceCounts = analyticsData.requests.items.reduce((acc: Record<string, number>, item) => {
    const deviceType = item.user_agent.device.type;
    acc[deviceType] = (acc[deviceType] || 0) + 1;
    return acc;
  }, {});

  // حذف محاسبه total و درصد
  return Object.entries(deviceCounts).map(([type, count]) => ({
    label: type,
    value: count, // استفاده مستقیم از count
    icon: deviceIcons[type] || 'mdi:devices',
  }));
}

function normalizeBrowserName(browser: string): string {
  // حذف پسوند Mobile از نام مرورگرها
  const browserMapping: Record<string, string> = {
    'Chrome Mobile': 'Chrome',
    'Mobile Safari': 'Safari',
    'Firefox Mobile': 'Firefox',
    'Edge Mobile': 'Edge',
    'Opera Mobile': 'Opera',
  };

  return browserMapping[browser] || browser;
}

export function serializeBrowserStats(analyticsData: AnalyticsResponse): BrowserStats[] {
  if (!analyticsData?.requests?.items) return [];

  const browserCounts = analyticsData.requests.items.reduce((acc: Record<string, number>, item) => {
    const browser = normalizeBrowserName(item.user_agent.browser.family);
    acc[browser] = (acc[browser] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(browserCounts).map(([browser, count]) => ({
    label: browser,
    value: count,
    icon: browserIcons[browser] || 'mdi:web',
  }));
}

export function serializeOSStats(analyticsData: AnalyticsResponse): OSStats[] {
  if (!analyticsData?.requests?.items) return [];

  const osCounts = analyticsData.requests.items.reduce((acc: Record<string, number>, item) => {
    const os = item.user_agent.os.family;
    acc[os] = (acc[os] || 0) + 1;
    return acc;
  }, {});

  // حذف محاسبه total و درصد
  return Object.entries(osCounts).map(([os, count]) => ({
    label: os,
    value: count, // استفاده مستقیم از count
    icon: osIcons[os] || 'mdi:operating-system',
  }));
}

export function serializeDailyStats(analyticsData: AnalyticsResponse) {
  if (!analyticsData?.daily_stats) return [];

  return analyticsData.daily_stats.map((stat) => ({
    date: stat._id,
    requests: stat.count,
    // responseTime: Number(stat.avg_response_time.toFixed(2)),
  }));
}

export function serializeOverviewStats(analyticsData: AnalyticsResponse) {
  if (!analyticsData?.overview) return null;

  return {
    totalRequests: analyticsData.overview.total_requests,
    // avgResponseTime: Number(analyticsData.overview.avg_response_time.toFixed(2)),
    // successRate: Number((analyticsData.overview.success_rate * 100).toFixed(0)),
  };
}
