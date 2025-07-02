export type GetAllTokesByUserIdTokenDataType = {
    ID: number;
    user_id: number;
    user: null;
    access_token: string;
    refresh_token: string;
    created_at: Date;
    deleted_at: number;
};

export type GetAllTokesByUserIdResponseTyp = {
    statusCode: number;
    data: GetAllTokesByUserIdTokenDataType[]
};