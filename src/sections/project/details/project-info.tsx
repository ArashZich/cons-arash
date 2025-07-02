// react
import React, { useCallback, useRef } from 'react';
// @mui
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// qr code
import { QRCodeSVG } from 'qrcode.react';

// hooks
import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';
// locales
import { useLocales } from 'src/locales';
// routes
import { useRouter } from 'src/routes/hooks';
// components
import { useSnackbar } from 'src/components/snackbar';
import { BackButton } from 'src/components/button';
import Iconify from 'src/components/button/iconify-button';
// redux
import { useSelector } from 'src/redux/store';
import { organizationSelector } from 'src/redux/slices/organization';

// _types
import { ProductData } from 'src/_types/reality/product/productData';
// utils
import uuidv4 from 'src/utils/uuidv4';

type ProjectDetailsProps = {
  project?: ProductData | undefined;
  handleClickInsight: (id: string | null) => void;
};

export default function ProjectInfo({ project, handleClickInsight }: ProjectDetailsProps) {
  const { copy } = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();
  const organization = useSelector(organizationSelector);
  const qrRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { t } = useLocales();
  const matches = useMediaQuery('(max-width:300px)');
  const handleBack = () => {
    router.back();
  };

  // const getDynamicLink = useCallback(
  //   (UID: string) => {
  //     const specialCategories = new Set(['watch', 'bracelet', 'ring', 'glasses', 'shoes', 'hat']);
  //     const categoryTitle = project?.category?.title?.toLowerCase() || ''; // Add a default fallback value
  //     return specialCategories.has(categoryTitle)
  //       ? `https://webar.armogroup.tech/${UID}`
  //       : `${project?.category.url}/${UID}`;
  //   },
  //   [project?.category?.url, project?.category?.title]
  // );

  const getDynamicLink = useCallback(
    (UID: string) => {
      const specialCategories = new Set(['watch', 'bracelet', 'ring', 'shoes', 'hat']);
      const baseURL = organization?.domain
        ? `https://${organization?.domain}`
        : project?.category.url;
      return specialCategories.has(project?.category?.title?.toLowerCase() ?? '')
        ? `https://webar.armogroup.tech/${UID}`
        : `${baseURL}/${UID}`;
    },
    [organization?.domain, project?.category?.url, project?.category?.title]
  );

  const handleCopyLink = useCallback(
    (product_uid: string) => {
      const dynamicLink = getDynamicLink(product_uid);

      // Check if dynamicLink is a string before copying
      if (dynamicLink) {
        copy(dynamicLink);
      }

      // Show a snackbar regardless of the result
      enqueueSnackbar(t('project.copied'), { variant: 'info' });
    },
    [copy, enqueueSnackbar, getDynamicLink, t]
  );

  const downloadQRCode = () => {
    if (!qrRef.current) return;

    const svgElement = qrRef.current.querySelector('svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    // Scale factors
    const scaleFactor = 3; // Adjust this factor to scale the image up
    const svgSize = svgElement.getBoundingClientRect();

    // Scale the canvas size
    canvas.width = svgSize.width * scaleFactor;
    canvas.height = svgSize.height * scaleFactor;

    img.onload = () => {
      if (ctx) {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Scale the drawing context
        ctx.scale(scaleFactor, scaleFactor);
        ctx.drawImage(img, 0, 0);
        // Reset the transform to avoid affecting subsequent operations
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        const pngFile = canvas.toDataURL('image/png', 1.0); // Set quality to 1.0 for maximum quality

        const downloadLink = document.createElement('a');
        downloadLink.href = pngFile;
        downloadLink.download = `${uuidv4()}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    };

    img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`;
  };

  return (
    <Stack spacing={2} sx={{ flexWrap: 'wrap' }}>
      <Stack spacing={2} alignItems={matches ? 'center' : 'flex-start'}>
        <BackButton title={t('project.back')} onClick={handleBack} sx={{ maxWidth: 75 }} />
        <Typography variant="h4">{project?.name}</Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Stack direction="row" spacing={0.5}>
            <Typography variant="body2" color="text.disabled">
              {project?.view_count}
            </Typography>
            <Typography variant="body2" color="text.disabled">
              {t('project.views')}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button
            disabled={project?.view_count === 0}
            variant="outlined"
            startIcon={<Iconify icon="eva:trending-up-fill" />}
            onClick={() => handleClickInsight(project?.product_uid || '')}
          >
            {t('project.view_insights')}
          </Button>
          {/* <Button variant="outlined" sx={{ minWidth: 30 }}>
            <Iconify icon="eva:more-horizontal-fill" />
          </Button> */}
        </Stack>
      </Stack>
      <Stack spacing={3} alignItems={matches ? 'center' : 'flex-start'}>
        <Divider variant="fullWidth" sx={{ borderBottomStyle: 'dashed' }} />

        <Stack spacing={2} alignItems={matches ? 'center' : 'flex-start'}>
          <Typography variant="h5">{t('project.download_&_embed')}</Typography>
          <Typography variant="body2">{t('project.publish_your_ar')}</Typography>
        </Stack>
        <div ref={qrRef}>
          <QRCodeSVG value={getDynamicLink(project?.product_uid || '')} />
        </div>
        <Grid container spacing={2}>
          <Grid>
            <Button
              variant="contained"
              startIcon={<Iconify icon="ic:baseline-content-copy" />}
              onClick={() => handleCopyLink(project?.product_uid as string)}
            >
              {t('project.copy_link')}
            </Button>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              startIcon={<Iconify icon="ic:baseline-download" />}
              onClick={downloadQRCode}
            >
              {t('project.download_qr')}
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
}
