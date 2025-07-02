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
import Button from '@mui/material/Button';

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
import Iconify from 'src/components/iconify';

// hooks
import { useBoolean } from 'src/hooks/use-boolean';

// constants
import {
  REGAL_MAX_FILES,
  REGAL_MAX_SIZE_MB,
  project_image_regal,
  regal_size_options,
} from 'src/constants/project/regal-project';

// req-hooks
import { useCreateProductMultipleMutation } from 'src/_req-hooks/reality/product/useCreateProductMultipleMutation';
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
}

const defaultValues: FormValues = {
  size: '',
  files: [],
  width: '',
  length: '',
};

function RegalUploaderForm() {
  const { t } = useLocales();
  const view = useBoolean();

  // Validation Schema
  const schema = useMemo(
    () =>
      Yup.object().shape({
        size: Yup.string().required(t('project.regal_size_required')),
        files: Yup.array()
          .min(1, t('project.regal_files_required'))
          .max(REGAL_MAX_FILES, t('project.regal_max_files_error')),
        width: Yup.string().when('size', ([size], schema) => {
          return size === '0' ? schema.required(t('project.regal_width')) : schema;
        }),
        length: Yup.string().when('size', ([size], schema) => {
          return size === '0' ? schema.required(t('project.regal_length')) : schema;
        }),
      }),
    [t]
  );

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema) as any,
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
  const { mutateAsync: createProductMultiple, isLoading: isCreatingProducts } =
    useCreateProductMultipleMutation();
  const {
    mutateAsync: uploadBatchImages,
    data: uploadData,
    isLoading: isUploading,
    isSuccess: isUploadSuccess,
  } = useUploadBatchImgToGlbUsdzMutation();

  // Process uploaded results into products
  const processUploadResults = (
    results: BatchUploadResultItem[],
    files: File[]
  ): CreateProductRequestBodyType[] => {
    return results.map((result, index) => {
      const file = files[index];
      const sizeInMB = file.size / (1024 * 1024);

      // Extract name from filename
      const nameMatch = result.glb.match(/@(.+?)-\d+x\d+\.glb/);
      const name = nameMatch ? nameMatch[1] : `${projectName}_${index + 1}`;

      return {
        name,
        thumbnail_uri: process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL_DOWNLOAD + result.poster,
        category_id: categoryId as number,
        organization_id: organization?.ID as number,
        documents: [
          {
            title: name,
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
            order: 1,
            size_mb: Math.ceil(sizeInMB),
            organization_id: organization?.ID as number,
          },
        ],
        disabled: false,
      };
    });
  };

  // Submit handler
  const onSubmit = handleSubmit(async (formValues) => {
    try {
      if (isUploadSuccess && uploadData?.data) {
        const products = processUploadResults(uploadData.data, formValues.files);
        await createProductMultiple(products);
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
        length = values.length;
      } else {
        const sizeList = values.size.split(',');
        width = sizeList[0];
        length = sizeList[1];
      }

      await uploadBatchImages({
        files: values.files,
        width,
        length,
        isCircle: false,
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

        <Stack mt={3} alignItems="center" maxWidth="sm">
          <Typography color="text.disabled" variant="body2">
            {t('project.regal_choose_size')}
          </Typography>

          <RHFRadioGroup name="size" options={regal_size_options(t)} />

          {values.size === '0' && (
            <Stack p={2} spacing={1} flexDirection="row" alignItems="center">
              <RHFTextField
                type="tel"
                sx={{ width: 120 }}
                size="small"
                name="width"
                label={t('project.regal_width')}
                InputProps={{ inputProps: { min: 0 } }}
              />
              <Typography>x</Typography>
              <RHFTextField
                type="tel"
                sx={{ width: 120 }}
                size="small"
                name="length"
                label={t('project.regal_length')}
                InputProps={{ inputProps: { min: 0 } }}
              />
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
            loading={isCreatingProducts}
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
