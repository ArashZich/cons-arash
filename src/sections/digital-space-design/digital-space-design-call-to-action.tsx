// next
import Link from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
// routes
import { paths } from 'src/routes/paths';
// locals
import { useLocales } from 'src/locales';

// Styled component for the background
const GradientBackground = styled(Stack)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(178, 235, 242, 0.5) 0%, rgba(0, 131, 143, 0.5) 100%)',
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(5),
  width: '100%',
  [theme.breakpoints.up('lg')]: {
    height: 360,
    width: theme.breakpoints.values.lg,
  },
  [theme.breakpoints.down('lg')]: {
    height: 'auto',
    width: '100%',
    padding: theme.spacing(3),
  },
}));

// Styled button with custom gradient and border
const CustomButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #61F3F3 0%, #00B8D9 100%)',
  border: '1px solid #00ACC1',
  color: theme.palette.common.black,
  textTransform: 'none',
  fontWeight: 'bold',
  marginTop: 16,
  width: 240,
  padding: theme.spacing(1.5, 4),
  '&:hover': {
    background: 'linear-gradient(135deg, #61F3F3 0%, #00B8D9 80%)', // Slightly darker gradient on hover
  },
}));

export default function CallToAction() {
  const { t } = useLocales();
  return (
    <Stack alignItems="center" justifyContent="center" spacing={2} mt={10} mb={15}>
      <GradientBackground alignItems="center" justifyContent="center">
        <Typography
          variant="h2"
          component="h1"
          align="center"
          gutterBottom
          color="grey.200"
          sx={{ fontWeight: 'bold' }}
        >
          {t('landing.ready_for_ar')}
        </Typography>
        <Typography
          variant="body1"
          component="p"
          align="center"
          gutterBottom
          color="grey.100"
          mt={3}
        >
          {t('makeup.contact_us_now_for_free_consultation_start_your_collaboration')}
        </Typography>
        <Stack direction="row" spacing={2}>
          <CustomButton LinkComponent={Link} href={paths.contact}>
            {t('ar_carpet.call_to_action.button')}
          </CustomButton>
        </Stack>
      </GradientBackground>
    </Stack>
  );
}
