// @mui
import { Card, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridFilterItem,
  GridFilterModel,
  GridPaginationModel,
  GridRenderCellParams,
  GridSortModel,
  GridToolbar,
} from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';
// react
import { useCallback, useMemo, useState } from 'react';
// routes
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
// components
import { useSnackbar } from 'src/components/snackbar';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

// utils
import { LocalText } from 'src/utils/local-text-data-grid';
import { fDate, jfDate } from 'src/utils/format-time';
import { useLocales } from 'src/locales';

// _req-hooks
import { useCouponsQuery } from 'src/_req-hooks/reality/coupon/useCouponsQuery';
import { useDeleteCouponsMutation } from 'src/_req-hooks/reality/coupon/useDeleteCouponsMutation';
// types
import { CouponQueryFiltersType } from 'src/_types/reality/coupon/queryCoupon';
import { CouponData } from 'src/_types/reality/coupon/couponData';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
//---------------------------------------------------------------------------------
type ActionsMenuProps = {
  coupon?: CouponData | undefined;
  reloadPlans: () => void;
};

function ActionsMenu({ coupon, reloadPlans }: ActionsMenuProps) {
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

  const handleEditPlan = useCallback(() => {
    if (!coupon) return;
    router.push(paths.dashboard.coupon.edit(coupon.ID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coupon]);

  const { mutateAsync: deletePlan, isLoading } = useDeleteCouponsMutation();

  const handleDeletePlan = useCallback(async () => {
    if (!coupon) return;
    try {
      await deletePlan([coupon.ID]);
      reloadPlans();
      enqueueSnackbar(t('coupon.coupon_deleted'), {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar(error?.data, {
        variant: 'error',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coupon, deletePlan]);

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
          {t('plan_management.delete')}
        </MenuItem>
        <MenuItem onClick={handleEditPlan}>
          <Iconify icon="solar:pen-bold" sx={{ mr: 1 }} />
          {t('plan_management.edit')}
        </MenuItem>
      </Menu>
      <ConfirmDialog
        open={toggle.value}
        title={t('coupon.delete_coupon')}
        onClose={toggle.onFalse}
        content={
          <Typography variant="body2">
            {t('coupon.are_you_sure_delete').replace('{code}', `${coupon?.code}`)}
          </Typography>
        }
        action={
          <LoadingButton
            variant="contained"
            color="error"
            loading={isLoading}
            onClick={handleDeletePlan}
          >
            {t('coupon.delete')}
          </LoadingButton>
        }
      />
    </>
  );
}
//---------------------------------------------------------------------------------

export default function CouponListDataGrid() {
  const { t, isRtl } = useLocales();
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(8);
  const [couponFilters, setCouponFilters] = useState<CouponQueryFiltersType>({});
  const [sort, setSort] = useState<{ order: string; order_by: string }>({
    order: 'desc',
    order_by: 'id',
  });

  const { order, order_by } = sort;

  const { data, isLoading, refetch } = useCouponsQuery({
    page: page + 1,
    order,
    order_by,
    per_page: pageSize,
    filters: couponFilters,
  });

  const rows = data?.data?.items || [];
  const totalRows = data?.data?.totalRows || 0;

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: 'ID', headerName: '#', width: 90 },
      { field: 'code', headerName: t('coupon.code'), width: 90, flex: 1 },

      { field: 'description', headerName: t('coupon.description'), width: 90, flex: 1 },
      {
        field: 'usage_count',
        headerName: t('coupon.usage_count'),
        width: 90,
        flex: 1,
      },
      {
        field: 'usage_limit',
        headerName: t('coupon.usage_limit'),
        width: 90,
        flex: 1,
      },
      {
        field: 'maximum_discount_amount',
        headerName: t('coupon.maximum_discount_amount'),
        width: 90,
        flex: 1,
      },
      {
        field: 'expire_date',
        headerName: t('coupon.expire_date'),
        width: 90,
        renderCell: (params: GridRenderCellParams<any>) => (
          <Typography variant="body2">
            {isRtl ? jfDate(params.value) : fDate(params.value)}
          </Typography>
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
          <ActionsMenu coupon={params.row} reloadPlans={refetch} />
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
    const newPlanFilters = model.items.reduce(
      (acc: CouponQueryFiltersType, item: GridFilterItem) => {
        const _value = typeof item.value === 'object' ? item.value.join(',') : item.value;
        return { ...acc, [item.field]: { op: item.operator, value: _value } };
      },
      {}
    );
    setCouponFilters(newPlanFilters);
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
        slots={{ toolbar: GridToolbar }}
        localeText={LocalText()}
        onPaginationModelChange={handlePageChange}
      />
    </Card>
  );
}
