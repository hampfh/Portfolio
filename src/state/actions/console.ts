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

export const setInitialPosition = (x: number, y: number) => {
    return {
        type: "SET_INITIAL_POSITION",
        payload: { x, y }
    }
}
export const setPosition = (x: number, y: number) => {
    return {
        type: "SET_POSITION",
        payload: { x, y }
    }
}
export const setDimension = (width: number, height: number) => {
    return {
        type: "SET_DIMENSION",
        payload: { width, height }
    }
}

export const moving = (moving: boolean) => {
    return {
        type: 'SET_MOVING',
        payload: {
            isMoving: moving
        }
    }
}