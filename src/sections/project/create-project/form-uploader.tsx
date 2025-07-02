/* eslint-disable no-nested-ternary */
// yup
import * as Yup from 'yup';
// react
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';

// useImmer
import { useImmer } from 'use-immer';
// redux
import { useSelector } from 'src/redux/store';
import {
  acceptedFileTypeSelector,
  projectCategoryNameSelector,
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

// component
import { Upload } from 'src/components/upload';
import { BackButton, LoadingButton } from 'src/components/button';
import { useSnackbar } from 'src/components/snackbar';
import CircleProgress from 'src/components/modal-progress/circular-progress';

// hook-form
import FormProvider, { RHFTextField } from 'src/components/hook-form';
// constants
import {
  project_3d_info,
  project_image_earrings,
  project_image_necklace,
  project_video_info,
} from 'src/constants/project';

// req-hooks
import { useCreateProductMutation } from 'src/_req-hooks/reality/product/useCreateProductMutation';
import { useUploadFileMutation } from 'src/_req-hooks/bytebase/file/useUploadFileMutation';
import { useUploadGlbToUsdzMutation } from 'src/_req-hooks/bytebase/file/useUploadGlbToUsdzMutation';
import { useUploadMp4ToMp4Mutation } from 'src/_req-hooks/bytebase/file/useUploadMp4ToMp4Mutation';
import { useCompileImageTargetsMutation } from 'src/_req-hooks/mind-builder/useCompileImageTargetsMutation';
// types
import { CreateProductRequestBodyType } from 'src/_types/reality/product/createProduct';

// utils
import { VideoFormBuilder } from 'src/utils/video-form-builder';
import { determineUploadSize } from 'src/utils/determine-upload-size';
import { getAcceptedFileTypes } from 'src/utils/get-accepted-file-types';
// component
import CustomList from 'src/components/custom-list-info/custom-list';

type CreateProductRequestBodySchema = {
  [K in keyof CreateProductRequestBodyType]: Yup.AnySchema;
};

interface State {
  file: File | string | null;
  width: string;
  length: string;
}

function FormUploader() {
  const { t } = useLocales();
  const organization = useSelector(organizationSelector);
  const categoryName = useSelector(projectCategoryNameSelector);
  const projectName = useSelector(projectNameSelector);
  const previewUri = useSelector(projectImageSelector);
  const acceptedFileType = useSelector(acceptedFileTypeSelector);
  const categoryId = useSelector(projectCategoryIdSelector);

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [state, setState] = useImmer<State>({
    file: null as File | string | null,
    width: '',
    length: '',
  });

  const { file, width, length } = state;

  const setWidth = (newWidth: string) => {
    setState((draft) => {
      draft.width = newWidth;
    });
  };

  const setLength = (newLength: string) => {
    setState((draft) => {
      draft.length = newLength;
    });
  };

  const linkedinValidation = Yup.string()
    .nullable() // اجازه می‌دهد مقدار فیلد null باشد
    .notRequired() // اجازه می‌دهد فیلد اختیاری باشد
    .matches(
      /^(https:\/\/www\.linkedin\.com\/(company|in)\/[A-Za-z0-9-_]+)?$/, // ؟$ باعث می‌شود رشته خالی نیز معتبر باشد
      t('project.linkedIn_message')
    );

  const CreateProjectSchema = Yup.object().shape<CreateProductRequestBodySchema>({
    name: Yup.string().required(t('project.project_is_required')),
    thumbnail_uri: Yup.string().required(t('project.project_image_required')),
    category_id: Yup.number().required(),
    organization_id: Yup.number().required(),
    documents: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required(t('project.project_is_required')),
        file_uri: Yup.string().required(t('project.file_required')),
        preview_uri: Yup.string().required(t('project.project_image_required')),
        asset_uri: Yup.string(),
        phone_number: Yup.string(),
        cell_phone: Yup.string(),
        website: Yup.string(),
        telegram: Yup.string(),
        instagram: Yup.string(),
        linkedin: linkedinValidation,
        location: Yup.string(),
        size: Yup.string(),
        order: Yup.number(),
        size_mb: Yup.number().required(),
      })
    ),
    disabled: Yup.boolean(),
  });

  const defaultValues = {
    name: projectName as string,
    thumbnail_uri: previewUri as string,
    category_id: categoryId as number,
    organization_id: organization?.ID as number,
    documents: [
      {
        title: projectName as string,
        file_uri: '',
        preview_uri: previewUri as string,
        asset_uri: '',
        phone_number: '',
        cell_phone: '',
        website: '',
        telegram: '',
        instagram: '',
        linkedin: '',
        location: '',
        size: '',
        order: 1,
        size_mb: 0,
        organization_id: organization?.ID as number,
      },
    ],
    disabled: false,
  } satisfies CreateProductRequestBodyType;

  const methods = useForm({
    resolver: yupResolver(CreateProjectSchema) as any,
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = methods;

  const { mutateAsync: createProduct, isLoading } = useCreateProductMutation();
  const { mutateAsync: uploadMp4ToMp4, isLoading: uploadMp4ToMp4Loading } =
    useUploadMp4ToMp4Mutation();

  const { mutate: compileImageTargets, isLoading: compileImageTargetsLoading } =
    useCompileImageTargetsMutation();

  const onSubmit = handleSubmit(async (values) => {
    // انتقال مقدار survey به location و حذف survey
    const updatedValues = {
      ...values,
      documents: values.documents.map((doc: any) => {
        // استفاده از any برای دور زدن تایپ اسکریپت
        if (doc.survey) {
          doc.location = doc.survey; // انتقال مقدار survey به location
          delete doc.survey; // حذف مقدار survey
        }
        return doc;
      }),
    };

    try {
      if (categoryName === 'earrings' || categoryName === 'necklace') {
        if (width === '' || length === '') {
          enqueueSnackbar(t('project.project_width_length_required'), { variant: 'error' });
          return;
        }
        const updatedEarringsOrNecklaceValues = {
          ...updatedValues,
          documents: [
            {
              ...updatedValues.documents[0],
              asset_uri: `${width}x${length}`,
            },
          ],
        };

        createProduct(updatedEarringsOrNecklaceValues).then(() => {
          router.push(paths.project.project_submitted);
        });
      } else if (acceptedFileType === 'video') {
        compileImageTargets(
          { imageUrl: previewUri },
          {
            onSuccess: (data) => {
              if (data && data.fileUrl) {
                const updatedVideoValues = {
                  ...updatedValues,
                  documents: [
                    {
                      ...updatedValues.documents[0],
                      asset_uri: data.fileUrl,
                    },
                  ],
                };

                createProduct(updatedVideoValues).then(() => {
                  router.push(paths.project.project_submitted);
                });
              } else {
                throw new Error('Failed to compile image targets or no file URL returned.');
              }
            },
            onError: (error) => {
              enqueueSnackbar(error?.data || 'An error occurred', { variant: 'error' });
            },
          }
        );
      } else {
        await createProduct(updatedValues);
        router.push(paths.project.project_submitted);
      }
    } catch (error) {
      enqueueSnackbar(error?.data || 'An unexpected error occurred', { variant: 'error' });
    }
  });

  const { mutateAsync: upload, isLoading: uploadLoading } = useUploadFileMutation();
  const { mutateAsync: uploadGlbToUsdz, isLoading: uploadGlbToUsdzLoading } =
    useUploadGlbToUsdzMutation();

  const handleDropRejected = useCallback(
    (err: { errors: { code: string }[] }[]) => {
      if (err[0].errors[0].code === 'file-too-large') {
        const errorTxt =
          acceptedFileType === 'image'
            ? t('project.project_image_size_1mb')
            : acceptedFileType === 'video'
            ? t('project.file_must_less_than_10mb')
            : t('project.file_size_15mb');
        enqueueSnackbar(errorTxt, { variant: 'error' });
      }
    },
    [enqueueSnackbar, acceptedFileType, t]
  );

  const setFile = (newFile: File | string | null) => {
    setState((draft) => {
      draft.file = newFile;
    });
  };

  const handleDropSingleFile = useCallback(async (acceptedFiles: File[]) => {
    const newFile = acceptedFiles[0];
    const sizeInMB = newFile.size / (1024 * 1024);
    const fileName = newFile.name.toLowerCase();
    const isGLB = fileName.endsWith('.glb');

    if (newFile) {
      setFile(
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        })
      );

      try {
        if (acceptedFileType === 'complex') {
          const optimize = sizeInMB >= 4;
          const filesResult = await uploadGlbToUsdz({ files: [newFile], optimize });
          setValue(`documents[0].size_mb` as any, Math.ceil(sizeInMB));
          setValue(
            `documents[0].file_uri` as any,
            process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL_DOWNLOAD + filesResult.data[0].glb
          );
          setValue(
            `documents[0].asset_uri` as any,
            process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL_DOWNLOAD + filesResult.data[0].usdz
          );
        } else if (acceptedFileType === 'video') {
          const filesResult = await uploadMp4ToMp4({ files: [newFile] });
          setValue(
            `documents[0].file_uri` as any,
            process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL_VIDEO + filesResult.data[0]
          );
          setValue(`documents[0].size_mb` as any, Math.ceil(sizeInMB));
        } else {
          let optimize = false;
          // const noOptimizeCategories = ['watch', 'bracelet', 'ring', 'glasses'];

          // if (!noOptimizeCategories.includes(categoryName) && isGLB) {
          //   optimize = sizeInMB > 4;
          // }

          if (isGLB) {
            optimize = sizeInMB >= 4;
          }

          const filesResult = await upload({ files: [newFile], optimize });
          setValue(
            `documents[0].file_uri` as any,
            process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL_DOWNLOAD + filesResult.data[0]
          );
          setValue(`documents[0].size_mb` as any, Math.ceil(sizeInMB));
        }
      } catch (error) {
        setError(`documents[0].file_uri` as any, { message: error?.data || 'Error occurred' });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = () => {
    router.back();
  };

  const imageList2D =
    categoryName === 'necklace' ? project_image_necklace(t) : project_image_earrings(t);

  useEffect(() => {
    if (!categoryId) {
      router.push(paths.project.choose_category);
    }
  }, [categoryId, router]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {(categoryName === 'earrings' ||
        categoryName === 'necklace' ||
        categoryName === 'bow_tie') && (
        <Stack alignItems="center" maxWidth="lg">
          <Typography color="text.disabled" variant="body2">
            {t(`project.choose_image_size`)}
          </Typography>
          <Stack p={2} spacing={1} flexDirection="row" alignItems="center" justifyContent="center">
            <TextField
              type="tel"
              sx={{ width: 100 }}
              size="small"
              name="width"
              label={t('project.length')}
              value={width}
              InputProps={{ inputProps: { min: 0 } }}
              onChange={(e) => setWidth(e.target.value)}
            />
            <Typography>x</Typography>
            <TextField
              type="tel"
              sx={{ width: 100 }}
              size="small"
              name="length"
              label={t('project.width')}
              value={length}
              InputProps={{ inputProps: { min: 0 } }}
              onChange={(e) => setLength(e.target.value)}
            />
          </Stack>
        </Stack>
      )}
      <Grid container justifyContent="center" alignItems="center" spacing={5}>
        <Grid
          sx={{
            px: {
              xs: 5,
            },
          }}
          md={6}
        >
          <CircleProgress
            open={
              uploadLoading ||
              uploadGlbToUsdzLoading ||
              uploadMp4ToMp4Loading ||
              compileImageTargetsLoading
            }
          />
          {acceptedFileType === 'video' && (
            <Box maxWidth="sm">
              {React.Children.toArray(
                VideoFormBuilder.map((itm) => (
                  <RHFTextField
                    sx={{ mb: 2 }}
                    fullWidth
                    name={`documents[0].${itm.value}`}
                    label={t(`project.${itm.value}`)}
                    placeholder={itm.placeholder}
                    style={{ direction: 'ltr' }}
                  />
                ))
              )}
            </Box>
          )}
        </Grid>

        <Grid>
          <Typography align="center" variant="h5">
            {acceptedFileType === 'video' ? t('project.upload_video') : t('project.upload_file')}
          </Typography>
          <Typography
            color="text.disabled"
            variant="body2"
            sx={{ mt: 1, whiteSpace: 'break-spaces' }}
            align="center"
          >
            {acceptedFileType === 'image'
              ? t('project.project_image_info')
              : acceptedFileType === 'video'
              ? t('project.start_project_upload_video_file')
              : t('project.project_3d_info')}
          </Typography>

          <Stack mt={3} alignItems="center">
            <Upload
              maxSize={determineUploadSize(acceptedFileType)}
              onDrop={handleDropSingleFile}
              onDropRejected={handleDropRejected}
              sx={{ mt: 1, width: (theme) => theme.breakpoints.values.md }}
              accept={getAcceptedFileTypes(acceptedFileType)}
              isFile={acceptedFileType === 'complex' || acceptedFileType === 'glb'}
              file={file}
              placeholderText={
                acceptedFileType === 'image' ? (
                  <CustomList list={imageList2D} />
                ) : acceptedFileType === 'video' ? (
                  <CustomList list={project_video_info(t)} />
                ) : (
                  <CustomList list={project_3d_info(t)} />
                )
              }
              helperText={
                errors.documents &&
                errors.documents[0]?.file_uri && (
                  <Typography sx={{ pl: 2 }} variant="caption" color="error.main">
                    {errors.documents[0]?.file_uri?.message}
                  </Typography>
                )
              }
            />

            <LoadingButton
              sx={{ mt: 5, width: 400 }}
              fullWidth
              title={t('organization.continue')}
              loading={isLoading}
            />

            <Stack alignItems="center" sx={{ mt: 3 }}>
              <BackButton title={t('organization.back')} onClick={handleBack} />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

export default FormUploader;
