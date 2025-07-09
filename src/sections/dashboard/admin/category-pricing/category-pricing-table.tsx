// src/sections/dashboard/admin/category-pricing/category-pricing-table.tsx

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
import { useCategoryPricingListQuery } from 'src/_req-hooks/reality/admin/useCategoryPricingQuery';
import { useDeleteCategoryPricingMutation } from 'src/_req-hooks/reality/admin/useDeleteCategoryPricingMutation';
// types
import { CategoryPricingData } from 'src/_types/reality/admin/categoryPricing';
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
import CategoryPricingTableRow from './category-pricing-table-row';
import CategoryPricingNewEditDialog from './category-pricing-new-edit-dialog';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'category', label: 'admin.category' },
  { id: 'price_per_product_per_month', label: 'admin.price_per_product_per_month', width: 200 },
  { id: 'storage_per_product_mb', label: 'admin.storage_per_product', width: 160 }, // 🆕 اضافه شده
  { id: 'created_at', label: 'admin.created_at', width: 160 },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

export default function CategoryPricingTable() {
  const { t } = useLocales();
  const table = useTable();
  const { enqueueSnackbar } = useSnackbar();

  const [tableData, setTableData] = useState<CategoryPricingData[]>([]);

  // Dialogs
  const confirm = useBoolean();
  const quickEdit = useBoolean();
  const [selectedPricing, setSelectedPricing] = useState<CategoryPricingData | null>(null);

  // API hooks
  const { data: pricingData, isLoading: pricingLoading, refetch } = useCategoryPricingListQuery();

  const { mutateAsync: deletePricing, isLoading: deleteLoading } =
    useDeleteCategoryPricingMutation();

  const dataInPage = tableData.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 60 : 80;

  const notFound = !pricingLoading && !tableData.length;

  const handleDeleteRow = useCallback(
    async (categoryId: number) => {
      try {
        await deletePricing(categoryId);
        enqueueSnackbar(t('admin.pricing_deleted_successfully'), { variant: 'success' });
        refetch();
      } catch (error) {
        enqueueSnackbar(error?.message || t('admin.delete_error'), { variant: 'error' });
      }
    },
    [deletePricing, enqueueSnackbar, refetch, t]
  );

  const handleDeleteRows = useCallback(async () => {
    try {
      await Promise.all(table.selected.map((id) => deletePricing(Number(id))));
      enqueueSnackbar(t('admin.pricing_deleted_successfully'), { variant: 'success' });
      table.onSelectAllRows(false, []);
      refetch();
    } catch (error) {
      enqueueSnackbar(error?.message || t('admin.delete_error'), { variant: 'error' });
    }
  }, [deletePricing, enqueueSnackbar, refetch, t, table]);

  const handleEditRow = useCallback(
    (pricing: CategoryPricingData) => {
      setSelectedPricing(pricing);
      quickEdit.onTrue();
    },
    [quickEdit]
  );

  const handleNewPricing = useCallback(() => {
    setSelectedPricing(null);
    quickEdit.onTrue();
  }, [quickEdit]);

  const handleCloseEdit = useCallback(() => {
    setSelectedPricing(null);
    quickEdit.onFalse();
    refetch();
  }, [quickEdit, refetch]);

  // Update table data when API data changes
  useEffect(() => {
    if (pricingData?.success && pricingData.data) {
      setTableData(pricingData.data);
    }
  }, [pricingData]);

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <div />
        <Button
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleNewPricing}
        >
          {t('admin.set_category_pricing')}
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
                tableData.map((row) => row.category_id.toString())
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
                    tableData.map((row) => row.category_id.toString())
                  )
                }
              />

              <TableBody>
                {pricingLoading ? (
                  [...Array(table.rowsPerPage)].map((i, index) => (
                    <TableSkeleton key={index} sx={{ height: denseHeight }} />
                  ))
                ) : (
                  <>
                    {dataInPage.map((row) => (
                      <CategoryPricingTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.category_id.toString())}
                        onSelectRow={() => table.onSelectRow(row.category_id.toString())}
                        onDeleteRow={() => handleDeleteRow(row.category_id)}
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

      <CategoryPricingNewEditDialog
        open={quickEdit.value}
        onClose={handleCloseEdit}
        currentPricing={selectedPricing}
      />
    </>
  );
}
