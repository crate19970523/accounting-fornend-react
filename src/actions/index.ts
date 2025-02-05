import {ActionType} from "../reducers/Token.ts";

export const clean = (): ActionType => {
    return {
        type: "CLEAN"
    }
}

export const setToken = (token: string | null): ActionType => {
    return {
        type: "SET_TOKENS",
        payload: token
    }
}
