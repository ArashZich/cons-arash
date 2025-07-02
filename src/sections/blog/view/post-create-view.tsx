'use client';

// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// i18n
import { useLocales } from 'src/locales';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import PostNewEditForm from '../post-new-edit-form';

// ----------------------------------------------------------------------

export default function PostCreateView() {
  const settings = useSettingsContext();
  const { t } = useLocales();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={t('posts.new_post')}
        links={[
          {
            name: t('dashboard.root'),
            href: paths.dashboard.root,
          },
          {
            name: t('dashboard.blog'),
            href: paths.dashboard.post.root,
          },
          {
            name: t('dashboard.create'),
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PostNewEditForm />
    </Container>
  );
}
