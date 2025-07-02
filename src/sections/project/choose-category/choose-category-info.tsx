// react
import React from 'react';

// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// locales
import { useLocales } from 'src/locales';

// req-hooks
import { usePackagesQuery } from 'src/_req-hooks/reality/package/usePackagesQuery';
import { useCategoriesQuery } from 'src/_req-hooks/reality/category/useCategoriesQuery';
// utils
import { calculateRemainingDays } from 'src/utils/calculate-remaining-days';
// types
import { FilterOperatorsEnum } from 'src/_types/site/filters';
import { CategoryData } from 'src/_types/reality/category/categoryData';

// redux
import { useDispatch, useSelector } from 'src/redux/store';
import {
  projectCategoryIdChanged,
  projectCategoryNameChanged,
  acceptedFileTypeChanged,
  projectCategoryIdSelector,
  acceptedFileTypeSelector,
} from 'src/redux/slices/project';
import { organizationSelector } from 'src/redux/slices/organization';
// components
import { useSnackbar } from 'src/components/snackbar';
import { BackButton, LoadingButton } from 'src/components/button';
//
import ItemChosen from './item-chosen';

function ChooseCategoryInfo() {
  const { t } = useLocales();
  const organization = useSelector(organizationSelector);
  const acceptedFileType = useSelector(acceptedFileTypeSelector);
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const categoryId = useSelector(projectCategoryIdSelector);

  const router = useRouter();

  const handleCategory = (item: CategoryData) => {
    dispatch(projectCategoryIdChanged(item.ID));
    dispatch(projectCategoryNameChanged(item.title));
    dispatch(acceptedFileTypeChanged(item.accepted_file_type));
  };

  const { data: dataPackage } = usePackagesQuery(
    {
      per_page: 1,
      filters: {
        organization_id: { op: FilterOperatorsEnum._, value: organization?.ID },
      },
    },
    { enabled: !!organization?.ID }
  );

  // Assuming expired_at is in a valid date format that JavaScript can parse
  const remainingDays = dataPackage?.data?.items[0]?.expired_at
    ? calculateRemainingDays(dataPackage.data.items[0].expired_at as string)
    : null;

  const { data: categoryData } = useCategoriesQuery(
    {
      filters: {
        parent_id: {
          op: FilterOperatorsEnum._,
          value: organization?.category_id, //! here
        },
      },
    },
    {
      enabled: !!organization?.category_id,
    }
  );

  const handleContinue = () => {
    if (remainingDays === 0) {
      enqueueSnackbar(t('project.expire_date_package'), { variant: 'warning' });
      return;
    }
    if (acceptedFileType === 'multi-images') {
      router.push(`${paths.project.decoro_sphere}`);
    } else {
      router.push(`${paths.project.project_information}`);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <Stack alignItems="center">
      <Typography variant="h5">{t('project.choose_category')}</Typography>
      <Typography
        color="text.disabled"
        variant="body2"
        sx={{ mt: 1, mb: 3, whiteSpace: 'break-spaces' }}
        align="center"
      >
        {t('project.description_choose_category')}
      </Typography>

      <Grid
        sx={{ width: '100%' }}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        justifyContent="center"
      >
        {React.Children.toArray(
          categoryData?.data.items?.map((item) => (
            <Grid xs={2} sm={4} md={3}>
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
      <Stack width="53%" spacing={1} mt={3} alignItems="center">
        <LoadingButton
          sx={{ mt: 4 }}
          fullWidth
          title={t('project.continue')}
          disabled={!categoryId}
          onClick={handleContinue}
        />

        <Stack alignItems="center" sx={{ mt: 3 }}>
          <BackButton title={t('project.back')} onClick={handleBack} />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ChooseCategoryInfo;
