export type DeletePlansRequestBodyData = number[];

export type DeletePlansResponseData = {
    statusCode: number;
    data: {
        ids: number[];
    };
};