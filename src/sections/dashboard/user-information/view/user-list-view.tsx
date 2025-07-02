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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// locales
import { useLocales } from 'src/locales';
// auth
import { useAuthContext } from 'src/auth/hooks';
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
  getComparator,
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
  hasOrganization: '',
  hasPackages: '',
};

// ----------------------------------------------------------------------

export default function UserListView() {
  const { t } = useLocales();
  const router = useRouter();
  const { user } = useAuthContext();

  const table = useTable();

  const [tableData, setTableData] = useState<UserData[]>([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [totalRows, setTotalRows] = useState(5);

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
    affiliate_codes:
      user && user?.affiliate_codes?.length > 0 ? user.affiliate_codes.split(', ') : '',
    has_organization: filters.hasOrganization,
    has_packages: filters.hasPackages,
  });

  const confirm = useBoolean();

  useEffect(() => {
    if (userData?.data.items.length) {
      setTableData(userData?.data.items);
      setTotalRows(userData?.data.totalRows);
    }
  }, [userData?.data.items, userData?.data.totalRows]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
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
      router.push(paths.dashboard.user_information.details(uid));
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
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2.5 }}>
          <Stack direction="row" spacing={2}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="has-organization-label">
                {t('user_information.has_organization')}
              </InputLabel>
              <Select
                labelId="has-organization-label"
                value={filters.hasOrganization}
                onChange={(e) => handleFilters('hasOrganization', e.target.value)}
                label={t('user_information.has_organization')}
                size="small"
              >
                <MenuItem value="">{t('user_information.all')}</MenuItem>
                <MenuItem value="1">{t('user_information.with_organization')}</MenuItem>
                <MenuItem value="0">{t('user_information.without_organization')}</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="has-packages-label">{t('user_information.has_packages')}</InputLabel>
              <Select
                labelId="has-packages-label"
                value={filters.hasPackages}
                onChange={(e) => handleFilters('hasPackages', e.target.value)}
                label={t('user_information.has_packages')}
                size="small"
              >
                <MenuItem value="">{t('user_information.all')}</MenuItem>
                <MenuItem value="1">{t('user_information.with_packages')}</MenuItem>
                <MenuItem value="0">{t('user_information.without_packages')}</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>

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
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={tableData.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
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
                  emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
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

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filters,
}: {
  inputData: UserData[];
  comparator: (a: any, b: any) => number;
  filters: IProjectTableFilters;
}) {
  const { name } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => {
    const [item] = el; // از destructuring استفاده کردیم
    return item;
  });

  if (name) {
    const searchWords = name.toLowerCase().trim().split(/\s+/);
    inputData = inputData.filter((item) => {
      const { name: firstName, last_name: lastName, phone } = item; // از destructuring استفاده کردیم
      const itemFirstName = firstName.toLowerCase();
      const itemLastName = lastName.toLowerCase();

      return searchWords.some(
        (word) =>
          itemFirstName.includes(word) || itemLastName.includes(word) || phone.includes(word)
      );
    });
  }

  return inputData;
}
