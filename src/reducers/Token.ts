export const Token = (state: string | null | undefined = "", action: ActionType): string | null | undefined => {
    switch (action.type) {
        case "CLEAN":
            return null;
        case "SET_TOKENS": {
            return action.payload;
        }
        default:
            return state
    }
}

export type ActionType = {
    type: string,
    payload?: string | null
}