// hooks
// import isEmpty from 'lodash/isEmpty';
// react
// import { useEffect } from 'react';
// @mui
import Box from '@mui/material/Box';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// auth
// import { useAuthContext } from 'src/auth/hooks';
// components
import { useSettingsContext } from 'src/components/settings';
// redux
// import { useDispatch, useSelector } from 'src/redux/store';
// import { packageChanged } from 'src/redux/slices/package';
// import { organizationChanged, organizationSelector } from 'src/redux/slices/organization';
// routes
// import { useRouter } from 'src/routes/hooks';
// import { paths } from 'src/routes/paths';
// _req-hooks
// import { usePackagesQuery } from 'src/_req-hooks/reality/package/usePackagesQuery';
// filters
// import { FilterOperatorsEnum } from 'src/_types/site/filters';
//
import Main from './main';
import Header from '../dashboard/header';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function BusinessLayout({ children }: Props) {
  // const { user } = useAuthContext();
  const settings = useSettingsContext();
  // const organization = useSelector(organizationSelector);
  // const dispatch = useDispatch();
  // const router = useRouter();
  const nav = useBoolean();

  const isHorizontal = settings.themeLayout === 'horizontal';

  const isMini = settings.themeLayout === 'mini';

  // const { data, isSuccess } = usePackagesQuery(
  //   {
  //     per_page: 1,
  //     filters: {
  //       organization_id: { op: FilterOperatorsEnum._, value: organization?.ID },
  //     },
  //   },
  //   { enabled: !!organization?.ID }
  // );

  // useEffect(() => {
  //   if (user && isEmpty(user?.organizations)) {
  //     router.push(paths.dashboard.root);
  //   } else if (!organization && user && user?.organizations?.length > 0) {
  //     dispatch(organizationChanged(user.organizations[0]));
  //   }

  //   if (isSuccess) {
  //     if (isEmpty(data?.data?.items[0])) {
  //       router.push(paths.organization.choose_plan(organization?.category_id || 0));
  //     } else {
  //       dispatch(packageChanged(data?.data?.items[0]));
  //     }
  //   }
  // }, [organization, user, dispatch, router, isSuccess, data?.data?.items]);

  if (isHorizontal) {
    return (
      <>
        <Header onOpenNav={nav.onTrue} active={false} activeBtn={false} />

        <Main>{children}</Main>
      </>
    );
  }

  if (isMini) {
    return (
      <>
        <Header onOpenNav={nav.onTrue} active={false} activeBtn={false} />

        <Box
          sx={{
            minHeight: 1,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Main>{children}</Main>
        </Box>
      </>
    );
  }

  return (
    <>
      <Header onOpenNav={nav.onTrue} active={false} activeBtn={false} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Main>{children}</Main>
      </Box>
    </>
  );
}
