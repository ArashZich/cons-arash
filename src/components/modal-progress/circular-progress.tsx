// @mui
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

// ----------------------------------------------------------------------

type CircleProps = {
  progress?: number;
  open: boolean;
  color?: 'inherit' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
};

export default function CircleProgress({ progress = 100, color = 'info', open }: CircleProps) {
  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
    >
      <DialogContent>
        <CircularProgress
          color={color}
          variant="indeterminate"
          value={progress}
          sx={{ mb: 2, width: 1, height: 10 }}
        />
      </DialogContent>
    </Dialog>
  );
}
