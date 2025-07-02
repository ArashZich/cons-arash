import React from 'react';

import { m } from 'framer-motion';
// @mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

// components
import SvgColor from 'src/components/svg-color';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { MotionContainer, varFade } from 'src/components/animate';
// locales
import { useLocales } from 'src/locales';
// constants
import { solutions_description as getSolutionsDescription } from 'src/constants';

// ----------------------------------------------------------------------

interface Solution {
  title: string;
  subtitle: string;
  introduction: string;
  features: string[];
  mainText: string;
  conclusion: string;
  banner: string;
  icon: string;
  link?: string;
}

interface SolutionItemProps {
  solution: Solution;
  isImageLeft: boolean;
}

const SolutionItem: React.FC<SolutionItemProps> = ({ solution, isImageLeft }) => {
  const theme = useTheme();
  const { t } = useLocales();
  return (
    <Grid
      container
      spacing={4}
      sx={{ mb: 10, alignItems: 'center' }}
      direction={{ xs: 'column', md: isImageLeft ? 'row' : 'row-reverse' }}
    >
      <Grid item xs={12} md={6}>
        <m.div variants={varFade().inUp}>
          <Box
            component="img"
            src={solution.banner}
            alt={solution.title}
            sx={{ width: '100%', height: 'auto', borderRadius: 2, objectFit: 'contain' }}
          />
        </m.div>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack
          spacing={2}
          textAlign={{ xs: 'center', md: 'left' }}
          alignItems={{ xs: 'center', md: 'flex-start' }}
        >
          <m.div variants={varFade().inDown}>
            <Box display="flex" alignItems="center" mb={2}>
              <SvgColor
                sx={{ width: 80, height: 80, mb: 1 }}
                color={theme.palette.secondary.main}
                src={solution.icon}
              />
              <Typography variant="h2" color="grey.500" sx={{ ml: 2 }}>
                {solution.title}
              </Typography>
            </Box>
          </m.div>
          <m.div variants={varFade().inUp}>
            <Typography variant="h5" color="grey.100" gutterBottom>
              {solution.subtitle}
            </Typography>
            <Typography variant="subtitle1" color="grey.100" paragraph>
              {solution.introduction}
            </Typography>
            <List>
              {solution.features.map((feature, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Iconify icon="bi:dot" width={24} color={theme.palette.grey[300]} />
                  </ListItemIcon>
                  <Typography variant="body1" color="grey.300" gutterBottom>
                    {feature}
                  </Typography>
                </ListItem>
              ))}
            </List>
            <Typography variant="subtitle1" color="grey.100" paragraph>
              {solution.mainText}
            </Typography>
            <Typography variant="subtitle1" color="grey.100">
              {solution.conclusion}
            </Typography>
          </m.div>
          {solution.link && (
            <m.div variants={varFade().inUp}>
              <Button
                sx={{ mt: 2 }}
                LinkComponent={RouterLink}
                href={solution.link}
                color="secondary"
                variant="outlined"
              >
                {t('our_solutions.read_more')}
              </Button>
            </m.div>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

const SolutionsDescription: React.FC = () => {
  const { t } = useLocales();
  const solutions = getSolutionsDescription(t);

  return (
    <Container component={MotionContainer} sx={{ mt: 15 }}>
      {solutions.map((solution, index) => (
        <m.div key={index} variants={varFade().inUp}>
          <SolutionItem solution={solution} isImageLeft={index % 2 === 1} />
        </m.div>
      ))}
    </Container>
  );
};

export default SolutionsDescription;
