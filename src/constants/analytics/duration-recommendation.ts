export type DurationRecommendationType = 'week' | 'month' | '6month' | 'year';

type Duration = {
  label: DurationRecommendationType;
  value: DurationRecommendationType;
};

export const duration_recommendation_list: Duration[] = [
  {
    label: 'week',
    value: 'week',
  },
  {
    label: 'month',
    value: 'month',
  },
  {
    label: '6month',
    value: '6month',
  },
  {
    label: 'year',
    value: 'year',
  },
];
