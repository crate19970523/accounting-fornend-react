import {Token} from "./Token.ts";
import {combineReducers} from "@reduxjs/toolkit";

const allReducers = combineReducers({
    token: Token
})
export type allStat = ReturnType<typeof allReducers>
export default allReducers