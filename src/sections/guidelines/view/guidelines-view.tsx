// src/sections/guidelines/view/guidelines-view.tsx

'use client';

// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
// locales
import { useLocales } from 'src/locales';
// routes
import { paths } from 'src/routes/paths';

// components
import { useSettingsContext } from 'src/components/settings';
import { SplashScreen } from '@/components/loading-screen';

// req-hooks
import { useCategoriesQuery } from 'src/_req-hooks/reality/category/useCategoriesQuery';

// types
import { FilterOperatorsEnum } from 'src/_types/site/filters';

import ItemChosen from '../item-chosen';

// ----------------------------------------------------------------------

export default function GuidelinesView() {
  const { t } = useLocales();
  const settings = useSettingsContext();

  const { data: mainCategory, isLoading } = useCategoriesQuery({
    order: 'asc',
    filters: { parent_id: { op: FilterOperatorsEnum.IS_EMPTY, value: 0 } },
  });

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ py: 10 }}>
      <Box sx={{ mb: 2, textAlign: 'center' }}>
        <Typography variant="h2" sx={{ mb: 2 }}>
          {t('landing.guidelines')}
        </Typography>
      </Box>

      <Stack>
        {mainCategory?.data.items.map((parentCategory) => (
          <Box key={parentCategory.ID}>
            {/* Parent Category Title */}
            <Typography variant="h4" sx={{ mb: 4 }}>
              {t(`category.${parentCategory.title}`)}
            </Typography>

            {/* Children Categories */}

            <Grid
              sx={{ width: '100%' }}
              container
              spacing={{ xs: 3, md: 4 }} // اینو از 2,3 به 3,4 تغییر دادم
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {parentCategory.children?.map((childCategory) => (
                <Grid
                  xs={2}
                  sm={4}
                  md={3}
                  sx={{ p: 1 }} // این padding اضافی رو اضافه کردم
                >
                  <ItemChosen
                    item={childCategory}
                    path={paths.guideline.category(childCategory.title)}
                    label={t(`category.${childCategory.title}`)}
                  />
                </Grid>
              ))}
            </Grid>

            {/* Divider between parent categories */}
            <Divider sx={{ my: 6 }} />
          </Box>
        ))}
      </Stack>
    </Container>
  );
}
