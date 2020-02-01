import { combineReducers } from "redux";
import console from './console'

export interface ActionType {
    type: string,
    payload: any
}

const rootReducer = combineReducers({
    console
});

export default rootReducer;