import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import {
  ProjectState,
  ProjectCategoryNameChangedPayloadType,
  ProjectCategoryIdChangedPayloadType,
  ProjectNameChangedPayloadType,
  ProjectImageChangedPayloadType,
  acceptedFileTypeChangedPayloadType,
} from 'src/_types/redux/project';

const initialState: ProjectState = {
  projectCategoryName: '',
  projectCategoryId: null,
  projectName: '',
  projectImage: '',
  acceptedFileType: 'glb',
};

const organizationCategorySlice: Slice<ProjectState> = createSlice({
  name: 'project',
  initialState,
  reducers: {
    projectCategoryNameChanged: (
      state,
      action: PayloadAction<ProjectCategoryNameChangedPayloadType>
    ) => {
      state.projectCategoryName = action.payload;
    },
    projectCategoryIdChanged: (
      state,
      action: PayloadAction<ProjectCategoryIdChangedPayloadType>
    ) => {
      state.projectCategoryId = action.payload;
    },
    projectNameChanged: (state, action: PayloadAction<ProjectNameChangedPayloadType>) => {
      state.projectName = action.payload;
    },
    projectImageChanged: (state, action: PayloadAction<ProjectImageChangedPayloadType>) => {
      state.projectImage = action.payload;
    },
    acceptedFileTypeChanged: (state, action: PayloadAction<acceptedFileTypeChangedPayloadType>) => {
      state.acceptedFileType = action.payload;
    },
  },
});

export const projectCategoryNameSelector = (state: { project: ProjectState }) =>
  state.project.projectCategoryName;
export const projectCategoryIdSelector = (state: { project: ProjectState }) =>
  state.project.projectCategoryId;
export const projectNameSelector = (state: { project: ProjectState }) => state.project.projectName;
export const projectImageSelector = (state: { project: ProjectState }) =>
  state.project.projectImage;
export const acceptedFileTypeSelector = (state: { project: ProjectState }) =>
  state.project.acceptedFileType;

export const {
  projectCategoryNameChanged,
  projectCategoryIdChanged,
  projectNameChanged,
  projectImageChanged,
  acceptedFileTypeChanged,
} = organizationCategorySlice.actions;

export default organizationCategorySlice.reducer;
