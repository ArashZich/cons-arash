// react
import React from 'react';
// @mui
import { Link as MULink } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// locales
import { useLocales } from 'src/locales';
// routes
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
// redux
import { useDispatch } from 'src/redux/store';
import { statusChanged } from 'src/redux/slices/registration';

// -------------------------------------------------------------------------------

function LoginHead() {
  const { t } = useLocales();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRegister = () => {
    dispatch(statusChanged('register'));
    router.push(paths.auth.register);
  };

  return (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4" mb={2}>
        {t('auth.sign_in_armo')}
      </Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">{t('auth.new_user')} </Typography>

        <MULink
          onClick={handleRegister}
          variant="subtitle2"
          sx={{ ':hover': { cursor: 'pointer' } }}
        >
          {t('auth.create_an_account')}
        </MULink>
      </Stack>
    </Stack>
  );
}

export default LoginHead;
