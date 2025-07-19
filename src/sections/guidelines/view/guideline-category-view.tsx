// src/sections/guidelines/view/guideline-category-view.tsx

'use client';

import { useMemo } from 'react';
// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

// components
import { useSettingsContext } from 'src/components/settings';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';

// constants
import { carpet_guideline } from 'src/constants';

// ----------------------------------------------------------------------

type Props = {
  category: string;
};

export default function GuidelineCategoryView({ category }: Props) {
  const settings = useSettingsContext();
  const router = useRouter();

  const guidelineData = useMemo(() => {
    switch (category) {
      case 'carpet':
        return carpet_guideline;
      default:
        return null;
    }
  }, [category]);

  const handleBackClick = () => {
    router.push(paths.guideline.root);
  };

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!guidelineData) {
    return (
      <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ py: 5 }}>
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          راهنمای این دسته‌بندی در حال حاضر موجود نیست
        </Typography>
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button variant="outlined" onClick={handleBackClick}>
            بازگشت به لیست راهنماها
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'md'} sx={{ py: 5 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        {/* Back Button */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:arrow-back-fill" />}
            onClick={handleBackClick}
            color="inherit"
            sx={{
              bgcolor: 'grey.100',
              color: 'grey.800',
              '&:hover': { bgcolor: 'grey.200' },
            }}
          >
            بازگشت به راهنماها
          </Button>
        </Stack>

        <Typography variant="h2" sx={{ mb: 2 }}>
          {guidelineData.title}
        </Typography>

        <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
          {guidelineData.subtitle}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {guidelineData.description}
        </Typography>

        {/* Contact Us Button */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => handleLinkClick(guidelineData.contact_us_button.url)}
            startIcon={<Iconify icon="eva:phone-fill" />}
          >
            {guidelineData.contact_us_button.text}
          </Button>
        </Box>
      </Box>

      {/* Content */}
      <Paper sx={{ p: 4 }}>
        <Stack spacing={4}>
          {/* Unique Feature */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: 'warning.main' }}>
              {guidelineData.title_feature}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 'bold', bgcolor: 'warning.lighter', p: 2, borderRadius: 1 }}
            >
              {guidelineData.unique_feature}
            </Typography>
          </Box>

          <Divider />

          {/* Key Features */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {guidelineData.title_key_features}
            </Typography>
            <Stack spacing={2}>
              {guidelineData.key_features.map((feature, index) => (
                <Card key={index} variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>

          <Divider />

          {/* Step by Step Guide */}
          <Box>
            <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
              {guidelineData.title_guideline}
            </Typography>

            {/* Step 1 */}
            <Accordion>
              <AccordionSummary expandIcon={<Iconify icon="eva:arrow-down-fill" />}>
                <Typography variant="h6">{guidelineData.header_step_1}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  <List>
                    {guidelineData.step_1.map((step, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={`${index + 1}. ${step}`}
                          sx={{ '& .MuiListItemText-primary': { fontWeight: 'medium' } }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Image
                    src={guidelineData.step_1_image}
                    alt="مرحله 1"
                    sx={{ width: '100%', borderRadius: 1, border: 1, borderColor: 'divider' }}
                  />
                </Stack>
              </AccordionDetails>
            </Accordion>

            {/* Step 2 */}
            <Accordion>
              <AccordionSummary expandIcon={<Iconify icon="eva:arrow-down-fill" />}>
                <Typography variant="h6">{guidelineData.header_step_2}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={3}>
                  <Typography variant="h6">{guidelineData.title_step_2}</Typography>

                  {/* Rectangular Carpets */}
                  <Box>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                      🗌 {guidelineData.subtitle_step_2_1}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {guidelineData.description_step_2_1}
                    </Typography>
                    <Grid container spacing={2}>
                      {guidelineData.rectangular_sizes.map((size, index) => (
                        <Grid item xs={6} sm={3} key={index}>
                          <Chip
                            label={
                              size.dimensions ? `${size.name} (${size.dimensions})` : size.name
                            }
                            variant="outlined"
                            sx={{ width: '100%' }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  {/* Circular Carpets */}
                  <Box>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                      ⭕ {guidelineData.subtitle_step_2_2}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {guidelineData.description_step_2_2}
                    </Typography>
                    <Grid container spacing={2}>
                      {guidelineData.circular_sizes.map((size, index) => (
                        <Grid item xs={6} sm={3} key={index}>
                          <Chip
                            label={
                              size.dimensions ? `${size.name} (${size.dimensions})` : size.name
                            }
                            variant="outlined"
                            sx={{ width: '100%' }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  {/* Important Notes */}
                  <Box sx={{ bgcolor: 'error.lighter', p: 2, borderRadius: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ mb: 2, fontWeight: 'bold', color: 'error.main' }}
                    >
                      ⚠️ {guidelineData.title_step_2_notes}
                    </Typography>
                    <List dense>
                      {guidelineData.step_2_notes.map((note, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={`• ${note}`} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  <Image
                    src={guidelineData.step_2_image}
                    alt="مرحله 2"
                    sx={{ width: '100%', borderRadius: 1, border: 1, borderColor: 'divider' }}
                  />
                </Stack>
              </AccordionDetails>
            </Accordion>

            {/* Step 3 */}
            <Accordion>
              <AccordionSummary expandIcon={<Iconify icon="eva:arrow-down-fill" />}>
                <Typography variant="h6">{guidelineData.header_step_3}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={3}>
                  {/* Naming */}
                  <Box sx={{ bgcolor: 'info.lighter', p: 2, borderRadius: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ mb: 2, fontWeight: 'bold', color: 'info.main' }}
                    >
                      💡 {guidelineData.title_step_3_naming}
                    </Typography>
                    <List dense>
                      {guidelineData.step_3_naming.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={`• ${item}`} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  {/* Upload Notes */}
                  <Box sx={{ bgcolor: 'warning.lighter', p: 2, borderRadius: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ mb: 2, fontWeight: 'bold', color: 'warning.main' }}
                    >
                      ⚠️ {guidelineData.title_step_3_upload}
                    </Typography>
                    <List dense>
                      {guidelineData.step_3_upload_notes.map((note, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={`• ${note}`} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  {/* Upload Method */}
                  <Box>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                      {guidelineData.title_step_3_method}
                    </Typography>
                    <List dense>
                      {guidelineData.step_3_method.map((method, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={`• ${method}`} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  <Image
                    src={guidelineData.step_3_image}
                    alt="مرحله 3"
                    sx={{ width: '100%', borderRadius: 1, border: 1, borderColor: 'divider' }}
                  />
                </Stack>
              </AccordionDetails>
            </Accordion>

            {/* Step 4 */}
            <Accordion>
              <AccordionSummary expandIcon={<Iconify icon="eva:arrow-down-fill" />}>
                <Typography variant="h6">{guidelineData.header_step_4}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  <List>
                    {guidelineData.step_4.map((step, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={`${index + 1}. ${step}`} />
                      </ListItem>
                    ))}
                  </List>
                  <Box sx={{ pl: 4 }}>
                    {guidelineData.step_4_options.map((option, index) => (
                      <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                        - {option}
                      </Typography>
                    ))}
                  </Box>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Box>

          <Divider />

          {/* Project Management */}
          <Box>
            <Typography variant="h5" sx={{ mb: 3 }}>
              {guidelineData.title_project_management}
            </Typography>

            {/* Project List */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {guidelineData.header_project_list}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {guidelineData.project_list_description}
              </Typography>
              <List>
                {guidelineData.project_list_items.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`• ${item}`} />
                  </ListItem>
                ))}
              </List>
              <Image
                src={guidelineData.project_list_image}
                alt="لیست پروژه‌ها"
                sx={{ width: '100%', borderRadius: 1, border: 1, borderColor: 'divider', mt: 2 }}
              />
            </Box>

            {/* Project Details */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {guidelineData.header_project_details}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {guidelineData.project_details_description}
              </Typography>
              <List>
                {guidelineData.project_details_items.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`• ${item}`} />
                  </ListItem>
                ))}
              </List>
              <Box sx={{ pl: 4 }}>
                {guidelineData.project_performance_items.map((item, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                    - {item}
                  </Typography>
                ))}
              </Box>
              <Image
                src={guidelineData.project_details_image}
                alt="جزئیات پروژه"
                sx={{ width: '100%', borderRadius: 1, border: 1, borderColor: 'divider', mt: 2 }}
              />
            </Box>

            {/* Project Edit */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {guidelineData.header_project_edit}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {guidelineData.project_edit_description}
              </Typography>
              <Stack spacing={2}>
                {guidelineData.project_edit_options.map((option, index) => (
                  <Card key={index} variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {option.title}
                      </Typography>
                      {option.description && Array.isArray(option.description) && (
                        <List dense>
                          {option.description.map((desc, descIndex) => (
                            <ListItem key={descIndex}>
                              <ListItemText primary={`• ${desc}`} />
                            </ListItem>
                          ))}
                        </List>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </Stack>
              <Image
                src={guidelineData.project_edit_image}
                alt="ویرایش پروژه"
                sx={{ width: '100%', borderRadius: 1, border: 1, borderColor: 'divider', mt: 2 }}
              />
            </Box>
          </Box>

          {/* Contact Button After Project Management */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => handleLinkClick(guidelineData.contact_us_button.url)}
              startIcon={<Iconify icon="eva:phone-fill" />}
            >
              {guidelineData.contact_us_button.text}
            </Button>
          </Box>

          <Divider />

          {/* Advanced Services */}
          <Box>
            <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
              🤖 {guidelineData.title_advanced_services}
            </Typography>

            {/* AI Advisor */}
            <Card sx={{ mb: 4, bgcolor: 'primary.lighter' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                  {guidelineData.ai_advisor_title}
                </Typography>

                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                  {guidelineData.ai_advisor_scenario_title}
                </Typography>
                <List dense>
                  {guidelineData.ai_advisor_scenario.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={`• ${item}`} />
                    </ListItem>
                  ))}
                </List>

                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold', mt: 3 }}>
                  {guidelineData.ai_advisor_how_title}
                </Typography>
                <Stack spacing={2}>
                  {guidelineData.ai_advisor_steps.map((step, index) => (
                    <Card key={index} variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                          {step.title}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {step.description}
                        </Typography>
                        {step.items && (
                          <List dense>
                            {step.items.map((item, itemIndex) => (
                              <ListItem key={itemIndex}>
                                <ListItemText primary={`- ${item}`} />
                              </ListItem>
                            ))}
                          </List>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </Stack>

                <Typography
                  variant="body2"
                  sx={{ mt: 2, fontWeight: 'bold', color: 'primary.main' }}
                >
                  💰 {guidelineData.ai_advisor_investment}
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleLinkClick(guidelineData.ai_advisor_test_link.url)}
                    startIcon={<Iconify icon="eva:external-link-fill" />}
                  >
                    {guidelineData.ai_advisor_test_link.text}
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* Virtual Showroom */}
            <Card sx={{ mb: 4, bgcolor: 'secondary.lighter' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'secondary.main' }}>
                  🏪 {guidelineData.virtual_showroom_title}
                </Typography>

                <Typography variant="body1" sx={{ mb: 3 }}>
                  {guidelineData.virtual_showroom_description}
                </Typography>

                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                  {guidelineData.virtual_showroom_usecases_title}
                </Typography>
                <Stack spacing={1}>
                  {guidelineData.virtual_showroom_usecases.map((usecase, index) => (
                    <Box key={index}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        {usecase.title}
                      </Typography>
                      <Typography variant="body2" sx={{ pl: 2, mb: 1 }}>
                        {usecase.description}
                      </Typography>
                    </Box>
                  ))}
                </Stack>

                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold', mt: 3 }}>
                  {guidelineData.virtual_showroom_features_title}
                </Typography>
                <List dense>
                  {guidelineData.virtual_showroom_features.map((feature, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={`• ${feature}`} />
                    </ListItem>
                  ))}
                </List>

                <Typography
                  variant="body2"
                  sx={{ mt: 2, fontWeight: 'bold', color: 'secondary.main' }}
                >
                  💰 {guidelineData.virtual_showroom_investment}
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleLinkClick(guidelineData.virtual_showroom_demo_link.url)}
                    startIcon={<Iconify icon="eva:external-link-fill" />}
                  >
                    {guidelineData.virtual_showroom_demo_link.text}
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* Regal */}
            <Card sx={{ mb: 4, bgcolor: 'success.lighter' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'success.main' }}>
                  📚 {guidelineData.regal_title}
                </Typography>

                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                  {guidelineData.regal_when_title}
                </Typography>
                <List dense>
                  {guidelineData.regal_when.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={`• ${item}`} />
                    </ListItem>
                  ))}
                </List>

                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold', mt: 3 }}>
                  {guidelineData.regal_difference_title}
                </Typography>
                <Stack spacing={1}>
                  {guidelineData.regal_difference.map((diff, index) => (
                    <Box key={index}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        {diff.title}
                      </Typography>
                      <Typography variant="body2" sx={{ pl: 2, mb: 1 }}>
                        {diff.description}
                      </Typography>
                    </Box>
                  ))}
                </Stack>

                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold', mt: 3 }}>
                  {guidelineData.regal_specs_title}
                </Typography>
                <List dense>
                  {guidelineData.regal_specs.map((spec, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={`• ${spec}`} />
                    </ListItem>
                  ))}
                </List>

                <Typography
                  variant="body2"
                  sx={{ mt: 2, fontWeight: 'bold', color: 'success.main' }}
                >
                  💰 {guidelineData.regal_investment}
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => handleLinkClick(guidelineData.regal_guide_link.url)}
                    startIcon={<Iconify icon="eva:external-link-fill" />}
                  >
                    {guidelineData.regal_guide_link.text}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Divider />

          {/* FAQ */}
          <Box>
            <Typography variant="h5" sx={{ mb: 3 }}>
              {guidelineData.title_faq}
            </Typography>
            <Stack spacing={2}>
              {guidelineData.faq.map((faq, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<Iconify icon="eva:arrow-down-fill" />}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1">{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          </Box>

          <Divider />

          {/* Support */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              {guidelineData.title_support}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {guidelineData.support_description}
            </Typography>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => handleLinkClick(guidelineData.contact_us_button.url)}
                startIcon={<Iconify icon="eva:phone-fill" />}
              >
                {guidelineData.contact_us_button.text}
              </Button>
            </Box>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
