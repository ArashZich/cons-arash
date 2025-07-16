// src/sections/dashboard/admin/plan-features/plan-features-table.tsx

'use client';

import { useState, useCallback, useEffect } from 'react';
// @mui
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
// locales
import { useLocales } from 'src/locales';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// req-hooks
import { usePlanFeaturesQuery } from 'src/_req-hooks/reality/admin/usePlanFeaturesQuery';
import { useDeletePlanFeatureMutation } from 'src/_req-hooks/reality/admin/useDeletePlanFeatureMutation';
// types
import { PlanFeatureData } from 'src/_types/reality/admin/planFeatures';
// components
import {
  useTable,
  emptyRows,
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSnackbar } from 'src/components/snackbar';
// sections
import PlanFeatureTableRow from './plan-feature-table-row';
import PlanFeatureNewEditDialog from './plan-feature-new-edit-dialog';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'admin.feature_name' },
  { id: 'title', label: 'admin.feature_title' },
  { id: 'pricing_type', label: 'admin.pricing_type', width: 120 },
  { id: 'price', label: 'admin.price', width: 120 },
  { id: 'categories', label: 'admin.categories', width: 150 },
  { id: 'is_active', label: 'admin.status', width: 100 },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

export default function PlanFeaturesTable() {
  const { t } = useLocales();
  const table = useTable();
  const { enqueueSnackbar } = useSnackbar();

  const [tableData, setTableData] = useState<PlanFeatureData[]>([]);

  // Dialogs
  const confirm = useBoolean();
  const quickEdit = useBoolean();
  const [selectedFeature, setSelectedFeature] = useState<PlanFeatureData | null>(null);

  // API hooks
  const {
    data: featuresData,
    isLoading: featuresLoading,
    isSuccess,
    refetch,
  } = usePlanFeaturesQuery();

  const { mutateAsync: deleteFeature, isLoading: deleteLoading } = useDeletePlanFeatureMutation();

  const dataInPage = tableData.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 60 : 80;

  const notFound = !featuresLoading && !tableData.length;

  const handleDeleteRow = useCallback(
    async (id: number) => {
      try {
        await deleteFeature(id);
        enqueueSnackbar(t('admin.feature_deleted_successfully'), { variant: 'success' });
        refetch();
      } catch (error) {
        enqueueSnackbar(error?.message || t('admin.delete_error'), { variant: 'error' });
      }
    },
    [deleteFeature, enqueueSnackbar, refetch, t]
  );

  const handleDeleteRows = useCallback(async () => {
    try {
      await Promise.all(table.selected.map((id) => deleteFeature(Number(id))));
      enqueueSnackbar(t('admin.features_deleted_successfully'), { variant: 'success' });
      table.onSelectAllRows(false, []);
      refetch();
    } catch (error) {
      enqueueSnackbar(error?.message || t('admin.delete_error'), { variant: 'error' });
    }
  }, [deleteFeature, enqueueSnackbar, refetch, t, table]);

  const handleEditRow = useCallback(
    (feature: PlanFeatureData) => {
      setSelectedFeature(feature);
      quickEdit.onTrue();
    },
    [quickEdit]
  );

  const handleNewFeature = useCallback(() => {
    setSelectedFeature(null);
    quickEdit.onTrue();
  }, [quickEdit]);

  const handleCloseEdit = useCallback(() => {
    setSelectedFeature(null);
    quickEdit.onFalse();
    refetch();
  }, [quickEdit, refetch]);

  // Update table data when API data changes
  useEffect(() => {
    if (isSuccess && featuresData.data) {
      setTableData(featuresData.data);
    }
  }, [featuresData, isSuccess]);

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <div />
        <Button
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleNewFeature}
        >
          {t('admin.new_feature')}
        </Button>
      </Stack>

      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={tableData.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                tableData.map((row) => row.ID.toString())
              )
            }
            action={
              <Tooltip title={t('admin.delete')}>
                <IconButton color="primary" onClick={confirm.onTrue}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            }
          />

          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD.map((head) => ({
                  ...head,
                  label: head.label ? t(head.label) : '',
                }))}
                rowCount={tableData.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    tableData.map((row) => row.ID.toString())
                  )
                }
              />

              <TableBody>
                {featuresLoading ? (
                  [...Array(table.rowsPerPage)].map((i, index) => (
                    <TableSkeleton key={index} sx={{ height: denseHeight }} />
                  ))
                ) : (
                  <>
                    {dataInPage.map((row) => (
                      <PlanFeatureTableRow
                        key={row.ID}
                        row={row}
                        selected={table.selected.includes(row.ID.toString())}
                        onSelectRow={() => table.onSelectRow(row.ID.toString())}
                        onDeleteRow={() => handleDeleteRow(row.ID)}
                        onEditRow={() => handleEditRow(row)}
                      />
                    ))}
                  </>
                )}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                />

                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          count={tableData.length}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
          dense={table.dense}
          onChangeDense={table.onChangeDense}
        />
      </Card>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title={t('admin.delete')}
        content={
          <>
            {t('admin.delete_confirm_message')} <strong> {table.selected.length} </strong>{' '}
            {t('admin.items')}?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
            disabled={deleteLoading}
          >
            {t('admin.delete')}
          </Button>
        }
      />

      <PlanFeatureNewEditDialog
        open={quickEdit.value}
        onClose={handleCloseEdit}
        currentFeature={selectedFeature}
      />
    </>
  );
}
