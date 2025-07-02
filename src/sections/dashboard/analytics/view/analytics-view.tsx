'use client';

// next
import Link from 'next/link';
// lodash
import debounce from 'lodash/debounce';
// react
import { useCallback, useMemo, SyntheticEvent, ChangeEvent, useEffect, useState } from 'react';

// @mui
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
// req-hooks
import { useProductsQuery } from 'src/_req-hooks/reality/product/useProductsQuery';
import { useViewsExport } from 'src/_req-hooks/reality/view/useViewsExport';
// types
import { Duration } from 'src/_types/reality/view/queryViews';
import { FilterOperatorsEnum } from 'src/_types/site/filters';
// auth
import { useAuthContext } from 'src/auth/hooks';
// locales
import { useLocales } from 'src/locales';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// redux
import { useDispatch, useSelector } from 'src/redux/store';
import { analyticsViewSelector, analyticsViewChanged } from 'src/redux/slices/analytics-view';
import { organizationSelector } from 'src/redux/slices/organization';
// components
import ModelViewer from 'src/components/model-viewer';
import Iconify from 'src/components/iconify/iconify';
// assets
import SearchIcon from 'src/assets/icons/search-icon';

//
import { TABS } from './tabs';

// ----------------------------------------------------------------------

type Props = {
  id?: string;
};

export default function AnalyticsView({ id }: Props) {
  const { t, isRtl } = useLocales();
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const organization = useSelector(organizationSelector);
  const { search, active, currentTab, project } = useSelector(analyticsViewSelector);

  const organizationType = organization?.organization_type;
  const ID = id ? parseInt(id, 10) : organization?.ID ?? 0;
  // Check if user has SuperAdmin role
  const isSuperAdmin = user?.roles?.some((role) => role.title === 'SuperAdmin');

  const showRecommendation = ['recommender', 'enterprise', 'admin'].includes(
    organizationType || ''
  );

  // اضافه کردن state برای منوی export
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleDebounceFn = useCallback(() => {
    dispatch(analyticsViewChanged({ active: search.length > 0 }));
  }, [dispatch, search]);

  const debounceFn = useMemo(() => debounce(handleDebounceFn, 1000), [handleDebounceFn]);

  const handleChangeTab = useCallback(
    (event: SyntheticEvent, newValue: string) => {
      dispatch(analyticsViewChanged({ currentTab: newValue }));
    },
    [dispatch]
  );

  const { data: projects } = useProductsQuery(
    {
      per_page: 10,
      filters: {
        name: {
          op: FilterOperatorsEnum.CONTAINS,
          value: search,
        },
        organization_id: { op: FilterOperatorsEnum._, value: ID },
      },
    },
    {
      enabled: active,
    }
  );

  const handleProject = (name: string) => {
    const projectList = projects?.data.items.find((item) => item.name === name);
    dispatch(analyticsViewChanged({ project: projectList ? [projectList] : null }));
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(analyticsViewChanged({ search: e.target.value }));
    debounceFn();
  };

  // نمایش منوی export
  const handleExportClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // بستن منوی export
  const handleExportClose = () => {
    setAnchorEl(null);
  };

  const { mutate: exportViews, isLoading } = useViewsExport({
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `views-export-${new Date().toISOString()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      // بستن منو پس از اتمام دانلود
      handleExportClose();
    },
  });

  // دانلود با انتخاب مدت زمان - با تایپ درست Duration
  const handleDownload = (duration: Duration) => {
    exportViews({
      format: 'csv',
      duration,
      filters: {
        organization_id: { op: FilterOperatorsEnum._, value: ID },
      },
    });
  };

  // تغییر Tab از طریق منوی Select - اصلاح شده با تایپ صحیح
  const handleSelectChange = (event: SelectChangeEvent) => {
    dispatch(analyticsViewChanged({ currentTab: event.target.value as string }));
  };

  useEffect(() => {
    // If there's an ID in URL and user is not SuperAdmin, redirect to main analytics
    if (id && !isSuperAdmin) {
      router.push(paths.dashboard.analytics.root);
    }
  }, [id, isSuperAdmin, router]);

  // If page is loading with ID but user is not SuperAdmin, don't render anything
  if (id && !isSuperAdmin) {
    return null;
  }

  // گرفتن تب‌ها برای نمایش
  const tabItems = TABS(t, showRecommendation, ID);

  // یافتن تب فعلی
  const currentTabItem = tabItems.find((tab) => tab.value === currentTab) || tabItems[0];

  return (
    <Stack maxWidth="100%" sx={{ height: '100%', px: 2, pt: 2 }} spacing={1}>
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center">
          <Typography variant="h4">{t('analytics.analytics')}</Typography>
          <Stack ml="auto">
            <Button
              variant="outlined"
              startIcon={<Iconify icon="mdi:export-variant" />}
              onClick={handleExportClick}
              disabled={isLoading}
              size="large"
            >
              {isLoading ? <CircularProgress size={24} sx={{ mr: 1 }} /> : null}
              {t('analytics.export_all')}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleExportClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={() => handleDownload('one_month')} disabled={isLoading}>
                {t('analytics.one_month')}
              </MenuItem>
              <MenuItem onClick={() => handleDownload('three_months')} disabled={isLoading}>
                {t('analytics.three_months')}
              </MenuItem>
              <MenuItem onClick={() => handleDownload('six_months')} disabled={isLoading}>
                {t('analytics.six_months')}
              </MenuItem>
              <MenuItem onClick={() => handleDownload('one_year')} disabled={isLoading}>
                {t('analytics.one_year')}
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>
      </Grid>

      <Stack spacing={1}>
        <Autocomplete
          freeSolo
          size="medium"
          sx={{ width: { md: 480, xs: '100%' } }}
          disableClearable
          options={projects?.data.items.map((option) => option.name) || []}
          onChange={(event, newValue) => {
            handleProject(newValue);
          }}
          autoSelect
          renderInput={(params) => (
            <TextField
              {...params}
              value={search}
              onChange={handleSearch}
              placeholder={t('analytics.search_project')}
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
        />

        {project && project.length > 0 && (
          <Stack direction={{ md: 'row', xs: 'column' }} sx={{ width: { md: 480, xs: '100%' } }}>
            <Stack>
              {project[0].documents[0].category.accepted_file_type === 'glb' ||
              project[0].documents[0].category.accepted_file_type === 'complex' ? (
                <ModelViewer src={project[0].documents[0].file_uri} height="150px" width="250px" />
              ) : (
                <Avatar
                  alt={project[0].name}
                  src={project[0].thumbnail_uri}
                  variant="rounded"
                  sx={{ width: 64, height: 64, mr: 2 }}
                />
              )}
            </Stack>
            <Stack spacing={2}>
              <Typography variant="h4">{project[0].name}</Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Stack direction="row" spacing={0.5}>
                  <Typography variant="body2" color="text.disabled">
                    ({project[0].view_count}
                  </Typography>
                  <Typography variant="body2" color="text.disabled">
                    {t('analytics.views')})
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Button
                  LinkComponent={Link}
                  href={paths.project.details(project[0].product_uid)}
                  variant="outlined"
                >
                  {t('analytics.view_details')}
                </Button>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Stack>

      {/* منوی موبایل یا تب‌های دسکتاپ */}
      {isMobile ? (
        <FormControl fullWidth variant="outlined" sx={{ mb: 2, mt: 2, maxWidth: '100%' }}>
          <InputLabel id="analytics-tab-select-label">{t('analytics.select_view')}</InputLabel>
          <Select
            labelId="analytics-tab-select-label"
            value={currentTab}
            onChange={handleSelectChange}
            label={t('analytics.select_view')}
            sx={{
              textAlign: 'left',
              '& .MuiSelect-icon': {
                transform: isRtl ? 'rotate(180deg)' : 'none',
              },
            }}
          >
            {tabItems.map((tab) => (
              <MenuItem key={tab.value} value={tab.value}>
                <Stack direction="row" spacing={1} alignItems="center">
                  {tab.icon}
                  <Typography>{tab.label}</Typography>
                </Stack>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <Stack sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            variant="fullWidth"
            scrollButtons="auto"
            sx={{
              width: '100%',
              '& .MuiTabs-flexContainer': {
                display: 'flex',
                flex: 1,
              },
            }}
            value={currentTab}
            onChange={handleChangeTab}
          >
            {tabItems.map((tab) => (
              <Tab key={tab.value} value={tab.value} label={tab.label} icon={tab.icon} />
            ))}
          </Tabs>
        </Stack>
      )}

      {/* نمایش محتوای تب انتخاب شده */}
      <Box sx={{ mt: isMobile ? 2 : 5 }}>{currentTabItem.component}</Box>
    </Stack>
  );
}
