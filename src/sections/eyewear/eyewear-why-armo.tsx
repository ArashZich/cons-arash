import React from 'react';
import { m } from 'framer-motion';
import { useTheme, styled } from '@mui/material/styles'; // اضافه کردن keyframes
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { useLocales } from 'src/locales';
import { MotionContainer, varFade } from 'src/components/animate';
import { eyewear_why_armo } from 'src/constants';

//-------------------------------------------------

const HighlightText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '88px',
  lineHeight: 1,

  [theme.breakpoints.down('md')]: {
    fontSize: '64px',
  },
}));

interface WhyARMOItemProps {
  title: string;
  list: string[];
}

const WhyARMOItem: React.FC<WhyARMOItemProps> = ({ title, list }) => {
  const theme = useTheme();

  return (
    <Stack
      alignItems={{ xs: 'center', md: 'flex-start' }} // در موبایل وسط، در دسکتاپ چپ
      spacing={2}
    >
      <Typography variant="h3" color="grey.300">
        {title}
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

export default function EyewearWhyARMO() {
  const { t } = useLocales();
  return (
    <Box mt={15}>
      <Container component={MotionContainer}>
        <Stack alignItems="center">
          <Stack mt={5} alignItems="center" sx={{ width: '100%' }}>
            <m.div variants={varFade().inUp}>
              <HighlightText color="grey.700">{t('eyewear.why_armo')}</HighlightText>
            </m.div>
          </Stack>

          <Stack mt={8} alignItems="center" justifyContent="center">
            <Grid container justifyContent="center" spacing={{ xs: 3, md: 8 }}>
              {React.Children.toArray(
                eyewear_why_armo(t).map((item) => (
                  <Grid xs={12} sm={6} md={4} key={item.title}>
                    <m.div variants={varFade().inUp}>
                      <WhyARMOItem title={item.title} list={item.list} />
                    </m.div>
                  </Grid>
                ))
              )}
            </Grid>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
