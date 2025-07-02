// yup
import * as Yup from 'yup';
// react-hook-form
import { useForm } from 'react-hook-form';
// react
import React, { MouseEvent, useState } from 'react';
// @hookform
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
// @iconify
import { Icon } from '@iconify/react';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

// redux
import { useDispatch } from 'src/redux/store';
import { phoneNumberChanged } from 'src/redux/slices/registration';

// components
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
// locales
import { allLangs, useLocales } from 'src/locales';
// req-hooks
import { useSendCodeMutation } from 'src/_req-hooks/reality/verify/useSendCodeMutation';
// types
import { SendCodeRequestBodyType } from 'src/_types/reality/verify/sendCode';

// utils
import { convertPersianToEnglishNumber } from 'src/utils/persian-to-english-number';
// -------------------------------------------------------------------------------

type SendCodeRequestBodySchema = {
  [K in keyof SendCodeRequestBodyType]: Yup.AnySchema;
};

function RegisterForm() {
  const dispatch = useDispatch();

  const router = useRouter();

  const { t, onChangeLang, currentLang } = useLocales();

  const [langEl, setLangEl] = useState<null | HTMLElement>(null);

  const openLangMenu = Boolean(langEl);

  const RegisterSchema = Yup.object().shape<SendCodeRequestBodySchema>({
    phone: Yup.string()
      .required(t('auth.phone_number_required'))
      .test('is-valid-phone', t('auth.phone_number_invalid'), (value) => {
        const englishPhoneNumber = convertPersianToEnglishNumber(value || '');
        return /^(09\d{9})$/.test(englishPhoneNumber);
      }),
  });

  const defaultValues = {
    phone: '',
  } satisfies SendCodeRequestBodyType;

  const methods = useForm<SendCodeRequestBodyType>({
    resolver: yupResolver(RegisterSchema) as any,
    defaultValues,
  });

  const {
    reset,
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

  // const { mutateAsync: checkPhoneExist } = useCheckPhoneExistsMutation();

  const { mutateAsync: sendVerificationCode } = useSendCodeMutation();

  const onSubmit = handleSubmit(async (values) => {
    // const { data: exists } = await checkPhoneExist({ phone: data.phone || '' });

    try {
      await sendVerificationCode({
        phone: convertPersianToEnglishNumber(values.phone as string) || '',
      });

      dispatch(phoneNumberChanged(convertPersianToEnglishNumber(values.phone as string) || ''));
      router.push(paths.auth.verification);
      reset();
    } catch (error) {
      setError('root', { message: error.message });
      setError('phone', { message: error?.data?.phone[0] });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5}>
        {!!errors.root?.message && <Alert severity="error">{errors.root?.message}</Alert>}

        <RHFTextField name="phone" label={t('auth.phone_number')} type="tel" />

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

export default RegisterForm;
