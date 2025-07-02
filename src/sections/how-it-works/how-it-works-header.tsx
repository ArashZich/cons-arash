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

export default function HowItWorksHeader() {
  const { t } = useLocales();
  return (
    <Box
      sx={{
        textAlign: 'center',
      }}
    >
      <Container sx={{ py: 10 }} component={MotionContainer}>
        <Stack alignItems="center" px={5} mt={10}>
          <m.div variants={varFade().inDown}>
            <HighlightText color="grey.700">{t('how_it_works.how_it_works')}</HighlightText>
          </m.div>
        </Stack>
      </Container>
    </Box>
  );
}
