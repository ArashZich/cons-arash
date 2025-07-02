const FILE_MEGABYTE: number = 15728640; // 15 MB for complex and glb
const IMAGE_MEGABYTE: number = 1048576; // 1 MB for image and multi-images
const VIDEO_MEGABYTE: number = 10485760; // 10 MB for video

type FileType = 'image' | 'multi-images' | 'complex' | 'glb' | 'video';

function determineUploadSize(fileType: FileType): number {
  switch (fileType) {
    case 'image':
    case 'multi-images':
      return IMAGE_MEGABYTE;
    case 'complex':
    case 'glb':
      return FILE_MEGABYTE;
    case 'video':
      return VIDEO_MEGABYTE;
    default:
      throw new Error('Unsupported file type');
  }
}

export { determineUploadSize };
