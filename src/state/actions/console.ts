import { State } from 'state/reducers/console'

export const setAll = (payload: State) => {
    return {
        type: 'SET_ALL',
        payload: payload
    }
}

export const windowVisible = (visible: boolean = true) => {
    return {
        type: "WINDOW_VISIBLE",
        payload: {
            visible
        }
    }
}