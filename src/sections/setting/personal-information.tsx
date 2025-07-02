// yup
import * as Yup from 'yup';
// react
import { useCallback, useEffect } from 'react';
// react-hook-form
import { useForm } from 'react-hook-form';

// useImmer
import { useImmer } from 'use-immer';
// @hookform
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

// req-hooks
import { useUpdateUserMutation } from 'src/_req-hooks/reality/user/useUpdateUserMutation';
import { useUploadFileMutation } from 'src/_req-hooks/bytebase/file/useUploadFileMutation';
// auth
import { useAuthContext } from 'src/auth/hooks';
// locales
import { useLocales } from 'src/locales';
// components
import { useSnackbar } from 'src/components/snackbar';
import { UploadAvatar } from 'src/components/upload';
import CircleProgress from 'src/components/modal-progress/circular-progress';
// hook-form
import FormProvider, { RHFTextField } from 'src/components/hook-form';
// types
import { UpdateUserRequestBodyType } from 'src/_types/reality/user/updateUser';

// ----------------------------------------------------------------------
const IMAGE_MEGABYTE = 1048576;
interface State {
  file: File | string | null;
}
type UpdateUserRequestBodySchema = {
  [K in keyof UpdateUserRequestBodyType]: Yup.AnySchema;
};

export default function AccountGeneral() {
  const { t } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();

  const [state, setState] = useImmer<State>({
    file: null as File | string | null,
  });

  const UpdateUserSchema = Yup.object().shape<UpdateUserRequestBodySchema>({
    name: Yup.string().required('Name is required'),
    last_name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    avatar_url: Yup.mixed<any>().nullable().required('Avatar is required'),
    phone: Yup.string()
      .required(t('organization.phone_number_required'))
      .matches(/^(09\d{9})$/, t('auth.phone_number_invalid')),

    // not required
  });

  const defaultValues = {
    name: user?.name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    avatar_url: user?.avatar_url || '',
    phone: user?.phone || '',
  } satisfies UpdateUserRequestBodyType;

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema) as any,
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  const { mutateAsync: updateMutate } = useUpdateUserMutation();

  const { mutateAsync: upload, isLoading: uploadLoading } = useUploadFileMutation();

  const onSubmit = handleSubmit(async (values) => {
    try {
      await updateMutate({ requestBody: values });
      window.location.reload();
    } catch (error) {
      enqueueSnackbar(error?.data, { variant: 'error' });
    }
  });

  const setFile = useCallback(
    (newFile: File | string | null) => {
      setState((draft) => {
        draft.file = newFile;
      });
    },
    [setState]
  );

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

        setValue(
          'avatar_url',
          process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL_DOWNLOAD + filesResult.data[0]
        );
      } catch (error) {
        setError('avatar_url', { message: error.data.company_logo[0] });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDropRejected = useCallback(
    (err: { errors: { code: string }[] }[]) => {
      if (err[0].errors[0].code === 'file-too-large') {
        enqueueSnackbar(t('project.project_image_size_1mb'), { variant: 'error' });
      }
    },
    [enqueueSnackbar, t]
  );

  useEffect(() => {
    if (user?.avatar_url) {
      setFile(user.avatar_url);
    }
  }, [setFile, user?.avatar_url]);

  // useUpdateUserMutation

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <CircleProgress open={uploadLoading} />
          <Card sx={{ pt: 10, pb: 5, px: 3, textAlign: 'center' }}>
            <UploadAvatar
              maxSize={IMAGE_MEGABYTE}
              onDrop={handleDropSingleFile}
              onDropRejected={handleDropRejected}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.disabled',
                    whiteSpace: 'break-spaces',
                  }}
                >
                  {t('settings.allowed_image')}
                </Typography>
              }
              file={state.file}
            />
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Stack direction="row" spacing={2}>
                <RHFTextField name="name" label={t('settings.first_name')} />
                <RHFTextField name="last_name" label={t('settings.last_name')} />
              </Stack>
              <RHFTextField name="phone" label={t('settings.phone_number')} disabled />
              <RHFTextField name="email" label={t('settings.email')} />

              <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {t('settings.save_changes')}
                </LoadingButton>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
