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
        default:
            return newState;
    }
}

export default console;