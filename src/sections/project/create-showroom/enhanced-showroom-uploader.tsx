/* eslint-disable no-nested-ternary */
// react
import React, { useCallback, useEffect, useMemo } from 'react';

// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import { experimentalStyled as styled, useTheme, alpha } from '@mui/material/styles';

// useImmer
import { useImmer } from 'use-immer';

// redux
import { useSelector } from 'src/redux/store';
import {
  projectNameSelector,
  projectImageSelector,
  projectCategoryIdSelector,
} from 'src/redux/slices/project';
import { organizationSelector } from 'src/redux/slices/organization';

// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

// locales
import { useLocales } from 'src/locales';

// components
import { BackButton, LoadingButton } from 'src/components/button';
import { useSnackbar } from 'src/components/snackbar';
import CustomList from 'src/components/custom-list-info/custom-list';
import Iconify from 'src/components/iconify';
import { Upload } from 'src/components/upload';

// constants
import { project_3d_info, project_image_info } from 'src/constants/project';

// req-hooks
import { useCreateProductMutation } from 'src/_req-hooks/reality/product/useCreateProductMutation';
import { useUploadFileMutation } from 'src/_req-hooks/bytebase/file/useUploadFileMutation';
import { useUploadGlbToUsdzMutation } from 'src/_req-hooks/bytebase/file/useUploadGlbToUsdzMutation';

// Types
interface FileWithPreview extends File {
  preview?: string;
}

interface FilePair {
  id: string;
  image: FileWithPreview | null;
  model: FileWithPreview | null;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  imageUrl?: string;
  modelUrl?: string;
  usdzUrl?: string;
  error?: string;
}

interface State {
  allFiles: FileWithPreview[];
  pairs: FilePair[];
  uploadProgress: number;
  isProcessing: boolean;
}

// Styled Components
const HideScrollbarBox = styled(Box)({
  maxHeight: 400,
  overflowY: 'auto',
  overflowX: 'hidden',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
});

const DropZoneContainer = styled(Box)(({ theme }) => ({
  border: `2px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(3),
  textAlign: 'center',
  backgroundColor: alpha(theme.palette.primary.main, 0.05),
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}));

const PairCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  border: `1px solid ${alpha(theme.palette.grey[500], 0.2)}`,
  '&.completed': {
    borderColor: theme.palette.success.main,
    backgroundColor: alpha(theme.palette.success.main, 0.05),
  },
  '&.error': {
    borderColor: theme.palette.error.main,
    backgroundColor: alpha(theme.palette.error.main, 0.05),
  },
  '&.incomplete': {
    borderColor: theme.palette.warning.main,
    backgroundColor: alpha(theme.palette.warning.main, 0.05),
  },
}));

// Constants
const IMAGE_MEGABYTE = 1048576; // 1MB
const MODEL_MAX_SIZE = 15 * 1048576; // 15MB
const MAX_PAIRS = 10;

// Utility Functions
const generateId = () => Math.random().toString(36).substr(2, 9);

const getFileNameWithoutExtension = (fileName: string): string => fileName.replace(/\.[^/.]+$/, '');

const isImageFile = (file: File): boolean => file.type.startsWith('image/');

const isModelFile = (file: File): boolean => file.name.toLowerCase().endsWith('.glb');

const validateFileSize = (file: File, t: any): { isValid: boolean; error?: string } => {
  if (isImageFile(file)) {
    if (file.size > IMAGE_MEGABYTE) {
      return { isValid: false, error: t('project.image_size_error') };
    }
  } else if (isModelFile(file)) {
    if (file.size > MODEL_MAX_SIZE) {
      return { isValid: false, error: t('project.model_size_error') };
    }
  }
  return { isValid: true };
};

const autoPairFiles = (files: FileWithPreview[], existingPairs: FilePair[] = []): FilePair[] => {
  const images = files.filter(isImageFile);
  const models = files.filter(isModelFile);

  // Start with existing pairs
  const pairs: FilePair[] = [...existingPairs];

  // Find new files that aren't already in pairs
  const existingFileNames = new Set([
    ...existingPairs.map((p) => p.image?.name).filter(Boolean),
    ...existingPairs.map((p) => p.model?.name).filter(Boolean),
  ]);

  const newImages = images.filter((img) => !existingFileNames.has(img.name));
  const newModels = models.filter((model) => !existingFileNames.has(model.name));

  // Create pairs for new images
  newImages.forEach((image) => {
    const imageName = getFileNameWithoutExtension(image.name);
    const matchingModel = newModels.find(
      (model) => getFileNameWithoutExtension(model.name) === imageName
    );

    pairs.push({
      id: generateId(),
      image,
      model: matchingModel || null,
      status: 'pending',
    });
  });

  // Add unpaired new models
  newModels.forEach((model) => {
    const modelName = getFileNameWithoutExtension(model.name);
    const alreadyPaired = pairs.some(
      (pair) => pair.model && getFileNameWithoutExtension(pair.model.name) === modelName
    );

    if (!alreadyPaired) {
      pairs.push({
        id: generateId(),
        image: null,
        model,
        status: 'pending',
      });
    }
  });

  // Try to match unpaired files with existing incomplete pairs
  pairs.forEach((pair) => {
    if (!pair.image && pair.model) {
      const modelName = getFileNameWithoutExtension(pair.model.name);
      const matchingImage = newImages.find(
        (img) => getFileNameWithoutExtension(img.name) === modelName
      );
      if (matchingImage) {
        pair.image = matchingImage;
      }
    }

    if (!pair.model && pair.image) {
      const imageName = getFileNameWithoutExtension(pair.image.name);
      const matchingModel = newModels.find(
        (model) => getFileNameWithoutExtension(model.name) === imageName
      );
      if (matchingModel) {
        pair.model = matchingModel;
      }
    }
  });

  return pairs;
};

function EnhancedShowroomUploader() {
  const { t } = useLocales();
  const theme = useTheme();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  // Redux selectors
  const organization = useSelector(organizationSelector);
  const projectName = useSelector(projectNameSelector);
  const previewUri = useSelector(projectImageSelector);
  const categoryId = useSelector(projectCategoryIdSelector);

  // State
  const [state, setState] = useImmer<State>({
    allFiles: [],
    pairs: [],
    uploadProgress: 0,
    isProcessing: false,
  });

  // Mutations
  const { mutateAsync: createProduct, isLoading: isCreatingProduct } = useCreateProductMutation();
  const { mutateAsync: uploadFile, isLoading: uploadLoading } = useUploadFileMutation();
  const { mutateAsync: uploadGlbToUsdz, isLoading: uploadGlbToUsdzLoading } =
    useUploadGlbToUsdzMutation();

  // Memoized values
  const isLoading = useMemo(
    () => uploadLoading || uploadGlbToUsdzLoading || state.isProcessing || isCreatingProduct,
    [uploadLoading, uploadGlbToUsdzLoading, state.isProcessing, isCreatingProduct]
  );

  const completedPairs = useMemo(
    () => state.pairs.filter((pair) => pair.status === 'completed'),
    [state.pairs]
  );

  const canSubmit = useMemo(
    () => completedPairs.length > 0 && !isLoading,
    [completedPairs.length, isLoading]
  );

  // Helper function برای تشخیص فایل‌های واقعاً جدید - داخل component
  // const isPairTrulyPending = useCallback((pair: FilePair): boolean => {
  //   return (
  //     pair.status === 'pending' &&
  //     pair.image !== null &&
  //     pair.model !== null &&
  //     !pair.imageUrl &&
  //     !pair.modelUrl &&
  //     !pair.usdzUrl
  //   );
  // }, []);

  const isPairTrulyPending = useCallback(
    (pair: FilePair): boolean =>
      pair.status === 'pending' &&
      pair.image !== null &&
      pair.model !== null &&
      !pair.imageUrl &&
      !pair.modelUrl &&
      !pair.usdzUrl,
    []
  );

  // تعداد فایل‌های جدید که هنوز اپلود نشدن
  const newPairsCount = useMemo(
    () => state.pairs.filter(isPairTrulyPending).length,
    [state.pairs, isPairTrulyPending]
  );

  // File validation and drop handler
  const handleDropRejected = useCallback(
    (rejectedFiles: any[]) => {
      rejectedFiles.forEach((fileRejection) => {
        const { file, errors } = fileRejection;
        errors.forEach((error: any) => {
          if (error.code === 'file-too-large') {
            enqueueSnackbar(
              `${t('project.file')} ${file.name}: ${
                isImageFile(file) ? t('project.image_size_limit') : t('project.model_size_limit')
              }`,
              { variant: 'error' }
            );
          }
        });
      });
    },
    [enqueueSnackbar, t]
  );

  // File upload handler
  const handleDropMultipleFiles = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      // Validate file sizes
      const invalidFiles: string[] = [];
      const validFiles = acceptedFiles.filter((file) => {
        const validation = validateFileSize(file, t);
        if (!validation.isValid) {
          invalidFiles.push(`${file.name}: ${validation.error}`);
          return false;
        }
        return true;
      });

      // Show errors for invalid files
      if (invalidFiles.length > 0) {
        invalidFiles.forEach((error) => {
          enqueueSnackbar(error, { variant: 'error' });
        });
      }

      if (validFiles.length === 0) return;

      const filesWithPreview = validFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setState((draft) => {
        draft.allFiles = [...draft.allFiles, ...filesWithPreview];
        // Pass existing pairs to preserve their status
        const newPairs = autoPairFiles([...draft.allFiles], draft.pairs);

        if (newPairs.length > MAX_PAIRS) {
          enqueueSnackbar(t('project.upload_limit_exceeded'), { variant: 'error' });
          return;
        }

        draft.pairs = newPairs;
      });
    },
    [setState, enqueueSnackbar, t]
  );

  const handleRemovePair = useCallback(
    (pairId: string) => {
      setState((draft) => {
        const pairToRemove = draft.pairs.find((p) => p.id === pairId);
        if (pairToRemove) {
          // Remove files from allFiles array
          if (pairToRemove.image) {
            draft.allFiles = draft.allFiles.filter((f) => f.name !== pairToRemove.image!.name);
          }
          if (pairToRemove.model) {
            draft.allFiles = draft.allFiles.filter((f) => f.name !== pairToRemove.model!.name);
          }
        }
        // Remove pair
        draft.pairs = draft.pairs.filter((p) => p.id !== pairId);
      });
    },
    [setState]
  );

  // Upload individual pair
  const uploadPair = useCallback(
    async (pair: FilePair): Promise<void> => {
      if (!pair.image || !pair.model) {
        throw new Error(t('project.upload_both_files'));
      }

      // Check if already uploaded
      if (pair.status === 'completed') {
        return;
      }

      setState((draft) => {
        const pairIndex = draft.pairs.findIndex((p) => p.id === pair.id);
        if (pairIndex !== -1) {
          draft.pairs[pairIndex].status = 'uploading';
        }
      });

      try {
        // Upload image
        const imageResult = await uploadFile({ files: [pair.image] });
        const imageUrl = process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL_DOWNLOAD + imageResult.data[0];

        // Upload and convert model
        const modelResult = await uploadGlbToUsdz({ files: [pair.model] });
        const modelUrl =
          process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL_DOWNLOAD + modelResult.data[0].glb;
        const usdzUrl =
          process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL_DOWNLOAD + modelResult.data[0].usdz;

        setState((draft) => {
          const pairIndex = draft.pairs.findIndex((p) => p.id === pair.id);
          if (pairIndex !== -1) {
            draft.pairs[pairIndex].status = 'completed';
            draft.pairs[pairIndex].imageUrl = imageUrl;
            draft.pairs[pairIndex].modelUrl = modelUrl;
            draft.pairs[pairIndex].usdzUrl = usdzUrl;
          }
        });
      } catch (error) {
        setState((draft) => {
          const pairIndex = draft.pairs.findIndex((p) => p.id === pair.id);
          if (pairIndex !== -1) {
            draft.pairs[pairIndex].status = 'error';
            draft.pairs[pairIndex].error = error.message || t('project.upload_error');
          }
        });
        throw error;
      }
    },
    [uploadFile, uploadGlbToUsdz, setState, t]
  );

  // Upload all pairs - برگشت به روش قبلی (sequential)
  const handleUploadAll = useCallback(async () => {
    const pendingPairs = state.pairs.filter(
      (pair) => pair.status === 'pending' && pair.image && pair.model
    );

    if (pendingPairs.length === 0) {
      enqueueSnackbar(t('project.no_complete_pairs'), { variant: 'warning' });
      return;
    }

    setState((draft) => {
      draft.isProcessing = true;
      draft.uploadProgress = 0;
    });

    try {
      // برگشت به روش sequential برای جلوگیری از فشار زیاد به سرور
      for (let i = 0; i < pendingPairs.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        await uploadPair(pendingPairs[i]);

        setState((draft) => {
          draft.uploadProgress = ((i + 1) / pendingPairs.length) * 100;
        });

        if (i < pendingPairs.length - 1) {
          // eslint-disable-next-line no-await-in-loop
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      enqueueSnackbar(t('project.upload_completed'), { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.message || t('project.upload_error'), { variant: 'error' });
    } finally {
      setState((draft) => {
        draft.isProcessing = false;
        draft.uploadProgress = 0;
      });
    }
  }, [state.pairs, uploadPair, setState, enqueueSnackbar, t]);

  // Submit final product
  const handleSubmit = useCallback(async () => {
    if (completedPairs.length === 0) {
      enqueueSnackbar(t('project.no_completed_pairs'), { variant: 'error' });
      return;
    }

    const documents = completedPairs.map((pair, index) => ({
      title: `${projectName}_${index + 1}`,
      file_uri: pair.modelUrl!,
      preview_uri: pair.imageUrl!,
      asset_uri: pair.usdzUrl!,
      phone_number: '',
      cell_phone: '',
      website: '',
      telegram: '',
      instagram: '',
      linkedin: '',
      location: '',
      size: '',
      order: index + 1,
      size_mb: Math.ceil((pair.model!.size + pair.image!.size) / (1024 * 1024)),
      organization_id: organization?.ID as number,
    }));

    const productData = {
      name: projectName,
      thumbnail_uri: previewUri,
      category_id: categoryId as number,
      organization_id: organization?.ID as number,
      documents,
      disabled: false,
    };

    try {
      await createProduct(productData);
      router.push(paths.project.project_submitted);
    } catch (error) {
      enqueueSnackbar(error.message || t('project.unexpected_error'), { variant: 'error' });
    }
  }, [
    completedPairs,
    projectName,
    previewUri,
    categoryId,
    organization,
    createProduct,
    router,
    enqueueSnackbar,
    t,
  ]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  // Effects
  useEffect(() => {
    if (!categoryId) {
      router.push(paths.project.choose_category);
    }
  }, [categoryId, router]);

  // Render pair card
  const renderPairCard = (pair: FilePair) => {
    const isIncomplete = !pair.image || !pair.model;
    const cardClassName =
      pair.status === 'completed'
        ? 'completed'
        : pair.status === 'error'
        ? 'error'
        : isIncomplete
        ? 'incomplete'
        : '';

    return (
      <PairCard key={pair.id} className={cardClassName}>
        <CardContent>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
            <Typography variant="subtitle2">
              {pair.image?.name || pair.model?.name || t('project.unnamed_pair')}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip
                size="small"
                label={t(`project.status_${pair.status}`)}
                color={
                  pair.status === 'completed'
                    ? 'success'
                    : pair.status === 'error'
                    ? 'error'
                    : pair.status === 'uploading'
                    ? 'warning'
                    : 'default'
                }
              />
              <IconButton size="small" onClick={() => handleRemovePair(pair.id)}>
                <Iconify icon="eva:close-fill" />
              </IconButton>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Box flex={1}>
              <Typography variant="caption" color="text.secondary">
                {t('project.image')}
              </Typography>
              {pair.image ? (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Iconify icon="eva:image-fill" color="success.main" />
                  <Typography variant="body2" noWrap>
                    {pair.image.name}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    ({Math.round(pair.image.size / 1024)}
                    {t('project.kb')})
                  </Typography>
                </Stack>
              ) : (
                <Typography variant="body2" color="warning.main">
                  {t('project.no_image')}
                </Typography>
              )}
            </Box>

            <Box flex={1}>
              <Typography variant="caption" color="text.secondary">
                {t('project.model')}
              </Typography>
              {pair.model ? (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Iconify icon="eva:cube-fill" color="success.main" />
                  <Typography variant="body2" noWrap>
                    {pair.model.name}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    ({Math.round(pair.model.size / (1024 * 1024))}
                    {t('project.mb')})
                  </Typography>
                </Stack>
              ) : (
                <Typography variant="body2" color="warning.main">
                  {t('project.no_model')}
                </Typography>
              )}
            </Box>
          </Stack>

          {pair.error && (
            <Typography variant="caption" color="error.main" sx={{ mt: 1, display: 'block' }}>
              {pair.error}
            </Typography>
          )}

          {/* Naming suggestions */}
          {isIncomplete && (
            <Box
              sx={{ mt: 1, p: 1, bgcolor: alpha(theme.palette.warning.main, 0.1), borderRadius: 1 }}
            >
              <Typography
                variant="caption"
                color="warning.dark"
                sx={{ display: 'block', fontWeight: 600 }}
              >
                💡 {t('project.naming_tip')}:
              </Typography>
              {!pair.image && !pair.model && (
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                  {t('project.upload_both_files_same_name')}
                </Typography>
              )}
              {pair.image && !pair.model && (
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                  {t('project.upload_model_with_name')}:{' '}
                  <strong>{getFileNameWithoutExtension(pair.image.name)}.glb</strong>
                </Typography>
              )}
              {!pair.image && pair.model && (
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                  {t('project.upload_image_with_name')}:{' '}
                  <strong>{getFileNameWithoutExtension(pair.model.name)}.jpg</strong>
                </Typography>
              )}
            </Box>
          )}
        </CardContent>
      </PairCard>
    );
  };

  return (
    <Box maxWidth="lg">
      <Stack alignItems="center" spacing={3}>
        <Stack alignItems="center" maxWidth="md" spacing={1}>
          <Typography variant="h5">{t('project.upload_file')}</Typography>
          <Typography color="text.disabled" variant="body2" align="center">
            {t('project.showroom_description')}
          </Typography>
          <Typography color="text.disabled" variant="body2" align="center">
            {t('project.bulk_upload_description')}
          </Typography>
          <Typography color="text.disabled" variant="caption" align="center">
            {t('project.file_size_limits')}
          </Typography>
        </Stack>

        {/* Main Upload Area */}
        <DropZoneContainer sx={{ width: '100%', maxWidth: 800 }}>
          <Upload
            multiple
            onDrop={handleDropMultipleFiles}
            onDropRejected={handleDropRejected}
            maxSize={MODEL_MAX_SIZE} // Maximum size for validation
            sx={{ border: 'none', backgroundColor: 'transparent' }}
            accept={{
              'image/*': [],
              '.glb': [],
            }}
            placeholder={
              <Stack alignItems="center" spacing={2}>
                <Iconify icon="eva:cloud-upload-fill" width={48} color="primary.main" />
                <Typography variant="h6">{t('project.drop_files_here')}</Typography>
                <Stack direction="row" spacing={4}>
                  <Stack alignItems="center">
                    <Iconify icon="eva:image-outline" width={24} />
                    <Typography variant="caption">
                      {t('project.images')} ({t('project.max_1mb')})
                    </Typography>
                  </Stack>
                  <Stack alignItems="center">
                    <Iconify icon="eva:cube-outline" width={24} />
                    <Typography variant="caption">
                      {t('project.models')} ({t('project.max_15mb')})
                    </Typography>
                  </Stack>
                </Stack>
                <CustomList list={[...project_image_info(t), ...project_3d_info(t)]} />
              </Stack>
            }
          />
        </DropZoneContainer>

        {/* Upload Progress */}
        {state.isProcessing && (
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
              <Typography variant="body2">{t('project.uploading_files')}</Typography>
              <Typography variant="body2">{Math.round(state.uploadProgress)}%</Typography>
            </Stack>
            <LinearProgress variant="determinate" value={state.uploadProgress} />
          </Box>
        )}

        {/* File Pairs List */}
        {state.pairs.length > 0 && (
          <Stack sx={{ width: '100%', maxWidth: 800 }} spacing={2}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">
                {t('project.file_pairs')} ({state.pairs.length}/{MAX_PAIRS})
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleUploadAll}
                  disabled={
                    isLoading ||
                    // استفاده از memoized value برای تشخیص فایل‌های جدید
                    newPairsCount === 0
                  }
                >
                  {t('project.upload_all')}
                </Button>
              </Stack>
            </Stack>

            <Divider />

            <HideScrollbarBox>{state.pairs.map(renderPairCard)}</HideScrollbarBox>
          </Stack>
        )}

        {/* Action Buttons */}
        <Stack spacing={2} sx={{ width: '100%', maxWidth: 400 }}>
          <LoadingButton
            fullWidth
            size="large"
            title={t('organization.continue')}
            loading={isCreatingProduct}
            disabled={!canSubmit}
            onClick={handleSubmit}
          />

          <Stack alignItems="center">
            <BackButton title={t('organization.back')} onClick={handleBack} />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default EnhancedShowroomUploader;
