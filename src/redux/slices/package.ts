import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PackageChangedPayloadType, PackageState } from 'src/_types/redux/package';

const initialState: PackageState = {
  package: null,
};

const packageCategorySlice = createSlice({
  name: 'package',
  initialState,
  reducers: {
    packageChanged: (state, action: PayloadAction<PackageChangedPayloadType>) => {
      state.package = action.payload;
    },
  },
});

export const packageSelector = (state: { package: PackageState }) => state.package.package;

export const { packageChanged } = packageCategorySlice.actions;

export default packageCategorySlice.reducer;
