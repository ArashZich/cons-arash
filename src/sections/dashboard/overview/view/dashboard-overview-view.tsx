'use client';

// @mui
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
// lodash
import isEmpty from 'lodash/isEmpty';
// components
import { useSettingsContext } from 'src/components/settings';
// auth
import { useAuthContext } from 'src/auth/hooks';
import { useProductsQuery } from 'src/_req-hooks/reality/product/useProductsQuery';
// _types
import { FilterOperatorsEnum } from 'src/_types/site/filters';
// redux
import { useSelector } from 'src/redux/store';
import { organizationSelector } from 'src/redux/slices/organization';

import Project from '../project';
import Organization from '../organization';
import Overview from '../overview';

// ----------------------------------------------------------------------

function DashboardOverviewView() {
  const { user } = useAuthContext();
  const settings = useSettingsContext();
  const organization = useSelector(organizationSelector);

  const { data } = useProductsQuery({
    filters: {
      organization_id: { op: FilterOperatorsEnum._, value: organization?.ID },
    },
  });

  if (isEmpty(user?.organizations)) {
    return (
      <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ height: '100%' }}>
        <Organization />
      </Container>
    );
  }

  return (
    <>
      {!isEmpty(data?.data?.items) ? (
        // <Stack maxWidth={1200} sx={{ height: '100%', px: 2 }}>
        <Stack>
          <Overview
            organizationType={organization?.organization_type}
            organizationUid={organization?.organization_uid}
          />
        </Stack>
      ) : (
        // </Stack>
        <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ height: '100%' }}>
          <Project />
        </Container>
      )}
    </>
  );
}
export default DashboardOverviewView;
