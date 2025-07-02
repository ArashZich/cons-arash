import React from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// icon
import { Icon } from '@iconify/react';
// locales
import { useLocales } from 'src/locales';
import Image from 'src/components/image/image';
// routes
import { paths } from 'src/routes/paths';

function ProjectSubmitted() {
  const { t, isRtl } = useLocales();

  return (
    <Stack justifyContent="center" alignItems="center" height="100%">
      <Stack alignItems="center" justifyContent="center" sx={{ mb: 3 }}>
        <Stack sx={{ mb: 1 }}>
          <Image src="/assets/icons/project/successfully.svg" />
        </Stack>
        <Typography variant="h5" sx={{ mb: 1 }}>
          {t('project.project_successfully')}
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{ whiteSpace: 'break-spaces', color: 'text.disabled' }}
        >
          {t('project.thank_you_for_submitting')}
        </Typography>
      </Stack>
      <Stack spacing={3}>
        <Button
          startIcon={<Icon icon="ic:baseline-plus" />}
          variant="contained"
          size="large"
          href={paths.project.choose_category}
          sx={{ bgcolor: 'primary.main' }}
        >
          {t('project.make_another_project')}
        </Button>
        <Button
          startIcon={<Icon icon={isRtl ? 'ic:baseline-arrow-forward' : 'ic:baseline-arrow-back'} />}
          variant="outlined"
          size="large"
          href={paths.dashboard.projects.category}
          sx={{ color: 'primary.main', borderColor: 'primary.main' }}
        >
          {t('project.project_information')}
        </Button>
      </Stack>
    </Stack>
  );
}

export default ProjectSubmitted;
