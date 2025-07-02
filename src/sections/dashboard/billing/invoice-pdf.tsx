// react
import { useMemo } from 'react';
// @react-pdf
import { Page, View, Text, Image, Document, Font, StyleSheet } from '@react-pdf/renderer';
// utils
import { fDate, jfDate } from 'src/utils/format-time';
import { fNumber } from 'src/utils/format-number';
// locales
import { useLocales } from 'src/locales';
// _types
import { InvoiceDetailsProps } from 'src/_types/sections/billing/invoice-details';

// ----------------------------------------------------------------------

Font.register({
  family: 'IRANSansWeb',
  format: 'truetype', // 1
  fontStyle: 'normal',
  fontWeight: 'normal',
  fonts: [
    {
      src: `${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/fonts/IranSans/IRANSansWeb%28FaNum%29_Medium.woff`,
    },
  ],
});

const useStyles = () =>
  useMemo(
    () =>
      StyleSheet.create({
        col4: { width: '25%' },
        col8: { width: '75%' },
        col6: { width: '50%' },
        mb4: { marginBottom: 4 },
        mb8: { marginBottom: 8 },
        mb40: { marginBottom: 40 },
        h3: { fontSize: 16, fontWeight: 700 },
        h4: { fontSize: 13, fontWeight: 700 },
        body1: { fontSize: 10 },
        body2: { fontSize: 9 },
        subtitle1: { fontSize: 10, fontWeight: 700 },
        subtitle2: { fontSize: 9, fontWeight: 700 },
        alignRight: { textAlign: 'right' },
        page: {
          fontSize: 9,
          lineHeight: 1.6,
          fontFamily: 'IRANSansWeb',
          backgroundColor: '#FFFFFF',
          textTransform: 'capitalize',
          padding: '40px 24px 120px 24px',
        },
        footer: {
          left: 0,
          right: 0,
          bottom: 0,
          padding: 24,
          margin: 'auto',
          borderTopWidth: 1,
          borderStyle: 'solid',
          position: 'absolute',
          borderColor: '#DFE3E8',
        },
        gridContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        table: {
          display: 'flex',
          width: 'auto',
        },
        tableRow: {
          padding: '8px 0',
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderStyle: 'solid',
          borderColor: '#DFE3E8',
        },
        noBorder: {
          paddingTop: 8,
          paddingBottom: 0,
          borderBottomWidth: 0,
        },
        tableCell_1: {
          width: '5%',
        },
        tableCell_2: {
          width: '50%',
          paddingRight: 16,
        },
        tableCell_3: {
          width: '15%',
        },
        tableCell_4: {
          width: '100%',
          paddingRight: 16,
        },
      }),
    []
  );

// ----------------------------------------------------------------------

type Props = {
  data: InvoiceDetailsProps;
};

export default function InvoicePDF({ data }: Props) {
  const styles = useStyles();
  const { t, isRtl } = useLocales();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.gridContainer, styles.mb40]}>
          <Image source="/logo/logo_single.png" style={{ width: 48, height: 48 }} />

          <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
            <Text> {data?.invoice.invoice_unique_code}</Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.subtitle2, styles.mb4]}>{t('billing.seller')}</Text>
            <Text style={styles.body2}>{data?.invoice.seller}</Text>
            <Text style={styles.body2}>
              {t('billing.economic_code')} {`${data.invoice.economic_id}`}
            </Text>
            <Text style={styles.body2}>
              {' '}
              {t('billing.registration_number')} {`${data.invoice.register_number}`}
            </Text>
            <Text style={styles.body2}>
              {t('billing.postal_code')} {data.invoice.from_postal_code}
            </Text>
            <Text style={styles.body2}>{`${t('billing.address')} ${data?.invoice
              .from_address}`}</Text>
            <Text style={styles.body2}>{`${t('billing.phone_number')} ${data?.invoice
              .from_phone_number}`}</Text>
          </View>

          <View style={styles.col6}>
            <Text style={[styles.subtitle2, styles.mb4]}>{t('billing.buyer')}</Text>
            <Text style={styles.body2}>{data?.organization.name}</Text>
            <Text style={styles.body2}>{`${t('billing.economic_code')} ${data?.organization
              ?.company_registration_number}`}</Text>
            <Text style={styles.body2}>{`${t('billing.registration_number')} ${data?.organization
              ?.national_code}`}</Text>
            <Text style={styles.body2}>{`${t('billing.postal_code')} ${data?.organization
              ?.zip_code}`}</Text>
            <Text style={styles.body2}>{`${t('billing.address')} ${data?.organization
              ?.legal_address}`}</Text>
            <Text style={styles.body2}>{`${t('billing.phone_number')} ${data?.organization
              ?.phone_number}`}</Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.subtitle2, styles.mb4]}>{t('billing.date_create')}</Text>
            <Text style={styles.body2}>
              {isRtl ? jfDate(data?.invoice.created_at) : fDate(data?.invoice.created_at)}
            </Text>
          </View>
        </View>

        <Text style={[styles.subtitle1, styles.mb8]}>{t('billing.invoice_details')}</Text>

        <View style={styles.table}>
          <View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>#</Text>
              </View>

              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>{t('billing.description')}</Text>
              </View>

              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle2}>{t('billing.total')}</Text>
              </View>
            </View>
          </View>

          <View>
            {data?.invoice.invoice_items?.map((row, index) => (
              <View style={styles.tableRow} key={row.ID}>
                <View style={styles.tableCell_1}>
                  <Text>{index + 1}</Text>
                </View>

                <View style={styles.tableCell_2}>
                  <Text style={styles.subtitle2}>{row.title}</Text>
                  {row.description.split(',').map((item, ind) => (
                    <View key={ind} style={styles.tableCell_2}>
                      <Text style={styles.subtitle2}>{t(`plan.${item}`)}</Text>
                    </View>
                  ))}
                </View>

                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text style={styles.subtitle2}>{data?.invoice.invoice_items[0].total_price}</Text>
                </View>
              </View>
            ))}

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>{t('billing.discount')}</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>-{fNumber(data?.invoice?.invoice_items[0]?.discounted_price || 0)}</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>{t('billing.taxes')}</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{fNumber(data?.invoice?.tax_amount || 0)}%</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text style={styles.h4}>{t('billing.total')}</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.h4}>{fNumber(data?.invoice.final_paid_amount || 0)}</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
