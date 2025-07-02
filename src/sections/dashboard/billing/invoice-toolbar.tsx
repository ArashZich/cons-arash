// @react-pdf
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';
// locales
import { useLocales } from 'src/locales';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// _types
import { InvoiceDetailsProps } from 'src/_types/sections/billing/invoice-details';
// components
import Iconify from 'src/components/iconify';

//
import InvoicePDF from './invoice-pdf';

// ----------------------------------------------------------------------

type Props = {
  data: InvoiceDetailsProps;
};

export default function InvoiceToolbar({ data }: Props) {
  const view = useBoolean();
  const { t } = useLocales();

  return (
    <>
      <Stack
        spacing={3}
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-end', sm: 'center' }}
        sx={{ mb: { xs: 3, md: 5 } }}
      >
        <Stack direction="row" spacing={1} flexGrow={1} sx={{ width: 1 }}>
          <Tooltip title={t('billing.view')}>
            <IconButton onClick={view.onTrue}>
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          </Tooltip>

          <PDFDownloadLink
            document={<InvoicePDF data={data} />}
            fileName={data.invoice.invoice_unique_code}
            style={{ textDecoration: 'none' }}
          >
            {({ loading }) => (
              <Tooltip title={t('billing.download')}>
                <IconButton>
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <Iconify icon="eva:cloud-download-fill" />
                  )}
                </IconButton>
              </Tooltip>
            )}
          </PDFDownloadLink>
        </Stack>
      </Stack>

      <Dialog fullScreen open={view.value}>
        <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
          <DialogActions
            sx={{
              p: 1.5,
            }}
          >
            <Button color="inherit" variant="contained" onClick={view.onFalse}>
              {t('billing.close')}
            </Button>
          </DialogActions>

          <Box sx={{ flexGrow: 1, height: 1, overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              <InvoicePDF data={data} />
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
