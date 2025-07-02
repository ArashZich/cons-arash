// @mui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
// components
import Iconify from 'src/components/iconify';
// types
import { PostData } from 'src/_types/reality/post/postData';
// i18n
import { useLocales } from 'src/locales';
//
import PostItem from './post-item';
import { PostItemSkeleton } from './post-skeleton';

// ----------------------------------------------------------------------

type Props = {
  posts: PostData[];
  loading?: boolean;
  disabledIndex?: boolean;
  dark?: boolean;
  hasMore?: boolean;
};

export default function PostList({ posts, loading, disabledIndex, hasMore, dark }: Props) {
  const { t } = useLocales();
  const renderSkeleton = (
    <>
      {[...Array(16)].map((_, index) => (
        <Grid key={index} xs={12} sm={6} md={3}>
          <PostItemSkeleton />
        </Grid>
      ))}
    </>
  );

  const renderList = (
    <>
      {posts.map((post, index) => (
        <Grid key={post.ID} xs={12} sm={6} md={!disabledIndex && index === 0 ? 6 : 3}>
          <PostItem dark={dark} post={post} index={!disabledIndex ? index : undefined} />
        </Grid>
      ))}
    </>
  );

  return (
    <>
      <Grid container spacing={3}>
        {loading && posts.length === 0 ? renderSkeleton : renderList}
      </Grid>

      {hasMore && (
        <Stack
          alignItems="center"
          sx={{
            mt: 8,
            mb: { xs: 10, md: 15 },
          }}
        >
          <Button
            size="large"
            variant="outlined"
            startIcon={<Iconify icon="svg-spinners:12-dots-scale-rotate" width={24} />}
          >
            {t('posts.load_more')}
          </Button>
        </Stack>
      )}
    </>
  );
}
