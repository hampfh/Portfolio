import { ActionType } from './'

export enum OutputMode {
    default = 'default',
    typing = 'typing'
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

export interface State {
    transform: {
        isEjected: boolean,
        isMoving: boolean,
        initial: {
            x: number,
            y: number
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
        initial: {
            x: 0,
            y: 0
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
        case 'SET_INITIAL_POSITION': {
            newState.transform.initial.x = action.payload.x;
            newState.transform.initial.y = action.payload.y;
            return newState;
        }
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
        default:
            return newState;
    }
}

export default console;