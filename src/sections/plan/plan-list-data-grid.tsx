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
} from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';
import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'src/routes/hooks';

import Image from 'src/components/image';
import { paths } from 'src/routes/paths';
import { useSnackbar } from 'src/components/snackbar';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { LocalText } from 'src/utils/local-text-data-grid';
import { useLocales } from 'src/locales';
import { PlanData } from 'src/_types/reality/plan/planData';
import { useDeletePlansMutation } from 'src/_req-hooks/reality/plan/useDeletePlansMutation';
import { PlansQueryFiltersType } from 'src/_types/reality/plan/queryPlans';
import { usePlansQuery } from 'src/_req-hooks/reality/plan/usePlansQuery';
import { fileData } from 'src/components/file-thumbnail';
import { getDownloadUrl } from 'src/_requests/bytebase/file/s3Download';
import { useBoolean } from 'src/hooks/use-boolean';
//---------------------------------------------------------------------------------
type ActionsMenuProps = {
  plan?: PlanData | undefined;
  reloadPlans: () => void;
};

function ActionsMenu({ plan, reloadPlans }: ActionsMenuProps) {
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
    if (!plan) return;
    router.push(paths.dashboard.plan_management.edit(plan.ID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan]);

  const { mutateAsync: deletePlan, isLoading } = useDeletePlansMutation();

  const handleDeletePlan = useCallback(async () => {
    if (!plan) return;
    try {
      await deletePlan([plan.ID]);
      reloadPlans();
      enqueueSnackbar(t('plan_management.delete_plan'), {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar(error?.data, {
        variant: 'error',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan, deletePlan]);

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
        title={t('plan_management.delete_plan')}
        onClose={toggle.onFalse}
        content={
          <Stack direction="row" spacing={0.5}>
            <Typography variant="body2">{t('plan_management.are_you_sure')}</Typography>
            <Typography variant="subtitle1">{plan?.title}</Typography>
            <Typography variant="body2">{t('plan_management.plan')}</Typography>
          </Stack>
        }
        action={
          <LoadingButton
            variant="contained"
            color="error"
            loading={isLoading}
            onClick={handleDeletePlan}
          >
            {t('plan_management.delete')}
          </LoadingButton>
        }
      />
    </>
  );
}
//---------------------------------------------------------------------------------

export default function PlanListDataGrid() {
  const { t } = useLocales();
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(8);
  const [planFilters, setPlanFilters] = useState<PlansQueryFiltersType>({});
  const [sort, setSort] = useState<{ order: string; order_by: string }>({
    order: 'desc',
    order_by: 'id',
  });

  const { order, order_by } = sort;

  const { data, isLoading, refetch } = usePlansQuery({
    page: page + 1,
    order,
    order_by,
    per_page: pageSize,
    filters: planFilters,
  });

  const rows = data?.data?.items || [];
  const totalRows = data?.data?.totalRows || 0;

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: 'ID', headerName: '#', width: 90 },
      { field: 'title', headerName: t('plan_management.title'), width: 90, flex: 1 },
      // {
      //   field: 'children',
      //   headerName: t('category_management.children'),
      //   align: 'left',
      //   valueGetter: (params: GridValueGetterParams) => params.row.children.length,
      //   flex: 1,
      // },
      { field: 'description', headerName: t('plan_management.description'), width: 90, flex: 1 },
      {
        field: 'day_length',
        headerName: t('plan_management.day_length'),
        width: 90,
        flex: 1,
      },
      {
        field: 'product_limit',
        headerName: t('plan_management.product_limit'),
        width: 90,
        flex: 1,
      },
      {
        field: 'storage_limit_mb',
        headerName: t('plan_management.storage_limit_mb'),
        width: 90,
        flex: 1,
      },
      {
        field: 'icon_url',
        headerName: t('plan_management.icon_url'),
        align: 'left',
        renderCell: (params: GridRenderCellParams<any>) => (
          <Image
            src={fileData(getDownloadUrl(params.row.icon_url)).preview}
            sx={{ width: 30, borderRadius: 1 }}
          />
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
          <ActionsMenu plan={params.row} reloadPlans={refetch} />
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
      (acc: PlansQueryFiltersType, item: GridFilterItem) => {
        const _value = typeof item.value === 'object' ? item.value.join(',') : item.value;
        return { ...acc, [item.field]: { op: item.operator, value: _value } };
      },
      {}
    );
    setPlanFilters(newPlanFilters);
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
