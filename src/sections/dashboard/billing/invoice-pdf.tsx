// react
import { useMemo } from 'react';
// @react-pdf
import { Page, View, Text, Image, Document, Font, StyleSheet } from '@react-pdf/renderer';
// utils
import { formatDateForPDF } from 'src/utils/format-time';
import { fNumber } from 'src/utils/format-number';
// locales
import { useLocales } from 'src/locales';
// _types
import { InvoiceDetailsProps } from 'src/_types/sections/billing/invoice-details';

// ----------------------------------------------------------------------

Font.register({
  family: 'IRANSansWeb',
  format: 'truetype',
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
        // Layout
        col4: { width: '25%' },
        col6: { width: '50%' },
        col8: { width: '75%' },

        // Spacing (کوچکتر شده)
        mb4: { marginBottom: 2 },
        mb8: { marginBottom: 4 },
        mb16: { marginBottom: 8 },
        mb24: { marginBottom: 12 },
        mb40: { marginBottom: 20 },

        // Typography (کوچکتر شده)
        h3: { fontSize: 12, fontWeight: 700 },
        h4: { fontSize: 10, fontWeight: 700 },
        body1: { fontSize: 8, lineHeight: 1.3 },
        body2: { fontSize: 7, lineHeight: 1.2 },
        subtitle1: { fontSize: 8, fontWeight: 700 },
        subtitle2: { fontSize: 7, fontWeight: 700 },
        caption: { fontSize: 6, lineHeight: 1.2 },

        // RTL Alignment
        alignRight: { textAlign: 'right' },
        alignLeft: { textAlign: 'left' },
        alignCenter: { textAlign: 'center' },

        dateText: {
          fontSize: 8,
          lineHeight: 1.3,
          fontFamily: 'IRANSansWeb',
          direction: 'rtl', // اضافه کردن direction مخصوص
          textAlign: 'left',
          unicodeBidi: 'plaintext', // اضافه کردن برای پشتیبانی unicode
        },

        // Page با تنظیمات بهتر
        page: {
          fontSize: 7,
          lineHeight: 1.4,
          fontFamily: 'IRANSansWeb',
          backgroundColor: '#FFFFFF',
          padding: '20px 16px 60px 16px',
          direction: 'rtl',
          unicodeBidi: 'plaintext', // اضافه کردن
        },

        // Header
        header: {
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
          alignItems: 'center',
        },

        // Grid Container
        gridContainer: {
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
        },

        // Table
        table: {
          display: 'flex',
          width: 'auto',
          direction: 'rtl',
        },
        tableHeader: {
          flexDirection: 'row-reverse',
          borderBottomWidth: 2,
          borderBottomColor: '#E0E0E0',
          borderBottomStyle: 'solid',
          paddingBottom: 8,
          marginBottom: 8,
        },
        tableRow: {
          flexDirection: 'row-reverse',
          padding: '4px 0',
          borderBottomWidth: 1,
          borderStyle: 'solid',
          borderColor: '#F5F5F5',
        },
        tableRowTotal: {
          flexDirection: 'row-reverse',
          padding: '2px 0',
          borderBottomWidth: 0,
        },

        // Table Cells (RTL order)
        tableCell_1: { width: '10%', textAlign: 'center' },
        tableCell_2: { width: '50%', textAlign: 'right', paddingLeft: 16 },
        tableCell_3: { width: '15%', textAlign: 'center' },
        tableCell_4: { width: '25%', textAlign: 'left' },

        // Summary cells
        summaryLabel: { width: '75%', textAlign: 'right', paddingRight: 16 },
        summaryValue: { width: '25%', textAlign: 'left' },

        // Info Box (کوچکتر)
        infoBox: {
          padding: 6,
          backgroundColor: '#F8F9FA',
          borderRadius: 3,
          marginBottom: 8,
        },

        // Divider (کوچکتر)
        divider: {
          height: 1,
          backgroundColor: '#E0E0E0',
          marginVertical: 8,
        },

        // Feature List
        featureItem: {
          flexDirection: 'row-reverse',
          alignItems: 'center',
          marginBottom: 2,
        },
        featureDot: {
          width: 3,
          height: 3,
          borderRadius: 1.5,
          backgroundColor: '#1976D2',
          marginLeft: 4,
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
        {/* Header */}
        <View style={[styles.header, styles.mb40]}>
          <View style={{ alignItems: 'flex-start' }}>
            <Text style={styles.h4}>{t('billing.invoice')}</Text>
            <Text style={[styles.h3, { color: '#1976D2' }]}>
              #{data?.invoice.invoice_unique_code}
            </Text>
          </View>
          <Image source="/logo/logo_single.png" style={{ width: 48, height: 48 }} />
        </View>

        {/* Company & Customer Info */}
        <View style={[styles.gridContainer, styles.mb40]}>
          {/* Customer Info (Right side in RTL) */}
          <View style={styles.col6}>
            <View style={styles.infoBox}>
              <Text style={[styles.subtitle2, styles.mb8, { color: '#1976D2' }]}>
                {t('billing.buyer')}
              </Text>
              <Text style={[styles.body1, styles.mb4]}>{data?.organization.name}</Text>
              <Text style={[styles.caption, styles.mb4]}>
                {t('billing.economic_code')}: {data?.organization?.company_registration_number}
              </Text>
              <Text style={[styles.caption, styles.mb4]}>
                {t('billing.registration_number')}: {data?.organization?.national_code}
              </Text>
              <Text style={[styles.caption, styles.mb4]}>
                {t('billing.postal_code')}: {data?.organization?.zip_code}
              </Text>
              <Text style={styles.caption}>
                {t('billing.address')}: {data?.organization?.legal_address}
              </Text>
            </View>
          </View>

          {/* Company Info (Left side in RTL) */}
          <View style={styles.col6}>
            <View style={styles.infoBox}>
              <Text style={[styles.subtitle2, styles.mb8, { color: '#1976D2' }]}>
                {t('billing.seller')}
              </Text>
              <Text style={[styles.body1, styles.mb4]}>{data?.invoice.seller}</Text>
              <Text style={[styles.caption, styles.mb4]}>
                {t('billing.economic_code')}: {data.invoice.economic_id}
              </Text>
              <Text style={[styles.caption, styles.mb4]}>
                {t('billing.registration_number')}: {data.invoice.register_number}
              </Text>
              <Text style={[styles.caption, styles.mb4]}>
                {t('billing.postal_code')}: {data.invoice.from_postal_code}
              </Text>
              <Text style={styles.caption}>
                {t('billing.address')}: {data?.invoice.from_address}
              </Text>
            </View>
          </View>
        </View>

        {/* Invoice Date & Status */}
        <View style={[styles.gridContainer, styles.mb24]}>
          <View style={styles.col6}>
            <Text style={[styles.subtitle2, styles.mb4]}>{t('billing.status')}</Text>
            <Text style={[styles.body1, { color: '#4CAF50' }]}>
              {t(`billing.${data?.invoice.status}`)}
            </Text>
          </View>
          <View style={styles.col6}>
            <Text style={[styles.subtitle2, styles.mb4]}>{t('billing.date_create')}</Text>
            <Text style={styles.dateText}>{formatDateForPDF(data?.invoice.created_at, isRtl)}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Invoice Items */}
        <Text style={[styles.subtitle1, styles.mb16]}>{t('billing.invoice_details')}</Text>

        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <View style={styles.tableCell_1}>
              <Text style={styles.subtitle2}>#</Text>
            </View>
            <View style={styles.tableCell_2}>
              <Text style={styles.subtitle2}>{t('billing.description')}</Text>
            </View>
            <View style={styles.tableCell_3}>
              <Text style={styles.subtitle2}>{t('billing.qty')}</Text>
            </View>
            <View style={styles.tableCell_4}>
              <Text style={styles.subtitle2}>{t('billing.total')}</Text>
            </View>
          </View>

          {/* Table Body */}
          {data?.invoice.invoice_items?.map((row, index) => (
            <View style={styles.tableRow} key={row.ID}>
              <View style={styles.tableCell_1}>
                <Text style={styles.body2}>{index + 1}</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={[styles.body1, styles.mb4]}>{t(`plan.${row.title}`)}</Text>
                {row.description && (
                  <View style={{ marginTop: 2 }}>
                    {row.description.split(',').map((feature, ind) => (
                      <View key={ind} style={styles.featureItem}>
                        <View style={styles.featureDot} />
                        <Text style={[styles.caption, { color: '#666' }]}>
                          {t(`plan.${feature.trim()}`)}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
              <View style={styles.tableCell_3}>
                <Text style={styles.body2}>1</Text>
              </View>
              <View style={styles.tableCell_4}>
                <Text style={styles.body1}>{fNumber(row.total_price)}</Text>
              </View>
            </View>
          ))}

          {/* Summary Section */}
          <View style={[styles.divider, { marginVertical: 6 }]} />

          {/* Subtotal */}
          {/* <View style={styles.tableRowTotal}>
            <View style={styles.summaryLabel}>
              <Text style={styles.body1}>{t('billing.subtotal')}</Text>
            </View>
            <View style={styles.summaryValue}>
              <Text style={styles.body1}>
                {fNumber(data?.invoice.invoice_items[0]?.total_price || 0)}
              </Text>
            </View>
          </View> */}

          {/* Discount */}
          {/* <View style={styles.tableRowTotal}>
            <View style={styles.summaryLabel}>
              <Text style={styles.body1}>{t('billing.discount')}</Text>
            </View>
            <View style={styles.summaryValue}>
              <Text style={[styles.body1, { color: '#F44336' }]}>
                -{fNumber(data?.invoice?.invoice_items[0]?.discounted_price || 0)}
              </Text>
            </View>
          </View> */}

          {/* Tax */}
          {/* <View style={styles.tableRowTotal}>
            <View style={styles.summaryLabel}>
              <Text style={styles.body1}>{t('billing.taxes')}</Text>
            </View>
            <View style={styles.summaryValue}>
              <Text style={styles.body1}>{fNumber(data?.invoice?.tax_amount || 0)}</Text>
            </View>
          </View> */}

          {/* Total */}
          <View
            style={[
              styles.tableRowTotal,
              { paddingTop: 8, borderTopWidth: 2, borderTopColor: '#E0E0E0' },
            ]}
          >
            <View style={styles.summaryLabel}>
              <Text style={styles.h4}>{t('billing.paid')}</Text>
            </View>
            <View style={styles.summaryValue}>
              <Text style={[styles.h4, { color: '#1976D2' }]}>
                {fNumber(data?.invoice.final_paid_amount || 0)}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
