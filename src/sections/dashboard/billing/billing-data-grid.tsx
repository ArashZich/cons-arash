// @mui
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
// import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Card from '@mui/material/Card';
import TableContainer from '@mui/material/TableContainer';
import { alpha, useTheme } from '@mui/material/styles';
// lodash
import isEmpty from 'lodash/isEmpty';
// locales
import { useLocales } from 'src/locales';
// utils
import { fDate, jfDate } from 'src/utils/format-time';
// components
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom, TableNoData } from 'src/components/table';
import { SplashScreen } from 'src/components/loading-screen';
// req-hooks
import { useInvoicesQuery } from 'src/_req-hooks/reality/invoice/useInvoicesQuery';
// types
import { FilterOperatorsEnum } from 'src/_types/site/filters';
// redux
import { useSelector } from 'src/redux/store';
import { organizationSelector } from 'src/redux/slices/organization';

// ----------------------------------------------------------------------

const checkStatusColor = (status: string) => {
  if (status === 'paid') {
    return 'success.dark';
  }
  if (status === 'failed') {
    return 'error.dark';
  }
  return 'info.dark';
};

export default function BillingDataGrid() {
  const { t, isRtl } = useLocales();
  const organization = useSelector(organizationSelector);
  const theme = useTheme();
  const TABLE_HEAD = [
    { id: 'date', label: t('billing.date') },
    { id: 'title', label: t('billing.title'), align: 'right' },
    { id: 'total_invoice', label: t('billing.total_invoice'), align: 'right' },
    { id: 'status', label: t('billing.status'), align: 'right' },
    { id: 'action', align: 'right' },
  ];

  const { data, isLoading } = useInvoicesQuery({
    filters: {
      organization_id: {
        op: FilterOperatorsEnum._,
        value: organization?.ID,
      },
      status: {
        op: FilterOperatorsEnum.EQUALS,
        value: 'paid',
      },
    },
  });

  // console.log(data);

  if (isLoading) return <SplashScreen />;

  const checkStatusBgColor = (status: string) => {
    if (status === 'paid') {
      return theme.palette.success.main;
    }
    if (status === 'failed') {
      return theme.palette.error.main;
    }
    return theme.palette.info.main;
  };

  return (
    <TableContainer component={Card} sx={{ mt: 3, overflow: 'unset' }}>
      <Scrollbar>
        <Table sx={{ minWidth: 800 }}>
          <TableHeadCustom headLabel={TABLE_HEAD} />

          <TableBody>
            {data?.data.items.map((row) => (
              <TableRow key={row.ID}>
                <TableCell>{isRtl ? jfDate(row.created_at) : fDate(row.created_at)}</TableCell>
                <TableCell align="right">{t(`plan.${row.invoice_items[0].title}`)}</TableCell>
                <TableCell align="right">{row.final_paid_amount.toLocaleString()}</TableCell>
                <TableCell align="right">
                  <Stack sx={{ alignItems: 'center' }}>
                    <Stack
                      sx={{
                        ml: 'auto',
                        color: checkStatusColor(row.status),
                        bgcolor: alpha(checkStatusBgColor(row.status), 0.16),
                        py: 0.25,
                        px: 0.75,
                        borderRadius: '6px',
                      }}
                    >
                      {t(`billing.${row.status}`)}
                    </Stack>
                  </Stack>
                </TableCell>
                {/* <TableCell align="right">
                    <Button
                      onClick={() => handleInvoice(row.ID)}
                      variant="outlined"
                      // disabled={row.status !== 'paid'}
                    >
                      {t('billing.view_invoice')}
                    </Button>
                  </TableCell> */}
              </TableRow>
            ))}
            <TableNoData notFound={isEmpty(data?.data.items)} />
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );
}
