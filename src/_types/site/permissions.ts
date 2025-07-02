export type GetVaultPermissionsResponseDataType = {
  statusCode: number;
  data: {
    CanAccessInvite: boolean;
    CanAccessUser: boolean;
  };
};

export type GetCookBookPermissionsResponseDataType = {
  statusCode: number;
  data: {
    CanAccessCategory: boolean;
    CanAccessDifficulty: boolean;
    CanAccessIngredient: boolean;
    CanAccessNutrient: boolean;
    CanAccessNutrientGroup: boolean;
    CanAccessRecipe: boolean;
    CanAccessRecipeStep: boolean;
    CanAccessUnit: boolean;
    CanAccessUtensil: boolean;
  };
};

export type GetCloudPermissionsResponseDataType = {
  statusCode: number;
  data: {
    CanAccessFile: boolean;
  };
};

export type GetAllPermissionsReturnType = GetCookBookPermissionsResponseDataType['data'] &
  GetVaultPermissionsResponseDataType['data'];
// & GetCloudPermissionsResponseDataType['data'];

export type SitePermissionsType = GetAllPermissionsReturnType;
