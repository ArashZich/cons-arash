// @mui
import Box from '@mui/material/Box';
//
import Typography from '@mui/material/Typography';
// locales
import { useLocales } from 'src/locales';
import Image from '../image';

// ----------------------------------------------------------------------

export default function IconFilePreview() {
  const { t } = useLocales();

  return (
    <Box
      sx={{
        p: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Image alt="file preview" src="/assets/icons/files/ic_zip.svg" />
      <Typography sx={{ mt: 1 }} variant="h5">
        {t('project.file_uploaded')}
      </Typography>
    </Box>
  );
}
