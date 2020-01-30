interface ReturnType {
    status: number,
    message?: string,
    result?: any
}

interface CommandArg {
    name: string,
    short?: string
}

interface CatalogeItem {
    command: string,
    arguments: Array<CommandArg>,
    out: string | Function
}

const cataloge: Array<CatalogeItem> = [
    { command: 'help', arguments: [], out: 'This is the list of all commands'}
]

export default class Interpreter {

    run(line: string): ReturnType {
        let result = this.tokenize(line);
        // If token problem, return syntax message
        if (result.status !== 0)
            return result;

        // Find command
        let command: CatalogeItem | null = null;
        for (let i = 0; i < cataloge.length; i++) {
            if (result.result[0] === cataloge[i].command) {
                command = cataloge[i];
                break;
            }
        }

        if (command === null)
            return { status: 1, message: "Command not recognized" }

        if (result.result.length - 1 > command.arguments.length)
            return { status: 1, message: "Unmatched arguments" };

        if (typeof command.out === 'string')
            return { status: 0, message: command.out };
        else
            return { status: 0, result: command.out };
        
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