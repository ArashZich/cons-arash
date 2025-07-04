'use client';

import isEqual from 'lodash/isEqual';
import { useState, useEffect, useCallback } from 'react';

// @mui
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';

// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// locales
import { useLocales } from 'src/locales';
// req-hooks
import { useGetAllUsersQuery } from 'src/_req-hooks/reality/user/useGetAllUsersQuery';
// types
import { UserData } from 'src/_types/reality/user/userData';
import { IProjectTableFilters } from 'src/_types/sections/project/project-filter';

// hooks
import { useBoolean } from 'src/hooks/use-boolean';
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

//
import UserTableToolbar from '../user-table-toolbar';
import UserTableFiltersResult from '../user-table-filters-result';
import UserTableRow from '../user-table-row';

// ----------------------------------------------------------------------

const defaultFilters: IProjectTableFilters = {
  name: '',
};

// ----------------------------------------------------------------------

export default function UserManagementView() {
  const { t } = useLocales();
  const router = useRouter();

  const table = useTable();

  const [tableData, setTableData] = useState<UserData[]>([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [totalRows, setTotalRows] = useState(5);

  // اضافه کردن state برای server-side sorting
  const [serverOrder, setServerOrder] = useState<'asc' | 'desc'>('desc');
  const [serverOrderBy, setServerOrderBy] = useState<string>('created_at');

  const TABLE_HEAD = [
    { id: 'name', label: t('user_information.user'), width: 160 },
    { id: 'organization_count', label: t('user_information.organization_count'), width: 160 },
    { id: 'contact', label: t('user_information.contact'), width: 100 },
    { id: 'created_at', label: t('user_information.created_at'), width: 110 },
    { id: '', width: 88 },
  ];

  const { data: userData, isLoading: userLoading } = useGetAllUsersQuery({
    page: table.page,
    per_page: totalRows,
    order: serverOrder, // از server state استفاده می‌کنیم
    order_by: serverOrderBy, // از server state استفاده می‌کنیم
  });

  const confirm = useBoolean();

  // Custom sort handler
  const handleSort = useCallback(
    (id: string) => {
      if (serverOrderBy === id) {
        setServerOrder(serverOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setServerOrderBy(id);
        setServerOrder('asc');
      }
      table.onResetPage(); // صفحه رو به اول برگردونید
    },
    [serverOrder, serverOrderBy, table]
  );

  useEffect(() => {
    if (userData?.data.items.length) {
      setTableData(userData?.data.items);
      setTotalRows(userData?.data.totalRows);
    }
  }, [userData?.data.items, userData?.data.totalRows]);

  // فقط فیلتر کنید، سورت نکنید - حذف getComparator
  const dataFiltered = tableData.filter((item) => {
    if (filters.name) {
      const searchWords = filters.name.toLowerCase().trim().split(/\s+/);
      const { name: firstName, last_name: lastName, phone } = item;
      const itemFirstName = firstName.toLowerCase();
      const itemLastName = lastName.toLowerCase();

      return searchWords.some(
        (word) =>
          itemFirstName.includes(word) || itemLastName.includes(word) || phone.includes(word)
      );
    }
    return true;
  });

  const denseHeight = table.dense ? 60 : 80;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound =
    (!dataFiltered.length && canReset) || (!userLoading && !userData?.data.items.length);

  const handleFilters = useCallback(
    (name: string, value: string) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleViewRow = useCallback(
    (uid: string) => {
      router.push(paths.dashboard.user_management.edit(uid));
    },
    [router]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return (
    <Stack maxWidth="100%" sx={{ height: '100%', px: 2, pt: 2 }} spacing={1}>
      <Typography variant="h4" gutterBottom>
        {t('user_management.users')}
      </Typography>

      <Card>
        <UserTableToolbar filters={filters} onFilters={handleFilters} />

        <UserTableFiltersResult
          filters={filters}
          onFilters={handleFilters}
          //
          onResetFilters={handleResetFilters}
          //
          results={dataFiltered.length}
          sx={{ p: 2.5, pt: 0 }}
        />

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={tableData.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                tableData.map((row) => `${row.ID}`)
              )
            }
            action={
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={confirm.onTrue}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            }
          />

          <Scrollbar>
            <Table size="medium" sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={serverOrder}
                orderBy={serverOrderBy}
                headLabel={TABLE_HEAD}
                rowCount={tableData.length}
                numSelected={table.selected.length}
                onSort={handleSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    tableData.map((row) => `${row.ID}`)
                  )
                }
              />

              <TableBody>
                {userLoading ? (
                  [...Array(table.rowsPerPage)].map((i, index) => (
                    <TableSkeleton key={index} sx={{ height: denseHeight }} />
                  ))
                ) : (
                  <>
                    {dataFiltered
                      .slice(
                        table.page * table.rowsPerPage,
                        table.page * table.rowsPerPage + table.rowsPerPage
                      )
                      .map((row) => (
                        <UserTableRow
                          key={`${row.ID}`}
                          row={row}
                          selected={table.selected.includes(`${row.ID}`)}
                          onSelectRow={() => table.onSelectRow(`${row.ID}`)}
                          onViewRow={() => handleViewRow(`${row.uid}`)}
                        />
                      ))}
                  </>
                )}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                />

                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          count={totalRows}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </Stack>
  );
}
