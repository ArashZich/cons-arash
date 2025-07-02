'use client';

import orderBy from 'lodash/orderBy';
import { useCallback, useState } from 'react';
// @mui
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// hooks
import { useDebounce } from 'src/hooks/use-debounce';
// constants
import { POST_SORT_OPTIONS } from 'src/constants';
// _req-hooks
import { usePostsQuery } from 'src/_req-hooks/reality/post/usePostsQuery';

// _types
import { PostData, IPostFilters } from 'src/_types/reality/post/postData';
import { FilterOperatorsEnum } from 'src/_types/site/filters';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// i18n
import { useLocales } from 'src/locales';
//
import PostSort from '../post-sort';
import PostSearch from '../post-search';
import PostListHorizontal from '../post-list-horizontal';

// ----------------------------------------------------------------------

const defaultFilters: IPostFilters = {
  published: true,
};

// ----------------------------------------------------------------------

export default function PostListView() {
  const { t } = useLocales();

  const settings = useSettingsContext();

  const [sortBy, setSortBy] = useState('latest');

  const [filters, setFilters] = useState(defaultFilters);

  const [searchQuery, setSearchQuery] = useState('');

  const debouncedQuery = useDebounce(searchQuery);

  const { data: postData, isLoading } = usePostsQuery({
    filters: {
      title: { op: FilterOperatorsEnum.CONTAINS, value: debouncedQuery },
    },
  });

  const dataFiltered = applyFilter({
    inputData: postData?.data.items || [],
    filters,
    sortBy,
  });

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  const handleFilters = useCallback((name: string, value: boolean) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSearch = useCallback((inputValue: string) => {
    setSearchQuery(inputValue);
  }, []);

  const handleFilterPublish = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      const isPublished = newValue === 'published';
      handleFilters('published', isPublished);
    },
    [handleFilters]
  );

  const searchResults = postData?.data.items || [];

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="List"
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
            name: t('dashboard.list'),
          },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.post.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            {t('posts.new_post')}
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Stack
        spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-end', sm: 'center' }}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        <PostSearch
          query={debouncedQuery}
          results={searchResults}
          onSearch={handleSearch}
          loading={isLoading}
          hrefItem={(title: string) => paths.dashboard.post.details(title)}
        />

        <PostSort sort={sortBy} onSort={handleSortBy} sortOptions={POST_SORT_OPTIONS(t)} />
      </Stack>

      <Tabs
        value={filters.published ? 'published' : 'draft'}
        onChange={(event, newValue) => handleFilterPublish(event, newValue)}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        <Tab
          value="published"
          label={
            <Label variant="filled" color="info">
              {t('posts.published')}(
              {postData?.data.items.filter((post) => post.published === true).length})
            </Label>
          }
          sx={{ textTransform: 'capitalize' }}
        />
        <Tab
          value="draft"
          label={
            <Label variant="filled" color="default">
              {t('posts.draft')}(
              {postData?.data.items.filter((post) => post.published === false).length})
            </Label>
          }
          sx={{ textTransform: 'capitalize' }}
        />
      </Tabs>

      <PostListHorizontal posts={dataFiltered} loading={isLoading} />
    </Container>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({
  inputData,
  filters,
  sortBy,
}: {
  inputData: PostData[];
  filters: IPostFilters;
  sortBy: string;
}) => {
  const { published } = filters;

  if (sortBy === 'latest') {
    inputData = orderBy(inputData, ['created_at'], ['desc']);
  }

  if (sortBy === 'oldest') {
    inputData = orderBy(inputData, ['created_at'], ['asc']);
  }

  return inputData.filter((post) => post.published === published);
};
