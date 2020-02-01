import { State } from 'state/reducers/console'

export default function ExitConsole(state: State): State {
    state.window.visible = false;
    return state;
}