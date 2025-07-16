/* eslint-disable no-nested-ternary */
// react
import { useCallback, useEffect, useMemo } from 'react';
// react-hook-form
import { useForm } from 'react-hook-form';

// yup
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// redux
import { useSelector } from 'src/redux/store';
import {
  acceptedFileTypeSelector,
  projectCategoryNameSelector,
  projectCategoryIdSelector,
} from 'src/redux/slices/project';
import { organizationSelector } from 'src/redux/slices/organization';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// locales
import { useLocales } from 'src/locales';
// hook-form
import FormProvider, { RHFRadioGroup, RHFTextField, RHFUpload } from 'src/components/hook-form';
// component
import { BackButton, LoadingButton } from 'src/components/button';
import { useSnackbar } from 'src/components/snackbar';
import CircleProgress from 'src/components/modal-progress/circular-progress';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// constants
import {
  project_image_carpet,
  createDecoroSphereValidationSchema,
  category_size,
  category_tiles,
  category_wall_or_flooring,
  carpet_shape,
} from 'src/constants/project';
// req-hooks
import { useCreateProductMultipleMutation } from 'src/_req-hooks/reality/product/useCreateProductMultipleMutation';
import { useUploadImgToGlbUsdzMutation } from 'src/_req-hooks/bytebase/file/useUploadImgToGlbUsdzMutation';
// utils
import { getAcceptedFileTypes } from 'src/utils/get-accepted-file-types';
// component
import CustomList from 'src/components/custom-list-info/custom-list';
import Iconify from 'src/components/iconify';
// utils
import { projectHasImage, projectHasDimensions } from 'src/utils/project-guide';
// _types
import { IState, FormValues } from 'src/_types/sections/project/decoro-sphere';

///
import DecoroGuide from './decoro-guide';

const MAX_FILES = 10;
const MAX_SIZE_MB = 1; // 1MB in bytes

const defaultValues: FormValues = {
  size: '',
  files: [],
  width: '',
  length: '',
  isCircle: false,
  isTile: false,
  numberOfVertical: '',
  numberOfHorizontal: '',
};

function DecoroSphereFrom() {
  const { t, isRtl } = useLocales();
  const schema = useMemo(() => createDecoroSphereValidationSchema(t), [t]);

  const view = useBoolean();

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema) as any,
    defaultValues,
  });

  const { handleSubmit, setValue, watch, trigger } = methods;

  const values = watch();

  const organization = useSelector(organizationSelector);
  const categoryName = useSelector(projectCategoryNameSelector);
  const acceptedFileType = useSelector(acceptedFileTypeSelector);
  const categoryId = useSelector(projectCategoryIdSelector);

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = {
    name: '',
    thumbnail_uri: '',
    category_id: categoryId as number,
    organization_id: organization?.ID as number,
    documents: [
      {
        title: '',
        file_uri: '',
        preview_uri: '',
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
  };

  const { mutateAsync: createProductMultiple, isLoading } = useCreateProductMultipleMutation();

  // Extract name and assign values function
  // eslint-disable-next-line arrow-body-style
  const processPresentation = (presentation: IState[], files: File[]) => {
    return presentation.map((item: any, index) => {
      const nameMatch = item.glb.match(/@(.+?)\.glb/);
      const name = nameMatch ? nameMatch[1] : ''; // Extract name

      const file = files[index];
      const sizeInMB = file.size / (1024 * 1024);

      return {
        ...initialValues,
        name,
        thumbnail_uri: process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL_DOWNLOAD + item.poster,
        documents: [
          {
            ...initialValues.documents[0],
            title: name,
            size_mb: Math.ceil(sizeInMB),
            file_uri: process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL_DOWNLOAD + item.glb,
            preview_uri: process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL_DOWNLOAD + item.poster,
            asset_uri: process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL_DOWNLOAD + item.usdz,
          },
        ],
      };
    });
  };

  const {
    mutateAsync: uploadImageToGlbToUsdz,
    data: dataUpload,
    isLoading: uploadImageToGlbToUsdzLoading,
    isSuccess,
  } = useUploadImgToGlbUsdzMutation();

  const onSubmit = handleSubmit(async (value) => {
    try {
      if (isSuccess) {
        const items = processPresentation(dataUpload?.data, value.files);

        await createProductMultiple(items);
        router.push(paths.project.project_submitted);
      }
    } catch (error) {
      enqueueSnackbar(error?.data, { variant: 'error' });
    }
  });

  const handleDropMultiFile = useCallback(
    (acceptedFiles: File[]) => {
      const existingFiles = values.files || [];
      const totalFilesAfterAdd = existingFiles.length + acceptedFiles.length;

      if (totalFilesAfterAdd > MAX_FILES) {
        enqueueSnackbar(t('project.maximum_10_photos_error'), {
          variant: 'error',
        });
        return;
      }

      const oversizedFiles = acceptedFiles.filter((file) => file.size > MAX_SIZE_MB * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        enqueueSnackbar(t('project.size_each_photo_must_1mb'), {
          variant: 'error',
        });
        return;
      }

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('files', [...existingFiles, ...newFiles], {
        shouldValidate: true,
      });
    },
    [values.files, setValue, enqueueSnackbar, t]
  );

  const handleBack = () => {
    router.back();
  };

  const handleUploadFiles = async () => {
    try {
      let width;
      let length;
      let tiles;

      if (values.size === '0') {
        const list: Array<keyof FormValues> = category_tiles(categoryName)
          ? ['size', 'width', 'length', 'numberOfHorizontal', 'numberOfVertical', 'files']
          : ['size', 'width', 'length', 'files'];
        const isValidationSuccessful = await trigger(list);

        if (!isValidationSuccessful) {
          enqueueSnackbar(t('project.required_fields'), { variant: 'error' });
          return; // Prevent further execution
        }
        width = values?.width;
        length = values?.length;
        tiles = values?.numberOfHorizontal
          ? `${values?.numberOfHorizontal}x${values?.numberOfVertical}`
          : '';
      } else {
        const sizeList = values.size.split(',');
        width = sizeList[0];
        length = sizeList[1];
        tiles = sizeList[2] || '';
      }

      await uploadImageToGlbToUsdz({
        files: values.files,
        width,
        length,
        isCircle: values.isCircle,
        isTile: values.isTile,
        tiles,
        isWall: category_wall_or_flooring(categoryName),
      });
    } catch (e) {
      enqueueSnackbar(e.message, { variant: 'error' });
    }
  };

  const handleGuide = () => {
    view.onToggle();
  };

  useEffect(() => {
    if (!categoryId) {
      router.push(paths.project.choose_category);
    }
  }, [categoryId, router]);

  useEffect(() => {
    setValue('isTile', category_tiles(categoryName));
  }, [categoryName, setValue]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <CircleProgress open={uploadImageToGlbToUsdzLoading} />

      <DecoroGuide
        category={categoryName}
        title={
          isRtl
            ? `${t('project.project_guide')} ${t(`category.${categoryName}`)}`
            : `${t(`category.${categoryName}`)} ${t('project.project_guide')}`
        }
        isOpen={view.value}
        onClick={handleGuide}
        hasImage={projectHasImage(categoryName)}
        hasDimensions={projectHasDimensions(categoryName)}
      />

      <Stack alignItems="center" maxWidth="lg">
        <Typography variant="h5">
          {isRtl
            ? `${t('project.information')} ${t(`category.${categoryName}`)}`
            : `${t(`category.${categoryName}`)} ${t('project.information')}`}
        </Typography>
        <Typography mt={1} color="text.disabled" variant="body2">
          {t('project.build_your_project_upload_photos')}
        </Typography>
        <Typography color="text.disabled" variant="body2">
          {t('project.maximum_10_photos')}
        </Typography>
        <Typography color="text.disabled" variant="body2">
          {t('project.selected_size_applied_all')}
        </Typography>

        {categoryName === 'carpet' && (
          <Stack mt={2} mb={2}>
            <Typography color="text.disabled" variant="body2">
              {t(`project.choose_carpet_shape`)}
            </Typography>

            <RHFRadioGroup
              row
              name="isCircle"
              options={carpet_shape(t)}
              onChange={(e) => {
                const { value } = e.target;
                setValue('isCircle', value === 'true', { shouldValidate: true });
                setValue('size', '', { shouldValidate: true });
              }}
            />
            <Divider />
          </Stack>
        )}

        <Stack mt={2} alignItems="center" maxWidth="sm">
          <Typography color="text.disabled" variant="body2">
            {t(`project.choose_${categoryName}_size`)}
          </Typography>

          <RHFRadioGroup name="size" options={category_size(categoryName, t, values.isCircle)} />

          {values.size === '0' && (
            <Stack p={2} spacing={1} flexDirection="row" alignItems="center">
              <RHFTextField
                type="tel"
                sx={{ width: 100 }}
                size="small"
                name="width"
                label={values.isCircle ? t('project.diameter') : t('project.length')}
                InputProps={{ inputProps: { min: 0 } }} // Prevent negative values
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
                    sx={{ width: 100 }}
                    size="small"
                    name="length"
                    disabled={values.isCircle}
                    label={t('project.width')}
                    InputProps={{ inputProps: { min: 0 } }} // Prevent negative values
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

          {values.size === '0' && category_tiles(categoryName) && (
            <Stack mt={3} alignItems="center">
              <Typography color="text.disabled" variant="body2">
                {t(`project.choose_how_put_${categoryName}`)}
              </Typography>
              <Stack p={2} spacing={1} flexDirection="row" alignItems="center">
                <RHFTextField
                  type="tel"
                  sx={{ width: 100 }}
                  size="small"
                  name="numberOfHorizontal"
                  label={t('project.horizontal')}
                  InputProps={{ inputProps: { min: 0 } }} // Prevent negative values
                  onChange={(e) => {
                    const { value } = e.target;
                    setValue('numberOfHorizontal', value === '' ? '' : value, {
                      shouldValidate: true,
                    });
                  }}
                />
                <Typography>x</Typography>
                <RHFTextField
                  type="tel"
                  sx={{ width: 100 }}
                  size="small"
                  name="numberOfVertical"
                  label={t('project.vertical')}
                  InputProps={{ inputProps: { min: 0 } }} // Prevent negative values
                  onChange={(e) => {
                    const { value } = e.target;
                    setValue('numberOfVertical', value === '' ? '' : value, {
                      shouldValidate: true,
                    });
                  }}
                />
              </Stack>
            </Stack>
          )}

          <Typography align="center" variant="subtitle2" sx={{ mt: 3 }}>
            {t('project.upload_file')}
          </Typography>

          <Stack mt={1} alignItems="center">
            <RHFUpload
              multiple
              thumbnail
              name="files"
              accept={getAcceptedFileTypes(acceptedFileType)}
              onDrop={handleDropMultiFile}
              onRemove={(inputFile: File | any) => {
                setValue(
                  'files',
                  values.files.filter((file) => {
                    if (typeof file === 'string') {
                      return true;
                    }
                    return file.name !== inputFile.name || file.size !== inputFile.size;
                  }),
                  { shouldValidate: true }
                );
              }}
              onRemoveAll={() => setValue('files', [], { shouldValidate: true })}
              onUpload={handleUploadFiles}
              placeholderText={<CustomList list={project_image_carpet(t)} />}
              sx={{ width: (theme) => theme.breakpoints.values.sm }}
            />

            <Button
              sx={{ mt: 5 }}
              endIcon={<Iconify icon="ic:outline-info" />}
              onClick={handleGuide}
            >
              {t('project.how_to')}
            </Button>

            <LoadingButton
              sx={{ mt: 5 }}
              fullWidth
              title={t('organization.continue')}
              loading={isLoading}
              disabled={!isSuccess}
              type="submit"
            />

            <Stack alignItems="center" sx={{ mt: 3 }}>
              <BackButton title={t('organization.back')} onClick={handleBack} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </FormProvider>
  );
}

export default DecoroSphereFrom;
