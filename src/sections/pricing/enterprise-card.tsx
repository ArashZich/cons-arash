// @mui
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

// locales
import { useLocales } from 'src/locales';
// iconify
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const StyledCard = styled(Card)(({ theme }) => ({
  border: '1px solid #80DEEA',
  boxShadow: '0px 8px 16px 0px #919EAB29',
  background: 'transparent',
  textAlign: 'left',
  padding: theme.spacing(2),
  color: '#ffffff',
}));

const description =
  'unlimited_projects, unlimited_views, link_qrcode, android_ios_support, user_analytics, unlimited_hosting, account_manager, domain_customization, logo_customization';

const description_carpet =
  'unlimited_projects, unlimited_views, link_qrcode, android_ios_support, user_analytics, unlimited_hosting, account_manager, domain_customization, logo_customization, showroom, ai_advisor, rack';

interface PlanPackageProps {
  onClick: () => void;
  categoryId: number;
}
export default function EnterpriseCard(props: PlanPackageProps) {
  const { onClick, categoryId } = props;

  const { t } = useLocales();

  const des = categoryId === 14 ? description_carpet : description;
  const renderSubscription = (
    <Stack spacing={2}>
      <Typography variant="h6" sx={{ textTransform: 'capitalize', color: 'secondary.lighter' }}>
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
          <Iconify icon="eva:checkmark-fill" width={16} sx={{ mr: 1 }} color="secondary.light" />
          <Typography variant="body2">{t(`plan.${item}`)}</Typography>
        </Stack>
      ))}
    </Stack>
  );

  return (
    <StyledCard
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
    </StyledCard>
  );
}
