// react
import React from 'react';

// @mui
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

// components
import Iconify from 'src/components/iconify';

// types
import { CustomListProps } from './types';
// ----------------------------------------------------------------------

export default function CustomList({ list }: CustomListProps) {
  return (
    <Box>
      <List>
        {React.Children.toArray(
          list.map((item) => (
            <ListItem sx={{ m: 0, p: 0 }}>
              <ListItemIcon>
                <Iconify icon="ei:check" width={24} color={(theme) => theme.palette.grey[600]} />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: 12,
                  fontWeight: 'medium',
                  letterSpacing: 0,
                  color: 'text.disabled',
                }}
              />
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
}
