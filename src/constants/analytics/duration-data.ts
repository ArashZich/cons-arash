export type DurationType = 'one_week' | 'one_month' | 'three_months' | 'six_months' | 'one_year';

type Duration = {
  label: DurationType;
  value: DurationType;
};

export const duration_list: Duration[] = [
  {
    label: 'one_week',
    value: 'one_week',
  },
  {
    label: 'one_month',
    value: 'one_month',
  },
  {
    label: 'three_months',
    value: 'three_months',
  },
  {
    label: 'six_months',
    value: 'six_months',
  },
  {
    label: 'one_year',
    value: 'one_year',
  },
];
