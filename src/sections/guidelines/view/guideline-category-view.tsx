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
import {
  carpet_guideline,
  regal_guideline,
  industrial_products_guideline,
  home_appliances_guideline,
} from 'src/constants';

// ----------------------------------------------------------------------

type Props = {
  category: string;
};

// Type definitions for dynamic structure
interface GuidelineSection {
  title?: string;
  content?: string | string[];
  type?: 'text' | 'list' | 'warning' | 'info' | 'success' | 'error' | 'chips' | 'table';
  items?: any[];
  subsections?: GuidelineSection[];
  image?: string;
}

interface GuidelineStep {
  header: string;
  sections: GuidelineSection[];
  image?: string;
}

interface GuidelineService {
  title: string;
  description: string;
  features?: string[];
  image?: string;
  links?: {
    text: string;
    url: string;
    type: 'button' | 'link';
  }[];
}

interface GuidelineFAQ {
  question: string;
  answer: string;
}

// Component for rendering different section types
const SectionRenderer = ({ section, level = 0 }: { section: GuidelineSection; level?: number }) => {
  const handleLinkClick = (url: string) => {
    if (url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const renderContent = () => {
    switch (section.type) {
      case 'list':
        return (
          <List dense={level > 0}>
            {section.items?.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={
                    typeof item === 'string' ? `• ${item}` : `• ${item.title || item.name || item}`
                  }
                  secondary={
                    typeof item === 'object' && item.description ? item.description : undefined
                  }
                />
              </ListItem>
            ))}
          </List>
        );

      case 'chips':
        return (
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {section.items?.map((item, index) => (
              <Chip
                key={index}
                label={item.dimensions ? `${item.name} (${item.dimensions})` : item.name || item}
                variant="outlined"
              />
            ))}
          </Stack>
        );

      case 'table':
        const tableData = section.items as { headers: string[]; rows: string[][] };
        return (
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  {tableData.headers.map((header, index) => (
                    <TableCell key={index} sx={{ fontWeight: 'bold', bgcolor: 'grey.50' }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.rows.map((row, index) => (
                  <TableRow key={index}>
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );

      case 'warning':
      case 'error':
      case 'info':
      case 'success':
        const colors = {
          warning: { bg: 'warning.lighter', color: 'warning.main', icon: '⚠️' },
          error: { bg: 'error.lighter', color: 'error.main', icon: '⚠️' },
          info: { bg: 'info.lighter', color: 'info.main', icon: '💡' },
          success: { bg: 'success.lighter', color: 'success.main', icon: '📊' },
        };
        const colorConfig = colors[section.type];

        return (
          <Box sx={{ bgcolor: colorConfig.bg, p: 2, borderRadius: 1 }}>
            {section.title && (
              <Typography
                variant="subtitle1"
                sx={{ mb: 2, fontWeight: 'bold', color: colorConfig.color }}
              >
                {colorConfig.icon} {section.title}
              </Typography>
            )}
            {section.content && (
              <Typography variant="body2" sx={{ mb: section.items ? 2 : 0 }}>
                {section.content}
              </Typography>
            )}
            {section.items && (
              <List dense>
                {section.items.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={
                        typeof item === 'string' ? (
                          `• ${item}`
                        ) : item.url ? (
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleLinkClick(item.url)}
                            startIcon={<Iconify icon="eva:download-fill" />}
                          >
                            {item.name}
                          </Button>
                        ) : (
                          `• ${item.name || item.title || item}`
                        )
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        );

      default:
        if (section.items) {
          return (
            <List dense={level > 0}>
              {section.items.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={
                      typeof item === 'string'
                        ? `• ${item}`
                        : `• ${item.title || item.name || item}`
                    }
                    secondary={
                      typeof item === 'object' && item.description ? item.description : undefined
                    }
                  />
                </ListItem>
              ))}
            </List>
          );
        }

        if (Array.isArray(section.content)) {
          return (
            <Box sx={{ pl: level > 0 ? 4 : 0 }}>
              {section.content.map((item, index) => (
                <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                  - {item}
                </Typography>
              ))}
            </Box>
          );
        }

        return section.content ? <Typography variant="body1">{section.content}</Typography> : null;
    }
  };

  return (
    <Stack spacing={2}>
      {section.title && !['warning', 'error', 'info', 'success'].includes(section.type || '') && (
        <Typography variant={level === 0 ? 'h6' : 'subtitle1'} sx={{ fontWeight: 'bold' }}>
          {section.title}
        </Typography>
      )}

      {renderContent()}

      {section.subsections && (
        <Stack spacing={2} sx={{ pl: level === 0 ? 2 : 0 }}>
          {section.subsections.map((subsection, index) => (
            <SectionRenderer key={index} section={subsection} level={level + 1} />
          ))}
        </Stack>
      )}

      {section.image && (
        <Image
          src={section.image}
          alt={section.title || 'تصویر راهنما'}
          sx={{ width: '100%', borderRadius: 1, border: 1, borderColor: 'divider' }}
        />
      )}
    </Stack>
  );
};

// Component for rendering services
const ServiceRenderer = ({ service }: { service: GuidelineService }) => {
  const handleLinkClick = (url: string) => {
    if (url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card sx={{ mb: 3, bgcolor: 'primary.lighter' }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
          {service.title}
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          {service.description}
        </Typography>

        {service.features && (
          <Stack spacing={1} sx={{ mb: 2 }}>
            {service.features.map((feature, index) => (
              <Typography key={index} variant="body2">
                • {feature}
              </Typography>
            ))}
          </Stack>
        )}

        {service.links && (
          <Stack direction="row" spacing={2}>
            {service.links.map((link, index) => (
              <Button
                key={index}
                variant={link.type === 'button' ? 'contained' : 'outlined'}
                color="primary"
                onClick={() => handleLinkClick(link.url)}
                startIcon={<Iconify icon="eva:external-link-fill" />}
              >
                {link.text}
              </Button>
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
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
      case 'industrial':
      case 'industrial-products':
        return industrial_products_guideline;
      case 'home-appliances':
      case 'home_appliances':
        return home_appliances_guideline;
      default:
        return null;
    }
  }, [category]);

  const handleLinkClick = (url: string) => {
    if (url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      router.push(url);
    }
  };

  if (!guidelineData) {
    return (
      <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ py: 5 }}>
        <CustomBreadcrumbs
          heading={t('landing.guidelines')}
          links={[
            { name: t('posts.home'), href: '/' },
            { name: t('landing.guidelines'), href: paths.guideline.root },
            { name: category },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
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
          { name: t('posts.home'), href: '/' },
          { name: t('landing.guidelines'), href: paths.guideline.root },
          { name: t(`category.${category}`) },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
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
            onClick={() => handleLinkClick(guidelineData.support.contact_button.url)}
            startIcon={<Iconify icon="eva:phone-fill" />}
          >
            {guidelineData.support.contact_button.text}
          </Button>
        </Box>
      </Box>

      {/* Content */}
      <Paper sx={{ p: 4 }}>
        <Stack spacing={4}>
          {/* Unique Feature */}
          {guidelineData.unique_feature && (
            <>
              <SectionRenderer section={guidelineData.unique_feature} />
              <Divider />
            </>
          )}

          {/* Key Features */}
          {guidelineData.key_features && (
            <>
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {guidelineData.key_features.title}
                </Typography>
                <Stack spacing={2}>
                  {guidelineData.key_features.items.map((feature, index) => (
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

          {/* Differences - for regal */}
          {guidelineData.differences && (
            <>
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {guidelineData.differences.title}
                </Typography>
                <Stack spacing={2}>
                  {guidelineData.differences.items.map((diff, index) => (
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

          {/* Use Cases - for regal */}
          {guidelineData.use_cases && (
            <>
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {guidelineData.use_cases.title}
                </Typography>
                <List>
                  {guidelineData.use_cases.items.map((usecase, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={`• ${usecase}`} />
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Divider />
            </>
          )}

          {/* Suitable Products - for industrial & home appliances */}
          {guidelineData.suitable_products && (
            <>
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {guidelineData.suitable_products.title}
                </Typography>
                <List>
                  {guidelineData.suitable_products.items.map((product, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={`• ${product}`} />
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
              راهنمای گام به گام
            </Typography>

            {guidelineData.steps.map((step: GuidelineStep, index: number) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<Iconify icon="eva:arrow-down-fill" />}>
                  <Typography variant="h6">{step.header}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={3}>
                    {step.sections.map((section, sectionIndex) => (
                      <SectionRenderer key={sectionIndex} section={section} />
                    ))}
                    {step.image && (
                      <Image
                        src={step.image}
                        alt={step.header}
                        sx={{ width: '100%', borderRadius: 1, border: 1, borderColor: 'divider' }}
                      />
                    )}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          <Divider />

          {/* Project Management */}
          {guidelineData.project_management && (
            <>
              <Box>
                <Typography variant="h5" sx={{ mb: 3 }}>
                  {guidelineData.project_management.title}
                </Typography>
                {guidelineData.project_management.sections.map((section, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <SectionRenderer section={section} />
                  </Box>
                ))}
              </Box>
              <Divider />
            </>
          )}

          {/* Contact Button After Project Management */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => handleLinkClick(guidelineData.support.contact_button.url)}
              startIcon={<Iconify icon="eva:phone-fill" />}
            >
              {guidelineData.support.contact_button.text}
            </Button>
          </Box>

          {/* Additional dynamic sections */}
          {/* Usage Applications - home appliances */}
          {guidelineData.usage_applications && (
            <>
              <Box>
                <Typography variant="h5" sx={{ mb: 3 }}>
                  {guidelineData.usage_applications.title}
                </Typography>
                {guidelineData.usage_applications.sections.map((section, index) => (
                  <SectionRenderer key={index} section={section} />
                ))}
              </Box>
              <Divider />
            </>
          )}

          {/* File Solutions */}
          {guidelineData.file_solutions && (
            <>
              <Box>
                <Typography variant="h5" sx={{ mb: 3 }}>
                  {guidelineData.file_solutions.title}
                </Typography>
                {guidelineData.file_solutions.sections.map((section, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <SectionRenderer section={section} />
                  </Box>
                ))}
              </Box>
              <Divider />
            </>
          )}

          {/* Related Services */}
          {guidelineData.related_services && (
            <>
              <Box>
                <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
                  سرویس‌های مرتبط
                </Typography>
                {guidelineData.related_services.map((service, index) => (
                  <ServiceRenderer key={index} service={service} />
                ))}
              </Box>
              <Divider />
            </>
          )}

          {/* Additional Services - for carpet */}
          {guidelineData.additional_services && (
            <>
              <Box>
                <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
                  🤖 سرویس‌های پیشرفته و تکمیلی
                </Typography>
                {guidelineData.additional_services.map((service, index) => (
                  <ServiceRenderer key={index} service={service} />
                ))}
              </Box>
              <Divider />
            </>
          )}

          {/* Best Practices */}
          {guidelineData.best_practices && (
            <>
              <Box>
                <Typography variant="h5" sx={{ mb: 3 }}>
                  {guidelineData.best_practices.title}
                </Typography>
                {guidelineData.best_practices.sections.map((section, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <SectionRenderer section={section} />
                  </Box>
                ))}
              </Box>
              <Divider />
            </>
          )}

          {/* Marketing Strategy */}
          {guidelineData.marketing_strategy && (
            <>
              <Box>
                <Typography variant="h5" sx={{ mb: 3 }}>
                  {guidelineData.marketing_strategy.title}
                </Typography>
                {guidelineData.marketing_strategy.sections.map((section, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <SectionRenderer section={section} />
                  </Box>
                ))}
              </Box>
              <Divider />
            </>
          )}

          {/* Optimization - for regal */}
          {guidelineData.optimization && (
            <>
              <Box>
                <Typography variant="h5" sx={{ mb: 3 }}>
                  {guidelineData.optimization.title}
                </Typography>
                {guidelineData.optimization.sections.map((section, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <SectionRenderer section={section} />
                  </Box>
                ))}
              </Box>
              <Divider />
            </>
          )}

          {/* Advantages - for regal */}
          {guidelineData.advantages && (
            <>
              <Box>
                <Typography variant="h5" sx={{ mb: 3 }}>
                  {guidelineData.advantages.title}
                </Typography>
                {guidelineData.advantages.sections.map((section, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <SectionRenderer section={section} />
                  </Box>
                ))}
              </Box>
              <Divider />
            </>
          )}

          {/* Performance Comparison - for regal */}
          {guidelineData.performance_comparison && (
            <>
              <Box>
                <Typography variant="h5" sx={{ mb: 3 }}>
                  {guidelineData.performance_comparison.title}
                </Typography>
                {guidelineData.performance_comparison.sections.map((section, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <SectionRenderer section={section} />
                    {/* Special handling for service selection guide */}
                    {section.items &&
                      Array.isArray(section.items) &&
                      section.items[0]?.scenario && (
                        <Stack spacing={2} sx={{ mt: 2 }}>
                          {section.items.map((guide, guideIndex) => (
                            <Card
                              key={guideIndex}
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
                      )}
                  </Box>
                ))}
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
              سوالات متداول
            </Typography>
            <Stack spacing={2}>
              {guidelineData.faq.map((faq: GuidelineFAQ, index: number) => (
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
              {guidelineData.support.title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {guidelineData.support.description}
            </Typography>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => handleLinkClick(guidelineData.support.contact_button.url)}
                startIcon={<Iconify icon="eva:phone-fill" />}
              >
                {guidelineData.support.contact_button.text}
              </Button>
            </Box>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
