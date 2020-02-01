import ExitConsole from 'functions/commands/ExitConsole'
import Help from 'functions/commands/Help'
import { State as ConsoleState } from 'state/reducers/console'

interface ReturnType {
    status: number,
    message?: string | Array<string>,
    result?: any,
    state?: ConsoleState
}

interface CommandArg {
    name: string,
    short?: string
}

interface CatalogeItem {
    command: string,
    arguments: Array<CommandArg>,
    out: string | Array<string> | Function
}

const cataloge: Array<CatalogeItem> = [
    { command: 'help', arguments: [], out: Help },
    { command: 'exit', arguments: [], out: ExitConsole }
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
            if (typeof command.out === 'string' || (Array.isArray(command.out) && typeof command.out[0] === 'string'))
                resolve({ status: 0, message: command.out });
            else {
                // Execute out command
                if (typeof command.out === 'function')
                    resolve({ status: 0, state: command.out(state)});
                else
                    resolve({ status: 1, message: "Error: Output type was not recognized" });
            }
        });
    }

    tokenize(line: string): ReturnType {
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