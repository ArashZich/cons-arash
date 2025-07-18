// @mui
import { Theme, SxProps } from '@mui/material/styles';
import Button from '@mui/material/Button';
// routes
import { RouterLink } from 'src/routes/components';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
  title?: string;
};

export default function LoginButton({ sx, title }: Props) {
  return (
    <Button
      component={RouterLink}
      href={PATH_AFTER_LOGIN}
      variant="outlined"
      color="secondary"
      sx={{ mr: 1, ...sx }}
    >
      {title}
    </Button>
  );
}
