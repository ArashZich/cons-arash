// react
import React, { useEffect, useCallback, useMemo } from 'react';

// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
// icon
import { Icon } from '@iconify/react';
// lodash
import isNull from 'lodash/isNull';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// locales
import { useLocales } from 'src/locales';
// auth
import { useAuthContext } from 'src/auth/hooks';
// req-hooks
import { useCategoriesQuery } from 'src/_req-hooks/reality/category/useCategoriesQuery';
// types
import { FilterOperatorsEnum } from 'src/_types/site/filters';

// redux
import { useSelector } from 'src/redux/store';
import { projectCategoryIdSelector } from 'src/redux/slices/project';
import { organizationSelector } from 'src/redux/slices/organization';

// types
import { CategoryData } from 'src/_types/reality/category/categoryData';
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { LoadingScreen } from 'src/components/loading-screen';
//
import ItemChosen from './item-chosen';

function ChooseCategory() {
  const { t } = useLocales();
  const { user } = useAuthContext();
  const organization = useSelector(organizationSelector);
  const categoryId = useSelector(projectCategoryIdSelector);
  const router = useRouter();

  // Add retry logic for data fetching
  const { data: categoryData, refetch } = useCategoriesQuery(
    {
      filters: {
        parent_id: {
          op: FilterOperatorsEnum._,
          value: organization?.category_id,
        },
      },
    },
    {
      enabled: !isNull(organization),
      retry: 3, // Retry 3 times if query fails
      retryDelay: 1000, // Wait 1 second between retries
    }
  );

  // Add effect to handle data fetching when user/organization changes
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!user?.organizations || !organization) {
      const timer = setTimeout(() => {
        refetch();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [user?.organizations, organization, refetch]);

  const handleCategory = useCallback(
    (item: CategoryData) => {
      router.push(paths.dashboard.projects.list(item.ID, item.title));
    },
    [router]
  );

  const parentTitle = categoryData?.data.items[0]?.parent.title;

  const hasProductLimit = useMemo(() => {
    if (!user?.organizations?.length) return false;
    const packages = user.organizations[0]?.packages;
    if (!packages?.length) return false;
    return packages[0]?.product_limit === 0;
  }, [user?.organizations]);

  if (!user?.organizations || !organization) {
    return <LoadingScreen />; // Or your custom loading component
  }

  return (
    <>
      <Stack>
        <CustomBreadcrumbs
          links={[
            { name: t('dashboard.root'), href: paths.dashboard.root },
            { name: parentTitle ? t(`category.${parentTitle}`) : '' },
          ]}
        />
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" mt={1} mb={3.5}>
          <Typography variant="h4">{parentTitle ? t(`category.${parentTitle}`) : ''}</Typography>
          <Button
            variant="contained"
            sx={{ bgcolor: (theme) => theme.palette.common.black }}
            startIcon={<Icon icon="ph:plus-bold" />}
            onClick={() => router.push(paths.project.choose_category)}
            disabled={hasProductLimit}
          >
            {t('project.add_project_category')}
          </Button>
        </Stack>
      </Stack>
      <Stack alignItems="flex-start" maxWidth="lg">
        <Grid
          sx={{ width: '100%' }}
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {React.Children.toArray(
            categoryData?.data.items?.map((item) => (
              <Grid xs={2} sm={4} md={4}>
                <ItemChosen
                  item={item}
                  active={item.ID === categoryId}
                  setActive={() => handleCategory(item)}
                  label={t(`category.${item.title}`)}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Stack>
    </>
  );
}

export default ChooseCategory;
