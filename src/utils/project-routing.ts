import { paths } from 'src/routes/paths';


export const createProjectRouting = (category:string) => {
    switch (category) {
        case "ar_3d":
        case "3d":
            return paths.project.create_showroom;
        default:
            return paths.project.create_project;
    }
}