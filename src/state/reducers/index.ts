import { combineReducers } from "redux";
import console from './console'
import chat from "./chat"

export interface ActionType {
    type: string,
    payload: any
}

const rootReducer = combineReducers({
	console,
	chat
});

export default rootReducer;