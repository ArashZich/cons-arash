// @mui
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
// components
import Iconify from 'src/components/iconify';

// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// ----------------------------------------------------------------------

export default function SettingsButton() {
  const router = useRouter();
  const handleClick = () => {
    router.push(paths.setting.root);
  };

  return (
    <Box>
      <IconButton
        aria-label="settings"
        onClick={handleClick}
        sx={{
          width: 40,
          height: 40,
        }}
      >
        <Iconify icon="mdi:cog-outline" width={24} />
      </IconButton>
    </Box>
  );
}
