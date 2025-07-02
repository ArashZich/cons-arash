// @mui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
// req-hooks
import { useInvoicesQuery } from 'src/_req-hooks/reality/invoice/useInvoicesQuery';
// types
import { InvoiceDetailsProps } from 'src/_types/sections/billing/invoice-details';
// utils
import { fDate, jfDate } from 'src/utils/format-time';
import { fNumber } from 'src/utils/format-number';
// locales
import { useLocales } from 'src/locales';
// redux
import { useSelector } from 'src/redux/store';
import { organizationSelector } from 'src/redux/slices/organization';
// components
import { LoadingScreen } from 'src/components/loading-screen';
import Scrollbar from 'src/components/scrollbar';
import Image from 'src/components/image/image';
//
import InvoiceToolbar from './invoice-toolbar';

// ----------------------------------------------------------------------

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '& td': {
    textAlign: 'right',
    borderBottom: 'none',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function InvoiceDetails({ id }: Props) {
  const organization = useSelector(organizationSelector);
  const { t, isRtl } = useLocales();

  const { data, isLoading } = useInvoicesQuery({ id }, { enabled: !!id });

  // console.log(data);

  const renderTotal = (
    <>
      <StyledTableRow>
        <TableCell colSpan={3} />
        <TableCell sx={{ color: 'text.secondary' }}>{t('billing.discount')}</TableCell>
        <TableCell width={120} sx={{ color: 'error.main', typography: 'body2' }}>
          -{fNumber(data?.data?.items[0]?.invoice_items[0]?.discounted_price || 0)}
        </TableCell>
      </StyledTableRow>
      <StyledTableRow>
        <TableCell colSpan={3} />
        <TableCell sx={{ color: 'text.secondary' }}>{t('billing.taxes')}</TableCell>
        <TableCell width={120}>{fNumber(data?.data?.items[0]?.tax_amount || 0)}%</TableCell>
      </StyledTableRow>
      <StyledTableRow>
        <TableCell colSpan={3} />
        <TableCell sx={{ typography: 'subtitle1' }}>{t('billing.total')}</TableCell>
        <TableCell width={140} sx={{ typography: 'subtitle1' }}>
          {fNumber(data?.data?.items[0]?.final_paid_amount || 0)}
        </TableCell>
      </StyledTableRow>
    </>
  );

  const renderList = (
    <TableContainer sx={{ overflow: 'unset', mt: 5, maxWidth: '100%' }}>
      <Scrollbar>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell width={40}>#</TableCell>

              <TableCell sx={{ typography: 'subtitle2' }}>{t('billing.description')}</TableCell>
              <TableCell />
              <TableCell />
              <TableCell width={150} align="right">
                {t('billing.total')}
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.data.items[0].invoice_items.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Box sx={{ maxWidth: 560 }}>
                    <Typography variant="subtitle2">{t(`plan.${row.title}`)}</Typography>

                    {row.description.split(',').map((item, ind) => (
                      <Stack key={ind} spacing={0.5} direction="row" alignItems="center">
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                          {t(`plan.${item}`)}
                        </Typography>
                      </Stack>
                    ))}
                  </Box>
                </TableCell>
                <TableCell />
                <TableCell />
                <TableCell align="right">{fNumber(row.total_price)}</TableCell>
              </TableRow>
            ))}

            {renderTotal}
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <InvoiceToolbar
        data={{ organization, invoice: data?.data.items[0] } as InvoiceDetailsProps}
      />
      <Card sx={{ p: 5 }}>
        <Box
          rowGap={5}
          display="grid"
          alignItems="center"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          }}
        >
          <Stack sx={{ width: 48, height: 48 }}>
            <Image src="/logo/logo_single.svg" />
          </Stack>

          <Stack spacing={1} alignItems={{ xs: 'flex-start', md: 'flex-end' }}>
            <Typography variant="subtitle1">{data?.data.items[0].invoice_unique_code}</Typography>
          </Stack>

          <Stack sx={{ typography: 'body2' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {t('billing.seller')}
            </Typography>
            {data?.data.items[0].seller}
            <br />
            {t('billing.economic_code')} {`${data?.data.items[0].economic_id}`}
            <br />
            {t('billing.registration_number')} {`${data?.data.items[0].register_number}`}
            <br />
            {t('billing.postal_code')} {data?.data.items[0].from_postal_code}
            <br />
            {t('billing.address')} {data?.data.items[0].from_address}
            <br />
            {t('billing.phone_number')} {data?.data.items[0].from_phone_number}
            <br />
          </Stack>

          <Stack sx={{ typography: 'body2' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {t('billing.buyer')}
            </Typography>
            {organization?.name}
            <br />
            {t('billing.economic_code')} {organization?.company_registration_number}
            <br />
            {t('billing.registration_number')} {organization?.national_code}
            <br />
            {t('billing.postal_code')} {organization?.zip_code}
            <br />
            {t('billing.address')} {organization?.legal_address}
            <br />
            {t('billing.phone_number')} {organization?.phone_number}
            <br />
          </Stack>

          <Stack sx={{ typography: 'body2' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {t('billing.date_create')}
            </Typography>
            {isRtl ? jfDate(data?.data.items[0].created_at) : fDate(data?.data.items[0].created_at)}
          </Stack>
        </Box>

        {renderList}
      </Card>
    </>
  );
}
