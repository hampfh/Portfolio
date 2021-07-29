import { IConsoleState, Resize } from 'state/reducers/console'

export interface ISetNewline { (newline: boolean): void }
export const setNewline = (newline: boolean) => {
	return {
		type: 'SET_NEWLINE',
		payload: {
			newline
		}
	}
}

export const setAll = (payload: IConsoleState) => {
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
export const setInitialResizePosition = (x: number, y: number) => {
    return {
        type: "SET_INITIAL_RESIZE_POSITION",
        payload: { x, y }
    }
}
export const setInitialDimension = (width: number, height: number) => {
    return {
        type: "SET_INITIAL_DIMENSION",
        payload: { width, height }
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
export const setResize = (resize: Resize) => {
    return {
        type: "SET_RESIZE",
        payload: { resize }
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