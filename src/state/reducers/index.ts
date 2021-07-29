import { combineReducers } from "redux";
import console, { IConsoleState } from './console'
import chat, { IChatState } from "./chat"

export interface ActionType {
    type: string,
    payload: any
}

export interface IReduxState {
    console: IConsoleState
    chat: IChatState
}

const rootReducer = combineReducers({
	console,
	chat
});

export default rootReducer;