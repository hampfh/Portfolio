import { State } from 'state/reducers/console'
import { ReturnType } from 'functions/Interpreter'

export default function ClearConsole(args: string[], consoleState: State): ReturnType {
	if (consoleState.transform.isEjected)
		return { status: 1, state: consoleState, message: "Console is already ejected..."};

	consoleState.transform.isEjected = true;
	return { status: 0, state: consoleState, message: "Console ejected!" };
}