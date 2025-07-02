import React from 'react';
// framer-motion
import { m } from 'framer-motion';
// @mui
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme, styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// locales
import { useLocales } from 'src/locales';
// components
import { RouterLink } from 'src/routes/components';
import { MotionContainer, varFade } from 'src/components/animate';
import SvgColor from 'src/components/svg-color';
// constants
import { specialized_sales } from 'src/constants';

//
const HighlightText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '88px',
  lineHeight: 1,

  [theme.breakpoints.down('md')]: {
    fontSize: '64px',
  },
}));
// ----------------------------------------------------------------------

interface SpecializedItemProps {
  title: string;
  subtitle: string;
  icon: string;
  list: string[];
}

const StyledBox = styled(Box)(({ theme }) => ({
  height: '400px',
  overflow: 'hidden',
  position: 'relative',
  maxWidth: '720px',
  margin: theme.spacing(10),
  width: '100%',
  borderRadius: '2px',

  [theme.breakpoints.down('sm')]: {
    height: '300px',
    marginTop: theme.spacing(10),
  },

  '& video': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
  },
}));

const blog_link =
  'https://armogroup.tech/blog/%D8%A7%D9%86%D9%82%D9%84%D8%A7%D8%A8%20%D9%87%D9%88%D8%B4%D9%85%D9%86%D8%AF%20%D8%AF%D8%B1%20%D8%AE%D8%B1%DB%8C%D8%AF%20%D9%81%D8%B1%D8%B4:%20%D9%85%D8%B9%D8%B1%D9%81%DB%8C%20%D8%B3%DB%8C%D8%B3%D8%AA%D9%85%20%D9%BE%DB%8C%D8%B4%D9%86%D9%87%D8%A7%D8%AF%D8%AF%D9%87%D9%86%D8%AF%D9%87%20%D9%85%D8%A8%D8%AA%D9%86%DB%8C%20%D8%A8%D8%B1%20%D9%87%D9%88%D8%B4%20%D9%85%D8%B5%D9%86%D9%88%D8%B9%DB%8C%20%D8%A2%D8%B1%D9%85%D9%88/';

const SpecializedItem: React.FC<SpecializedItemProps> = ({ title, subtitle, icon, list }) => {
  const theme = useTheme();

  return (
    <Stack alignItems="flex-start" spacing={2}>
      <SvgColor sx={{ width: 88, height: 88 }} color={theme.palette.secondary.main} src={icon} />

      <Typography variant="h3" color="grey.300">
        {title}
      </Typography>
      <Typography variant="body1" color="grey.100">
        {subtitle}
      </Typography>
      <List sx={{ color: 'grey.100' }}>
        {Array.isArray(list) &&
          list.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                m: 0,
                p: 0,
                display: 'flex',
                alignItems: 'center',
                '&::before': {
                  content: '""',
                  width: '6px',
                  height: '6px',
                  marginRight: '12px',
                  borderRadius: '50%',
                  backgroundColor: theme.palette.secondary.main,
                },
              }}
            >
              {item}
            </ListItem>
          ))}
      </List>
    </Stack>
  );
};

export default function ARCarpetSpecializedSales() {
  const { t } = useLocales();
  return (
    <Box mt={15}>
      <Container component={MotionContainer}>
        <Stack alignItems="center">
          <Stack mt={5} alignItems="center" sx={{ width: '100%' }}>
            <m.div variants={varFade().inUp}>
              <HighlightText color="grey.700">{t('ar_carpet.tools.title')}</HighlightText>
            </m.div>
            <m.div variants={varFade().inUp}>
              <Typography textAlign="center" mt={2} variant="h3" color="grey.100">
                {t('ar_carpet.tools.subtitle')}
              </Typography>
            </m.div>
          </Stack>

          <Stack mt={8} alignItems="flex-start" sx={{ width: '100%' }}>
            <Grid
              container
              spacing={{ xs: 3, md: 8 }}
              justifyContent={{ xs: 'flex-start', md: 'space-between' }}
            >
              {React.Children.toArray(
                specialized_sales(t).map((item) => (
                  <Grid xs={12} sm={6} md={4} key={item.title}>
                    <m.div variants={varFade().inUp}>
                      <SpecializedItem
                        title={item.title}
                        subtitle={item.subtitle}
                        icon={item.icon}
                        list={item.list}
                      />
                    </m.div>
                  </Grid>
                ))
              )}
            </Grid>
          </Stack>
          <m.div variants={varFade().inUp}>
            <Button
              sx={{ mt: 4, width: 240 }}
              LinkComponent={RouterLink}
              href={blog_link}
              color="secondary"
              variant="outlined"
            >
              {t('our_solutions.read_more')}
            </Button>
          </m.div>
          <StyledBox>
            <video autoPlay loop muted playsInline>
              <source
                src={`${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/ar-carpet/carpet-ar.webm`}
                type="video/webm"
              />
            </video>
          </StyledBox>
        </Stack>
      </Container>
    </Box>
  );
}
