'use client';

// react
import { useState, useCallback, SyntheticEvent, ReactNode, useMemo, useEffect } from 'react';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
// i18n
import { useLocales } from 'src/locales';
// redux
import { useSelector, useDispatch } from 'src/redux/store';
import { planPurchaseSelector, planPurchaseChanged } from 'src/redux/slices/organization';

//
import OrganizationInformation from '../organization-information';
import PlanAndPurchasing from '../plan-and-purchasing';
import BillingAndInvoice from '../billing-and-invoice';

export type OrganizationManagementTabType = { [key: string]: OrganizationManagementTabTypeItem };

export type OrganizationManagementTabTypeItem = {
  value: string;
  label: string;
  component: ReactNode;
};

function OrganizationManagementView() {
  const { t } = useLocales();
  const dispatch = useDispatch();
  const planPurchase = useSelector(planPurchaseSelector);

  const TABS = useMemo(
    (): OrganizationManagementTabType => ({
      organization_information: {
        value: 'organization_information',
        label: t('organization_management.organization_information'),
        component: <OrganizationInformation />,
      },
      plan_and_purchasing: {
        value: 'plan_and_purchasing',
        label: t('organization_management.plan_and_purchasing'),
        component: <PlanAndPurchasing />,
      },
      user_information: {
        value: 'user_information',
        label: t('organization_management.user_information'),
        component: <BillingAndInvoice />,
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [currentTab, setCurrentTab] = useState<string>('organization_information');

  const handleChangeTab = useCallback(
    (event: SyntheticEvent, newValue: string) => {
      dispatch(planPurchaseChanged(''));
      setCurrentTab(newValue);
    },
    [dispatch]
  );

  useEffect(() => {
    if (planPurchase) {
      setCurrentTab(planPurchase);
    }
  }, [planPurchase]);

  return (
    <Stack spacing={1}>
      <Typography variant="h4">{t('dashboard.organization_management')}</Typography>
      <Stack sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} onChange={handleChangeTab}>
          {Object.keys(TABS).map((tabName) => (
            <Tab
              key={TABS[tabName].value}
              value={TABS[tabName].value}
              label={TABS[tabName].label}
            />
          ))}
        </Tabs>
      </Stack>

      <Box>{TABS[currentTab].component}</Box>
    </Stack>
  );
}

export default OrganizationManagementView;
