// react
import React, { useEffect } from 'react';

// yup
import * as Yup from 'yup';
// react-hook-form
import { useForm } from 'react-hook-form';

// @hookform
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// routes
import { isNull } from 'lodash';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

// locales
import { useLocales } from 'src/locales';
// components
import { BackButton, LoadingButton } from 'src/components/button';
import FormProvider from 'src/components/hook-form';
import { RHFRadioGroupCustom } from 'src/components/custom-components';
import { useSnackbar } from 'src/components/snackbar';

// redux
import { useDispatch, useSelector } from 'src/redux/store';
import { organizationChanged, organizationInfoSelector } from 'src/redux/slices/organization';

// req-hooks
import { useCategoriesQuery } from 'src/_req-hooks/reality/category/useCategoriesQuery';
import { useCreateOrganizationMutation } from 'src/_req-hooks/reality/organization/useCreateOrganizationMutation';

// types
import { FilterOperatorsEnum } from 'src/_types/site/filters';

// utils
import { transformData } from 'src/utils/transform-data';
import { CreateOrganizationRequestBodyType } from 'src/_types/reality/organization/createOrganization';

function ActivitiesForm() {
  const { t } = useLocales();
  const router = useRouter();
  const dispatch = useDispatch();
  const organizationInfo = useSelector(organizationInfoSelector);
  const { enqueueSnackbar } = useSnackbar();
  const { data: mainCategory } = useCategoriesQuery({
    order: 'asc',
    filters: { parent_id: { op: FilterOperatorsEnum.IS_EMPTY, value: 0 } },
  });

  const { mutateAsync: createOrganization, isLoading } = useCreateOrganizationMutation();

  const transformedData = mainCategory ? transformData(mainCategory) : [];

  // const cat_list = transformedData;
  // const cat_list = transformedData && transformedData.filter((item) => item.value !== 12);

  const ActivitiesSchema = Yup.object().shape({
    category_id: Yup.number().required(t('organization.activities_required')),
  });

  const defaultValues = {
    category_id: null,
  };

  const methods = useForm({
    resolver: yupResolver(ActivitiesSchema) as any,
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (values) => {
    try {
      const items = {
        ...organizationInfo,
        category_id: values.category_id || 0,
      } as CreateOrganizationRequestBodyType;
      const { data } = await createOrganization(items);
      dispatch(organizationChanged(data));
      router.push(paths.organization.choose_plan(values.category_id || 0));
    } catch (error) {
      enqueueSnackbar(error?.data, {
        variant: 'error',
      });
    }
  });

  useEffect(() => {
    if (isNull(organizationInfo)) {
      router.push(paths.organization.company_info);
    }
  }, [organizationInfo, router]);

  const handleBack = () => {
    router.back();
  };

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack alignItems="center">
        <Typography variant="h5">{t('organization.products_activities')}</Typography>
        <Typography
          color="text.disabled"
          variant="body2"
          sx={{ mt: 1, whiteSpace: 'break-spaces' }}
          align="center"
        >
          {t('organization.description_products_activities')}
        </Typography>
        <Stack sx={{ maxWidth: 'sm', width: '80%', px: 5 }} spacing={1} mt={3}>
          <Stack>
            <RHFRadioGroupCustom name="category_id" spacing={1} options={transformedData} />
          </Stack>

          <LoadingButton
            sx={{ mt: 4 }}
            fullWidth
            title={t('organization.continue')}
            loading={isLoading}
          />

          <BackButton title={t('organization.back')} onClick={handleBack} sx={{ mt: 1 }} />
        </Stack>
      </Stack>
    </FormProvider>
  );
}

export default ActivitiesForm;
