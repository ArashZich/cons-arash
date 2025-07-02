export type DeleteProductsRequestBodyData = number[];

export type DeleteProductsResponseData = {
    statusCode: number;
    data: {
        ids: number[];
    };
};
