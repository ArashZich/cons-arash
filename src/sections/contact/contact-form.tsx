import { m } from 'framer-motion';
// yup
import * as Yup from 'yup';
// react-hook-form
import { useForm } from 'react-hook-form';
// @hookform
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
// components
import { MotionViewport, varFade } from 'src/components/animate';
import { useSnackbar } from 'src/components/snackbar';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
// i18n
import { useLocales } from 'src/locales';
import useSendEmail from 'src/_req-hooks/api/useSendEmail';

// ----------------------------------------------------------------------

export default function ContactForm() {
  const { t } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const { mutate: sendEmail } = useSendEmail();

  const LoginSchema = Yup.object().shape({
    name: Yup.string().required(t('contact_us.name_required')),
    email: Yup.string()
      .required(t('contact_us.email_required'))
      .email(t('contact_us.email_invalid')),
    subject: Yup.string().required(t('contact_us.subject_required')),
    message: Yup.string().required(t('contact_us.message_required')),
    phone_number: Yup.string()
      .required(t('organization.phone_number_required'))
      .matches(/^(09\d{9}|0\d{10})$/, t('auth.phone_number_landing_number')),
  });

  const defaultValues = {
    name: '',
    email: '',
    subject: '',
    message: '',
    phone_number: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema) as any,
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      sendEmail(data);
      reset();
      enqueueSnackbar(t('contact_us.success_send_message'), { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(t('contact_us.failed_send_message'), { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack component={MotionViewport} spacing={5}>
        <m.div variants={varFade().inUp}>
          <Typography color="grey.700" variant="h3" sx={{ whiteSpace: 'break-spaces' }}>
            {t('contact_us.header_contact_us')}
          </Typography>
        </m.div>

        <Stack spacing={3}>
          <m.div variants={varFade().inUp}>
            <RHFTextField
              inputProps={{ style: { color: 'white' } }}
              name="name"
              label={t('contact_us.name')}
            />
          </m.div>

          <m.div variants={varFade().inUp}>
            <RHFTextField
              inputProps={{ style: { color: 'white' } }}
              name="email"
              label={t('contact_us.email')}
              type="email"
            />
          </m.div>

          <m.div variants={varFade().inUp}>
            <RHFTextField
              inputProps={{ style: { color: 'white' } }}
              name="phone_number"
              label={t('contact_us.phone_number')}
              type="tel"
            />
          </m.div>

          <m.div variants={varFade().inUp}>
            <RHFTextField
              inputProps={{ style: { color: 'white' } }}
              name="subject"
              label={t('contact_us.subject')}
            />
          </m.div>

          <m.div variants={varFade().inUp}>
            <RHFTextField
              inputProps={{ style: { color: 'white' } }}
              name="message"
              label={t('contact_us.message')}
              multiline
              rows={4}
            />
          </m.div>
        </Stack>

        <m.div variants={varFade().inUp}>
          <LoadingButton
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {t('contact_us.submit')}
          </LoadingButton>
        </m.div>
      </Stack>
    </FormProvider>
  );
}
