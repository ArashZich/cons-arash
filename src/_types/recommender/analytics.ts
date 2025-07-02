// types.ts
export type PeriodType = 'week' | 'month' | '6month' | 'year';

export interface UserAgentBrowser {
  family: string;
  version: string;
  version_details: {
    major: number;
    minor: number;
    patch: number | null;
  };
}

export interface UserAgentOS {
  family: string;
  version: string;
  version_details: {
    major: number;
    minor: number | null;
    patch: number | null;
  };
  platform: string;
}

export interface UserAgentDevice {
  family: string;
  brand: string;
  model: string;
  type: string;
}

export interface UserAgentFlags {
  is_mobile: boolean;
  is_tablet: boolean;
  is_touch_capable: boolean;
  is_pc: boolean;
  is_bot: boolean;
}

export interface RequestItem {
  request_id: string;
  timestamp: number;
  session_id: string;
  organization_uid: string;
  method: string;
  path: string;
  response_time: number;
  status_code: number;
  user_agent: {
    browser: UserAgentBrowser;
    os: UserAgentOS;
    device: UserAgentDevice;
    flags: UserAgentFlags;
  };
  ip_address: string;
  referer: string;
}

export interface AnalyticsResponse {
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
