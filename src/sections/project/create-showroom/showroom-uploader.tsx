/* eslint-disable no-nested-ternary */
// react
import React, { useCallback, useEffect } from 'react';

// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { useTheme, styled } from '@mui/material/styles';

// useImmer
import { useImmer } from 'use-immer';
// redux
import { useSelector } from 'src/redux/store';
import {
  acceptedFileTypeSelector,
  projectImageSelector,
  projectNameSelector,
  projectCategoryIdSelector,
} from 'src/redux/slices/project';
import { organizationSelector } from 'src/redux/slices/organization';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// locales
import { useLocales } from 'src/locales';
// utils
import { determineUploadSize } from 'src/utils/determine-upload-size';
import { getAcceptedFileTypes } from 'src/utils/get-accepted-file-types';

// component
import { Upload } from 'src/components/upload';
import { BackButton, LoadingButton } from 'src/components/button';
import { useSnackbar } from 'src/components/snackbar';
import CircleProgress from 'src/components/modal-progress/circular-progress';
import Iconify from 'src/components/iconify';

// constants
import { project_3d_info, project_image_info } from 'src/constants/project';

// req-hooks
import { useCreateProductMutation } from 'src/_req-hooks/reality/product/useCreateProductMutation';
import { useUploadFileMutation } from 'src/_req-hooks/bytebase/file/useUploadFileMutation';
import { useUploadGlbToUsdzMutation } from 'src/_req-hooks/bytebase/file/useUploadGlbToUsdzMutation';

// component
import CustomList from 'src/components/custom-list-info/custom-list';

const IMAGE_MEGABYTE = 1048576;

interface UploadedFile {
  thumbnail: string | File | null;
  glb: string | File | null;
  usdz: string | File | null;
  size_mb: number;
}

interface State {
  imageFile: File | string | null;
  modelFile: File | string | null;
  files: UploadedFile[];
  width: string;
  length: string;
  image?: string;
  tempFiles: UploadedFile | null;
}

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

function ShowroomUploader() {
  const { t } = useLocales();
  const theme = useTheme();
  const organization = useSelector(organizationSelector);
  const projectName = useSelector(projectNameSelector);
  const previewUri = useSelector(projectImageSelector);
  const acceptedFileType = useSelector(acceptedFileTypeSelector);
  const categoryId = useSelector(projectCategoryIdSelector);

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [state, setState] = useImmer<State>({
    imageFile: null,
    modelFile: null,
    files: [],
    width: '',
    length: '',
    tempFiles: null,
  });

  const { imageFile, modelFile, files } = state;

  const { mutateAsync: createProduct, isLoading } = useCreateProductMutation();

  const handleSubmit = async () => {
    if (categoryId === null) {
      enqueueSnackbar(t('project.category_id_null'), { variant: 'error' });
      return;
    }

    if (state.tempFiles && state.tempFiles.thumbnail && state.tempFiles.glb) {
      enqueueSnackbar(t('project.upload_both_files_to_list'), { variant: 'warning' });
      return;
    }

    const organizationId = organization?.ID || 0;

    const documents = state.files.map((file, index) => ({
      title: `${projectName}${index + 1}`,
      file_uri: typeof file.glb === 'string' ? file.glb : '',
      preview_uri: typeof file.thumbnail === 'string' ? file.thumbnail : '',
      asset_uri: typeof file.usdz === 'string' ? file.usdz : '',
      phone_number: '',
      cell_phone: '',
      website: '',
      telegram: '',
      instagram: '',
      linkedin: '',
      location: '',
      size: '',
      order: 1,
      size_mb: Math.ceil(file.size_mb), // اضافه کردن سایز فایل با دو رقم اعشار
      organization_id: organizationId,
    }));

    // console.log(documents, 'DOCUMENTS');

    const values = {
      name: projectName,
      thumbnail_uri: previewUri,
      category_id: categoryId,
      organization_id: organizationId,
      documents,
      disabled: false,
    };

    try {
      await createProduct(values);
      router.push(paths.project.project_submitted);
    } catch (error) {
      enqueueSnackbar(error.message || t('project.unexpected_error'), { variant: 'error' });
    }
  };

  const { mutateAsync: upload, isLoading: uploadLoading } = useUploadFileMutation();
  const { mutateAsync: uploadGlbToUsdz, isLoading: uploadGlbToUsdzLoading } =
    useUploadGlbToUsdzMutation();

  const handleDropRejected = useCallback(
    (err: { errors: { code: string }[] }[]) => {
      if (err[0].errors[0].code === 'file-too-large') {
        const errorTxt = t('project.file_size_15mb');
        enqueueSnackbar(errorTxt, { variant: 'error' });
      }
    },
    [enqueueSnackbar, t]
  );

  const handleDropRejectedImage = useCallback(
    (err: { errors: { code: string }[] }[]) => {
      if (err[0].errors[0].code === 'file-too-large') {
        const errorTxt = t('project.project_image_info3');
        enqueueSnackbar(errorTxt, { variant: 'error' });
      }
    },
    [enqueueSnackbar, t]
  );

  const setImageFile = useCallback(
    (newFile: File | string | null) => {
      let sizeInMB = 0;
      if (newFile && typeof newFile !== 'string') {
        sizeInMB = newFile.size / (1024 * 1024);
      }
      setState((draft) => {
        draft.imageFile = newFile;
        draft.tempFiles = {
          thumbnail: newFile,
          glb: null,
          usdz: null,
          size_mb: parseFloat(sizeInMB.toFixed(2)), // محاسبه سایز فایل با دو رقم اعشار
        };
      });
    },
    [setState]
  );

  const setModelFile = useCallback(
    (newFile: File | string | null) => {
      let sizeInMB = 0;
      if (newFile && typeof newFile !== 'string') {
        sizeInMB = newFile.size / (1024 * 1024);
      }
      setState((draft) => {
        draft.modelFile = newFile;
        if (draft.tempFiles) {
          draft.tempFiles.glb = newFile;
          draft.tempFiles.size_mb += parseFloat(sizeInMB.toFixed(2)); // محاسبه سایز فایل با دو رقم اعشار
          if (acceptedFileType === 'complex') {
            draft.tempFiles.usdz = newFile;
          }
        }
      });
    },
    [acceptedFileType, setState]
  );

  const handleDropImageFile = useCallback(
    async (acceptedFiles: File[]) => {
      if (files.length >= 10) {
        enqueueSnackbar(t('project.upload_limit_exceeded'), { variant: 'error' });
        return;
      }

      const newFile = acceptedFiles[0];

      if (newFile) {
        setImageFile(
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          })
        );

        try {
          const filesResult = await upload({ files: [newFile] });
          const uploadedFilePath =
            process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL_DOWNLOAD + filesResult.data[0];
          setState((draft) => {
            draft.tempFiles = {
              thumbnail: uploadedFilePath,
              glb: draft.tempFiles?.glb || null,
              usdz: draft.tempFiles?.usdz || null,
              size_mb: draft.tempFiles?.size_mb || 0,
            };
          });
        } catch (error) {
          enqueueSnackbar(error.data.company_logo[0], { variant: 'error' });
        }
      }
    },
    [enqueueSnackbar, setImageFile, setState, upload, files.length, t]
  );

  const handleDropModelFile = useCallback(
    async (acceptedFiles: File[]) => {
      if (files.length >= 10) {
        enqueueSnackbar(t('project.upload_limit_exceeded'), { variant: 'error' });
        return;
      }

      const newFile = acceptedFiles[0];
      const sizeInMB = newFile.size / (1024 * 1024);

      // console.log(newFile.size, sizeInMB, 'LLLLLLL');

      if (newFile) {
        setModelFile(
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          })
        );

        try {
          if (acceptedFileType === 'complex') {
            const filesResult = await uploadGlbToUsdz({ files: [newFile] });
            const uploadedGlbPath =
              process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL_DOWNLOAD + filesResult.data[0].glb;
            const uploadedUsdzPath =
              process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL_DOWNLOAD + filesResult.data[0].usdz;
            setState((draft) => {
              draft.tempFiles = {
                thumbnail: draft.tempFiles?.thumbnail || null,
                glb: uploadedGlbPath,
                usdz: uploadedUsdzPath,
                size_mb: (draft.tempFiles?.size_mb || 0) + parseFloat(sizeInMB.toFixed(2)), // محاسبه سایز فایل با دو رقم اعشار
              };
            });
          } else {
            const filesResult = await upload({ files: [newFile] });
            const uploadedGlbPath =
              process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL_DOWNLOAD + filesResult.data[0];
            setState((draft) => {
              draft.tempFiles = {
                thumbnail: draft.tempFiles?.thumbnail || null,
                glb: uploadedGlbPath,
                usdz: draft.tempFiles?.usdz || null,
                size_mb: (draft.tempFiles?.size_mb || 0) + parseFloat(sizeInMB.toFixed(2)), // محاسبه سایز فایل با دو رقم اعشار
              };
            });
          }
        } catch (error) {
          enqueueSnackbar(error.data.company_logo[0], { variant: 'error' });
        }
      }
    },
    [
      acceptedFileType,
      enqueueSnackbar,
      setModelFile,
      setState,
      upload,
      uploadGlbToUsdz,
      files.length,
      t,
    ]
  );

  const handleAddNewUpload = () => {
    if (files.length >= 10) {
      enqueueSnackbar(t('project.upload_limit_exceeded'), { variant: 'error' });
      return;
    }

    if (state.tempFiles && state.tempFiles.thumbnail && state.tempFiles.glb) {
      setState((draft) => {
        draft.files.push(draft.tempFiles!);
        draft.imageFile = null;
        draft.modelFile = null;
        draft.tempFiles = null;
      });
    } else {
      enqueueSnackbar(t('project.upload_both_files'), { variant: 'error' });
    }
  };

  const handleRemoveFile = (index: number) => {
    setState((draft) => {
      draft.files.splice(index, 1);
    });
  };

  useEffect(() => {
    if (!categoryId) {
      router.push(paths.project.choose_category);
    }
  }, [categoryId, router]);

  return (
    <Box maxWidth="lg">
      <CircleProgress open={isLoading || uploadLoading || uploadGlbToUsdzLoading} />

      <Grid container spacing={5}>
        <Grid xs={12} md={2} order={{ xs: 2, md: 1 }}>
          <Stack spacing={2} alignItems="center" mt={{ xs: 2, md: 13 }}>
            <IconButton
              sx={{
                width: 64,
                height: 64,
                borderRadius: 1,
                bgcolor: theme.palette.grey[200],
              }}
              onClick={handleAddNewUpload}
            >
              <Iconify icon="mdi:plus" width={32} height={32} color={theme.palette.primary.main} />
            </IconButton>

            <HideScrollbarBox>
              {files.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'relative',
                    width: 64,
                    height: 64,
                    borderRadius: 1,
                    '&:hover .remove-button': {
                      display: 'flex',
                    },
                    marginBottom: 2, // Add some space between the images
                  }}
                >
                  <img
                    src={
                      typeof item.thumbnail === 'string'
                        ? item.thumbnail
                        : (item.thumbnail as any).preview
                    }
                    alt="uploaded file"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <IconButton
                    onClick={() => handleRemoveFile(index)}
                    className="remove-button"
                    sx={{
                      display: 'none',
                      position: 'absolute',
                      top: -10,
                      right: -8,
                      bgcolor: theme.palette.grey[200],
                      '&:hover': {
                        bgcolor: theme.palette.grey[100],
                      },
                    }}
                  >
                    <Iconify icon="mdi:close" width={16} height={16} />
                  </IconButton>
                </Box>
              ))}
            </HideScrollbarBox>

            <Typography variant="body1" color="grey.500">
              {files.length} / 10
            </Typography>
          </Stack>
        </Grid>
        <Grid
          xs={12}
          md={9}
          order={{ xs: 1, md: 2 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Stack alignItems="center">
            <Typography align="center" variant="h5">
              {t('project.upload_file')}
            </Typography>
            <Typography
              color="text.disabled"
              variant="body2"
              sx={{ mt: 1, whiteSpace: 'break-spaces' }}
              align="center"
            >
              {t('project.showroom_description')}
            </Typography>
          </Stack>
          <Stack mt={3}>
            <Typography variant="subtitle2">{t('project.upload_product_thumbnail')}</Typography>
            <Upload
              maxSize={IMAGE_MEGABYTE}
              onDrop={handleDropImageFile}
              onDropRejected={handleDropRejectedImage}
              sx={{ mt: 1, width: theme.breakpoints.values.md, minHeight: 200 }}
              accept={{ 'image/*': [] }}
              file={imageFile}
              placeholderText={<CustomList list={project_image_info(t)} />}
            />
          </Stack>
          <Divider sx={{ my: 3, height: 2, width: '100%' }} />
          <Stack>
            <Typography variant="subtitle2">{t('project.upload_product_3d_file')}</Typography>
            <Upload
              maxSize={determineUploadSize(acceptedFileType)}
              onDrop={handleDropModelFile}
              onDropRejected={handleDropRejected}
              sx={{ mt: 1, width: theme.breakpoints.values.md, minHeight: 200 }}
              accept={getAcceptedFileTypes(acceptedFileType)}
              isFile={acceptedFileType === 'complex' || acceptedFileType === 'glb'}
              file={modelFile}
              placeholderText={<CustomList list={project_3d_info(t)} />}
            />
          </Stack>

          <Stack flexDirection="row" spacing={3} sx={{ mt: 5, width: theme.breakpoints.values.md }}>
            <Button
              fullWidth
              size="large"
              variant="outlined"
              startIcon={<Iconify icon="mdi:plus" />}
              onClick={handleAddNewUpload}
            >
              {t('project.add_another_file')}
            </Button>

            <LoadingButton
              fullWidth
              title={t('organization.continue')}
              loading={isLoading}
              onClick={handleSubmit}
              disabled={files.length === 0}
            />
          </Stack>
          <Stack alignItems="center" sx={{ mt: 3 }}>
            <BackButton title={t('organization.back')} onClick={() => router.back()} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ShowroomUploader;
