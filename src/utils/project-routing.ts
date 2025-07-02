import { paths } from 'src/routes/paths';

export const createProjectRouting = (category: string) => {
  switch (category) {
    case 'ar_3d':
    case '3d':
      return paths.project.create_showroom;
    case 'regal':
      return paths.project.project_information;
    default:
      return paths.project.create_project;
  }
};

export const createProjectInformationRouting = (category: string) => {
  switch (category) {
    case 'ar_3d':
    case '3d':
      return paths.project.create_showroom;
    case 'regal':
      return paths.project.regal_uploader;
    default:
      return paths.project.create_project;
  }
};
