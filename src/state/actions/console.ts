import { State } from 'state/reducers/console'

export const setAll = (payload: State) => {
    return {
        type: 'SET_ALL',
        payload: payload
    }
}