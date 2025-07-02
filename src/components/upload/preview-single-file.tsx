// @mui
import Box from '@mui/material/Box';
//
import Image from '../image';

// ----------------------------------------------------------------------

type Props = {
  imgUrl?: string;
  imageObjectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
};

export default function SingleFilePreview({ imgUrl = '', imageObjectFit }: Props) {
  return (
    <Box
      sx={{
        p: 1,
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        position: 'absolute',
      }}
    >
      <Image
        alt="file preview"
        src={imgUrl}
        imageObjectFit={imageObjectFit}
        sx={{
          width: 1,
          height: 1,
          borderRadius: 1,
        }}
      />
    </Box>
  );
}
