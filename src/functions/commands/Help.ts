import { ReturnType } from 'functions/Interpreter'

export default function ExitConsole(): ReturnType {
    let message = [
        '============== Commands ==============',
        '<help> List all commands',
        '<exit> Close this window',
        '<clear> Clear all previous lines',
        '<eject> Make console movable',
        '<ping> Unknown',
        '======================================'
    ]
    return { status: 0, message };
}
