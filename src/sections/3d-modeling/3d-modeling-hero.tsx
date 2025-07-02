// framer-motion
import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// locales
import { useLocales } from 'src/locales';

// components
import { MotionContainer, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const HighlightText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '88px',
  lineHeight: 1,

  [theme.breakpoints.down('md')]: {
    fontSize: '64px',
  },
}));

export default function Modeling3DHero() {
  const { t } = useLocales();
  return (
    <Box
      sx={{
        textAlign: 'center',
      }}
    >
      <Container sx={{ py: 10 }} component={MotionContainer}>
        <Stack alignItems="center" px={5} mt={10}>
          <Stack alignItems="center" maxWidth="sm" sx={{ whiteSpace: 'break-spaces' }}>
            <m.div variants={varFade().inDown}>
              <HighlightText color="grey.700">{t('3d_modeling.3d_modeling')}</HighlightText>
            </m.div>
            <m.div variants={varFade().inUp}>
              <Typography variant="h2" color="secondary.light" mt={2}>
                {t('3d_modeling.professional_3d_modeling_services')}
              </Typography>
            </m.div>
            <Stack alignItems="flex-start" py={15}>
              <Typography variant="h3" color="grey.300" mt={2}>
                {t('3d_modeling.what_is_3d')}
              </Typography>
              <Typography variant="body1" paragraph color="grey.100" mt={2} align="left">
                {t('3d_modeling.digital_objects_creation')}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
