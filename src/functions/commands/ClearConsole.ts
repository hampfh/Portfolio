import { State } from 'state/reducers/console'

export default function ClearConsole(state: State): State {
    state.lines = [];
    return state;
}