import React, { Component, createRef } from 'react'
import Interpreter from 'functions/Interpreter'

import styles from './Console.module.scss'

export class Console extends Component<{}, StateForComponent> {
    currentIndex = 1;
    cursorOnTime = 600;
    cursorOffTime = 500;

    currentLine: React.RefObject<HTMLInputElement>;
    bottomConsole: any;
    interpreter: Interpreter;
    constructor(props: any) {
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
    }

    async componentDidUpdate() {
        if (this.state.lineWasAdded) {
            this.bottomConsole.scrollIntoView({ behavior: "smooth", block: "end" });
            this.setState({ ...this.state, lineWasAdded: false });
        }
    }

    async componentDidMount() {
        let newState = { ...this.state };
        if (this.state.lines.length <= 0)
            newState.lines.push({ id: this.currentIndex++, type: "input", text: "" });

        // Only set interval on initial page load
        if (newState.cursor.interval === null)
            this.toggleCursor();

        this.setState(newState);
    }

    output(text: string, type: string) {
        let newState = {...this.state};
        newState.lines.push({ id: this.currentIndex++, type, text})
        this.setState(newState);
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

    addCharToCurrentLine(char: string) {
        let newState = { ...this.state };
        if (newState.lines.length <= 0)
            newState.lines.push({ id: this.currentIndex++, type: "input", text: char});
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
        newState.lines.push({ id: this.currentIndex++, type: "input", text: "" });
        this.toggleCursor();
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

        clearInterval(newState.cursor.interval as NodeJS.Timeout);

        // Reset cursor
        newState.cursor.active = false;

        this.setState(newState);
        return this.getCurrentLine();
    }

    _handleKey(event: any) {        
        switch (event.key) {
            case 'Enter':
                let Line = this.finishLine();
                let result = this.interpreter.run(Line.text);
                if (result.status !== 0)
                    this.output(result.message as string, 'error');
                else if (result.status === 0 && result.message !== undefined) 
                    this.output(result.message as string, 'info');
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
                    if (line.type === 'input') {
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

interface Line {
    id: number,
    type: string,
    text: string
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
