// next
import Link from 'next/link';
// @mui
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
// lodash
import isEmpty from 'lodash/isEmpty';
// locales
import { useLocales } from 'src/locales';
// req-hooks
import { useInvoicesQuery } from 'src/_req-hooks/reality/invoice/useInvoicesQuery';
// types
import { FilterOperatorsEnum } from 'src/_types/site/filters';
// redux
import { useSelector } from 'src/redux/store';
import { organizationSelector } from 'src/redux/slices/organization';
// utils
import { fDate, jfDate } from 'src/utils/format-time';
// components
import Scrollbar from 'src/components/scrollbar';
import Iconify from 'src/components/iconify';
import { TableHeadCustom, TableNoData } from 'src/components/table';
import { LoadingScreen } from 'src/components/loading-screen';
// routes
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function OverviewBilling() {
  const { t, isRtl } = useLocales();
  const organization = useSelector(organizationSelector);
  const theme = useTheme();

  const TABLE_HEAD = [
    { id: 'date', label: t('billing.date') },
    { id: 'description', label: t('billing.description') },
    { id: 'total_invoice', label: t('billing.total_invoice') },
    { id: 'status', label: t('billing.status') },
    { id: 'action' },
  ];

  const { data, isLoading } = useInvoicesQuery({
    per_page: 3,
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

  if (isLoading) return <LoadingScreen />;

  return (
    <TableContainer sx={{ mt: 3, overflow: 'unset' }}>
      <Scrollbar>
        <Table>
          <TableHeadCustom headLabel={TABLE_HEAD} />

          <TableBody>
            {data?.data.items.map((row) => (
              <TableRow key={row.ID}>
                <TableCell>{isRtl ? jfDate(row.created_at) : fDate(row.created_at)}</TableCell>
                <TableCell>
                  {row.invoice_items[0]?.description?.split(',').map((item: string) => (
                    <Typography key={item} variant="body2" color="text.secondary">
                      {t(`plan.${item.trim()}`)}
                    </Typography>
                  ))}
                </TableCell>
                <TableCell>{row.final_paid_amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Stack sx={{ alignItems: 'center' }}>
                    <Stack
                      sx={{
                        ml: 'auto',
                        color: 'success.dark',
                        bgcolor: alpha(theme.palette.success.main, 0.16),
                        py: 0.25,
                        px: 0.75,
                        borderRadius: '6px',
                      }}
                    >
                      {t(`billing.${row.status}`)}
                    </Stack>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            <TableNoData notFound={isEmpty(data?.data.items)} />
          </TableBody>
        </Table>
      </Scrollbar>
      <Stack sx={{ m: 2 }}>
        <Stack sx={{ ml: 'auto' }}>
          <Button
            LinkComponent={Link}
            href={paths.dashboard.billing.root}
            endIcon={<Iconify icon="zondicons:cheveron-right" />}
          >
            {t('overview.view_all')}
          </Button>
        </Stack>
      </Stack>
    </TableContainer>
  );
}
