import { State } from 'state/reducers/console'
import { ReturnType } from 'functions/Interpreter'

export default function ExitConsole(state: State): ReturnType {
    state.window.visible = false;
    return { status: 0, state };
}