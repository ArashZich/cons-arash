// yup
import * as Yup from 'yup';
// react-hook-form
import { useForm } from 'react-hook-form';
// react
import React, { MouseEvent, useState } from 'react';
// @hookform
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link as MULink } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
// @iconify
import { Icon } from '@iconify/react';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// @iconify
import Iconify from 'src/components/iconify';
// components
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
// locales
import { allLangs, useLocales } from 'src/locales';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
// auth
import { useAuthContext } from 'src/auth/hooks';
// routes
import { useRouter, useSearchParams } from 'src/routes/hooks';
// utils
import { convertPersianToEnglishNumber } from 'src/utils/persian-to-english-number';
// redux
import { useDispatch } from 'src/redux/store';
import { statusChanged } from 'src/redux/slices/registration';

// types
import { LoginRequestBodyType } from 'src/_types/reality/auth/login';
import { paths } from 'src/routes/paths';
// -------------------------------------------------------------------------------

type LoginRequestBodySchema = {
  [K in keyof LoginRequestBodyType]: Yup.StringSchema;
};

function LoginForm() {
  const { t, onChangeLang, currentLang } = useLocales();
  const dispatch = useDispatch();

  const password = useBoolean();

  const { login } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams?.get('returnTo');

  const [langEl, setLangEl] = useState<null | HTMLElement>(null);

  const openLangMenu = Boolean(langEl);

  const LoginSchema = Yup.object().shape<LoginRequestBodySchema>({
    username: Yup.string()
      .required(t('auth.username_required'))
      .test('is-valid-phone', t('auth.phone_number_invalid'), (value) => {
        const englishPhoneNumber = convertPersianToEnglishNumber(value || '');
        return /^(09\d{9})$/.test(englishPhoneNumber);
      }),
    password: Yup.string().required(t('auth.password_required')),
  });

  const defaultValues = {
    username: '',
    password: '',
  } satisfies LoginRequestBodyType;

  const methods = useForm({
    resolver: yupResolver(LoginSchema) as any,
    defaultValues,
  });

  const {
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const { reset, handleSubmit } = methods;

  const handleOpenLangMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setLangEl(event.currentTarget);
  };

  const handleLangMenuClose = (value: string) => {
    const selectedLang = allLangs.find((lang) => lang.value === value);

    if (selectedLang) {
      onChangeLang(value);
    }

    setLangEl(null);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const convertedPhoneNumber = convertPersianToEnglishNumber(data.username);
      await login?.(convertedPhoneNumber, data.password, true);
      reset();
      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      setError('root', { message: error.message });
      setError('username', { message: error?.data?.username[0] });
    }
  });

  const handleForgotPassword = () => {
    dispatch(statusChanged('reset_password'));
    router.push(paths.auth.forgat_password);
  };

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5}>
        {!!errors.root?.message && <Alert severity="error">{errors.root?.message}</Alert>}
        <RHFTextField
          name="username"
          label={t('auth.username')}
          type="text"
          placeholder={t('auth.enter_phone')}
        />

        <RHFTextField
          name="password"
          label={t('auth.password')}
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'mdi:eye-off'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <MULink
          onClick={handleForgotPassword}
          variant="body2"
          color="inherit"
          underline="always"
          sx={{
            alignSelf: 'flex-end',
            ':hover': { cursor: 'pointer', color: (theme) => theme.palette.primary.main },
          }}
        >
          {t('auth.forgot_password')}
        </MULink>

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          {t('auth.login')}
        </LoadingButton>

        <Stack alignSelf="center" direction="row" spacing={2} alignItems="center" sx={{ mt: 5 }}>
          <Typography variant="body2">{t('auth.language')} </Typography>

          <Button
            id="lang-customized-button"
            onClick={handleOpenLangMenu}
            aria-controls={openLangMenu ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openLangMenu ? 'true' : undefined}
            variant="text"
            disableElevation
            endIcon={<Icon icon="icon-park-outline:down" />}
          >
            {currentLang.label}
          </Button>
          <Menu
            sx={{
              width: '100%',
              mt: 0.5,
              '& .MuiMenu-list': {
                padding: ' 0px',
              },
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            MenuListProps={{
              'aria-labelledby': 'lang-customized-button',
            }}
            anchorEl={langEl}
            open={openLangMenu}
            onClose={handleLangMenuClose}
          >
            <Stack width={165}>
              <Paper>
                {React.Children.toArray(
                  allLangs.map((lang) => (
                    <MenuItem onClick={() => handleLangMenuClose(lang.value)} disableRipple>
                      {lang.label}
                    </MenuItem>
                  ))
                )}
              </Paper>
            </Stack>
          </Menu>
        </Stack>
      </Stack>
    </FormProvider>
  );
}

export default LoginForm;
