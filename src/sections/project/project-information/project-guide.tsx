// react
import React from 'react';
// @mui
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Grid from '@mui/material/Unstable_Grid2';

// locales
import { useLocales } from 'src/locales';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { InsertDownloadLink } from 'src/components/custom-components';

// constants
import { contentMap, downloadUrls } from 'src/constants/project';

type Props = {
  isOpen: boolean;
  onClick: () => void;
  title: string;
  category: any;
  hasImage: boolean;
  hasDimensions: boolean;
};

function ProjectGuide({ isOpen, onClick, title, category, hasImage, hasDimensions }: Props) {
  const { t, isRtl } = useLocales();
  const lang = isRtl ? 'fa' : 'en';

  const imageUrl = `${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/images/${category}.webp`;

  const imageUrl1 = `${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/images/${category}-${lang}-1.webp`;
  const imageUrl2 = `${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/images/${category}-${lang}-2.webp`;

  const downloadUrl = downloadUrls[category] || '';
  const localizedStringWithPlaceholder = t('project.click_here_to_download_sample');

  const contentWithDownloadLink = InsertDownloadLink(
    localizedStringWithPlaceholder,
    downloadUrl,
    lang
  );

  return (
    <Dialog open={isOpen} onClose={onClick}>
      <Stack flexDirection="row" justifyContent="space-between">
        <DialogTitle>{title}</DialogTitle>
        <DialogActions
          sx={{
            p: 1.5,
          }}
        >
          <Button onClick={onClick}>
            <Iconify icon="mdi:window-close" />
          </Button>
        </DialogActions>
      </Stack>
      <DialogContent sx={{ color: 'text.secondary', pb: 3 }}>
        {hasDimensions && (
          <Typography variant="body2">
            {t(`project.enter_dimensions_${category}_consider_length_width`)}
          </Typography>
        )}
        {hasDimensions && (
          <Typography mt={2} variant="body2">
            {t(`project.guide_enter_length_width_${category}`)}
          </Typography>
        )}

        <Typography variant="body2" sx={{ mb: 3 }}>
          {hasDimensions
            ? t('project.projects_named_according_photos')
            : t('project.please_follow_guidelines')}
        </Typography>

        {hasImage &&
          (category === 'earrings' || category === 'necklace' || category === 'bow_tie') && (
            <Grid container spacing={2} alignItems="center" mt={2}>
              <Grid xs={6}>
                <Image src={imageUrl1} />
              </Grid>
              <Grid xs={6}>
                <Image src={imageUrl2} />
              </Grid>
            </Grid>
          )}

        {React.Children.toArray(
          contentMap[category]?.map((content: any) => (
            <List
              sx={{
                padding: 1,
                margin: 0,
              }}
            >
              <ListItem sx={{ padding: 0 }}>
                <ListItemIcon sx={{ minWidth: 'auto', marginRight: '4px' }}>
                  <Iconify icon="mdi:checkbox-blank-circle" sx={{ width: '8px', height: '8px' }} />
                </ListItemIcon>
                <Typography variant="body2">{t(content)}</Typography>
              </ListItem>
            </List>
          ))
        )}
        {hasImage &&
          category !== 'earrings' &&
          category !== 'necklace' &&
          category !== 'bow_tie' && (
            <Stack justifyContent="center" alignItems="center">
              <Image src={imageUrl} />
            </Stack>
          )}

        {!hasImage && category !== 'video' && contentWithDownloadLink}
      </DialogContent>
    </Dialog>
  );
}

export default ProjectGuide;
