// src/sections/dashboard/admin/discount-rules/discount-rules-table.tsx

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
import { useDiscountRulesQuery } from 'src/_req-hooks/reality/admin/useDiscountRulesQuery';
import { useDeleteDiscountRuleMutation } from 'src/_req-hooks/reality/admin/useDeleteDiscountRuleMutation';
// types
import { DiscountRuleData } from 'src/_types/reality/admin/discountRules';
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
import DiscountRuleTableRow from './discount-rule-table-row';
import DiscountRuleNewEditDialog from './discount-rule-new-edit-dialog';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'admin.rule_name' },
  { id: 'conditions', label: 'admin.conditions', width: 200 },
  { id: 'discount_percentage', label: 'admin.discount_percentage', width: 140 },
  { id: 'is_active', label: 'admin.status', width: 100 },
  { id: 'created_at', label: 'admin.created_at', width: 160 },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

export default function DiscountRulesTable() {
  const { t } = useLocales();
  const table = useTable();
  const { enqueueSnackbar } = useSnackbar();

  const [tableData, setTableData] = useState<DiscountRuleData[]>([]);

  // Dialogs
  const confirm = useBoolean();
  const quickEdit = useBoolean();
  const [selectedRule, setSelectedRule] = useState<DiscountRuleData | null>(null);

  // API hooks
  const { data: rulesData, isLoading: rulesLoading, refetch } = useDiscountRulesQuery();

  const { mutateAsync: deleteRule, isLoading: deleteLoading } = useDeleteDiscountRuleMutation();

  const dataInPage = tableData.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 60 : 80;

  const notFound = !rulesLoading && !tableData.length;

  const handleDeleteRow = useCallback(
    async (id: number) => {
      try {
        await deleteRule(id);
        enqueueSnackbar(t('admin.rule_deleted_successfully'), { variant: 'success' });
        refetch();
      } catch (error) {
        enqueueSnackbar(error?.message || t('admin.delete_error'), { variant: 'error' });
      }
    },
    [deleteRule, enqueueSnackbar, refetch, t]
  );

  const handleDeleteRows = useCallback(async () => {
    try {
      await Promise.all(table.selected.map((id) => deleteRule(Number(id))));
      enqueueSnackbar(t('admin.rules_deleted_successfully'), { variant: 'success' });
      table.onSelectAllRows(false, []);
      refetch();
    } catch (error) {
      enqueueSnackbar(error?.message || t('admin.delete_error'), { variant: 'error' });
    }
  }, [deleteRule, enqueueSnackbar, refetch, t, table]);

  const handleEditRow = useCallback(
    (rule: DiscountRuleData) => {
      setSelectedRule(rule);
      quickEdit.onTrue();
    },
    [quickEdit]
  );

  const handleNewRule = useCallback(() => {
    setSelectedRule(null);
    quickEdit.onTrue();
  }, [quickEdit]);

  const handleCloseEdit = useCallback(() => {
    setSelectedRule(null);
    quickEdit.onFalse();
    refetch();
  }, [quickEdit, refetch]);

  // Update table data when API data changes
  useEffect(() => {
    if (rulesData?.success && rulesData.data) {
      setTableData(rulesData.data);
    }
  }, [rulesData]);

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <div />
        <Button
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleNewRule}
        >
          {t('admin.new_discount_rule')}
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
                tableData.map((row) => row.id.toString())
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
                    tableData.map((row) => row.id.toString())
                  )
                }
              />

              <TableBody>
                {rulesLoading ? (
                  [...Array(table.rowsPerPage)].map((i, index) => (
                    <TableSkeleton key={index} sx={{ height: denseHeight }} />
                  ))
                ) : (
                  <>
                    {dataInPage.map((row) => (
                      <DiscountRuleTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id.toString())}
                        onSelectRow={() => table.onSelectRow(row.id.toString())}
                        onDeleteRow={() => handleDeleteRow(row.id)}
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

      <DiscountRuleNewEditDialog
        open={quickEdit.value}
        onClose={handleCloseEdit}
        currentRule={selectedRule}
      />
    </>
  );
}
