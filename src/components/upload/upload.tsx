/* eslint-disable @typescript-eslint/no-shadow */
import { useDropzone } from 'react-dropzone';
// immer
import { useImmer } from 'use-immer';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// assets
import { useCallback, useEffect } from 'react';
import { UploadIllustration } from 'src/assets/illustrations';
// i18n
import { useLocales } from 'src/locales';
//
import Iconify from '../iconify';
//
import { UploadProps } from './types';
import RejectionFiles from './errors-rejection-files';
import MultiFilePreview from './preview-multi-file';
import SingleFilePreview from './preview-single-file';

import { fileThumb, fileData, ExtendFile } from '../file-thumbnail';

// ----------------------------------------------------------------------
interface State {
  height: number;
  width: number;
}

export default function Upload({
  disabled,
  multiple = false,
  error,
  helperText,
  //
  file,
  onDelete,
  //
  files,
  thumbnail,
  onUpload,
  onRemove,
  onRemoveAll,
  sx,
  placeholderText,
  isFile,
  disableRejected,
  ...other
}: UploadProps) {
  const { t } = useLocales();
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple,
    disabled,
    maxFiles: multiple ? 10 : 1,
    ...other,
  });

  const [state, setState] = useImmer<State>({
    height: 0,
    width: 0,
  });

  const hasFile = !!file && !multiple;

  const hasFiles = !!files && multiple && !!files.length;

  const hasError = isDragReject || !!error;

  const defaultPlaceholder = (
    <Stack spacing={1} sx={{ textAlign: 'center' }}>
      <Typography variant="h6">{t('components.drop_select_file')}</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {t('components.drop_files_here')}
        <Box
          component="span"
          sx={{
            mx: 0.5,
            color: 'primary.main',
            textDecoration: 'underline',
          }}
        >
          {t('components.browse')}
        </Box>
        {t('components.through_your_machine')}
      </Typography>
    </Stack>
  );

  const text = placeholderText ?? defaultPlaceholder;

  const renderPlaceholder = (
    <Stack spacing={3} alignItems="center" justifyContent="center" flexWrap="wrap">
      <UploadIllustration sx={{ width: 1, maxWidth: 200 }} />
      {text}
    </Stack>
  );

  const loadImage = useCallback(
    (file: any) => {
      const image = new Image();
      image.src = file.preview;

      image.onload = () => {
        setState((draft) => {
          draft.height = image.height;
          draft.width = image.width;
        });
      };
    },
    [setState]
  );

  useEffect(() => {
    if (file) {
      loadImage(file);
    }
  }, [file, loadImage]);

  const renderSinglePreview =
    isFile && file ? (
      <Stack alignItems="center" justifyContent="center">
        <Box
          component="img"
          src={fileThumb(fileData(file as string | ExtendFile).type)}
          sx={{
            width: 128,
            height: 128,
            flexShrink: 0,
          }}
        />
        <Typography variant="body2" sx={{ mt: 1 }}>
          {typeof file === 'string' ? '' : `${file?.name}`}
        </Typography>
      </Stack>
    ) : (
      <SingleFilePreview
        imgUrl={typeof file === 'string' ? file : file?.preview}
        imageObjectFit={state.height > state.width ? 'contain' : 'cover'}
      />
    );

  const removeSinglePreview = hasFile && onDelete && (
    <IconButton
      size="small"
      onClick={onDelete}
      sx={{
        top: 16,
        right: 16,
        zIndex: 9,
        position: 'absolute',
        color: (theme) => alpha(theme.palette.common.white, 0.8),
        bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
        '&:hover': {
          bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
        },
      }}
    >
      <Iconify icon="mingcute:close-line" width={18} />
    </IconButton>
  );

  const renderMultiPreview = hasFiles && (
    <>
      <Box sx={{ my: 3 }}>
        <MultiFilePreview files={files} thumbnail={thumbnail} onRemove={onRemove} />
      </Box>

      <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
        {onRemoveAll && (
          <Button color="inherit" variant="outlined" size="small" onClick={onRemoveAll}>
            {t('components.remove_all')}
          </Button>
        )}

        {onUpload && (
          <Button
            size="small"
            variant="contained"
            onClick={onUpload}
            startIcon={<Iconify icon="eva:cloud-upload-fill" />}
          >
            {t('components.upload')}
          </Button>
        )}
      </Stack>
    </>
  );

  return (
    <Box sx={{ width: 1, position: 'relative', ...sx }}>
      <Box
        {...getRootProps()}
        sx={{
          p: 5,
          outline: 'none',
          borderRadius: 1,
          cursor: 'pointer',
          overflow: 'hidden',
          position: 'relative',
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
          border: (theme) => `1px dashed ${alpha(theme.palette.grey[500], 0.2)}`,
          transition: (theme) => theme.transitions.create(['opacity', 'padding']),
          '&:hover': {
            opacity: 0.72,
          },
          ...(isDragActive && {
            opacity: 0.72,
          }),
          ...(disabled && {
            opacity: 0.48,
            pointerEvents: 'none',
          }),
          ...(hasError && {
            color: 'error.main',
            borderColor: 'error.main',
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
          }),
          ...(hasFile && {
            padding: '24% 0',
          }),
        }}
      >
        <input {...getInputProps()} />

        {hasFile ? renderSinglePreview : renderPlaceholder}
      </Box>

      {removeSinglePreview}

      {helperText && helperText}

      {disableRejected && <RejectionFiles fileRejections={fileRejections} />}

      {renderMultiPreview}
    </Box>
  );
}
