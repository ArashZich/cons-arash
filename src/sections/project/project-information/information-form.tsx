// react
import { useCallback, useEffect } from 'react';

// yup
import * as Yup from 'yup';

// react-hook-form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// useImmer
import { useImmer } from 'use-immer';
// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// locales
import { useLocales } from 'src/locales';
// redux
import { dispatch, useSelector } from 'src/redux/store';
import {
  projectCategoryNameSelector,
  projectCategoryIdSelector,
  projectImageChanged,
  projectNameChanged,
} from 'src/redux/slices/project';
// component
import { Upload } from 'src/components/upload';
import { BackButton, LoadingButton } from 'src/components/button';
import { useSnackbar } from 'src/components/snackbar';
import CircleProgress from 'src/components/modal-progress/circular-progress';
import CustomList from 'src/components/custom-list-info/custom-list';
import Iconify from 'src/components/iconify';
// hook-form
import FormProvider, { RHFTextField } from 'src/components/hook-form';
// utils
import { projectHasImage, projectHasDimensions } from 'src/utils/project-guide';
import { createProjectRouting } from 'src/utils/project-routing';
// req-hooks
import { useUploadFileMutation } from 'src/_req-hooks/bytebase/file/useUploadFileMutation';

// constants
import { project_name_info, project_image_info } from 'src/constants/project';

///
import ProjectGuide from './project-guide';

type ProductRequestBodyTypeSchema = {
  name: string;
  thumbnail_uri: string;
};

type CreateProductRequestBodySchema = {
  [K in keyof ProductRequestBodyTypeSchema]: Yup.AnySchema;
};

const IMAGE_MEGABYTE = 1048576;

interface State {
  file: File | string | null;
}

function InformationForm() {
  const view = useBoolean();
  const { t, isRtl } = useLocales();
  const categoryName = useSelector(projectCategoryNameSelector);
  const categoryId = useSelector(projectCategoryIdSelector);
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useImmer<State>({
    file: null as File | string | null,
  });

  const handleGuide = () => {
    view.onToggle();
  };

  const { file } = state;

  const router = useRouter();

  const ProductSchema = Yup.object().shape<CreateProductRequestBodySchema>({
    name: Yup.string()
      .required(t('project.project_is_required'))
      .matches(/^[a-zA-Z][a-zA-Z0-9-]*$/, {
        message: t('project.project_name_condition_1'),
      })
      .matches(/^[^_\s.()/:;-]+$/, {
        message: t('project.choose_name_description2'),
      }),
    thumbnail_uri: Yup.string().required(t('project.project_image_required')),
  });

  const defaultValues = {
    name: '',
    thumbnail_uri: '',
  } satisfies ProductRequestBodyTypeSchema;

  const methods = useForm({
    resolver: yupResolver(ProductSchema) as any,
    defaultValues,
  });

  const {
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
    // reset,
  } = methods;

  const onSubmit = handleSubmit(async (values) => {
    dispatch(projectNameChanged(values.name));
    dispatch(projectImageChanged(values.thumbnail_uri));
    router.push(createProjectRouting(categoryName));
  });

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    if (!categoryId) {
      router.push(paths.project.choose_category);
    }
  }, [categoryId, router]);

  const { mutateAsync: upload, isLoading: uploadLoading } = useUploadFileMutation();

  const handleDropRejected = useCallback(
    (err: { errors: { code: string }[] }[]) => {
      if (err[0].errors[0].code === 'file-too-large') {
        enqueueSnackbar(t('project.project_image_size_1mb'), { variant: 'error' });
      }
    },
    [enqueueSnackbar, t]
  );

  const setFile = (newFile: File | string | null) => {
    setState((draft) => {
      draft.file = newFile;
    });
  };

  const handleDropSingleFile = useCallback(async (acceptedFiles: File[]) => {
    const newFile = acceptedFiles[0];
    if (newFile) {
      setFile(
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        })
      );

      try {
        const filesResult = await upload({ files: [newFile] });

        setValue(
          'thumbnail_uri',
          process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL_DOWNLOAD + filesResult.data[0]
        );
      } catch (error) {
        setError('thumbnail_uri', { message: error.data.company_logo[0] });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <ProjectGuide
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

        <Stack mt={3} alignItems="center" maxWidth="sm">
          <RHFTextField name="name" label={t('project.project_name')} />
          <CustomList list={project_name_info(t)} />

          <Typography
            sx={{
              mt: 3,
              mb: 1,
            }}
            variant="subtitle2"
          >
            {categoryName === 'video'
              ? t('project.upload_marker')
              : t('project.upload_product_photo')}
          </Typography>
          {categoryName === 'video' && (
            <Typography
              sx={{
                mb: 1,
              }}
              variant="caption"
              color="text.disabled"
              align="center"
            >
              {t('project.marker_description')}
            </Typography>
          )}
          <CircleProgress open={uploadLoading} />

          <Upload
            maxSize={IMAGE_MEGABYTE}
            onDrop={handleDropSingleFile}
            onDropRejected={handleDropRejected}
            sx={{ mt: 1, width: (theme) => theme.breakpoints.values.md }}
            accept={{ 'image/*': [] }}
            file={file}
            placeholderText={<CustomList list={project_image_info(t)} />}
            helperText={
              errors.thumbnail_uri && (
                <Typography sx={{ pl: 2 }} variant="caption" color="error.main">
                  {errors.thumbnail_uri.message}
                </Typography>
              )
            }
          />

          <Button sx={{ mt: 5 }} endIcon={<Iconify icon="ic:outline-info" />} onClick={handleGuide}>
            {t('project.how_to')}
          </Button>

          <LoadingButton
            sx={{ mt: 5, width: 400 }}
            title={t('project.continue')}
            loading={isSubmitting}
          />

          <Stack alignItems="center" sx={{ mt: 3 }}>
            <BackButton title={t('project.back')} onClick={handleBack} />
          </Stack>
        </Stack>
      </Stack>
    </FormProvider>
  );
}

export default InformationForm;
