// yup
import * as Yup from 'yup';
// react-hook-form
import { useForm } from 'react-hook-form';
// @hookform
import { yupResolver } from '@hookform/resolvers/yup';
// react
import React, { MouseEvent, useEffect, useState } from 'react';
// @mui
import { Link as MULink } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
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
// routes
import { useSearchParams, useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
// hooks
import { useAuthContext } from 'src/auth/hooks';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
// locales
import { allLangs, useLocales } from 'src/locales';

// redux
import { useSelector } from 'src/redux/store';
import { phoneNumberSelector, sessionCodeSelector } from 'src/redux/slices/registration';
// types
import { RegisterRequestBodyType } from 'src/_types/reality/auth/register';
import InformationPolicyModal from './information-policy-modal';
import TermsOfUseModal from './terms-of-use-modal';

// -------------------------------------------------------------------------------

type RegisterRequestBodySchema = {
  [K in keyof RegisterRequestBodyType]: Yup.AnySchema;
};

function InformationForm() {
  const { register } = useAuthContext();
  const phoneNumber = useSelector(phoneNumberSelector);
  const sessionCode = useSelector(sessionCodeSelector);

  const router = useRouter();

  const { t, onChangeLang, currentLang } = useLocales();

  const [langEl, setLangEl] = useState<null | HTMLElement>(null);

  const termToggle = useBoolean();
  const policyToggle = useBoolean();

  const searchParams = useSearchParams();

  const openLangMenu = Boolean(langEl);

  const returnTo = searchParams?.get('returnTo');

  const password = useBoolean();

  const InformationSchema = Yup.object().shape<RegisterRequestBodySchema>({
    name: Yup.string().required(t('auth.first_name_required')),
    last_name: Yup.string().required(t('auth.last_name_required')),
    invite_code: Yup.string(),
    password: Yup.string()
      .required(t('auth.password_required'))
      .min(6, t('auth.password_min_length'))
      .matches(/[A-Z]/, t('auth.password_uppercase'))
      .matches(/[a-z]/, t('auth.password_lowercase'))
      .matches(/[0-9]/, t('auth.password_number'))
      .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, t('auth.password_special_character')),
    phone: Yup.string().required(t('auth.phone_number_required')),
    session_code: Yup.string().required(t('auth.session_code_required')),
  });

  const defaultValues = {
    name: '',
    last_name: '',
    invite_code: '',
    password: '',
    phone: phoneNumber as string,
    session_code: sessionCode as string,
  } satisfies RegisterRequestBodyType;

  const methods = useForm<RegisterRequestBodyType>({
    resolver: yupResolver(InformationSchema) as any,
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await register?.(
        data.name,
        data.last_name,
        phoneNumber as string,
        data.password,
        data.invite_code as string,
        sessionCode as string
      );
      reset();
      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      setError('root', { message: error.message });
      setError('name', { message: error?.data?.name[0] });
      setError('last_name', { message: error?.data?.last_name[0] });
      setError('invite_code', { message: error?.data?.invite_code[0] });
      setError('password', { message: error?.data?.password[0] });
    }
  });

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

  useEffect(() => {
    if (!phoneNumber) {
      router.push(paths.auth.register);
    }
  }, [phoneNumber, router]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2} sx={{ mb: 5, alignItems: 'start' }}>
        <Typography variant="h4">{t('auth.enter_your_info')}</Typography>
      </Stack>

      <Stack spacing={2.5}>
        {!!errors.root?.message && <Alert severity="error">{errors.root?.message}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="name" label={t('auth.first_name')} />
          <RHFTextField name="last_name" label={t('auth.last_name')} />
        </Stack>

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

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          {t('auth.create_account')}
        </LoadingButton>
      </Stack>
      <Typography
        component="div"
        sx={{
          color: 'text.secondary',
          mt: 2.5,
          typography: 'caption',
          textAlign: 'center',
        }}
      >
        {t('auth.by_signing-up_i_agree_to')}
        <MULink
          onClick={termToggle.onToggle}
          sx={{ cursor: 'pointer' }}
          underline="always"
          color="text.primary"
        >
          {t('auth.terms_of_use')}
        </MULink>
        <TermsOfUseModal open={termToggle.value} onClose={termToggle.onFalse} />
        {t('auth.and')}
        <MULink
          onClick={policyToggle.onToggle}
          sx={{ cursor: 'pointer' }}
          underline="always"
          color="text.primary"
        >
          {t('auth.privacy_policy')}
        </MULink>
        {t('auth.agree')}
      </Typography>
      <InformationPolicyModal open={policyToggle.value} onClose={policyToggle.onFalse} />

      <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mt: 5 }}>
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
    </FormProvider>
  );
}

export default InformationForm;
