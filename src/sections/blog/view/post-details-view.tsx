'use client';

// next
import Head from 'next/head';
// react-query
import { useQueryClient } from '@tanstack/react-query';
// react
import { useCallback } from 'react';
// @mui
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// constants
import { POST_PUBLISH_OPTIONS } from 'src/constants';
// i18n
import { useLocales } from 'src/locales';
// _req-hooks
import { usePostsQuery } from 'src/_req-hooks/reality/post/usePostsQuery';
// _types
import { FilterOperatorsEnum } from 'src/_types/site/filters';
// components
import Iconify from 'src/components/iconify';
import Markdown from 'src/components/markdown';
import EmptyContent from 'src/components/empty-content';
// _req-hooks
import { useUpdatePublishedPostMutation } from 'src/_req-hooks/reality/post/useUpdatePublishedPostMutation';
// utils
import { paramCase } from 'src/utils/change-case';
//
import PostDetailsHero from '../post-details-hero';
import { PostDetailsSkeleton } from '../post-skeleton';
import PostDetailsToolbar from '../post-details-toolbar';

// ----------------------------------------------------------------------

type Props = {
  title: string;
};

export default function PostDetailsView({ title }: Props) {
  const { t } = useLocales();
  const queryClient = useQueryClient();
  const {
    data: postData,
    isLoading,
    isError,
    isSuccess,
    error,
  } = usePostsQuery({
    filters: {
      title: { op: FilterOperatorsEnum.EQUALS, value: title },
    },
  });

  const { mutateAsync: publishPost } = useUpdatePublishedPostMutation();

  const post = postData?.data.items[0];

  const handleChangePublish = useCallback(
    async (newValue: boolean) => {
      await publishPost({
        post: {
          published: newValue,
        },
        ID: post?.ID,
      });
      queryClient.invalidateQueries(['getAllPostsQuery']);
    },
    [post?.ID, publishPost, queryClient]
  );

  const renderSkeleton = <PostDetailsSkeleton />;

  const renderError = (
    <EmptyContent
      filled
      title={`${error?.data?.[0] || ''}`}
      action={
        <Button
          component={RouterLink}
          href={paths.dashboard.post.root}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          sx={{ mt: 3 }}
        >
          {t('posts.back_to_list')}
        </Button>
      }
      sx={{
        py: 20,
      }}
    />
  );

  const renderPost = post && (
    <>
      <PostDetailsToolbar
        backLink={paths.dashboard.post.root}
        editLink={paths.dashboard.post.edit(`${post?.title}`)}
        liveLink={paths.blog.details(`${post?.title}`)}
        publish={post.published}
        onChangePublish={handleChangePublish}
        publishOptions={POST_PUBLISH_OPTIONS(t)}
      />

      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description} />

        {/* Open Graph Tags برای شبکه‌های اجتماعی */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.cover_url} />
        <meta
          property="og:url"
          content={`${
            process.env.NEXT_PUBLIC_BASE_URL || 'https://armogroup.tech'
          }/blog/${paramCase(post.title)}`}
        />
        <meta property="og:type" content="article" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={post.cover_url} />

        {/* کنونیکال برای جلوگیری از محتوای تکراری */}
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://armogroup.tech'}/blog/${paramCase(
            post.title
          )}`}
        />
      </Head>

      <PostDetailsHero title={post.title} coverUrl={post.cover_url} />

      <Stack
        sx={{
          maxWidth: 720,
          mx: 'auto',
          mt: { xs: 5, md: 10 },
        }}
      >
        <Typography variant="subtitle1" sx={{ mb: 5 }}>
          {post.description}
        </Typography>

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
    </>
  );

  return (
    <Container maxWidth={false}>
      {isLoading && renderSkeleton}

      {isError && renderError}

      {isSuccess && renderPost}
    </Container>
  );
}
