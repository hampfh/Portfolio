import { ActionType } from './'

export enum OutputMode {
    default = 'default',
    typing = 'typing',
    line = 'line'
}
export enum LineType {
    input = 'input',
    info = 'info',
    error = 'error'
};

export interface Line {
    id: number,
    type: LineType,
    text: string
}

export enum Resize {
    NONE,
    TOP,
    TOP_LEFT,
    TOP_RIGHT,
    BOTTOM,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    LEFT,
    RIGHT
}

export interface State {
    transform: {
        isEjected: boolean,
        isMoving: boolean,
        resize: Resize
        initial: {
            x: number,
            y: number,
            resizeStartX: number, // Start position on resize x
            resizeStartY: number, // Start position on resize y
            width: number,
            height: number
        },
        x: number,
        y: number
        width: number,
        height: number
    }
    window: {
        visible: boolean
    },
    cursor: {
        typing: boolean,
        active: boolean,
        char: string,
        interval: NodeJS.Timeout | null
    },
    lines: Array<Line>,
    lineWasAdded: boolean
}

const defaultState = {
    transform: {
        isEjected: false,
        isMoving: false,
        resize: Resize.NONE,
        initial: {
            x: 0,
            y: 0,
            resizeStartX: 0,
            resizeStartY: 0,
            width: 640,
            height: 350
        },
        x: 0,
        y: 0,
        width: 640,
        height: 350
    },
    window: {
        visible: true
    },
    cursor: {
        typing: false,
        active: false,
        char: "█",
        interval: null,
    },
    lines: [],
    lineWasAdded: false
}

const console = (state: State = defaultState, action: ActionType) => {
    let newState = {...state};
    switch (action.type) {
        case 'SET_ALL': 
            newState = action.payload;
            return newState;
        case 'WINDOW_VISIBLE':
            newState.window.visible = action.payload.visible;
            return newState;
        case 'SET_INITIAL_POSITION':
            newState.transform.initial.x = action.payload.x;
            newState.transform.initial.y = action.payload.y;
            return newState;
        case 'SET_INITIAL_RESIZE_POSITION': 
            newState.transform.initial.resizeStartX = action.payload.x
            newState.transform.initial.resizeStartY = action.payload.y
            return newState;
        case 'SET_INITIAL_DIMENSION':
            newState.transform.initial.width = action.payload.width
            newState.transform.initial.height = action.payload.height
            return newState;
        case 'SET_POSITION':
            newState.transform.x = action.payload.x;
            newState.transform.y = action.payload.y;
            return newState;
        case 'SET_DIMENSION':
            newState.transform.width = action.payload.width;
            newState.transform.height = action.payload.height;
            return newState;
        case 'SET_MOVING':
            newState.transform.isMoving = action.payload.isMoving;
            return newState;
        case 'SET_RESIZE':
            newState.transform.resize = action.payload.resize;
            return newState;
        default:
            return newState;
    }
}

export default console;