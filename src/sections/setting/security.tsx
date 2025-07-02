// yup
import * as Yup from 'yup';
// react-hook-form
import { useForm } from 'react-hook-form';
// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
// @hookform
import { yupResolver } from '@hookform/resolvers/yup';
// hook-form
import FormProvider, { RHFTextField } from 'src/components/hook-form';
// auth
import { useAuthContext } from 'src/auth/hooks';
// locales
import { useLocales } from 'src/locales';
// types
import { ChangePasswordRequestBodyType } from 'src/_types/reality/auth/changePassword';
import { useChangePasswordMutation } from 'src/_req-hooks/reality/auth/useChangePassword';

//
import LogoutDialog from './logout-dialog';

// add confirm_new_password to ChangePasswordRequestBodyTyp
type ExtendedChangePasswordRequestBodyType = ChangePasswordRequestBodyType & {
  confirm_new_password: string;
};

type ChangePasswordRequestBodySchema = {
  [K in keyof ExtendedChangePasswordRequestBodyType]: Yup.AnySchema;
};

function Security() {
  const { t } = useLocales();
  const { logout } = useAuthContext();

  const ChangePasswordSchema = Yup.object().shape<ChangePasswordRequestBodySchema>({
    password: Yup.string().required(t('auth.password_required')),
    new_password: Yup.string()
      .required(t('auth.password_required'))
      .min(6, t('auth.password_min_length'))
      .matches(/[A-Z]/, t('auth.password_uppercase'))
      .matches(/[a-z]/, t('auth.password_lowercase'))
      .matches(/[0-9]/, t('auth.password_number'))
      .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, t('auth.password_special_character')),
    confirm_new_password: Yup.string()
      .required(t('auth.confirm_new_password_required'))
      .oneOf([Yup.ref('new_password')], t('auth.password_match')),
  });

  const defaultValues = {
    password: '',
    new_password: '',
    confirm_new_password: '',
  } satisfies ExtendedChangePasswordRequestBodyType;

  const methods = useForm({
    resolver: yupResolver(ChangePasswordSchema) as any,
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { mutateAsync: changePassword, isSuccess } = useChangePasswordMutation();

  const onSubmit = handleSubmit(async (values) => {
    try {
      const items = {
        password: values.password,
        new_password: values.new_password,
      };
      await changePassword(items);
    } catch (error) {
      console.error(error);
    }
  });

  const handleLogout = () => {
    logout();
  };

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <LogoutDialog open={isSuccess} onClick={handleLogout} />
      <Stack spacing={4} sx={{ mt: 3 }} maxWidth="md">
        <Typography variant="subtitle1">{t('settings.change_password')}</Typography>

        <RHFTextField type="password" name="password" label={t('settings.current_password')} />
        <RHFTextField type="password" name="new_password" label={t('settings.new_password')} />
        <RHFTextField
          type="password"
          name="confirm_new_password"
          label={t('settings.confirm_new_password')}
        />
        <LoadingButton
          type="submit"
          size="large"
          variant="contained"
          sx={{ mr: 'auto' }}
          loading={isSubmitting}
          // disabled={!isValid}
        >
          {t('settings.save_changes')}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

export default Security;
