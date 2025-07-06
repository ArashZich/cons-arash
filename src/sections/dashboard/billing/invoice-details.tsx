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
import Divider from '@mui/material/Divider';
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

  const renderTotal = (
    <>
      {/* <StyledTableRow>
        <TableCell colSpan={3} />
        <TableCell sx={{ color: 'text.secondary' }}>{t('billing.subtotal')}</TableCell>
        <TableCell width={120} sx={{ typography: 'body2' }}>
          {fNumber(data?.data?.items[0]?.invoice_items[0]?.total_price || 0)}
        </TableCell>
      </StyledTableRow> */}

      {/* <StyledTableRow>
        <TableCell colSpan={3} />
        <TableCell sx={{ color: 'text.secondary' }}>{t('billing.discount')}</TableCell>
        <TableCell width={120} sx={{ color: 'error.main', typography: 'body2' }}>
          -{fNumber(data?.data?.items[0]?.invoice_items[0]?.discounted_price || 0)}
        </TableCell>
      </StyledTableRow>

      <StyledTableRow>
        <TableCell colSpan={3} />
        <TableCell sx={{ color: 'text.secondary' }}>{t('billing.taxes')}</TableCell>
        <TableCell width={120}>{fNumber(data?.data?.items[0]?.tax_amount || 0)}</TableCell>
      </StyledTableRow> */}

      <StyledTableRow>
        <TableCell colSpan={3} />
        <TableCell sx={{ typography: 'subtitle1' }}>{t('billing.paid')}</TableCell>
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
              <TableCell width={80} align="center">
                {t('billing.qty')}
              </TableCell>
              <TableCell width={120} align="right">
                {t('billing.price')}
              </TableCell>
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
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      {t(`plan.${row.title}`) || t('billing.service')}
                    </Typography>

                    {row.description && (
                      <Stack spacing={0.5} sx={{ mt: 1 }}>
                        {row.description.split(',').map((feature, ind) => (
                          <Stack key={ind} spacing={0.5} direction="row" alignItems="center">
                            <Box
                              sx={{
                                width: 4,
                                height: 4,
                                borderRadius: '50%',
                                bgcolor: 'primary.main',
                                flexShrink: 0,
                              }}
                            />
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              {t(`plan.${feature.trim()}`)}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                    )}
                  </Box>
                </TableCell>
                <TableCell align="center">1</TableCell>
                <TableCell align="right">{fNumber(row.total_price)}</TableCell>
                <TableCell align="right" sx={{ typography: 'subtitle2' }}>
                  {fNumber(row.total_price)}
                </TableCell>
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
        {/* Header Section */}
        <Box
          rowGap={5}
          display="grid"
          alignItems="center"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          }}
          sx={{ mb: 5 }}
        >
          <Stack sx={{ width: 48, height: 48 }}>
            <Image src="/logo/logo_single.svg" />
          </Stack>

          <Stack spacing={1} alignItems={{ xs: 'flex-start', md: 'flex-end' }}>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              {t('billing.invoice')}
            </Typography>
            <Typography variant="h4">#{data?.data.items[0].invoice_unique_code}</Typography>
          </Stack>
        </Box>

        <Divider sx={{ my: 5 }} />

        {/* Invoice Info Grid */}
        <Box
          rowGap={5}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          }}
          sx={{ mb: 5 }}
        >
          {/* Seller Info */}
          <Stack sx={{ typography: 'body2' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {t('billing.seller')}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              {data?.data.items[0].seller}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {t('billing.economic_code')}: {data?.data.items[0].economic_id}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {t('billing.registration_number')}: {data?.data.items[0].register_number}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {t('billing.address')}: {data?.data.items[0].from_address}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {t('billing.phone_number')}: {data?.data.items[0].from_phone_number}
            </Typography>
          </Stack>

          {/* Buyer Info */}
          <Stack sx={{ typography: 'body2' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {t('billing.buyer')}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              {organization?.name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {t('billing.economic_code')}: {organization?.company_registration_number}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {t('billing.registration_number')}: {organization?.national_code}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {t('billing.address')}: {organization?.legal_address}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {t('billing.phone_number')}: {organization?.phone_number}
            </Typography>
          </Stack>

          {/* Invoice Date */}
          <Stack sx={{ typography: 'body2' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {t('billing.date_create')}
            </Typography>
            <Typography variant="body2">
              {isRtl
                ? jfDate(data?.data.items[0].created_at)
                : fDate(data?.data.items[0].created_at)}
            </Typography>
          </Stack>

          {/* Payment Status */}
          <Stack sx={{ typography: 'body2' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {t('billing.status')}
            </Typography>
            <Box
              sx={{
                px: 2,
                py: 0.5,
                borderRadius: 1,
                typography: 'caption',
                fontWeight: 'fontWeightBold',
                bgcolor: 'success.lighter',
                color: 'success.dark',
                display: 'inline-flex',
                alignItems: 'center',
                width: 'fit-content',
              }}
            >
              {t(`billing.${data?.data.items[0].status}`)}
            </Box>
          </Stack>
        </Box>

        <Divider sx={{ my: 5 }} />

        {/* Items Table */}
        {renderList}
      </Card>
    </>
  );
}
