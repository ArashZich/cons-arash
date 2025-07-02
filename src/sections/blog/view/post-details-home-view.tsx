'use client';

// react
import { useEffect, useState } from 'react';
// @mui
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

// components
import Iconify from 'src/components/iconify';
import Markdown from 'src/components/markdown';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// i18n
import { useLocales } from 'src/locales';
// _req-hooks
import { usePostsQuery } from 'src/_req-hooks/reality/post/usePostsQuery';
import { useUpdateViewsPostMutation } from 'src/_req-hooks/reality/post/useUpdateViewsPostMutation';

// _types
import { FilterOperatorsEnum } from 'src/_types/site/filters';

//
import PostList from '../post-list';
import PostDetailsHero from '../post-details-hero';
import { PostDetailsSkeleton } from '../post-skeleton';

// ----------------------------------------------------------------------

type Props = {
  title: string;
};

export default function PostDetailsHomeView({ title }: Props) {
  const { t } = useLocales();
  const [hasUpdatedViews, setHasUpdatedViews] = useState(false);

  const {
    data: postData,
    isLoading,
    isError,
    error,
    isSuccess,
  } = usePostsQuery({
    filters: {
      title: { op: FilterOperatorsEnum.CONTAINS, value: title },
    },
  });

  const { data: latestPostsData, isLoading: isLatestPostsLoading } = usePostsQuery({
    filters: {
      published: { op: FilterOperatorsEnum._, value: true },
    },
    order: 'desc',
    order_by: 'created_at',
    per_page: 4, // Fetch latest 5 posts
  });

  const { mutateAsync: updateViews } = useUpdateViewsPostMutation();

  const post = postData?.data.items[0];

  useEffect(() => {
    if (post && !hasUpdatedViews) {
      updateViews({
        post: { increment: 1 },
        ID: post.ID,
      }).then(() => {
        setHasUpdatedViews(true);
      });
    }
  }, [post, hasUpdatedViews, updateViews]);

  const renderSkeleton = <PostDetailsSkeleton />;

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${error?.data?.[0]}` || ''}
        action={
          <Button
            component={RouterLink}
            href={paths.blog.root}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
            sx={{ mt: 3 }}
          >
            {t('posts.back_to_list')}
          </Button>
        }
        sx={{ py: 10 }}
      />
    </Container>
  );

  const renderPost = post && (
    <>
      <PostDetailsHero
        title={post.title}
        author={{
          avatarUrl: post.user_avatar,
          name: post.user_name,
        }}
        coverUrl={post.cover_url}
        createdAt={post.created_at}
      />

      <Container
        maxWidth={false}
        sx={{
          py: 3,
          mb: 5,
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <CustomBreadcrumbs
          links={[
            {
              name: t('posts.home'),
              href: '/',
            },
            {
              name: t('dashboard.blog'),
              href: paths.blog.root,
            },
            {
              name: post?.title,
            },
          ]}
          sx={{ maxWidth: (theme) => theme.breakpoints.values.md, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: (theme) => theme.breakpoints.values.md, mx: 'auto' }}>
          <Markdown children={post.content} />

          <Stack
            spacing={3}
            sx={{
              py: 3,
              borderTop: (theme) => `dashed 1px ${theme.palette.divider}`,
              borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            <Stack direction="row" flexWrap="wrap" spacing={1}>
              {post.tags.split(',').map((tag) => (
                <Chip key={tag} label={tag.trim()} variant="soft" />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </>
  );

  const renderLatestPosts = (
    <>
      <Typography variant="h4" sx={{ mb: 5 }}>
        {t('posts.recent_posts')}
      </Typography>

      <PostList
        posts={latestPostsData?.data.items || []}
        loading={isLatestPostsLoading}
        disabledIndex
      />
    </>
  );

  return (
    <>
      {isLoading && renderSkeleton}

      {isError && renderError}

      {isSuccess && renderPost}

      <Container sx={{ pb: 15 }}>
        {!!latestPostsData?.data.items.length && renderLatestPosts}
      </Container>
    </>
  );
}
