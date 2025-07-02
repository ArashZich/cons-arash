// next
import Link from 'next/link';
// @mui
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

// routes
import { paths } from 'src/routes/paths';
// i18n
import { useLocales } from 'src/locales';
// _req-hooks
import { usePostsQuery } from 'src/_req-hooks/reality/post/usePostsQuery';
// _types
import { FilterOperatorsEnum } from 'src/_types/site/filters';
//
import PostList from 'src/sections/blog/post-list';

// ----------------------------------------------------------------------

const HighlightText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '100px',
  lineHeight: 1,

  [theme.breakpoints.down('md')]: {
    fontSize: '64px',
  },
}));

export default function HomeBlog() {
  const { t } = useLocales();

  const { data: latestPostsData, isLoading: isLatestPostsLoading } = usePostsQuery({
    filters: {
      published: { op: FilterOperatorsEnum._, value: true },
    },
    order: 'desc',
    order_by: 'created_at',
    per_page: 4, // Fetch latest 5 posts
  });

  const renderLatestPosts = (
    <>
      <HighlightText mb={10} color="grey.700">
        {t('posts.recent_posts')}
      </HighlightText>

      <PostList
        dark
        posts={latestPostsData?.data.items || []}
        loading={isLatestPostsLoading}
        disabledIndex
      />
    </>
  );

  return (
    <Container>
      <Stack alignItems="center" maxWidth="lg" sx={{ py: 15 }}>
        {!!latestPostsData?.data.items.length && renderLatestPosts}
        <Box mt={5} display="flex" justifyContent="center">
          <Button
            variant="outlined"
            color="secondary"
            sx={{ width: 240 }}
            LinkComponent={Link}
            href={paths.blog.root}
          >
            {t('landing.show_more')}
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
