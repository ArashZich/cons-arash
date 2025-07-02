// react
import React, { useCallback } from 'react';

// yup
import * as Yup from 'yup';
// react-hook-form
import { useForm } from 'react-hook-form';

// @hookform
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// lodash
import { isEmpty } from 'lodash';
// useImmer
import { useImmer } from 'use-immer';
// routes
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

// locales
import { useLocales } from 'src/locales';
// hook-form
import FormProvider, { RHFTextField } from 'src/components/hook-form';
// components
import { BackButton, LoadingButton } from 'src/components/button';
import { UploadBox } from 'src/components/upload';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import CircleProgress from 'src/components/modal-progress/circular-progress';

// redux
import { useDispatch } from 'src/redux/store';
import { organizationInfoChanged } from 'src/redux/slices/organization';

// req-hooks
import { useUploadFileMutation } from 'src/_req-hooks/bytebase/file/useUploadFileMutation';
// types
import { CreateOrganizationRequestBodyType } from 'src/_types/reality/organization/createOrganization';

type CreateOrganizationRequestBodySchema = {
  [K in keyof CreateOrganizationRequestBodyType]: Yup.AnySchema;
};

const ONE_MEGABYTE = 1048576;

interface State {
  file: File | string | null;
  uploadedFileName: string;
}

function InformationForm() {
  const { t } = useLocales();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [state, setState] = useImmer<State>({
    file: null as File | string | null,
    uploadedFileName: '',
  });

  const { file, uploadedFileName } = state;

  const InformationSchema = Yup.object().shape<CreateOrganizationRequestBodySchema>({
    name: Yup.string().required(t('organization.company_name_required')),
    industry: Yup.string().required(t('organization.industry_required')),
    company_size: Yup.number()
      .positive(t('organization.company_size_positive'))
      .integer(t('organization.company_size_integer')),
    phone_number: Yup.string()
      .required(t('organization.phone_number_required'))
      .matches(/^(09\d{9}|0\d{10})$/, t('auth.phone_number_landing_number')),
    website: Yup.string().url(t('organization.website_valid')),
    company_logo: Yup.string().required(t('organization.company_logo_required')),
  });

  const defaultValues = {
    name: '',
    industry: '',
    company_size: 0,
    phone_number: '',
    website: '',
    company_logo: '',
  } satisfies CreateOrganizationRequestBodyType;

  const methods = useForm<CreateOrganizationRequestBodyType>({
    resolver: yupResolver(InformationSchema) as any,
    defaultValues,
  });

  const {
    formState: { isSubmitting, errors },
    setValue,
    handleSubmit,
    setError,
    reset,
  } = methods;

  const onSubmit = handleSubmit(async (values) => {
    try {
      dispatch(organizationInfoChanged(values));
      router.push(paths.organization.company_activities);
    } catch (error) {
      reset();
      enqueueSnackbar(error?.data, {
        variant: 'error',
      });
    }
  });

  const { mutateAsync: upload, isLoading: uploadLoading } = useUploadFileMutation();

  const handleDropRejected = useCallback(
    (err: { errors: { code: string }[] }[]) => {
      if (err[0].errors[0].code === 'file-too-large') {
        enqueueSnackbar(t('organization.company_logo_size_1mb'), { variant: 'error' });
      }
    },
    [enqueueSnackbar, t]
  );

  const handleBack = () => {
    router.back();
  };

  const setFile = (newFile: File | string | null) => {
    setState((draft) => {
      draft.file = newFile;
    });
  };

  const updateUploadedFileName = (newFileName: string) => {
    setState((draft) => {
      draft.uploadedFileName = newFileName;
    });
  };

  const handleDropSingleFile = useCallback(async (acceptedFiles: File[]) => {
    const newFile = acceptedFiles[0];
    if (newFile) {
      setFile(
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        })
      );

      try {
        const filesResult = await upload({ files: [newFile] });
        updateUploadedFileName(newFile.name);

        setValue(
          'company_logo',
          process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL_DOWNLOAD + filesResult.data[0]
        );
      } catch (error) {
        setError('company_logo', { message: error.data.company_logo[0] });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack alignItems="center">
        <Typography variant="h5">{t('organization.add_organization')}</Typography>
        <Typography
          color="text.disabled"
          variant="body2"
          sx={{ mt: 1, whiteSpace: 'break-spaces' }}
          align="center"
        >
          {t('organization.description_organization')}
        </Typography>
        <Stack sx={{ maxWidth: 'sm', width: '100%' }} spacing={3} mt={1}>
          <Stack>
            <CircleProgress open={uploadLoading} />
            <UploadBox
              onDrop={handleDropSingleFile}
              onDropRejected={handleDropRejected}
              file={file}
              accept={{ 'image/*': [] }}
              maxSize={ONE_MEGABYTE}
              placeholder={
                <Stack spacing={0.5} alignItems="center" sx={{ color: 'text.disabled' }}>
                  <Iconify icon="eva:cloud-upload-fill" width={40} />
                  <Typography variant="body2">
                    {isEmpty(uploadedFileName)
                      ? t('organization.upload_company_logo')
                      : uploadedFileName}
                  </Typography>
                </Stack>
              }
              sx={{
                py: 2.5,
                width: 'auto',
                height: 'auto',
                borderRadius: 1.5,
              }}
            />
            {errors.company_logo && (
              <Typography variant="caption" color="error" sx={{ px: 2, mt: 0.5 }}>
                {errors?.company_logo?.message?.toString()}
              </Typography>
            )}
          </Stack>

          <RHFTextField name="name" label={t('organization.company_name')} />
          <RHFTextField
            name="industry"
            label={t('organization.industry')}
            placeholder={t('organization.industry_example')}
          />
          <RHFTextField type="number" name="company_size" label={t('organization.company_size')} />
          <RHFTextField name="phone_number" label={t('organization.phone_number')} />
          <RHFTextField name="website" label={t('organization.website')} />

          <LoadingButton
            type="submit"
            fullWidth
            title={t('organization.continue')}
            loading={isSubmitting}
          />

          <BackButton title={t('organization.back')} onClick={handleBack} />
        </Stack>
      </Stack>
    </FormProvider>
  );
}

export default InformationForm;
