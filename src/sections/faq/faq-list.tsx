import React from 'react';
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

// constants
import { faq_list } from 'src/constants';

//
const HighlightText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '88px',
  lineHeight: 1,
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    fontSize: '64px',
  },
}));

// ----------------------------------------------------------------------

export default function FAQList() {
  const { t } = useLocales();
  const faqItems = faq_list(t);

  return (
    <Box mt={15}>
      <Container component={MotionContainer}>
        <Stack alignItems="center">
          <HighlightText color="grey.700">{t('faq.faq')}</HighlightText>
          <Stack p={10} mt={5} maxWidth="md">
            {React.Children.toArray(
              faqItems.map((item, index) => (
                <Stack mt={index !== 0 ? 6 : 0} maxWidth="md">
                  <m.div variants={varFade().inUp}>
                    <Typography variant="h3" color="grey.300">
                      {item.question}
                    </Typography>
                  </m.div>
                  <m.div variants={varFade().inUp}>
                    {Array.isArray(item.answer) ? (
                      <Stack component="ul" mt={2} pl={2} maxWidth="md">
                        {item.answer.map((bulletPoint, idx) => (
                          <Typography key={idx} variant="body1" component="li" color="grey.100">
                            {bulletPoint}
                          </Typography>
                        ))}
                      </Stack>
                    ) : (
                      <Typography mt={2} variant="body1" color="grey.100">
                        {item.answer}
                      </Typography>
                    )}
                  </m.div>
                </Stack>
              ))
            )}
          </Stack>
        </Stack>
        <Stack alignItems="center">
          <Typography variant="h3" color="grey.700">
            {t('faq.faq_contact')}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
