type accepted_file_type = 'glb' | 'image' | 'video' | 'multi-images' | 'complex';

export type ProjectState = {
  projectCategoryName: string;
  projectCategoryId: number | null;
  projectName: string;
  projectImage: string;
  acceptedFileType: accepted_file_type;
};

export type ProjectCategoryNameChangedPayloadType = string;
export type ProjectCategoryIdChangedPayloadType = number;
export type ProjectNameChangedPayloadType = string;
export type ProjectImageChangedPayloadType = string;
export type acceptedFileTypeChangedPayloadType = accepted_file_type;
