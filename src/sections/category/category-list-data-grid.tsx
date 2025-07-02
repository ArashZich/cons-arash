import { Card, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridFilterItem,
  GridFilterModel,
  GridPaginationModel,
  GridRenderCellParams,
  GridSortModel,
  GridToolbar,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';
import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'src/routes/hooks';
import { useCategoriesQuery } from 'src/_req-hooks/reality/category/useCategoriesQuery';
import { CategoriesQueryFiltersType } from 'src/_types/reality/category/queryCategories';

import { CategoryData } from 'src/_types/reality/category/categoryData';

import { useDeleteCategoriesMutation } from 'src/_req-hooks/reality/category/useDeleteCategoriesMutation';

import Image from 'src/components/image';
import { paths } from 'src/routes/paths';
import { useSnackbar } from 'src/components/snackbar';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { LocalText } from 'src/utils/local-text-data-grid';
import { useLocales } from 'src/locales';
import { useBoolean } from 'src/hooks/use-boolean';
//---------------------------------------------------------------------------------
type ActionsMenuProps = {
  category?: CategoryData | undefined;
  reloadCategories: () => void;
};

function ActionsMenu({ category, reloadCategories }: ActionsMenuProps) {
  const { t } = useLocales();
  const toggle = useBoolean();

  const { enqueueSnackbar } = useSnackbar();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const openActionMenu = Boolean(menuAnchor);
  const router = useRouter();
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
  };

  const handleEditCategory = useCallback(() => {
    if (!category) return;
    router.push(paths.dashboard.category_management.edit(category.ID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const { mutateAsync: deleteCategory, isLoading } = useDeleteCategoriesMutation();

  const handleDeleteCategory = useCallback(async () => {
    if (!category) return;
    try {
      await deleteCategory([category.ID]);
      reloadCategories();
      enqueueSnackbar('دسته بندی مورد نظر با موفقیت حذف شد', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar(error?.data, { variant: 'error' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, deleteCategory]);

  return (
    <>
      <IconButton onClick={openMenu}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
      <Menu
        anchorEl={menuAnchor}
        onClose={closeMenu}
        open={openActionMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={toggle.onTrue}>
          <Iconify icon="solar:trash-bin-minimalistic-bold" sx={{ mr: 1 }} />
          {t('category_management.delete')}
        </MenuItem>
        <MenuItem onClick={handleEditCategory}>
          <Iconify icon="solar:pen-bold" sx={{ mr: 1 }} />
          {t('category_management.edit')}
        </MenuItem>
      </Menu>
      <ConfirmDialog
        open={toggle.value}
        title={t('category_management.delete_category')}
        onClose={toggle.onFalse}
        content={
          <Stack direction="row" spacing={0.5}>
            <Typography variant="body2">{t('category_management.are_you_sure')}</Typography>
            <Typography variant="subtitle1">{category?.title}</Typography>
            <Typography variant="body2">{t('category_management.category_delete')}</Typography>
          </Stack>
        }
        action={
          <LoadingButton
            variant="contained"
            color="error"
            loading={isLoading}
            onClick={handleDeleteCategory}
          >
            {t('category_management.delete')}
          </LoadingButton>
        }
      />
    </>
  );
}
//---------------------------------------------------------------------------------

export default function CategoryListDataGrid() {
  const { t } = useLocales();
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(8);
  const [categoryFilters, setCategoryFilters] = useState<CategoriesQueryFiltersType>({});
  const [sort, setSort] = useState<{ order: string; order_by: string }>({
    order: 'asc',
    order_by: 'id',
  });

  const { order, order_by } = sort;

  const { data, isLoading, refetch } = useCategoriesQuery({
    page: page + 1,
    order,
    order_by,
    per_page: pageSize,
    filters: categoryFilters,
  });

  const rows = data?.data?.items || [];
  const totalRows = data?.data?.totalRows || 0;

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: 'ID', headerName: '#', width: 90 },
      { field: 'title', headerName: t('category_management.title'), width: 90, flex: 1 },
      {
        field: 'children',
        headerName: t('category_management.children'),
        align: 'left',
        valueGetter: (params: GridValueGetterParams) => params.row.children.length,
        flex: 1,
      },
      {
        field: 'icon_url',
        headerName: t('category_management.icon_url'),
        align: 'left',
        renderCell: (params: GridRenderCellParams<any>) => (
          <Image src={params.row.icon_url} sx={{ width: 30, borderRadius: 1 }} />
        ),
        flex: 1,
      },
      {
        field: 'Action',
        headerName: '',
        align: 'right',
        width: 40,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params: GridRenderCellParams<any>) => (
          <ActionsMenu category={params.row} reloadCategories={refetch} />
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handlePageChange = (params: GridPaginationModel) => {
    setPage(params.page);
    setPageSize(params.pageSize);
  };

  const handleSorts = (model: GridSortModel) => {
    setSort({ order: model?.[0]?.sort || '', order_by: model?.[0]?.field || '' });
  };

  const handleFilter = (model: GridFilterModel) => {
    const newCategoryFilters = model.items.reduce(
      (acc: CategoriesQueryFiltersType, item: GridFilterItem) => {
        const _value = typeof item.value === 'object' ? item.value.join(',') : item.value;
        return { ...acc, [item.field]: { op: item.operator, value: _value } };
      },
      {}
    );
    setCategoryFilters(newCategoryFilters);
  };

  return (
    <Card>
      <DataGrid
        loading={isLoading}
        pagination
        paginationMode="server"
        pageSizeOptions={[5, 8, 25]}
        paginationModel={{ page, pageSize }}
        columns={columns}
        rows={rows}
        getRowId={(row) => row.ID}
        rowCount={totalRows}
        checkboxSelection
        sortingMode="server"
        onSortModelChange={handleSorts}
        filterMode="server"
        onFilterModelChange={handleFilter}
        disableRowSelectionOnClick
        disableDensitySelector
        slots={{ toolbar: GridToolbar }}
        localeText={LocalText()}
        onPaginationModelChange={handlePageChange}
      />
    </Card>
  );
}
