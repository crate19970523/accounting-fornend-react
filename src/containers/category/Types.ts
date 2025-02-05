export type QueryRowsType = {
    id: number,
    serialNo: number
    name: string,
    isForSaving: boolean,
    isActive: boolean,
    lastUpdateTime: string
};

export type CategoryIndexResponseType = {
    status: {
        isSuccess: boolean,
        errorType: string,
        errorDetail: string
    },
    categoryIndexData: Array<{
        serialNo: number;
        name: string;
        isForSaving: boolean;
        isActive: boolean;
        lastUpdateTime: string;
    }>;
}

export type SearchCategoryConditionType = {
    name: string,
    isActive: boolean | "all",
    isForSaving: boolean | "all",
}