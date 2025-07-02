type FileType = 'image' | 'multi-images' | 'complex' | 'glb' | 'video';

function getAcceptedFileTypes(fileType: FileType): { [key: string]: string[] } {
  switch (fileType) {
    case 'image':
    case 'multi-images':
      return { 'image/*': ['.png', '.jpg', '.jpeg'] };
    case 'complex':
    case 'glb':
      return { 'text/plain': ['.glb'] };
    case 'video':
      return { 'video/mp4': ['.mp4'] };
    default:
      throw new Error('Unsupported file type');
  }
}

export { getAcceptedFileTypes };
