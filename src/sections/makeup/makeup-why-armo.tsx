import React from 'react';
import { m } from 'framer-motion';
import { useTheme, styled, keyframes } from '@mui/material/styles'; // اضافه کردن keyframes
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useLocales } from 'src/locales';
import { RouterLink } from 'src/routes/components';
import { MotionContainer, varFade } from 'src/components/animate';
import { makeup_why_armo } from 'src/constants';

// تعریف keyframes برای انیمیشن با استفاده از رنگ secondary
const glow = (theme: any) => keyframes`
  0% {
    box-shadow: 0 0 10px #fff, 0 0 10px ${theme.palette.secondary.main};
  }
  50% {
    box-shadow: 0 0 15px #fff, 0 0 20px ${theme.palette.secondary.main};
  }
  100% {
    box-shadow: 0 0 10px #fff, 0 0 10px ${theme.palette.secondary.main};
  }
`;

// استایل دکمه با انیمیشن
const GlowingButton = styled(Button)(({ theme }) => ({
  animation: `${glow(theme)} 3s infinite`, // سرعت انیمیشن را کندتر کردیم
  '&:hover': {
    animation: `${glow(theme)} 2s infinite`, // سرعت انیمیشن در حالت hover
  },
}));

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

const blog_link = 'https://makeup.armogroup.tech';

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

export default function MakeupWhyARMO() {
  const { t } = useLocales();
  return (
    <Box mt={15}>
      <Container component={MotionContainer}>
        <Stack alignItems="center">
          <Stack mt={5} alignItems="center" sx={{ width: '100%' }}>
            <m.div variants={varFade().inUp}>
              <HighlightText color="grey.700">{t('makeup.why_armo')}</HighlightText>
            </m.div>
          </Stack>

          <Stack mt={8} alignItems="center" justifyContent="center">
            <Grid container justifyContent="center" spacing={{ xs: 3, md: 8 }}>
              {React.Children.toArray(
                makeup_why_armo(t).map((item) => (
                  <Grid xs={12} sm={6} md={4} key={item.title}>
                    <m.div variants={varFade().inUp}>
                      <WhyARMOItem title={item.title} list={item.list} />
                    </m.div>
                  </Grid>
                ))
              )}
            </Grid>
          </Stack>
          <m.div variants={varFade().inUp}>
            <GlowingButton
              sx={{ mt: 4, width: 240 }}
              LinkComponent={RouterLink}
              href={blog_link}
              color="secondary"
              variant="outlined"
              size="large"
            >
              {t('makeup.virtual_try_on')}
            </GlowingButton>
          </m.div>
          <StyledBox>
            <video autoPlay loop muted playsInline>
              <source
                src={`${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/landing-makeup/makeup02.webm`}
                type="video/webm"
              />
            </video>
          </StyledBox>
        </Stack>
      </Container>
    </Box>
  );
}
