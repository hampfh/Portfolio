import { State } from 'state/reducers/console'

export const setAll = (payload: State) => {
    return {
        type: 'SET_ALL',
        payload: payload
    }
}

export const setWindowVisibility = (visible: boolean) => {
    return {
        type: "WINDOW_VISIBLE",
        payload: {
            visible
        }
    }
}