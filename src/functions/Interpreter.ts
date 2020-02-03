import { State as ConsoleState } from 'state/reducers/console'

import ClearConsole from 'functions/commands/ClearConsole'
import ExitConsole from 'functions/commands/ExitConsole'
import Help from 'functions/commands/Help'
import EjectConsole from 'functions/commands/EjectConsole'

export interface ReturnType {
    status?: number,
    message?: string | Array<string>,
    state?: ConsoleState
}

interface CommandArg {
    name: string,
    short?: string
}

interface CatalogeItem {
    command: string,
    arguments: Array<CommandArg>,
    out: Function
}

const cataloge: Array<CatalogeItem> = [
    { command: 'help', arguments: [], out: Help },
    { command: 'exit', arguments: [], out: ExitConsole },
    { command: 'clear', arguments: [], out: ClearConsole },
    { command: 'eject', arguments: [], out: EjectConsole },
]

export default class Interpreter {

    run(line: string, state: ConsoleState): Promise<ReturnType> {
        return new Promise(resolve => {
            let result = this.tokenize(line);
            // If token problem, return syntax message
            if (result.status !== 0) {
                resolve(result)
                return;
            }

            // Find command
            let command: CatalogeItem | null = null;
            for (let i = 0; i < cataloge.length; i++) {
                if (result.result[0] === cataloge[i].command) {
                    command = cataloge[i];
                    break;
                }
            }

            if (command === null) {
                resolve({ status: 1, message: "Command not recognized" });
                return;
            }

            // Invalid or too many arguments
            if (result.result.length - 1 > command.arguments.length) {
                resolve({ status: 1, message: "Unmatched arguments" });
                return;
            }

            // Check return type of out
            resolve({ ...command.out(state) });
        });
    }

    tokenize(line: string): { status: number, message?: string, result?: any} {
        let tokens = line.split(" ");
        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];
            // If empty token, syntax error
            if (token.length <= 0)
                return { status: 1, message: "Syntax error" }
        }
        return { status: 0, result: tokens };
    }
}