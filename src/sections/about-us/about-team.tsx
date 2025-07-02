import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { blue } from '@mui/material/colors';

// locales
import { useLocales } from 'src/locales';
// components
import { MotionViewport, varFade } from 'src/components/animate';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';
// constants
import { team_members } from 'src/constants';
// ----------------------------------------------------------------------

const HighlightText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '88px',
  lineHeight: 1,
  [theme.breakpoints.down('md')]: {
    fontSize: '64px',
  },
}));

// ----------------------------------------------------------------------

export default function AboutTeam() {
  const { t } = useLocales();

  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 10, md: 15 },
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 10,
      }}
    >
      <Box maxWidth="md">
        <m.div variants={varFade().inDown}>
          <HighlightText color="grey.700" align="center">
            {t('about.co-founder')}
          </HighlightText>
        </m.div>

        <Grid container spacing={4} justifyContent="center" mt={10}>
          {team_members(t).map((item, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <m.div variants={index <= 2 ? varFade().inDown : varFade().inUp}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    px: 2,
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    sx={{ width: 180, borderRadius: '50%' }}
                  />

                  <Typography variant="h5" mt={3} color="grey.100">
                    {item.name}
                  </Typography>
                  <Typography variant="body1" color="grey.500" mt={1}>
                    {item.position}
                  </Typography>

                  <Link href={item.linkedin} target="_blank" rel="noopener" underline="none">
                    <Iconify
                      icon="bxl:linkedin"
                      color={blue[400]}
                      width={36}
                      height={36}
                      sx={{ mt: 1 }}
                    />
                  </Link>
                </Box>
              </m.div>
            </Grid>
          ))}
        </Grid>

        {/* <Grid container spacing={4} justifyContent="center" mt={2}>
          {team_members(t)
            .slice(2)
            .map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <m.div variants={index <= 2 ? varFade().inDown : varFade().inUp}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      px: 2,
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      sx={{ width: 160, borderRadius: '50%' }}
                    />

                    <Typography variant="h5" mt={3} color="grey.100">
                      {item.name}
                    </Typography>
                    <Typography variant="body1" color="grey.500" mt={1}>
                      {item.position}
                    </Typography>
                  </Box>
                </m.div>
              </Grid>
            ))}
        </Grid> */}
      </Box>
    </Container>
  );
}
