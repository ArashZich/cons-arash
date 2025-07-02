import React from 'react';
import { m } from 'framer-motion';
import { useTheme, styled } from '@mui/material/styles'; // اضافه کردن keyframes
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { useLocales } from 'src/locales';
import { MotionContainer, varFade } from 'src/components/animate';
import { modeling_3d_why_armo } from 'src/constants';

const HighlightText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '88px',
  lineHeight: 1,

  [theme.breakpoints.down('md')]: {
    fontSize: '64px',
  },
}));

interface WhyARMOItemProps {
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

const WhyARMOItem: React.FC<WhyARMOItemProps> = ({ list }) => {
  const theme = useTheme();

  return (
    <Stack
      alignItems={{ xs: 'center', md: 'flex-start' }} // در موبایل وسط، در دسکتاپ چپ
      spacing={2}
    >
      <List sx={{ color: 'grey.100' }}>
        {React.Children.toArray(
          list.map((item) => (
            <ListItem
              key={item}
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
          ))
        )}
      </List>
    </Stack>
  );
};

export default function Modeling3DWhyARMO() {
  const { t } = useLocales();
  return (
    <Box mt={15}>
      <Container component={MotionContainer}>
        <Stack alignItems="center">
          <Stack mt={5} alignItems="center" sx={{ width: '100%' }}>
            <m.div variants={varFade().inUp}>
              <HighlightText color="grey.700">{t('3d_modeling.why_armo')}</HighlightText>
            </m.div>
          </Stack>

          <Stack mt={8} alignItems="center" justifyContent="center">
            <WhyARMOItem list={modeling_3d_why_armo(t)} />
          </Stack>

          <StyledBox>
            <video autoPlay loop muted playsInline>
              <source
                src={`${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/landing-3d-modeling/rolex.webm`}
                type="video/webm"
              />
            </video>
          </StyledBox>
        </Stack>
      </Container>
    </Box>
  );
}
