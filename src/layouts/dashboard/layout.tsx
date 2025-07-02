import { useEffect, useState } from 'react';
// @mui
import Box from '@mui/material/Box';
// hooks
import isEmpty from 'lodash/isEmpty';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
// components
import { useSettingsContext } from 'src/components/settings';
import { SplashScreen } from 'src/components/loading-screen';
// auth
import { useAuthContext } from 'src/auth/hooks';
// redux
import { useDispatch, useSelector } from 'src/redux/store';
import { packageChanged } from 'src/redux/slices/package';
import { organizationChanged, organizationSelector } from 'src/redux/slices/organization';
// routes
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
// _req-hooks
import { usePackagesQuery } from 'src/_req-hooks/reality/package/usePackagesQuery';
import { useNotificationsQuery } from 'src/_req-hooks/reality/notification/useNotificationsQuery';
// filters
import { FilterOperatorsEnum } from 'src/_types/site/filters';
//
import Main from './main';
import Header from './header';
import NavMini from './nav-mini';
import NavVertical from './nav-vertical';
import NavHorizontal from './nav-horizontal';
import NewProjectDialog from './dialog-new-project';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const { user } = useAuthContext();

  const settings = useSettingsContext();
  const organization = useSelector(organizationSelector);
  const dispatch = useDispatch();
  const toggle = useBoolean();
  const router = useRouter();
  const lgUp = useResponsive('up', 'lg');
  const nav = useBoolean();
  const [isLoading, setIsLoading] = useState(true);

  const isHorizontal = settings.themeLayout === 'horizontal';
  const isMini = settings.themeLayout === 'mini';

  const renderNavMini = <NavMini />;
  const renderHorizontal = <NavHorizontal />;
  const renderNavVertical = <NavVertical openNav={nav.value} onCloseNav={nav.onFalse} />;

  const { data, isSuccess } = usePackagesQuery(
    {
      per_page: 1,
      filters: {
        organization_id: { op: FilterOperatorsEnum._, value: organization?.ID },
      },
    },
    { enabled: !!organization?.ID }
  );

  const { data: notificationsData } = useNotificationsQuery(
    {
      page: 1,
      per_page: 10,
      filters: {
        user_id: { op: FilterOperatorsEnum._, value: user?.ID },
        is_read: { op: FilterOperatorsEnum._, value: 0 },
        category_id: { op: FilterOperatorsEnum._, value: organization?.category_id },
      },
    },
    { enabled: !!user?.ID }
  );

  const isOrganizationValid = (org: any) => {
    if (!org) return false;
    if (org.is_individual) {
      return !!org.national_code;
    }
    return !!org.national_code && !!org.company_registration_number;
  };

  const isHeaderActive = user && !isEmpty(user.organizations) && !isEmpty(data?.data?.items[0]);

  useEffect(() => {
    if (user) {
      if (organization) {
        if (isOrganizationValid(organization)) {
          setIsLoading(false);
        } else {
          router.push(paths.identity_verification.root);
        }
      } else if (!isEmpty(user.organizations)) {
        dispatch(organizationChanged(user.organizations[0]));
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [organization, user, dispatch, router]);

  useEffect(() => {
    if (user && !isEmpty(user.organizations)) {
      if (!organization && user.organizations.length > 0) {
        dispatch(organizationChanged(user.organizations[0]));
      }

      if (isSuccess) {
        if (isEmpty(data?.data?.items[0])) {
          router.push(paths.organization.choose_plan(organization?.category_id || 0));
        } else {
          dispatch(packageChanged(data?.data?.items[0]));
        }
      }
    } else {
      router.push(paths.dashboard.root);
    }
  }, [organization, user, dispatch, router, isSuccess, data?.data?.items]);

  const handleClick = () => {
    if (isEmpty(data?.data?.items[0])) {
      toggle.onToggle();
      return;
    }
    router.push(paths.project.choose_category);
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  if (isHorizontal) {
    return (
      <>
        <Header
          onOpenNav={nav.onTrue}
          active={isHeaderActive}
          handleClickNewProject={handleClick}
          disabledBtn={user?.organizations?.[0]?.packages?.[0]?.product_limit === 0}
          notifications={notificationsData?.data.items || []}
        />
        {lgUp ? renderHorizontal : renderNavVertical}
        <Main>{children}</Main>
      </>
    );
  }

  if (isMini) {
    return (
      <>
        <Header
          onOpenNav={nav.onTrue}
          active={isHeaderActive}
          handleClickNewProject={handleClick}
          disabledBtn={user?.organizations?.[0]?.packages?.[0]?.product_limit === 0}
          notifications={notificationsData?.data.items || []}
        />
        <Box
          sx={{
            minHeight: 1,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          {lgUp ? renderNavMini : renderNavVertical}
          <Main>{children}</Main>
        </Box>
      </>
    );
  }

  return (
    <>
      <NewProjectDialog isOpen={toggle.value} onClose={toggle.onFalse} />
      <Header
        onOpenNav={nav.onTrue}
        active={isHeaderActive}
        handleClickNewProject={handleClick}
        disabledBtn={user?.organizations?.[0]?.packages?.[0]?.product_limit === 0}
        notifications={notificationsData?.data.items || []}
      />
      <Box
        sx={{
          minHeight: 1,
          display: !lgUp ? 'block' : 'flex',

          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {renderNavVertical}
        <Main>{children}</Main>
      </Box>
    </>
  );
}
