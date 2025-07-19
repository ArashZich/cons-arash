import React, { useCallback } from 'react';

// immer
import { useImmer } from 'use-immer';
// @mui
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
// framer-motion
import { m } from 'framer-motion';
// components
import { MotionContainer, varFade } from 'src/components/animate';
// locals
import { useLocales } from 'src/locales';
// routes
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
// _req-hooks
import { useQueryByCategoryID } from 'src/_req-hooks/reality/plan/useQueryByCategoryID';
// constants
import { data_length, category_id_plans } from 'src/constants';
// _types
import { PlanData } from 'src/_types/reality/plan/planData';
//
import EnterpriseCard from './enterprise-card';
import PricingCard from './pricing-card';
import CustomPlanDialog from './custom-plan-dialog';

const HighlightText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '88px',
  lineHeight: 1,
  [theme.breakpoints.down('md')]: {
    fontSize: '64px',
  },
}));

const PricingForm = () => {
  const { t } = useLocales();
  const [days, setDays] = useImmer(90);
  const [categoryId, setCategoryId] = useImmer(14);

  const router = useRouter();
  const { data: pricingPlans } = useQueryByCategoryID({ category_id: categoryId });

  const handleContactUs = () => {
    router.push(paths.contact);
  };

  const handleCategoryChange = useCallback(
    (value: number) => {
      setCategoryId(value);
    },
    [setCategoryId]
  );

  const sortPlans = (plans: PlanData[]) => {
    const priority = ['starter', 'pro', 'premium'];
    return plans.sort((a, b) => priority.indexOf(a.title) - priority.indexOf(b.title));
  };

  const filteredPlans = pricingPlans?.data?.filter((plan) => plan.day_length === days);

  const sortedPlans = filteredPlans ? sortPlans(filteredPlans) : [];

  return (
    <Box sx={{ textAlign: 'center' }}>
      <CustomPlanDialog />
      <Container sx={{ py: 10 }} component={MotionContainer}>
        <Stack alignItems="center" px={5} mt={10}>
          <m.div variants={varFade().inDown}>
            <HighlightText color="grey.700">{t('pricing.pricing')}</HighlightText>
          </m.div>
        </Stack>

        <Stack flexDirection="row" alignItems="center" justifyContent="center" spacing={2} mt={10}>
          {category_id_plans.map((item, ind) => (
            <Chip
              component="button"
              type="button"
              key={ind}
              label={t(`pricing.${item.label}`)}
              variant={categoryId === item.value ? 'filled' : 'outlined'}
              onClick={() => handleCategoryChange(item.value)}
              color="secondary"
              sx={{ minWidth: 140 }}
            />
          ))}
        </Stack>

        <Stack flexDirection="row" alignItems="center" justifyContent="center" spacing={2} mt={5}>
          {data_length.map((item, ind) => (
            <Chip
              key={ind}
              label={t(`organization.${item.label}`)}
              variant={days === item.value ? 'filled' : 'outlined'}
              onClick={() => setDays(item.value)}
              color="secondary"
            />
          ))}
        </Stack>

        <Grid container spacing={2} mt={5} justifyContent="center">
          {sortedPlans?.map((items) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={items.ID}>
              <PricingCard data={items} />
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <EnterpriseCard onClick={handleContactUs} categoryId={categoryId} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PricingForm;
