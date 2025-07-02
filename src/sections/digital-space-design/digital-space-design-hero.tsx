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

export default function DigitalSpaceDesignHero() {
  const { t } = useLocales();
  return (
    <Box
      sx={{
        textAlign: 'center',
        pt: 11,
      }}
    >
      <Container sx={{ py: 10 }} component={MotionContainer}>
        <Stack alignItems="center" px={5} mt={10}>
          <Stack alignItems="center" maxWidth="md" sx={{ whiteSpace: 'break-spaces' }}>
            <m.div variants={varFade().inDown}>
              <HighlightText color="grey.700">
                {t('digital_space_design.digital_space_design')}
              </HighlightText>
            </m.div>
            <m.div variants={varFade().inUp}>
              <Typography variant="h2" color="secondary.light" mt={2}>
                {t('digital_space_design.transform_the_way_you_showcase_products')}
              </Typography>
            </m.div>
            <m.div variants={varFade().inUp}>
              <Typography variant="body1" color="grey.100" mt={2}>
                {t('digital_space_design.introducing_products_and_services_is_a_game_changer')}
              </Typography>
              <Typography variant="body1" color="grey.100">
                {t('digital_space_design.expert_team_with_cutting_edge_technologies')}
              </Typography>
            </m.div>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
