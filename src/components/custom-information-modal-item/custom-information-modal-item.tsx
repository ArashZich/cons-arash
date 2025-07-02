import React, { ReactNode } from 'react';
import { Stack, Typography } from '@mui/material';
import Iconify from '../iconify/iconify';

export type PolicyItemProps = {
  title: string;
  description?: string;
  content?: ReactNode;
};

export default function CustomInformationModalItem(props: PolicyItemProps) {
  const { title, description, content } = props;

  return (
    <Stack spacing={1}>
      <Stack spacing={0.5} direction="row" alignItems="center">
        <Iconify icon="radix-icons:dot-filled" />
        <Typography variant="h6">{title}</Typography>
      </Stack>
      {content || (
        <Typography variant="body2" sx={{ textAlign: 'justify', pl: 3 }}>
          {description}
        </Typography>
      )}
    </Stack>
  );
}
