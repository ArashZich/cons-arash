// carpetInsights.ts (باید در src/_types/recommender/ قرار گیرد)
export interface CarpetInsightsResponse {
  organization_uid: string;
  time_period: {
    start_date: string;
    end_date: string;
    days: number;
  };
  general_stats: {
    total_recommendations: number;
    unique_carpets_count: number;
  };
  top_recommended_carpets: Array<{
    carpet_id: string;
    carpet_name: string;
    recommendation_count: number;
    first_recommended: string;
    last_recommended: string;
    product_uid: string; // فیلد جدید
    preview_uri: string; // فیلد جدید
  }>;
}
