// @mui
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
// _types
import { PostData } from 'src/_types/reality/post/postData';
//
import { PostItemSkeleton } from './post-skeleton';
import PostItemHorizontal from './post-item-horizontal';

// ----------------------------------------------------------------------

type Props = {
  posts: PostData[];
  loading?: boolean;
};

export default function PostListHorizontal({ posts, loading }: Props) {
  const renderSkeleton = (
    <>
      {[...Array(8)].map((_, index) => (
        <PostItemSkeleton key={index} variant="horizontal" />
      ))}
    </>
  );

  const renderList = (
    <>
      {posts.map((post) => (
        <PostItemHorizontal key={post.ID} post={post} />
      ))}
    </>
  );

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
      >
        {loading ? renderSkeleton : renderList}
      </Box>

      {posts.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: 8,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: 'center',
            },
          }}
        />
      )}
    </>
  );
}
