// @mui
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// locales
import { useLocales } from 'src/locales';
// iconify
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const description =
  'unlimited_projects, unlimited_views, link_qrcode, android_ios_support, user_analytics, unlimited_hosting, account_manager, domain_customization, logo_customization, create_separate_organizatios, manag_organizatios';

const description_enterprise =
  'unlimited_projects, unlimited_views, link_qrcode, android_ios_support, user_analytics, unlimited_hosting, account_manager, domain_customization, logo_customization, create_separate_organizatios, manag_organizatios, upload_file, insert_location, insert_website_contact_social';

interface PlanPackageProps {
  onClick: () => void;
  categoryId: string;
}
export default function EnterpriseCard(props: PlanPackageProps) {
  const { onClick, categoryId } = props;

  const { t } = useLocales();

  const des = categoryId === '12' ? description_enterprise : description;
  const renderSubscription = (
    <Stack spacing={2}>
      <Typography variant="h6" sx={{ textTransform: 'capitalize', color: 'secondary.dark' }}>
        {t(`plan.enterprise`)}
      </Typography>
    </Stack>
  );

  const renderLetsTalk = (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography variant="h4">{t('organization.lets_talk')}</Typography>
    </Stack>
  );

  const renderList = (
    <Stack>
      {des.split(', ').map((item, ind) => (
        <Stack key={ind} spacing={0.5} direction="row" alignItems="center">
          <Iconify icon="eva:checkmark-fill" width={16} sx={{ mr: 1 }} />
          <Typography variant="body2">{t(`plan.${item}`)}</Typography>
        </Stack>
      ))}
    </Stack>
  );

  return (
    <Card
      sx={{
        p: 5,
        borderRadius: 2,
        boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
      }}
    >
      <Stack spacing={3} sx={{ minHeight: 460 }}>
        {renderSubscription}
        {renderLetsTalk}

        {renderList}

        <Button
          fullWidth
          size="large"
          variant="outlined"
          color="inherit"
          sx={{ mt: 'auto' }}
          onClick={onClick}
        >
          {t('organization.contact_us')}
        </Button>
      </Stack>
    </Card>
  );
}
