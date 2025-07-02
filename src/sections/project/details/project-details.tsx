// react
import { useCallback, useEffect, useState } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography, Box, Avatar } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
// immer
import { useImmer } from 'use-immer';

// locals
import { useLocales } from 'src/locales';
// types
import { ProductData } from 'src/_types/reality/product/productData';

// utils
import { loadingImage } from 'src/utils/image-size';
// theme
import { bgGradient } from 'src/theme/css';
// components
import ModelViewer from 'src/components/model-viewer';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';
import { useSnackbar } from 'src/components/snackbar';
import { useBoolean } from 'src/hooks/use-boolean';
import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';

//
import ProjectInfo from './project-info';
import ProjectDetailsInsightsDialog from './project-details-insights-dialog';

// ----------------------------------------------------------------------

const THUMB_SIZE = 64;

const StyledThumbnailsContainer = styled('div')<{ length: number }>(({ length, theme }) => ({
  position: 'relative',
  margin: theme.spacing(0, 'auto'),
  display: 'flex',
  justifyContent: 'center',
  '& .slick-slide': {
    lineHeight: 0,
  },

  ...(length === 1 && {
    maxWidth: THUMB_SIZE * 1 + 16,
  }),

  ...(length === 2 && {
    maxWidth: THUMB_SIZE * 2 + 32,
  }),

  ...((length === 3 || length === 4) && {
    maxWidth: THUMB_SIZE * 3 + 48,
  }),

  ...(length >= 5 && {
    maxWidth: THUMB_SIZE * 6,
  }),

  ...(length > 3 && {
    '&:before, &:after': {
      ...bgGradient({
        direction: 'to left',
        startColor: `${alpha(theme.palette.background.default, 0)} 0%`,
        endColor: `${theme.palette.background.default} 100%`,
      }),
      top: 0,
      zIndex: 9,
      content: "''",
      height: '100%',
      position: 'absolute',
      width: (THUMB_SIZE * 2) / 3,
    },
    '&:after': {
      right: 0,
      transform: 'scaleX(-1)',
    },
  }),
}));

// ----------------------------------------------------------------------

type ProjectDetailsProps = {
  project?: ProductData | undefined;
};

type Dimensions = {
  width: number | null;
  height: number | null;
};

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const { t } = useLocales();
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

  const carousel = useCarousel({
    centerMode: documentsLength > 3, // Enable centerMode only if there are more than 3 documents
    swipeToSlide: true,
    focusOnSelect: true,
    variableWidth: true,
    centerPadding: documentsLength > 3 ? '20px' : '0px', // Add padding only if there are more than 3 documents
    slidesToShow: documentsLength > 3 ? 3 : documentsLength || 1,
  });

  useEffect(() => {
    carousel.onSetNav();
  }, [carousel]);

  useEffect(() => {
    if (project?.documents && project.documents.length > 0) {
      setCurrentModelIndex(0); // Set default document to be displayed
    }
  }, [project]);

  const handleNext = () => {
    if (project?.documents) {
      carousel.onNext();
      setCurrentModelIndex((prevIndex) => (prevIndex + 1) % project.documents.length);
    }
  };

  const handlePrev = () => {
    if (project?.documents) {
      carousel.onPrev();
      setCurrentModelIndex(
        (prevIndex) => (prevIndex - 1 + project.documents.length) % project.documents.length
      );
    }
  };

  const renderThumbnails = (
    <StyledThumbnailsContainer length={project?.documents?.length || 0}>
      <CarouselArrows
        onNext={handleNext}
        onPrev={handlePrev}
        leftButtonProps={{
          sx: {
            left: -50,
          },
        }}
        rightButtonProps={{
          sx: {
            right: -50,
          },
        }}
        filled
        shape="rounded"
      >
        <Carousel
          {...carousel.carouselSettings}
          ref={carousel.carouselRef}
          beforeChange={(oldIndex, newIndex) => setCurrentModelIndex(newIndex)}
        >
          {project?.documents.map((item, index) => (
            <Box key={item.ID} sx={{ px: 0.5 }}>
              <Avatar
                variant="rounded"
                alt={item.title}
                src={item.preview_uri}
                sx={{
                  width: THUMB_SIZE,
                  height: THUMB_SIZE,
                  opacity: 0.48,
                  cursor: 'pointer',
                  ...(currentModelIndex === index && {
                    opacity: 1,
                    border: (theme) => `solid 2.5px ${theme.palette.primary.main}`,
                  }),
                }}
              />
            </Box>
          ))}
        </Carousel>
      </CarouselArrows>
    </StyledThumbnailsContainer>
  );

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
        // Optionally handle other types or return null/undefined if not applicable
        return null;
    }
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
          {project?.documents && project.documents.length > 1 && (
            <Grid xs={12} sx={{ mt: 3 }}>
              {renderThumbnails}
            </Grid>
          )}
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
