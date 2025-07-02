'use client';

import * as Yup from 'yup';
import React, { MouseEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import { Button, Menu, MenuItem, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Icon } from '@iconify/react';
// routes
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { allLangs, useLocales } from 'src/locales';
import { useSelector } from 'src/redux/store';
import { phoneNumberSelector, sessionCodeSelector } from 'src/redux/slices/registration';
import { ResetPasswordRequestBodyType } from 'src/_types/reality/auth/resetPassword';

// ----------------------------------------------------------------------

interface ExtendedResetPasswordRequestBodyType extends ResetPasswordRequestBodyType {
  confirm_password?: string | null;
}

type ResetPasswordRequestBodySchema = {
  [K in keyof ExtendedResetPasswordRequestBodyType]: Yup.AnySchema;
};

export default function ResetPassword() {
  const { t, onChangeLang, currentLang } = useLocales();

  const router = useRouter();
  const [langEl, setLangEl] = useState<null | HTMLElement>(null);
  const openLangMenu = Boolean(langEl);
  const { resetPassword } = useAuthContext();

  const phoneNumber = useSelector(phoneNumberSelector);
  const sessionCode = useSelector(sessionCodeSelector);

  const ResetPasswordSchema = Yup.object().shape<ResetPasswordRequestBodySchema>({
    password: Yup.string()
      .required(t('auth.password_required'))
      .min(6, t('auth.password_min_length'))
      .matches(/[A-Z]/, t('auth.password_uppercase'))
      .matches(/[a-z]/, t('auth.password_lowercase'))
      .matches(/[0-9]/, t('auth.password_number'))
      .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, t('auth.password_special_character')),
    confirm_password: Yup.string()
      .required(t('auth.confirm_password_required'))
      .oneOf([Yup.ref('password')], t('auth.password_match')),
    phone: Yup.string().required(t('auth.phone_number_required')),
    session_code: Yup.string().required(t('auth.session_code_required')),
  });

  const defaultValues = {
    password: '',
    confirm_password: '',
    session_code: sessionCode as string,
    phone: phoneNumber as string,
  } satisfies ExtendedResetPasswordRequestBodyType;

  const methods = useForm<ResetPasswordRequestBodyType>({
    resolver: yupResolver(ResetPasswordSchema) as any,
    defaultValues,
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (values) => {
    try {
      await resetPassword?.(values.phone, values.password, values.session_code);
      router.push(paths.auth.login);
    } catch (error) {
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
      router.push(paths.auth.login);
    }
  }, [phoneNumber, router]);

  const renderHead = (
    <Stack spacing={1} sx={{ my: 5 }}>
      <Stack direction="row" spacing={0.5}>
        <Typography variant="h4" sx={{ alignItems: 'flex-start', color: 'text.primary' }}>
          {t('auth.new_password')}
        </Typography>
      </Stack>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      <Stack spacing={3} alignItems="center">
        <RHFTextField name="password" label={t('auth.password')} type="password" />

        <RHFTextField name="confirm_password" label={t('auth.confirm_password')} type="password" />

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 3 }}
        >
          {t('auth.change_password')}
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
