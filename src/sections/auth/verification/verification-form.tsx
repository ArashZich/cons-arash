// yup
import * as Yup from 'yup';
// otp input
import { MuiOtpInput } from 'mui-one-time-password-input';
// react-hook-form
import { Controller, useForm } from 'react-hook-form';
// react
import React, { MouseEvent, useEffect, useState } from 'react';
// @hookform
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { FormHelperText } from '@mui/material';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// @iconify
import { Icon } from '@iconify/react';
// routes
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

// components
import FormProvider from 'src/components/hook-form/form-provider';
import { BackButton } from 'src/components/button';
// locales
import { allLangs, useLocales } from 'src/locales';

// redux
import { useSelector, useDispatch } from 'src/redux/store';
import {
  sessionCodeChanged,
  phoneNumberSelector,
  statusSelector,
} from 'src/redux/slices/registration';

// req-hooks
import { useExchangeCodeMutation } from 'src/_req-hooks/reality/verify/useExchangeCodeMutation';
import { useSendCodeMutation } from 'src/_req-hooks/reality/verify/useSendCodeMutation';
// types
import { ExchangeCodeRequestBodyType } from 'src/_types/reality/verify/exchange';

// -------------------------------------------------------------------------------

type ExchangeCodeRequestBodySchema = {
  [K in keyof ExchangeCodeRequestBodyType]: Yup.StringSchema;
};

const VerificationForm = () => {
  const dispatch = useDispatch();
  const phoneNumber = useSelector(phoneNumberSelector);
  const status = useSelector(statusSelector);

  const router = useRouter();

  const { t, onChangeLang, currentLang } = useLocales();

  const [langEl, setLangEl] = useState<null | HTMLElement>(null);

  const openLangMenu = Boolean(langEl);

  const VerifyCodeSchema = Yup.object().shape<ExchangeCodeRequestBodySchema>({
    code: Yup.string()
      .matches(/^\d{6}$/, t('auth.otp_required'))
      .required(t('auth.otp_6_digit')),
  });

  const defaultValues = {
    code: '',
  } satisfies ExchangeCodeRequestBodyType;

  const methods = useForm<ExchangeCodeRequestBodyType>({
    resolver: yupResolver(VerifyCodeSchema) as any,
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

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

  const { mutateAsync: exchangeCode } = useExchangeCodeMutation();

  const { mutateAsync: sendVerificationCode } = useSendCodeMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await exchangeCode(data);
      const {
        data: { session_code },
      } = response;
      dispatch(sessionCodeChanged(session_code));
      if (status === 'register') {
        router.push(paths.auth.information);
      } else {
        router.push(paths.auth.reset_password);
      }
    } catch (error) {
      reset();
      setError('root', { message: error.message });
      setError('code', { message: error.data.code[0] });
    }
  });

  const handleResendCode = async () => {
    try {
      await sendVerificationCode({ phone: phoneNumber || '' });
    } catch (error) {
      setError('root', { message: error.message });
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2} alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h3">{t('auth.please_check_your_phone')}</Typography>
        <Typography variant="body2" color="text.secondary">
          {t('auth.enter_verification_code').replace('$', phoneNumber as string)}
        </Typography>
      </Stack>
      <Stack spacing={2.5} alignItems="center">
        {!!errors.root?.message && <Alert severity="error">{errors.root?.message}</Alert>}
        <Stack direction="row" justifyContent="center">
          <Controller
            control={control}
            name="code"
            render={({ field, fieldState }) => (
              <Box>
                <MuiOtpInput
                  style={{ direction: 'ltr' }}
                  sx={{ gap: 1 }}
                  {...field}
                  length={6}
                  onComplete={() => onSubmit()}
                />
                {fieldState.error ? (
                  <FormHelperText error>{fieldState.error.message}</FormHelperText>
                ) : null}
              </Box>
            )}
          />
        </Stack>
        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 3 }}
        >
          {t('auth.verify_phone')}
        </LoadingButton>
        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">{t('auth.dont_have_code')} </Typography>

          <Button
            variant="text"
            onClick={handleResendCode}
            color="primary"
            sx={{ p: 0, ':hover': { bgcolor: 'transparent' } }}
          >
            {t('auth.resend_code')}
          </Button>
        </Stack>
        <BackButton title={t('auth.back')} onClick={handleBack} />

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
};

export default VerificationForm;
