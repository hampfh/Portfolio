import { State } from 'state/reducers/console'
import { ReturnType } from 'functions/Interpreter'

export default function ClearConsole(state: State): ReturnType {
    state.lines = [];
    return { status: 0, state };
}