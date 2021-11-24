import { ReturnType } from 'functions/Interpreter'

export default function ExitConsole(): ReturnType {
    let message = [
        'pong!'
    ]
    return { status: 0, message };
}
