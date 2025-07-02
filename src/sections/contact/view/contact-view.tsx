'use client';

// @mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

//

import ContactForm from '../contact-form';
import ContactAddress from '../contact-address';

// ----------------------------------------------------------------------

export default function ContactView() {
  return (
    <Container sx={{ py: 10 }}>
      <Box
        gap={10}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
      >
        <ContactForm />
        <ContactAddress />
      </Box>
    </Container>
  );
}
