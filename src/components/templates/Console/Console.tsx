import React, { Component, createRef } from 'react'
import Interpreter from 'functions/Interpreter'

import styles from './Console.module.scss'

export enum OutputMode { 
    default = 'default', 
    typing = 'typing'
 }
export enum LineType { 
    input = 'input', 
    info = 'info', 
    error = 'error' 
};

export class Console extends Component<PropsForComponent, StateForComponent> {
    currentIndex = 1;
    cursorOnTime = 600;
    cursorOffTime = 500;

    currentLine: React.RefObject<HTMLInputElement>;
    bottomConsole: any;
    interpreter: Interpreter;
    constructor(props: PropsForComponent) {
        super(props);

        this.state = {
            cursor: {
                active: false,
                char: "█",
                interval: null,
            },
            lines: [],
            lineWasAdded: false
        }

        this.interpreter = new Interpreter();
        
        this.currentLine = createRef();
        this.bottomConsole = createRef();

        this.addCharToCurrentLine = this.addCharToCurrentLine.bind(this);
        this.removeLastCharFromCurrentLine = this.removeLastCharFromCurrentLine.bind(this);
        this._handleKeyCode = this._handleKeyCode.bind(this);
        this._handleKey = this._handleKey.bind(this);
        this.toggleCursor = this.toggleCursor.bind(this);
        this.finishLine = this.finishLine.bind(this);
        this.typeRecursive = this.typeRecursive.bind(this);
    }

    async componentDidUpdate() {
        if (this.state.lineWasAdded) {
            this.bottomConsole.scrollIntoView({ behavior: "smooth", block: "end" });
            this.setState({ ...this.state, lineWasAdded: false });
        }
    }

    async componentDidMount() {
        let newState = { ...this.state };

        if (this.props.onLoadMessage !== undefined) {
            let batch = this.props.onLoadMessage;
            for (let i = 0; i < batch.length; i++) {
                let lines = this.props.onLoadMessage[i];
                await this.output(lines.text, lines.type, lines.mode);
            }
        }
        if (this.props.interactive !== undefined && this.props.interactive === true) {
            this.startInputLine();

            // Only set interval on initial page load
            if (newState.cursor.interval === null)
                this.toggleCursor();   
        }

        this.setState(newState);
    }

    typeRecursive(index: number | Index, data: string | Array<string>, type: LineType = LineType.info) {
        const DefaultDelays = {
            char: 40,
            space: 15,
            newLine: 150,
            loadingChar: 500
        }

        // Get next char
        let nextChar: string = "";
        if (Array.isArray(data) && typeof index !== 'number') {
            if (index.innerIndex >= data[index.outerIndex].length)
                nextChar = "\n";
            else
                nextChar = (data[index.outerIndex][index.innerIndex]);
        }
        else
            nextChar = (data[index as number]);

        // Calculate the current delay
        let thisDelay = DefaultDelays.char;
        switch (nextChar) {
            case ' ':
                thisDelay = DefaultDelays.space;
                break;
            case '\n':
                thisDelay = DefaultDelays.newLine;
                break;
            case '■':
                thisDelay = DefaultDelays.loadingChar;
                break;
        }
        
        return new Promise(resolve => {
            // Multiple lines
            if (Array.isArray(data)) {
                setTimeout(async () => {
                    index = index as Index;

                    if (index.innerIndex < data[index.outerIndex].length) {
                        this.addCharToCurrentLine(data[index.outerIndex][index.innerIndex], type);
                        index.innerIndex++;
                    } else {
                        index.innerIndex = 0;
                        index.outerIndex++;
                        // Don't create newline on last line
                        if (index.outerIndex < data.length) {
                            this.finishLine();
                            this.output("", type);
                        }
                    }

                    if (index.outerIndex < data.length) 
                        await this.typeRecursive(index, data, type);

                    resolve();
                }, thisDelay);
            } else { // Only one line
                setTimeout(async () => {
                    index = index as number;

                    if (data[index] !== undefined)
                        this.addCharToCurrentLine(data[index], type);
                    if (index < data.length)
                        await this.typeRecursive(++index, data, type);
                     
                    // Only the first instance of the recursion will create a newline
                    if (index === 0) {
                        this.finishLine();
                        this.output("", type);
                    }
                    resolve();
                }, thisDelay);
            }
        })
    }

    output(text: string | Array<string> = "", type: LineType = LineType.info, method: OutputMode = OutputMode.default) {
        return new Promise(async resolve => {
            let newState = { ...this.state };
            // Create new empty line
            if (typeof text === 'string' && text.length === 0 && newState.lines[newState.lines.length - 1].text.length > 0)
                newState.lines.push({ id: this.currentIndex++, type, text: "" })

            // Default output method
            else if (method === OutputMode.default) {
                console.log(text)
                if (Array.isArray(text)) {
                    for (let i = 0; i < text.length; i++) {
                        newState.lines.push({ id: this.currentIndex++, type, text: text[i] })
                    }
                } else {
                    newState.lines.push({ id: this.currentIndex++, type, text });
                }
            } 
            
            // Typing output method
            else if (method === OutputMode.typing) {
                this.finishLine();
                // Add new empty line
                newState.lines.push({ id: this.currentIndex++, type, text: ""});
                await this.typeRecursive((Array.isArray(text) ? { innerIndex: 0, outerIndex: 0 } : 0), text, type);
            }
            newState.lineWasAdded = true;
            this.setState(newState);

            resolve();
        });
    }

    getCurrentLine() {
        return this.state.lines[this.state.lines.length - 1];
    }

    removeLastCharFromCurrentLine() {
        let newState = { ...this.state };
        let targetLine = this.getCurrentLine();
        if (targetLine === undefined || targetLine.text.length <= 0)
            return;

        if (this.state.cursor.active) {
            targetLine.text = targetLine.text.substr(0, targetLine.text.length - 2);
            targetLine.text += this.state.cursor.char;
        } else {
            targetLine.text = targetLine.text.substr(0, targetLine.text.length - 1);
        }
        newState.lines[newState.lines.length - 1] = targetLine;
        this.setState(newState);
    }

    addCharToCurrentLine(char: string, type: LineType = LineType.info) {
        let newState = { ...this.state };
        if (newState.lines.length <= 0)
            newState.lines.push({ id: this.currentIndex++, type, text: char});
        else {
            if (newState.cursor.active) {
                let newLine = newState.lines[newState.lines.length - 1].text.substr(0, newState.lines[newState.lines.length - 1].text.length - 1);
                newLine += char;
                newLine += this.state.cursor.char;
                newState.lines[newState.lines.length - 1].text = newLine;
            } else {
                newState.lines[newState.lines.length - 1].text += char;
            }
        }
        this.setState(newState);
    }

    startInputLine() {
        // Execute line
        let newState = { ...this.state };
        // Reset cursor
        newState.cursor.active = false;
        // Add a new empty line
        newState.lines.push({ id: this.currentIndex++, type: LineType.input, text: "" });
        this.toggleCursor();
        newState.lineWasAdded = true;
        this.setState(newState);
    }

    finishLine(): Line {
        // Execute line
        let newState = { ...this.state };
        let lines = [...newState.lines];

        // Remove cursor if it is active
        if (this.state.cursor.active) {
            let currentLine = this.getCurrentLine();
            lines.pop();
            currentLine.text = currentLine.text.substr(0, currentLine.text.length - 1);
            lines.push(currentLine);
        }

        // If current line is empty, add dummy character to it
        if (newState.lines.length > 0 && newState.lines[newState.lines.length - 1].text.length <= 0)
            newState.lines[newState.lines.length - 1].text = "";

        clearInterval(newState.cursor.interval as NodeJS.Timeout);

        // Reset cursor
        newState.cursor.active = false;

        this.setState(newState);
        return this.getCurrentLine();
    }

    async _handleKey(event: any) {        
        switch (event.key) {
            case 'Enter':
                let Line = this.finishLine();
                let result = this.interpreter.run(Line.text);
                if (result.status !== 0)
                    await this.output(result.message as string, LineType.error);
                else if (result.status === 0 && result.message !== undefined)
                    await this.output(result.message, LineType.info);
                this.startInputLine();
                this.setState({ ...this.state, lineWasAdded: true });
                break;
            case ' ':
                event.preventDefault();
                this.addCharToCurrentLine(event.key);
                break;
            default:
                this.addCharToCurrentLine(event.key);
        }
    }

    _handleKeyCode(event: any) {
        if (event.keyCode === 8) {
            event.preventDefault();
            this.removeLastCharFromCurrentLine();
        }
    }

    toggleCursor() {
        let newState = {...this.state};
        if (newState.cursor.active) {
            let targetLine = this.getCurrentLine();
            if (targetLine === undefined || targetLine.text.length <= 0)
                return;

            targetLine.text = targetLine.text.substr(0, targetLine.text.length - 1);
            newState.lines[newState.lines.length - 1] = targetLine;
            newState.cursor.active = false;
            newState.cursor.interval = setTimeout(this.toggleCursor, this.cursorOffTime);
        } else {
            this.addCharToCurrentLine(this.state.cursor.char);
            newState.cursor.active = true;
            newState.cursor.interval = setTimeout(this.toggleCursor, this.cursorOnTime);
        }
        this.setState(newState);
    }

    render() {
        return (
            <section className={styles.console} tabIndex={0} onKeyDown={this._handleKeyCode} onKeyPress={this._handleKey}>
                {this.state.lines.map(line => {

                    if (line.type === LineType.input) {
                        return (
                            <div key={line.id} className={styles.line}>
                                <span className={styles.userPrefix}>server@user:~$</span>
                                <p className={styles.consoleInput}>{line.text}</p>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div key={line.id} className={styles.line}>
                                <p className={styles.consoleInput + " " + styles[line.type]}>{line.text}</p>
                            </div>
                        )
                    }
                })}
                <div ref={(element) => this.bottomConsole = element}>
                </div> 
            </section>
        )
    }
}

interface Index { 
    outerIndex: number, 
    innerIndex: number 
}

interface Line {
    id: number,
    type: LineType,
    text: string
}

export interface OutputLine {
    type: LineType,
    mode: OutputMode,
    text: Array<string>
}

interface PropsForComponent {
    onLoadMessage?: Array<OutputLine>
    interactive?: boolean
}

interface StateForComponent {
    cursor: {
        active: boolean,
        char: string,
        interval: NodeJS.Timeout | null
    },
    lines: Array<Line>,
    lineWasAdded: boolean
}

export default Console
