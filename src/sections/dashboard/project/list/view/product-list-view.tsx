'use client';

import isEqual from 'lodash/isEqual';
import { useState, useEffect, useCallback } from 'react';
// react-papaparse
import { jsonToCSV } from 'react-papaparse';
// @mui
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
// routes
import { paths } from 'src/routes/paths';
import { useParams, useRouter } from 'src/routes/hooks';
// locales
import { useLocales } from 'src/locales';
// req-hooks
import { useDeleteProductMutation } from 'src/_req-hooks/reality/product/useDeleteProductMutation';
import { useProductsQuery } from 'src/_req-hooks/reality/product/useProductsQuery';
// types
import { ProductData } from 'src/_types/reality/product/productData';
import { DocumentDataType } from 'src/_types/reality/document/documentData';
import { FilterOperatorsEnum } from 'src/_types/site/filters';
import { IProjectTableFilters } from 'src/_types/sections/project/project-filter';

// redux
import { useSelector } from 'src/redux/store';
import { organizationSelector } from 'src/redux/slices/organization';
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
import { useSnackbar } from 'src/components/snackbar';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// utils
import { fDate } from 'src/utils/format-time';
//
import ProjectDetailsInsightsDialog from 'src/sections/project/details/project-details-insights-dialog';
import ProductTableToolbar from '../product-table-toolbar';
import ProductTableFiltersResult from '../product-table-filters-result';
import ProductTableRow from '../product-table-row';
import ProductEditDialog from '../product-edit-dialog';

// ----------------------------------------------------------------------

type Props = {
  ID: string;
};
const defaultFilters: IProjectTableFilters = {
  name: '',
};

// ----------------------------------------------------------------------

export default function ProjectListView({ ID }: Props) {
  const { t } = useLocales();
  const router = useRouter();
  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const table = useTable();
  const organization = useSelector(organizationSelector);

  const [tableData, setTableData] = useState<ProductData[]>([]);
  const [productUid, setProductUid] = useState<string | null>(null);
  const [editingDocument, setEditingDocument] = useState<DocumentDataType | null>(null);
  const [filters, setFilters] = useState(defaultFilters);
  const [totalRows, setTotalRows] = useState(5);

  // اضافه کردن state برای server-side sorting
  const [serverOrder, setServerOrder] = useState<'asc' | 'desc'>('desc');
  const [serverOrderBy, setServerOrderBy] = useState<string>('created_at');

  const TABLE_HEAD = [
    { id: 'name', label: t('project.projects'), width: 160 },
    { id: 'created_at', label: t('project.created_at'), width: 160 },
    { id: 'view_count', label: t('project.view'), width: 100 },
    { id: 'link', label: t('project.link'), width: 110 },
    { id: '', width: 88 },
  ];

  const {
    data: projects,
    isLoading: projectLoading,
    refetch,
  } = useProductsQuery({
    page: table.page,
    order: serverOrder, // از server state استفاده می‌کنیم
    order_by: serverOrderBy, // از server state استفاده می‌کنیم
    filters: {
      category_id: {
        op: FilterOperatorsEnum._,
        value: parseInt(ID, 10),
      },
      organization_id: { op: FilterOperatorsEnum._, value: organization?.ID },
    },
  });

  const { mutateAsync: deleteProduct } = useDeleteProductMutation();

  const confirm = useBoolean();
  const visible = useBoolean();
  const editDialog = useBoolean();

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
    if (projects?.data.items.length) {
      setTableData(projects?.data.items);
      setTotalRows(projects?.data.totalRows);
    }
  }, [projects?.data.items, projects?.data.totalRows]);

  // فقط فیلتر کنید، سورت نکنید - حذف getComparator
  const dataFiltered = tableData.filter((product) => {
    if (filters.name) {
      return product.name.toLowerCase().indexOf(filters.name.toLowerCase()) !== -1;
    }
    return true;
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 60 : 80;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound =
    (!dataFiltered.length && canReset) || (!projectLoading && !projects?.data.items.length);

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

  const handleDeleteRow = useCallback(
    async (id: string) => {
      await deleteProduct([parseInt(id, 10)]);
      const deleteRow = tableData.filter((row) => `${row.ID}` !== id);
      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, deleteProduct, table, tableData]
  );

  const handleDeleteRows = useCallback(async () => {
    const Ids = table.selected.map((row) => parseInt(row, 10));
    await deleteProduct(Ids);
    const deleteRows = tableData.filter((row) => !table.selected.includes(`${row.ID}`));
    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRows: tableData.length,
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, deleteProduct, table, tableData]);

  const handleViewRow = useCallback(
    (uid: string) => {
      router.push(paths.project.details(uid));
    },
    [router]
  );

  const handleEditRow = useCallback(
    (product: ProductData) => {
      if (product.documents && product.documents.length > 0) {
        setEditingDocument(product.documents[0]);
        editDialog.onTrue();
      }
    },
    [editDialog]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleExport = () => {
    const fileName = `Project-${fDate(new Date())}`;

    // Check if projects, data, and items are defined before proceeding
    const items = projects?.data.items;

    if (items) {
      const data = items.map((item) => ({
        name: item.name,
        created_at: item.created_at,
        view_count: item.view_count,
        link: `${item.category.url}/${item.product_uid}`,
      }));

      const csv = jsonToCSV(data);

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');

      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${fileName}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } else {
      enqueueSnackbar(t('project.error_csv'), { variant: 'error' });
    }
  };

  const handleClickClose = () => {
    visible.onFalse();
    setProductUid(null);
  };

  const handleInsight = useCallback(
    (uid: string) => {
      setProductUid(uid);
      visible.onTrue();
    },
    [visible]
  );

  const handleEditSuccess = useCallback(() => {
    refetch();
    setEditingDocument(null);
  }, [refetch]);

  const handleEditClose = useCallback(() => {
    setEditingDocument(null);
    editDialog.onFalse();
  }, [editDialog]);

  return (
    <>
      {productUid && (
        <ProjectDetailsInsightsDialog
          open={visible.value}
          onClose={handleClickClose}
          productUid={productUid}
        />
      )}

      <ProductEditDialog
        open={editDialog.value}
        onClose={handleEditClose}
        document={editingDocument}
        onSuccess={handleEditSuccess}
      />

      <Stack maxWidth="100%" sx={{ height: '100%', px: 2, pt: 2 }} spacing={1}>
        <CustomBreadcrumbs
          heading={t('category_management.list')}
          links={[
            { name: t('dashboard.root'), href: paths.dashboard.root },
            {
              name: t(`project.categories`),
              href: paths.dashboard.projects.category,
            },
            { name: t(`category.${params?.label}`) },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <ProductTableToolbar
            filters={filters}
            onFilters={handleFilters}
            handleExport={handleExport}
          />

          <ProductTableFiltersResult
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
                  {projectLoading ? (
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
                          <ProductTableRow
                            key={`${row.ID}`}
                            row={row}
                            selected={table.selected.includes(`${row.ID}`)}
                            onSelectRow={() => table.onSelectRow(`${row.ID}`)}
                            onDeleteRow={() => handleDeleteRow(`${row.ID}`)}
                            onViewRow={() => handleViewRow(`${row.product_uid}`)}
                            onInsightRow={() => handleInsight(`${row.product_uid}`)}
                            onEditRow={() => handleEditRow(row)}
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

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title={t('project.delete_project')}
        content={<>{t('project.rows_delete').replace('$', `${table.selected.length}`)}</>}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            {t('project.delete')}
          </Button>
        }
      />
    </>
  );
}
