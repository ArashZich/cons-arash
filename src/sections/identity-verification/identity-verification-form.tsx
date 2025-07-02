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
import LoadingButton from '@mui/lab/LoadingButton';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
// _types
import { legal_individual } from 'src/constants';
// req-hooks
import { useUpdateOrganizationMutation } from 'src/_req-hooks/reality/organization/useUpdateOrganizationMutation';
// routes
import { useRouter } from 'src/routes/hooks';
// config
import { paths } from 'src/routes/paths';

// components
import FormProvider, { RHFTextField, RHFRadioGroup } from 'src/components/hook-form';
// locales
import { useLocales } from 'src/locales';
// redux
import { useSelector, useDispatch } from 'src/redux/store';
import { organizationSelector, organizationChanged } from 'src/redux/slices/organization';
import { useSnackbar } from 'src/components/snackbar';

function IdentityVerificationForm() {
  const router = useRouter();
  const { t } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const organization = useSelector(organizationSelector);
  const dispatchRedux = useDispatch();

  const { mutateAsync: updateOrganization } = useUpdateOrganizationMutation();

  const IdentityVerificationSchema = Yup.object().shape({
    type: Yup.boolean().required(t('auth.type_required')),
    national_code: Yup.string()
      .required(t('auth.national_code_required'))
      .matches(/^\d+$/, t('auth.national_code_must_be_numeric'))
      .max(11, t('auth.national_code_max_length')),
    company_registration_number: Yup.string().when('type', {
      is: false,
      then: (schema) => schema.required(t('auth.company_registration_number_required')),
      otherwise: (schema) => schema,
    }),
  });

  const defaultValues = {
    type: false,
    national_code: '',
    company_registration_number: '',
  };

  const methods = useForm({
    resolver: yupResolver(IdentityVerificationSchema),
    defaultValues,
    mode: 'onChange', // این خط را اضافه کنید
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, isValid }, // isValid را اضافه کنید
    setValue,
    watch,
  } = methods;

  const typeVal = watch('type');

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { data: updatedData } = await updateOrganization({
        ID: organization?.ID || 0,
        organization: {
          ...organization,
          is_individual: data.type,
          national_code: data.national_code,
          company_registration_number: data.type ? '' : data.company_registration_number,
        },
      });

      dispatchRedux(organizationChanged(updatedData));

      enqueueSnackbar(t('organization_management.update_organization_success'), {
        variant: 'success',
      });

      router.push(paths.dashboard.root);
    } catch (error) {
      setError('national_code', { message: error?.data || error.message });
      enqueueSnackbar(error?.data || error.message, { variant: 'error' });
    }
  });

  useEffect(() => {
    if (!organization) {
      router.push(paths.dashboard.root);
    }
  }, [organization, router]);

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100%',
        }}
      >
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack spacing={3} sx={{ width: '100%', textAlign: 'start' }}>
            <Typography variant="h4">{t('identity_verification.identity_verification')}</Typography>
            <Typography mt={1} variant="body2">
              {t('identity_verification.info_message')}
            </Typography>

            <Stack width="100%" mt={1}>
              <RHFRadioGroup
                row
                name="type"
                options={legal_individual(t)}
                onChange={(e) => {
                  const typeValue = e.target.value === 'true';
                  setValue('type', typeValue, { shouldValidate: true });
                }}
              />
            </Stack>

            <RHFTextField
              name="national_code"
              id="national_code"
              label={
                !typeVal
                  ? t('organization_management.national_id_or_economic_number')
                  : t('organization_management.national_code')
              }
            />

            {!typeVal && (
              <RHFTextField
                name="company_registration_number"
                id="company_registration_number"
                label={t('organization_management.company_registration_number')}
              />
            )}

            <LoadingButton
              fullWidth
              color="inherit"
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{ mt: 3 }}
              disabled={!isValid} // این خط را اضافه کنید
            >
              {t('category_management.submit')}
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Box>
    </Container>
  );
}

export default IdentityVerificationForm;
