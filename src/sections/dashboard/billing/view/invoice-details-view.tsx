'use client';

// @mui
import Stack from '@mui/material/Stack';
// locales
import { useLocales } from 'src/locales';
// routes
import { paths } from 'src/routes/paths';
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import InvoiceDetails from '../invoice-details';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function InvoiceDetailsView({ id }: Props) {
  const { t } = useLocales();

  return (
    <Stack>
      <CustomBreadcrumbs
        // heading={currentInvoice?.invoiceNumber}
        links={[
          {
            name: t('dashboard.root'),
            href: paths.dashboard.root,
          },
          {
            name: t('dashboard.billing'),
            href: paths.dashboard.billing.root,
          },
          { name: id },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <InvoiceDetails id={id} />
    </Stack>
  );
}
