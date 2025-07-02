// @mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// utils
import { fShortenNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------
interface Props {
  title: string;
  total: number | string;
}

export default function TotalRecommendation({ title, total, ...other }: Props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{title}</Typography>

        <Typography variant="h3">
          {typeof total === 'string' ? total : fShortenNumber(total)}
        </Typography>
      </Box>
    </Box>
  );
}
