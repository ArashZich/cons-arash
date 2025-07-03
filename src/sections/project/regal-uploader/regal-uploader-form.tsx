/* eslint-disable prefer-destructuring */
/* eslint-disable no-nested-ternary */
// react
import { useCallback, useEffect, useMemo } from 'react';
// react-hook-form
import { useForm } from 'react-hook-form';
// yup
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

// redux
import { useSelector } from 'src/redux/store';
import {
  projectCategoryIdSelector,
  projectNameSelector,
  projectImageSelector,
} from 'src/redux/slices/project';
import { organizationSelector } from 'src/redux/slices/organization';

// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

// locales
import { useLocales } from 'src/locales';

// hook-form
import FormProvider, { RHFRadioGroup, RHFTextField, RHFUpload } from 'src/components/hook-form';

// components
import { BackButton, LoadingButton } from 'src/components/button';
import { useSnackbar } from 'src/components/snackbar';
import CircleProgress from 'src/components/modal-progress/circular-progress';
import CustomList from 'src/components/custom-list-info/custom-list';

// constants
import {
  REGAL_MAX_FILES,
  REGAL_MAX_SIZE_MB,
  project_image_regal,
  regal_size_options,
  regal_circle_size_options,
  regal_shape_options,
} from 'src/constants/project/regal-project';

// req-hooks
import { useCreateProductMutation } from 'src/_req-hooks/reality/product/useCreateProductMutation';
import { useUploadBatchImgToGlbUsdzMutation } from 'src/_req-hooks/bytebase/file/useUploadBatchImgToGlbUsdzMutation';

// types
import { CreateProductRequestBodyType } from 'src/_types/reality/product/createProduct';
import { BatchUploadResultItem } from 'src/_types/bytebase/uploadBatchImgToGlbUsdz';

// utils
import { getAcceptedFileTypes } from 'src/utils/get-accepted-file-types';

interface FormValues {
  size: string;
  files: File[];
  width: string;
  length: string;
  isCircle: boolean;
}

const defaultValues: FormValues = {
  size: '',
  files: [],
  width: '',
  length: '',
  isCircle: false,
};

function RegalUploaderForm() {
  const { t } = useLocales();

  // Validation Schema
  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        size: Yup.string().required(t('project.regal_size_required')),
        files: Yup.array()
          .min(1, t('project.regal_files_required'))
          .max(REGAL_MAX_FILES, t('project.regal_max_files_error')),
        width: Yup.string().when('size', ([size], innerSchema) =>
          size === '0' ? innerSchema.required(t('project.regal_width')) : innerSchema
        ),
        length: Yup.string().when(['size', 'isCircle'], ([size, isCircle], innerSchema) =>
          size === '0' && !isCircle ? innerSchema.required(t('project.regal_length')) : innerSchema
        ),
        isCircle: Yup.boolean(),
      }),
    [t]
  );

  const methods = useForm<FormValues>({
    resolver: yupResolver(validationSchema) as any,
    defaultValues,
  });

  const { handleSubmit, setValue, watch, trigger } = methods;
  const values = watch();

  // Redux selectors
  const organization = useSelector(organizationSelector);
  const categoryId = useSelector(projectCategoryIdSelector);
  const projectName = useSelector(projectNameSelector);
  const previewUri = useSelector(projectImageSelector);

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  // Mutations
  const { mutateAsync: createProduct, isLoading: isCreatingProduct } = useCreateProductMutation();
  const {
    mutateAsync: uploadBatchImages,
    data: uploadData,
    isLoading: isUploading,
    isSuccess: isUploadSuccess,
  } = useUploadBatchImgToGlbUsdzMutation();

  // Process uploaded results into single product with multiple documents
  const processUploadResults = (
    results: BatchUploadResultItem[],
    files: File[]
  ): CreateProductRequestBodyType => {
    const documents = results.map((result, index) => {
      const file = files[index];
      const sizeInMB = file.size / (1024 * 1024);

      // Extract name from filename
      const nameMatch = result.glb.match(/@(.+?)-\d+x\d+\.glb/);
      const documentTitle = nameMatch ? nameMatch[1] : `${projectName}_${index + 1}`;

      return {
        title: documentTitle,
        file_uri: process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL_DOWNLOAD + result.glb,
        preview_uri: process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL_DOWNLOAD + result.poster,
        asset_uri: process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL_DOWNLOAD + result.usdz,
        phone_number: '',
        cell_phone: '',
        website: '',
        telegram: '',
        instagram: '',
        linkedin: '',
        location: '',
        size: '',
        order: index + 1,
        size_mb: Math.ceil(sizeInMB),
        organization_id: organization?.ID as number,
      };
    });

    return {
      name: projectName,
      thumbnail_uri: previewUri,
      category_id: categoryId as number,
      organization_id: organization?.ID as number,
      documents,
      disabled: false,
    };
  };

  // Submit handler
  const onSubmit = handleSubmit(async (formValues) => {
    try {
      if (isUploadSuccess && uploadData?.data) {
        const productData = processUploadResults(uploadData.data, formValues.files);
        await createProduct(productData);
        router.push(paths.project.project_submitted);
      }
    } catch (error) {
      enqueueSnackbar(error?.message || t('project.unexpected_error'), { variant: 'error' });
    }
  });

  // File upload handler
  const handleDropMultiFile = useCallback(
    (acceptedFiles: File[]) => {
      const existingFiles = values.files || [];
      const totalFilesAfterAdd = existingFiles.length + acceptedFiles.length;

      if (totalFilesAfterAdd > REGAL_MAX_FILES) {
        enqueueSnackbar(t('project.regal_max_files_error'), { variant: 'error' });
        return;
      }

      const oversizedFiles = acceptedFiles.filter(
        (file) => file.size > REGAL_MAX_SIZE_MB * 1024 * 1024
      );
      if (oversizedFiles.length > 0) {
        enqueueSnackbar(t('project.project_image_size_1mb'), { variant: 'error' });
        return;
      }

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('files', [...existingFiles, ...newFiles], { shouldValidate: true });
    },
    [values.files, setValue, enqueueSnackbar, t]
  );

  // Upload files to backend
  const handleUploadFiles = async () => {
    try {
      // Validate form first
      const isValid = await trigger();
      if (!isValid) {
        enqueueSnackbar(t('project.required_fields'), { variant: 'error' });
        return;
      }

      let width: string;
      let length: string;

      if (values.size === '0') {
        width = values.width;
        length = values.isCircle ? values.width : values.length; // For circle, length = width (diameter)
      } else {
        // Fixed ESLint prefer-destructuring warning
        const sizeList = values.size.split(',');
        width = sizeList[0];
        length = sizeList[1] || sizeList[0]; // For circle predefined sizes
      }

      await uploadBatchImages({
        files: values.files,
        width,
        length,
        isCircle: values.isCircle,
        isTile: false,
        isWall: false,
      });

      enqueueSnackbar(t('project.regal_upload_success'), { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error?.message || t('project.unexpected_error'), { variant: 'error' });
    }
  };

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    if (!categoryId) {
      router.push(paths.project.choose_category);
    }
  }, [categoryId, router]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <CircleProgress open={isUploading} />

      <Stack alignItems="center" maxWidth="lg">
        <Typography variant="h5">{t('project.regal_title')}</Typography>
        <Typography mt={1} color="text.disabled" variant="body2">
          {t('project.regal_upload_description')}
        </Typography>

        {/* Shape Selection */}
        <Stack mt={2} mb={2}>
          <Typography color="text.disabled" variant="body2">
            {t('project.regal_choose_shape')}
          </Typography>

          <RHFRadioGroup
            row
            name="isCircle"
            options={regal_shape_options(t)}
            onChange={(e) => {
              const { value } = e.target;
              setValue('isCircle', value === 'true', { shouldValidate: true });
              // Reset size when shape changes
              setValue('size', '', { shouldValidate: true });
            }}
          />
          <Divider />
        </Stack>

        <Stack mt={1} alignItems="center" maxWidth="sm">
          <Typography color="text.disabled" variant="body2">
            {t('project.regal_choose_size')}
          </Typography>

          <RHFRadioGroup
            name="size"
            options={values.isCircle ? regal_circle_size_options(t) : regal_size_options(t)}
          />

          {values.size === '0' && (
            <Stack p={2} spacing={1} flexDirection="row" alignItems="center">
              <RHFTextField
                type="tel"
                sx={{ width: 120 }}
                size="small"
                name="width"
                label={values.isCircle ? t('project.diameter') : t('project.length')}
                InputProps={{ inputProps: { min: 0 } }}
                onChange={(e) => {
                  const { value } = e.target;
                  setValue('width', value === '' ? '' : value, { shouldValidate: true });
                }}
              />
              {!values.isCircle && (
                <>
                  <Typography>x</Typography>
                  <RHFTextField
                    type="tel"
                    sx={{ width: 120 }}
                    size="small"
                    name="length"
                    disabled={values.isCircle}
                    label={t('project.width')}
                    InputProps={{ inputProps: { min: 0 } }}
                    onChange={(e) => {
                      const { value } = e.target;
                      setValue('length', value === '' ? '' : value, { shouldValidate: true });
                    }}
                  />
                  <Typography>=</Typography>
                  {values.width && values.length && (
                    <Typography>
                      {parseInt(values.width, 10) * parseInt(values.length, 10)}
                      {t('project.cm')}
                    </Typography>
                  )}
                </>
              )}
            </Stack>
          )}

          <Typography align="center" variant="subtitle2" sx={{ mt: 3 }}>
            {t('project.regal_upload_title')}
          </Typography>

          <Typography variant="body2" color="text.disabled" sx={{ mb: 2 }}>
            {values.files.length} / {REGAL_MAX_FILES} {t('project.regal_files_selected')}
          </Typography>

          <RHFUpload
            multiple
            thumbnail
            name="files"
            accept={getAcceptedFileTypes('image')}
            onDrop={handleDropMultiFile}
            onRemove={(inputFile: File | any) => {
              setValue(
                'files',
                values.files.filter((file) => {
                  if (typeof file === 'string') return true;
                  return file.name !== inputFile.name || file.size !== inputFile.size;
                }),
                { shouldValidate: true }
              );
            }}
            onRemoveAll={() => setValue('files', [], { shouldValidate: true })}
            onUpload={handleUploadFiles}
            placeholderText={<CustomList list={project_image_regal(t)} />}
            sx={{ width: (theme) => theme.breakpoints.values.sm }}
          />

          <LoadingButton
            sx={{ mt: 3 }}
            fullWidth
            title={t('organization.continue')}
            loading={isCreatingProduct}
            disabled={!isUploadSuccess}
            type="submit"
          />

          <Stack alignItems="center" sx={{ mt: 3 }}>
            <BackButton title={t('organization.back')} onClick={handleBack} />
          </Stack>
        </Stack>
      </Stack>
    </FormProvider>
  );
}

export default RegalUploaderForm;
