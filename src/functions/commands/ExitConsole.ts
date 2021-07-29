import { IConsoleState } from 'state/reducers/console'
import { ReturnType } from 'functions/Interpreter'

export default function ExitConsole(args: string[], consoleState: IConsoleState): ReturnType {
	consoleState.window.visible = false;
	return { status: 0, state: consoleState };
}