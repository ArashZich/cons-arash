// react
import { useState } from 'react';
// @mui/material
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
// components
import { AccordionFAQ, AccordionSummaryFAQ } from 'src/components/faq-component/accordion-tools';
// locals
import { useLocales } from 'src/locales';
// constants
import { modeling_3d_faq } from 'src/constants';

export default function Modeling3DFAQ() {
  const { t } = useLocales();
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 15 }}>
      <Stack alignItems="center">
        <Typography variant="h2" component="h2" align="center" color="grey.700" gutterBottom>
          {t('ar_carpet.faq.faq')}
        </Typography>

        <Stack maxWidth="sm" mt={8}>
          {modeling_3d_faq(t).map((faq, index) => (
            <AccordionFAQ
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              sx={{
                mb: 2,
              }}
            >
              <AccordionSummaryFAQ
                sx={{ alignItems: 'flex-start' }}
                aria-controls={`panel${index}bh-content`}
                id={`panel${index}bh-header`}
              >
                <Typography color="grey.300" variant="h4">
                  {faq.question}
                </Typography>
              </AccordionSummaryFAQ>
              <AccordionDetails>
                <Typography color="grey.100" variant="body1">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </AccordionFAQ>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
