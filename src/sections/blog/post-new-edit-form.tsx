// yup
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// useImmer
import { useImmer } from 'use-immer';
// react
import { useCallback, useMemo, useEffect } from 'react';
// react-hook-form
import { useForm } from 'react-hook-form';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// constants
import { _tags } from 'src/constants';
// i18n
import { useLocales } from 'src/locales';
// req-hooks
import { useUploadFileMutation } from 'src/_req-hooks/bytebase/file/useUploadFileMutation';
import { useUpdatePostMutation } from 'src/_req-hooks/reality/post/useUpdatePostMutation';
import { useCreatePostMutation } from 'src/_req-hooks/reality/post/useCreatePostMutation';
// _types
import { PostData } from 'src/_types/reality/post/postData';
import { CreatePostRequestBodyType } from 'src/_types/reality/post/createPost';
// components
import CircleProgress from 'src/components/modal-progress/circular-progress';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFEditor, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import { Upload } from 'src/components/upload';
//
import PostDetailsPreview from './post-details-preview';

type CreatePostRequestBodySchema = {
  [K in keyof CreatePostRequestBodyType]: Yup.AnySchema;
};

const IMAGE_MEGABYTE = 1048576;

type Props = {
  currentPost?: PostData;
};

interface State {
  file: File | string | null;
}

export default function PostNewEditForm({ currentPost }: Props) {
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();
  const preview = useBoolean();
  const [state, setState] = useImmer<State>({
    file: null as File | string | null,
  });

  const NewBlogSchema = Yup.object().shape<CreatePostRequestBodySchema>({
    title: Yup.string().required(t('posts.title_required')),
    description: Yup.string(),
    content: Yup.string().required(t('posts.content_required')),
    cover_url: Yup.mixed().nullable().required(t('posts.cover_required')),
    tags: Yup.array()
      .min(2, t('posts.at_least_2_items'))
      .of(Yup.string())
      .required(t('posts.tags_required')),
    meta_keywords: Yup.array()
      .min(2, t('posts.at_least_2_items'))
      .of(Yup.string())
      .required(t('posts.meta_keywords_required')),
    meta_title: Yup.string(),
    meta_description: Yup.string(),
    published: Yup.bool(),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentPost?.title || '',
      description: currentPost?.description || '',
      content: currentPost?.content || '',
      cover_url: currentPost?.cover_url || null,
      tags: currentPost?.tags ? currentPost.tags.split(', ') : [],
      meta_keywords: currentPost?.meta_keywords ? currentPost.meta_keywords.split(', ') : [],
      meta_title: currentPost?.meta_title || '',
      meta_description: currentPost?.meta_description || '',
      published: currentPost?.published || false,
    }),
    [currentPost]
  );

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema) as any,
    defaultValues,
  });

  const {
    reset,
    watch,
    setError,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentPost) {
      reset(defaultValues);
      if (currentPost.cover_url) {
        setFile(currentPost.cover_url);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutateAsync: createPost } = useCreatePostMutation();
  const { mutateAsync: updatePost } = useUpdatePostMutation();
  const { mutateAsync: upload, isLoading: uploadLoading } = useUploadFileMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formattedData = {
        ...data,
        cover_url: data.cover_url || '', // Change null or undefined to an empty string
        tags: Array.isArray(data.tags) ? data.tags.join(', ') : data.tags,
        meta_keywords: Array.isArray(data.meta_keywords)
          ? data.meta_keywords.join(', ')
          : data.meta_keywords,
      };

      if (currentPost) {
        // Update post
        await updatePost({ post: formattedData, ID: currentPost.ID });
        enqueueSnackbar(t('posts.post_updated_success'), { variant: 'success' });
      } else {
        // Create new post
        await createPost(formattedData);
        enqueueSnackbar(t('posts.post_created_success'), { variant: 'success' });
      }

      reset();
      preview.onFalse();
      router.push(paths.dashboard.post.root);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(t('posts.post_error_save'), { variant: 'error' });
    }
  });

  const handleDropRejected = useCallback(
    (err: { errors: { code: string }[] }[]) => {
      if (err[0].errors[0].code === 'file-too-large') {
        enqueueSnackbar(t('organization.company_logo_size_1mb'), { variant: 'error' });
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
          'cover_url',
          process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL_DOWNLOAD + filesResult.data[0]
        );
      } catch (error) {
        setError('cover_url', { message: error.data.company_logo[0] });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={2}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            {t('posts.details')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('posts.details_description')}
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={10}>
        <Card>
          {!mdUp && <CardHeader title={t('posts.details')} />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="title" label={t('posts.post_title')} />

            <RHFTextField name="description" label={t('posts.description')} multiline rows={3} />

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">{t('posts.content')}</Typography>
              <RHFEditor simple name="content" />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">{t('posts.cover')}</Typography>
              <Upload
                maxSize={IMAGE_MEGABYTE}
                onDrop={handleDropSingleFile}
                onDropRejected={handleDropRejected}
                sx={{ mt: 1, width: (theme) => theme.breakpoints.values.md }}
                accept={{ 'image/*': [] }}
                file={state.file}
                placeholderText={t('project.project_image_info1')}
                helperText={
                  errors.cover_url && (
                    <Typography sx={{ pl: 2 }} variant="caption" color="error.main">
                      {errors.cover_url.message}
                    </Typography>
                  )
                }
              />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderProperties = (
    <>
      {mdUp && (
        <Grid md={2}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            {t('posts.properties')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('posts.properties_description')}
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={10}>
        <Card>
          {!mdUp && <CardHeader title={t('posts.properties')} />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFAutocomplete
              name="tags"
              label={t('posts.tags')}
              placeholder="+ Tags"
              multiple
              freeSolo
              options={_tags.map((option) => option)}
              getOptionLabel={(option) => option}
              renderOption={(props, option) => (
                <li {...props} key={option}>
                  {option}
                </li>
              )}
              renderTags={(selected, getTagProps) =>
                selected.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option}
                    label={option}
                    size="small"
                    color="info"
                    variant="soft"
                  />
                ))
              }
            />

            <RHFTextField name="meta_title" label={t('posts.meta_title')} />

            <RHFTextField
              name="meta_description"
              label={t('posts.meta_description')}
              fullWidth
              multiline
              rows={3}
            />

            <RHFAutocomplete
              name="meta_keywords"
              label={t('posts.meta_keywords')}
              placeholder="+ Keywords"
              multiple
              freeSolo
              disableCloseOnSelect
              options={_tags.map((option) => option)}
              getOptionLabel={(option) => option}
              renderOption={(props, option) => (
                <li {...props} key={option}>
                  {option}
                </li>
              )}
              renderTags={(selected, getTagProps) =>
                selected.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option}
                    label={option}
                    size="small"
                    color="info"
                    variant="soft"
                  />
                ))
              }
            />
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderActions = (
    <>
      {mdUp && <Grid md={2} />}
      <Grid xs={12} md={10} sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControlLabel
          control={<Switch />}
          label={t('posts.publish')}
          sx={{ flexGrow: 1, pl: 3 }}
          onChange={() => {
            setValue('published', !values.published);
          }}
        />

        <Button color="inherit" variant="outlined" size="large" onClick={preview.onTrue}>
          {t('posts.preview')}
        </Button>

        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          sx={{ ml: 2 }}
        >
          {!currentPost ? t('posts.create_post') : t('posts.save_changes')}
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <CircleProgress open={uploadLoading} />
        {renderDetails}
        {renderProperties}
        {renderActions}
      </Grid>

      <PostDetailsPreview
        title={values.title}
        content={values.content}
        description={values.description}
        coverUrl={values.cover_url || ''}
        open={preview.value}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={preview.onFalse}
        onSubmit={onSubmit}
      />
    </FormProvider>
  );
}
