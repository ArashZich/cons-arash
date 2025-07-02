/* eslint-disable import/no-cycle */
// react
import React, { useState } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// path
import { useRouter } from 'src/routes/hooks';
// routes
import { paths } from 'src/routes/paths';
// locales
import { useLocales } from 'src/locales';
// components
import ButtonLoading from 'src/components/button/button-loading';
import ButtonBack from 'src/components/button/button-back';
// constants
import { need_3d_model } from 'src/constants/project';
//
import Check3D from './check-3d';

export type DataType = {
  id: number;
  title: string;
  icon: string;
  disabled: boolean;
};

function Check3DModel() {
  const { t } = useLocales();

  const router = useRouter();

  const [active, setActive] = useState<DataType>();

  const handleContinue = () => {
    if (active?.id === 1) {
      router.push(`${paths.project.create_project}`);
    } else {
      // Todo: go to request for create model
      router.push(`${paths.project.root}`);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <Stack alignItems="center" maxWidth="lg">
      <Stack alignItems="center" spacing={1} sx={{ mb: 3 }}>
        <Typography variant="h5" color="text.primary">
          {t('project.do_you_have_3d_model')}
        </Typography>
      </Stack>
      <Stack direction="row" sx={{ mb: 5 }}>
        <Grid container spacing={2}>
          {need_3d_model?.map((item) => (
            <Grid item xs={12} md={6} key={item.id}>
              <Check3D data={item} active={item.id === active?.id} setActive={setActive} />
            </Grid>
          ))}
        </Grid>
      </Stack>
      <Stack>
        <ButtonLoading
          fullWidth
          onClick={handleContinue}
          title={t('organization.continue')}
          sx={{ width: { xs: 200, md: 400 } }}
        />
        <Stack alignItems="center" sx={{ mt: 3 }}>
          <ButtonBack title={t('organization.back')} onClick={handleBack} />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Check3DModel;
