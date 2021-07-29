import { IConsoleState } from 'state/reducers/console'
import { ReturnType } from 'functions/Interpreter'

export default function ClearConsole(args: string[], consoleState: IConsoleState): ReturnType {
	consoleState.lines = [];
	return { status: 0, state: consoleState };
}