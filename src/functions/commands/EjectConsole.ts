import { State } from 'state/reducers/console'
import { ReturnType } from 'functions/Interpreter'

export default function ClearConsole(state: State): ReturnType {
    if (state.transform.isEjected)
        return { status: 1, state, message: "Console is already ejected..."};

    state.transform.isEjected = true;
    return { status: 0, state, message: "Console ejected!" };
}