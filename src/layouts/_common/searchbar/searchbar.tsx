'use client';

// react
import React, { useState, memo, useCallback } from 'react';
// autosuggest
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
// @mui
import List from '@mui/material/List';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useEventListener } from 'src/hooks/use-event-listener';
// routes
import { useRouter } from 'src/routes/hooks';
// locales
import { useLocales } from 'src/locales';
// assets
import SearchIcon from 'src/assets/icons/search-icon';
// layout
import ResultItem from './result-item';
import { useNavData } from '../../dashboard/config-navigation';
import { applyFilter, groupedData, getAllItems } from './utils';

// ----------------------------------------------------------------------

function Searchbar() {
  const router = useRouter();

  const search = useBoolean();

  const { t } = useLocales();

  const [searchQuery, setSearchQuery] = useState('');

  const navData = useNavData();

  const handleClose = useCallback(() => {
    search.onFalse();
    setSearchQuery('');
  }, [search]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'k' && event.metaKey) {
      search.onToggle();
      setSearchQuery('');
    }
  };

  useEventListener('keydown', handleKeyDown);

  const handleClick = useCallback(
    (path: string) => {
      if (path.includes('http')) {
        window.open(path);
      } else {
        router.push(path);
      }
      handleClose();
    },
    [handleClose, router]
  );

  // const handleSearch = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setSearchQuery(event.target.value);
  // }, []);

  const dataFiltered = applyFilter({
    // FIXME:
    inputData: getAllItems({ data: navData } as any),
    query: searchQuery,
  });

  const renderItems = () => {
    const data = groupedData(dataFiltered);

    return Object.keys(data)
      .sort((a, b) => -b.localeCompare(a))
      .map((group, index) => (
        <List key={group || index} disablePadding>
          {data[group].map((item) => {
            const { title, path } = item;
            const partsTitle = parse(title, match(title, searchQuery));
            const partsPath = parse(path, match(path, searchQuery));

            return (
              <ResultItem
                path={partsPath}
                title={partsTitle}
                key={`${title}${path}`}
                groupLabel={searchQuery && group}
                onClickItem={() => handleClick(path)}
              />
            );
          })}
        </List>
      ));
  };

  return (
    <Stack sx={{ width: 320, height: 40 }}>
      <Autocomplete
        freeSolo
        size="small"
        disableClearable
        options={renderItems()}
        getOptionLabel={(option) => option.toString.name}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={t('header.search')}
            InputProps={{
              ...params.InputProps,
              type: 'search',
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
        renderOption={(props, option) => (
          <li {...props} key={option.toString.name}>
            {option.toString.name}
          </li>
        )}
      />
    </Stack>
  );
}

export default memo(Searchbar);
