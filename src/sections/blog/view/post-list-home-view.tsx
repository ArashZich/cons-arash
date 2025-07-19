'use client';

import orderBy from 'lodash/orderBy';
import { useCallback, useState } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
// routes
import { paths } from 'src/routes/paths';
// hooks
import { useDebounce } from 'src/hooks/use-debounce';
// constants
import { POST_SORT_OPTIONS } from 'src/constants';
// i18n
import { useLocales } from 'src/locales';
// _req-hooks
import { usePostsQuery } from 'src/_req-hooks/reality/post/usePostsQuery';
// _types
import { PostData } from 'src/_types/reality/post/postData';
import { FilterOperatorsEnum } from 'src/_types/site/filters';
// components
import { useSettingsContext } from 'src/components/settings';

//
import PostList from '../post-list';
import PostSort from '../post-sort';
import PostSearch from '../post-search';

// ----------------------------------------------------------------------

export default function PostListHomeView() {
  const { t } = useLocales();
  const settings = useSettingsContext();

  const [sortBy, setSortBy] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);

  const debouncedQuery = useDebounce(searchQuery);

  const { data: postData, isLoading } = usePostsQuery({
    page,
    per_page: perPage,
    filters: {
      title: { op: FilterOperatorsEnum.CONTAINS, value: debouncedQuery },
    },
  });

  const dataFiltered = applyFilter({
    inputData: postData?.data.items || [],
    sortBy,
  });

  const searchResults = postData?.data.items || [];

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback((inputValue: string) => {
    setSearchQuery(inputValue);
  }, []);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const totalItems = postData?.data.totalRows || 0;
  const pageCount = Math.ceil(totalItems / perPage);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ py: 10 }}>
      <Typography
        variant="h4"
        sx={{
          my: { xs: 3, md: 5 },
        }}
      >
        {t('landing.blog')}
      </Typography>

      <Stack
        spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-end', sm: 'center' }}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ mb: { xs: 3, md: 5 } }}
      >
        <PostSearch
          query={debouncedQuery}
          results={searchResults}
          onSearch={handleSearch}
          loading={isLoading}
          hrefItem={(title: string) => paths.blog.details(title)}
        />

        <PostSort sort={sortBy} onSort={handleSortBy} sortOptions={POST_SORT_OPTIONS(t)} />
      </Stack>

      <PostList posts={dataFiltered} loading={isLoading} />

      {totalItems > perPage && (
        <Stack alignItems="center" sx={{ mt: 5 }}>
          <Pagination count={pageCount} page={page} onChange={handlePageChange} />
        </Stack>
      )}
    </Container>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({ inputData, sortBy }: { inputData: PostData[]; sortBy: string }) => {
  if (sortBy === 'latest') {
    inputData = orderBy(inputData, ['created_at'], ['desc']);
  }

  if (sortBy === 'oldest') {
    inputData = orderBy(inputData, ['created_at'], ['asc']);
  }

  return inputData;
};
