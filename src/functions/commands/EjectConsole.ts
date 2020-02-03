import { State } from 'state/reducers/console'
import { ReturnType } from 'functions/Interpreter'

export default function ClearConsole(state: State): ReturnType {
    state.transform.isEjected = true;
    return { status: 0, state, message: "Console ejected!" };
}