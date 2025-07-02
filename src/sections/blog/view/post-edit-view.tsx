'use client';

// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// _req-hooks
import { usePostsQuery } from 'src/_req-hooks/reality/post/usePostsQuery';
// i18n
import { useLocales } from 'src/locales';
// _types
import { FilterOperatorsEnum } from 'src/_types/site/filters';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import PostNewEditForm from '../post-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  title: string;
};

export default function PostEditView({ title }: Props) {
  const settings = useSettingsContext();
  const { t } = useLocales();

  const { data: postData, isSuccess } = usePostsQuery({
    filters: {
      title: { op: FilterOperatorsEnum.CONTAINS, value: title },
    },
  });

  const post = postData?.data.items[0];
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={t('dashboard.edit')}
        links={[
          {
            name: t('posts.home'),
            href: paths.dashboard.root,
          },
          {
            name: t('dashboard.blog'),
            href: paths.dashboard.post.root,
          },
          {
            name: post?.title,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {isSuccess && <PostNewEditForm currentPost={post} />}
    </Container>
  );
}
