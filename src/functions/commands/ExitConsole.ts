import { State } from 'state/reducers/console'
import { ReturnType } from 'functions/Interpreter'

export default function ExitConsole(args: string[], consoleState: State): ReturnType {
	consoleState.window.visible = false;
	return { status: 0, state: consoleState };
}