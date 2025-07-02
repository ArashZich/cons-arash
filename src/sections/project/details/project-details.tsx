// react
import { useCallback, useEffect, useState } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography, Box, IconButton } from '@mui/material';
import { alpha } from '@mui/material/styles';
// immer
import { useImmer } from 'use-immer';

// locals
import { useLocales } from 'src/locales';
// types
import { ProductData } from 'src/_types/reality/product/productData';

// utils
import { loadingImage } from 'src/utils/image-size';
// components
import ModelViewer from 'src/components/model-viewer';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';
import { useSnackbar } from 'src/components/snackbar';
import { useBoolean } from 'src/hooks/use-boolean';

//
import ProjectInfo from './project-info';
import ProjectDetailsInsightsDialog from './project-details-insights-dialog';

// ----------------------------------------------------------------------

type ProjectDetailsProps = {
  project?: ProductData | undefined;
};

type Dimensions = {
  width: number | null;
  height: number | null;
};

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const { t, isRtl } = useLocales();
  const toggle = useBoolean();
  const [productUid, setProductUid] = useState<string | null>(null);
  const [currentModelIndex, setCurrentModelIndex] = useState<number>(0);

  const handleClickClose = () => {
    toggle.onFalse();
    setProductUid(null);
  };

  const handleInsight = useCallback(
    (uid: string | null) => {
      setProductUid(uid);
      toggle.onToggle();
    },
    [toggle]
  );

  const { enqueueSnackbar } = useSnackbar();

  const [imageDimensions, setImageDimensions] = useImmer<Dimensions>({
    width: 100, // default width
    height: 100, // default height
  });

  const loadImageDimensions = useCallback(async () => {
    try {
      if (project?.category.accepted_file_type === 'image') {
        const dimensions = await loadingImage(project?.documents[0].file_uri);
        if (!dimensions) {
          throw new Error(t('project.dimensions_not_found'));
        } else {
          const maxDimension = 500; // Set the maximum dimension allowed

          setImageDimensions((draft) => {
            draft.width = Math.min(dimensions.width, maxDimension);
            draft.height = Math.min(dimensions.height, maxDimension);
          });
        }
      }
    } catch (error) {
      const errorMessage = error.message || t('project.error_occurred');
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  }, [enqueueSnackbar, project, setImageDimensions, t]);

  useEffect(() => {
    if (
      project?.category.accepted_file_type === 'image' ||
      project?.category.accepted_file_type === 'multi-images'
    ) {
      loadImageDimensions();
    }
  }, [loadImageDimensions, project?.category.accepted_file_type]);

  const documentsLength = project?.documents?.length || 0;

  useEffect(() => {
    if (project?.documents && project.documents.length > 0) {
      setCurrentModelIndex(0); // Set default document to be displayed
    }
  }, [project]);

  // Navigation functions
  const handleNext = () => {
    if (project?.documents && documentsLength > 1) {
      setCurrentModelIndex((prevIndex) => (prevIndex + 1) % documentsLength);
    }
  };

  const handlePrev = () => {
    if (project?.documents && documentsLength > 1) {
      setCurrentModelIndex((prevIndex) => (prevIndex - 1 + documentsLength) % documentsLength);
    }
  };

  const renderMedia = () => {
    const fileType = project?.category.accepted_file_type;
    const fileUri = project?.documents?.[currentModelIndex]?.file_uri;
    const VideoFileUri = project?.documents?.[currentModelIndex]?.preview_uri;

    switch (fileType) {
      case 'image':
        return (
          <Image
            src={fileUri as string}
            sx={{ width: imageDimensions.width, height: imageDimensions.height }}
          />
        );
      case 'video':
        return (
          <Stack alignItems="center" justifyContent="center" sx={{ width: '100%', height: '100%' }}>
            <Image src={VideoFileUri as string} sx={{ maxWidth: '100%', height: 'auto' }} />
          </Stack>
        );
      case 'glb':
      case 'complex':
      case 'multi-images':
        return <ModelViewer src={fileUri as string} height="100%" width="100%" />;

      default:
        return null;
    }
  };

  const renderNavigationButtons = () => {
    if (!project?.documents || documentsLength <= 1) return null;

    return (
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ mt: 2 }}>
        <IconButton
          onClick={handlePrev}
          sx={{
            bgcolor: '#000',
            color: 'white',
            borderRadius: 1, // مربعی کردن
            width: 32,
            height: 32,
            '&:hover': {
              bgcolor: '#333',
            },
          }}
        >
          <Iconify icon={isRtl ? 'eva:arrow-ios-forward-fill' : 'eva:arrow-ios-back-fill'} />
        </IconButton>

        <Typography variant="body2" sx={{ minWidth: 60, textAlign: 'center' }}>
          {currentModelIndex + 1} / {documentsLength}
        </Typography>

        <IconButton
          onClick={handleNext}
          sx={{
            bgcolor: '#000',
            color: 'white',
            borderRadius: 1, // مربعی کردن
            width: 32,
            height: 32,
            '&:hover': {
              bgcolor: '#333',
            },
          }}
        >
          <Iconify icon={isRtl ? 'eva:arrow-ios-back-fill' : 'eva:arrow-ios-forward-fill'} />
        </IconButton>
      </Stack>
    );
  };

  return (
    <>
      {productUid && (
        <ProjectDetailsInsightsDialog
          open={toggle.value}
          onClose={handleClickClose}
          productUid={productUid}
        />
      )}
      <Grid container width="100%" spacing={6} alignItems="center" justifyContent="center">
        <Grid sm={12} md={7} sx={{ height: { md: 650, xs: 400 } }}>
          {renderMedia()}

          {(project?.category.accepted_file_type === 'glb' ||
            project?.category.accepted_file_type === 'complex' ||
            project?.category.accepted_file_type === 'multi-images') && (
            <Stack flexDirection="row" alignItems="center" justifyContent="center" sx={{ mt: 1 }}>
              <Iconify icon="mdi:rotate-3d" width={24} sx={{ mr: 1 }} />
              <Typography variant="button">{t('project.drag_rotate')}</Typography>
            </Stack>
          )}

          {/* Navigation Buttons */}
          {renderNavigationButtons()}
        </Grid>

        <Grid xs={12} md={5} sx={{ pb: 6 }} alignItems="center" justifyContent="center">
          <Stack
            width="100%"
            sx={{
              maxHeight: 637,
              minWidth: 350,
              border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.2)}`,
              borderRadius: '8px',
              p: 4,
            }}
          >
            <ProjectInfo project={project} handleClickInsight={handleInsight} />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
