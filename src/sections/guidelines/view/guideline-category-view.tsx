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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';

// locales
import { useLocales } from 'src/locales';

// constants
import { carpet_guideline, regal_guideline, industrial_products_guideline } from 'src/constants';

// ----------------------------------------------------------------------

type Props = {
  category: string;
};

export default function GuidelineCategoryView({ category }: Props) {
  const settings = useSettingsContext();
  const router = useRouter();
  const { t } = useLocales();

  const guidelineData = useMemo(() => {
    switch (category) {
      case 'carpet':
        return carpet_guideline;
      case 'regal':
        return regal_guideline;
      case 'industrial_products':
        return industrial_products_guideline;
      default:
        return null;
    }
  }, [category]);

  const handleLinkClick = (url: string) => {
    if (url.startsWith('http')) {
      // External link
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      // Internal link
      router.push(url);
    }
  };

  if (!guidelineData) {
    return (
      <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ py: 5 }}>
        <CustomBreadcrumbs
          heading={t('landing.guidelines')}
          links={[
            {
              name: t('posts.home'),
              href: '/',
            },
            {
              name: t('landing.guidelines'),
              href: paths.guideline.root,
            },
            {
              name: category,
            },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          راهنمای این دسته‌بندی در حال حاضر موجود نیست
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'md'} sx={{ py: 5 }}>
      {/* Custom Breadcrumbs */}
      <CustomBreadcrumbs
        heading={guidelineData.title}
        links={[
          {
            name: t('posts.home'),
            href: '/',
          },
          {
            name: t('landing.guidelines'),
            href: paths.guideline.root,
          },
          {
            name: t(`category.${category}`),
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {/* Header */}
      <Box sx={{ mb: 4 }}>
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

          {/* Key Features - فقط برای فرش */}
          {guidelineData.title_key_features && guidelineData.key_features && (
            <>
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
            </>
          )}

          {/* Differences - فقط برای رگال */}
          {guidelineData.title_difference && guidelineData.differences && (
            <>
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {guidelineData.title_difference}
                </Typography>
                <Stack spacing={2}>
                  {guidelineData.differences.map((diff, index) => (
                    <Card key={index} variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                          {diff.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {diff.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              </Box>
              <Divider />
            </>
          )}

          {/* Use Cases - فقط برای رگال */}
          {guidelineData.title_usecases && guidelineData.usecases && (
            <>
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {guidelineData.title_usecases}
                </Typography>
                <List>
                  {guidelineData.usecases.map((usecase, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={`• ${usecase}`} />
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Divider />
            </>
          )}

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
                  {guidelineData.step_1_image && (
                    <Image
                      src={guidelineData.step_1_image}
                      alt="مرحله 1"
                      sx={{ width: '100%', borderRadius: 1, border: 1, borderColor: 'divider' }}
                    />
                  )}
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
                  {/* برای فرش - انتخاب شکل */}
                  {guidelineData.title_step_2 && (
                    <Typography variant="h6">{guidelineData.title_step_2}</Typography>
                  )}

                  {/* برای رگال - نام‌گذاری پروژه */}
                  {guidelineData.title_step_2_naming && (
                    <>
                      <Typography variant="h6">{guidelineData.title_step_2_naming}</Typography>

                      {guidelineData.step_2_naming_restrictions && (
                        <Box sx={{ bgcolor: 'error.lighter', p: 2, borderRadius: 1 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ mb: 2, fontWeight: 'bold', color: 'error.main' }}
                          >
                            ⚠️ {guidelineData.step_2_naming_restrictions}
                          </Typography>
                          <List dense>
                            {guidelineData.step_2_naming_rules?.map((rule, index) => (
                              <ListItem key={index}>
                                <ListItemText primary={`• ${rule}`} />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      )}

                      {guidelineData.step_2_naming_examples_title &&
                        guidelineData.step_2_naming_examples && (
                          <Box>
                            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                              {guidelineData.step_2_naming_examples_title}
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                              {guidelineData.step_2_naming_examples.map((example, index) => (
                                <Chip key={index} label={example} variant="outlined" />
                              ))}
                            </Stack>
                          </Box>
                        )}

                      {guidelineData.title_step_2_cover && (
                        <>
                          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                            {guidelineData.title_step_2_cover}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 2 }}>
                            {guidelineData.step_2_cover_description}
                          </Typography>
                          {guidelineData.step_2_cover_options && (
                            <List dense>
                              {guidelineData.step_2_cover_options.map((option, index) => (
                                <ListItem key={index}>
                                  <ListItemText primary={`• ${option}`} />
                                </ListItem>
                              ))}
                            </List>
                          )}
                          {guidelineData.step_2_cover_specs_title &&
                            guidelineData.step_2_cover_specs && (
                              <Box sx={{ bgcolor: 'info.lighter', p: 2, borderRadius: 1 }}>
                                <Typography
                                  variant="subtitle1"
                                  sx={{ mb: 2, fontWeight: 'bold', color: 'info.main' }}
                                >
                                  💡 {guidelineData.step_2_cover_specs_title}
                                </Typography>
                                <List dense>
                                  {guidelineData.step_2_cover_specs.map((spec, index) => (
                                    <ListItem key={index}>
                                      <ListItemText primary={`• ${spec}`} />
                                    </ListItem>
                                  ))}
                                </List>
                              </Box>
                            )}
                        </>
                      )}
                    </>
                  )}

                  {/* Rectangular Carpets - فقط برای فرش */}
                  {guidelineData.subtitle_step_2_1 && guidelineData.rectangular_sizes && (
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
                  )}

                  {/* Circular Carpets - فقط برای فرش */}
                  {guidelineData.subtitle_step_2_2 && guidelineData.circular_sizes && (
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
                  )}

                  {/* Important Notes - فقط برای فرش */}
                  {guidelineData.title_step_2_notes && guidelineData.step_2_notes && (
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
                  )}

                  {guidelineData.step_2_image && (
                    <Image
                      src={guidelineData.step_2_image}
                      alt="مرحله 2"
                      sx={{ width: '100%', borderRadius: 1, border: 1, borderColor: 'divider' }}
                    />
                  )}
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
                  {/* برای رگال - انتخاب شکل */}
                  {guidelineData.title_step_3 && (
                    <Typography variant="h6">{guidelineData.title_step_3}</Typography>
                  )}

                  {/* برای فرش - نام‌گذاری */}
                  {guidelineData.title_step_3_naming && guidelineData.step_3_naming && (
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
                  )}

                  {/* Upload Notes - فقط برای فرش */}
                  {guidelineData.title_step_3_upload && guidelineData.step_3_upload_notes && (
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
                  )}

                  {/* Upload Method - فقط برای فرش */}
                  {guidelineData.title_step_3_method && guidelineData.step_3_method && (
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
                  )}

                  {guidelineData.step_3_image && (
                    <Image
                      src={guidelineData.step_3_image}
                      alt="مرحله 3"
                      sx={{ width: '100%', borderRadius: 1, border: 1, borderColor: 'divider' }}
                    />
                  )}
                </Stack>
              </AccordionDetails>
            </Accordion>

            {/* Step 4 */}
            <Accordion>
              <AccordionSummary expandIcon={<Iconify icon="eva:arrow-down-fill" />}>
                <Typography variant="h6">{guidelineData.header_step_4}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={3}>
                  {/* Capacity - فقط برای رگال */}
                  {guidelineData.title_step_4_capacity && guidelineData.step_4_capacity && (
                    <Box sx={{ bgcolor: 'success.lighter', p: 2, borderRadius: 1 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ mb: 2, fontWeight: 'bold', color: 'success.main' }}
                      >
                        📊 {guidelineData.title_step_4_capacity}
                      </Typography>
                      <List dense>
                        {guidelineData.step_4_capacity.map((item, index) => (
                          <ListItem key={index}>
                            <ListItemText primary={`• ${item}`} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}

                  {/* Specs - فقط برای رگال */}
                  {guidelineData.title_step_4_specs && guidelineData.step_4_specs && (
                    <Box sx={{ bgcolor: 'warning.lighter', p: 2, borderRadius: 1 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ mb: 2, fontWeight: 'bold', color: 'warning.main' }}
                      >
                        ⚠️ {guidelineData.title_step_4_specs}
                      </Typography>
                      <List dense>
                        {guidelineData.step_4_specs.map((spec, index) => (
                          <ListItem key={index}>
                            <ListItemText primary={`• ${spec}`} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}

                  {/* برای فرش - مراحل تکمیل */}
                  {guidelineData.step_4 && (
                    <>
                      <List>
                        {guidelineData.step_4.map((step, index) => (
                          <ListItem key={index}>
                            <ListItemText primary={`${index + 1}. ${step}`} />
                          </ListItem>
                        ))}
                      </List>
                      {guidelineData.step_4_options && (
                        <Box sx={{ pl: 4 }}>
                          {guidelineData.step_4_options.map((option, index) => (
                            <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                              - {option}
                            </Typography>
                          ))}
                        </Box>
                      )}
                    </>
                  )}

                  {guidelineData.step_4_image && (
                    <Image
                      src={guidelineData.step_4_image}
                      alt="مرحله 4"
                      sx={{ width: '100%', borderRadius: 1, border: 1, borderColor: 'divider' }}
                    />
                  )}
                </Stack>
              </AccordionDetails>
            </Accordion>

            {/* Step 5 - فقط برای رگال */}
            {guidelineData.header_step_5 && (
              <Accordion>
                <AccordionSummary expandIcon={<Iconify icon="eva:arrow-down-fill" />}>
                  <Typography variant="h6">{guidelineData.header_step_5}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={3}>
                    {/* Upload Method */}
                    {guidelineData.title_step_5_upload && guidelineData.step_5_upload_method && (
                      <Box>
                        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                          {guidelineData.title_step_5_upload}
                        </Typography>
                        <List dense>
                          {guidelineData.step_5_upload_method.map((method, index) => (
                            <ListItem key={index}>
                              <ListItemText primary={`• ${method}`} />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}

                    {/* Finalization */}
                    {guidelineData.title_step_5_finalize && guidelineData.step_5_finalize && (
                      <Box>
                        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                          {guidelineData.title_step_5_finalize}
                        </Typography>
                        <List>
                          {guidelineData.step_5_finalize.map((step, index) => (
                            <ListItem key={index}>
                              <ListItemText primary={`${index + 1}. ${step}`} />
                            </ListItem>
                          ))}
                        </List>
                        {guidelineData.step_5_options && (
                          <Box sx={{ pl: 4 }}>
                            {guidelineData.step_5_options.map((option, index) => (
                              <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                                - {option}
                              </Typography>
                            ))}
                          </Box>
                        )}
                      </Box>
                    )}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            )}
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
              {guidelineData.project_list_image && (
                <Image
                  src={guidelineData.project_list_image}
                  alt="لیست پروژه‌ها"
                  sx={{ width: '100%', borderRadius: 1, border: 1, borderColor: 'divider', mt: 2 }}
                />
              )}
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
              {guidelineData.project_details_image && (
                <Image
                  src={guidelineData.project_details_image}
                  alt="جزئیات پروژه"
                  sx={{ width: '100%', borderRadius: 1, border: 1, borderColor: 'divider', mt: 2 }}
                />
              )}
            </Box>

            {/* Project Edit - فقط برای فرش */}
            {guidelineData.header_project_edit && guidelineData.project_edit_options && (
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
                {guidelineData.project_edit_image && (
                  <Image
                    src={guidelineData.project_edit_image}
                    alt="ویرایش پروژه"
                    sx={{
                      width: '100%',
                      borderRadius: 1,
                      border: 1,
                      borderColor: 'divider',
                      mt: 2,
                    }}
                  />
                )}
              </Box>
            )}
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

          {/* Optimization - فقط برای رگال */}
          {guidelineData.title_optimization && (
            <>
              <Box>
                <Typography variant="h5" sx={{ mb: 3 }}>
                  {guidelineData.title_optimization}
                </Typography>

                {/* Carpet Selection */}
                {guidelineData.header_carpet_selection && guidelineData.carpet_selection_tips && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      {guidelineData.header_carpet_selection}
                    </Typography>
                    <List>
                      {guidelineData.carpet_selection_tips.map((tip, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={`• ${tip}`} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {/* Content Organization */}
                {guidelineData.header_content_organization &&
                  guidelineData.content_organization_tips && (
                    <Box>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        {guidelineData.header_content_organization}
                      </Typography>
                      <List>
                        {guidelineData.content_organization_tips.map((tip, index) => (
                          <ListItem key={index}>
                            <ListItemText primary={`• ${tip}`} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
              </Box>
              <Divider />
            </>
          )}

          {/* Advantages - فقط برای رگال */}
          {guidelineData.title_advantages && (
            <>
              <Box>
                <Typography variant="h5" sx={{ mb: 3 }}>
                  {guidelineData.title_advantages}
                </Typography>

                {/* Comparison Table */}
                {guidelineData.header_key_differences && guidelineData.comparison_table && (
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      {guidelineData.header_key_differences}
                    </Typography>
                    <TableContainer component={Paper} variant="outlined">
                      <Table>
                        <TableHead>
                          <TableRow>
                            {guidelineData.comparison_table.headers.map((header, index) => (
                              <TableCell
                                key={index}
                                sx={{ fontWeight: 'bold', bgcolor: 'grey.50' }}
                              >
                                {header}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {guidelineData.comparison_table.rows.map((row, index) => (
                            <TableRow key={index}>
                              {row.map((cell, cellIndex) => (
                                <TableCell key={cellIndex}>{cell}</TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                )}

                {/* Unique Experience */}
                {guidelineData.title_unique_experience && (
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 3 }}>
                      {guidelineData.title_unique_experience}
                    </Typography>

                    {/* Regal Experience */}
                    {guidelineData.regal_experience_title && guidelineData.regal_experience && (
                      <Card sx={{ mb: 3, bgcolor: 'success.lighter' }}>
                        <CardContent>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 'bold', mb: 2, color: 'success.main' }}
                          >
                            ✅ {guidelineData.regal_experience_title}
                          </Typography>
                          <List dense>
                            {guidelineData.regal_experience.map((item, index) => (
                              <ListItem key={index}>
                                <ListItemText primary={`• ${item}`} />
                              </ListItem>
                            ))}
                          </List>
                        </CardContent>
                      </Card>
                    )}

                    {/* Showroom Experience */}
                    {guidelineData.showroom_experience_title &&
                      guidelineData.showroom_experience && (
                        <Card sx={{ bgcolor: 'info.lighter' }}>
                          <CardContent>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: 'bold', mb: 2, color: 'info.main' }}
                            >
                              📋 {guidelineData.showroom_experience_title}
                            </Typography>
                            <List dense>
                              {guidelineData.showroom_experience.map((item, index) => (
                                <ListItem key={index}>
                                  <ListItemText primary={`• ${item}`} />
                                </ListItem>
                              ))}
                            </List>
                          </CardContent>
                        </Card>
                      )}
                  </Box>
                )}

                {/* Business Applications */}
                {guidelineData.title_business_applications &&
                  guidelineData.business_applications && (
                    <Box sx={{ mb: 4 }}>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        {guidelineData.title_business_applications}
                      </Typography>
                      <Stack spacing={2}>
                        {guidelineData.business_applications.map((app, index) => (
                          <Card key={index} variant="outlined">
                            <CardContent>
                              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                {app.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {app.description}
                              </Typography>
                            </CardContent>
                          </Card>
                        ))}
                      </Stack>
                    </Box>
                  )}

                {/* Economic Advantages */}
                {guidelineData.title_economic_advantages && guidelineData.economic_advantages && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      {guidelineData.title_economic_advantages}
                    </Typography>
                    <Stack spacing={2}>
                      {guidelineData.economic_advantages.map((advantage, index) => (
                        <Card key={index} variant="outlined">
                          <CardContent>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                              {advantage.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {advantage.description}
                            </Typography>
                          </CardContent>
                        </Card>
                      ))}
                    </Stack>
                  </Box>
                )}
              </Box>
              <Divider />
            </>
          )}

          {/* Performance Comparison - فقط برای رگال */}
          {guidelineData.title_performance_comparison && (
            <>
              <Box>
                <Typography variant="h5" sx={{ mb: 3 }}>
                  {guidelineData.title_performance_comparison}
                </Typography>

                {/* When to Use */}
                {guidelineData.header_when_to_use && (
                  <Typography variant="h6" sx={{ mb: 3 }}>
                    {guidelineData.header_when_to_use}
                  </Typography>
                )}

                <Grid container spacing={3}>
                  {/* Suitable For */}
                  {guidelineData.suitable_for_title && guidelineData.suitable_for && (
                    <Grid item xs={12} md={6}>
                      <Card sx={{ bgcolor: 'success.lighter' }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ mb: 2, color: 'success.main' }}>
                            ✅ {guidelineData.suitable_for_title}
                          </Typography>
                          <List dense>
                            {guidelineData.suitable_for.map((item, index) => (
                              <ListItem key={index}>
                                <ListItemText primary={`• ${item}`} />
                              </ListItem>
                            ))}
                          </List>
                        </CardContent>
                      </Card>
                    </Grid>
                  )}

                  {/* Not Suitable For */}
                  {guidelineData.not_suitable_for_title && guidelineData.not_suitable_for && (
                    <Grid item xs={12} md={6}>
                      <Card sx={{ bgcolor: 'error.lighter' }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ mb: 2, color: 'error.main' }}>
                            ❌ {guidelineData.not_suitable_for_title}
                          </Typography>
                          <List dense>
                            {guidelineData.not_suitable_for.map((item, index) => (
                              <ListItem key={index}>
                                <ListItemText primary={`• ${item}`} />
                              </ListItem>
                            ))}
                          </List>
                        </CardContent>
                      </Card>
                    </Grid>
                  )}
                </Grid>

                {/* Service Selection Guide */}
                {guidelineData.title_service_selection_guide &&
                  guidelineData.service_selection_guide && (
                    <Box sx={{ mt: 4 }}>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        {guidelineData.title_service_selection_guide}
                      </Typography>
                      <Stack spacing={2}>
                        {guidelineData.service_selection_guide.map((guide, index) => (
                          <Card
                            key={index}
                            variant="outlined"
                            sx={{
                              cursor: guide.link ? 'pointer' : 'default',
                              transition: 'all 0.2s ease',
                              '&:hover': guide.link
                                ? {
                                    boxShadow: (theme) => theme.shadows[4],
                                    transform: 'translateY(-2px)',
                                  }
                                : {},
                            }}
                            onClick={() => guide.link && handleLinkClick(guide.link)}
                          >
                            <CardContent>
                              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                {guide.scenario}
                              </Typography>
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography
                                  variant="body2"
                                  color="primary.main"
                                  sx={{ fontWeight: 'medium' }}
                                >
                                  {guide.recommendation}
                                </Typography>
                              </Stack>
                            </CardContent>
                          </Card>
                        ))}
                      </Stack>
                    </Box>
                  )}
              </Box>
              <Divider />
            </>
          )}

          {/* Advanced Services - فقط برای فرش */}
          {guidelineData.title_advanced_services && (
            <>
              <Box>
                <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
                  🤖 {guidelineData.title_advanced_services}
                </Typography>

                {/* AI Advisor */}
                {guidelineData.ai_advisor_title && (
                  <Card sx={{ mb: 4, bgcolor: 'primary.lighter' }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                        {guidelineData.ai_advisor_title}
                      </Typography>

                      {guidelineData.ai_advisor_scenario_title &&
                        guidelineData.ai_advisor_scenario && (
                          <>
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
                          </>
                        )}

                      {guidelineData.ai_advisor_how_title && guidelineData.ai_advisor_steps && (
                        <>
                          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold', mt: 3 }}>
                            {guidelineData.ai_advisor_how_title}
                          </Typography>
                          <Stack spacing={2}>
                            {guidelineData.ai_advisor_steps.map((step, index) => (
                              <Card key={index} variant="outlined">
                                <CardContent>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{ fontWeight: 'bold', mb: 1 }}
                                  >
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
                        </>
                      )}

                      {guidelineData.ai_advisor_investment && (
                        <Typography
                          variant="body2"
                          sx={{ mt: 2, fontWeight: 'bold', color: 'primary.main' }}
                        >
                          💰 {guidelineData.ai_advisor_investment}
                        </Typography>
                      )}

                      {guidelineData.ai_advisor_test_link && (
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
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Virtual Showroom */}
                {guidelineData.virtual_showroom_title && (
                  <Card sx={{ mb: 4, bgcolor: 'secondary.lighter' }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2, color: 'secondary.main' }}>
                        🏪 {guidelineData.virtual_showroom_title}
                      </Typography>

                      {guidelineData.virtual_showroom_description && (
                        <Typography variant="body1" sx={{ mb: 3 }}>
                          {guidelineData.virtual_showroom_description}
                        </Typography>
                      )}

                      {guidelineData.virtual_showroom_usecases_title &&
                        guidelineData.virtual_showroom_usecases && (
                          <>
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
                          </>
                        )}

                      {guidelineData.virtual_showroom_features_title &&
                        guidelineData.virtual_showroom_features && (
                          <>
                            <Typography
                              variant="subtitle1"
                              sx={{ mb: 2, fontWeight: 'bold', mt: 3 }}
                            >
                              {guidelineData.virtual_showroom_features_title}
                            </Typography>
                            <List dense>
                              {guidelineData.virtual_showroom_features.map((feature, index) => (
                                <ListItem key={index}>
                                  <ListItemText primary={`• ${feature}`} />
                                </ListItem>
                              ))}
                            </List>
                          </>
                        )}

                      {guidelineData.virtual_showroom_investment && (
                        <Typography
                          variant="body2"
                          sx={{ mt: 2, fontWeight: 'bold', color: 'secondary.main' }}
                        >
                          💰 {guidelineData.virtual_showroom_investment}
                        </Typography>
                      )}

                      {guidelineData.virtual_showroom_demo_link && (
                        <Box sx={{ mt: 2 }}>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() =>
                              handleLinkClick(guidelineData.virtual_showroom_demo_link.url)
                            }
                            startIcon={<Iconify icon="eva:external-link-fill" />}
                          >
                            {guidelineData.virtual_showroom_demo_link.text}
                          </Button>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Regal Reference - فقط برای فرش */}
                {guidelineData.regal_title && (
                  <Card sx={{ mb: 4, bgcolor: 'success.lighter' }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2, color: 'success.main' }}>
                        📚 {guidelineData.regal_title}
                      </Typography>

                      {guidelineData.regal_when_title && guidelineData.regal_when && (
                        <>
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
                        </>
                      )}

                      {guidelineData.regal_difference_title && guidelineData.regal_difference && (
                        <>
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
                        </>
                      )}

                      {guidelineData.regal_specs_title && guidelineData.regal_specs && (
                        <>
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
                        </>
                      )}

                      {guidelineData.regal_investment && (
                        <Typography
                          variant="body2"
                          sx={{ mt: 2, fontWeight: 'bold', color: 'success.main' }}
                        >
                          💰 {guidelineData.regal_investment}
                        </Typography>
                      )}

                      {guidelineData.regal_guide_link && (
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
                      )}
                    </CardContent>
                  </Card>
                )}
              </Box>
              <Divider />
            </>
          )}

          {/* Demo Link */}
          {guidelineData.demo_link && (
            <>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => handleLinkClick(guidelineData.demo_link.url)}
                  startIcon={<Iconify icon="eva:external-link-fill" />}
                  sx={{ px: 4, py: 1.5 }}
                >
                  {guidelineData.demo_link.text}
                </Button>
              </Box>
              <Divider />
            </>
          )}

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
