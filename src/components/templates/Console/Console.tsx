import React, { Component } from 'react'

import styles from './Console.module.scss'

export class Console extends Component<{}, StateForComponent> {
    interval = 1000;
    constructor(props: any) {
        super(props);

        this.state = {
            cursor: {
                active: false,
                char: "█"
            },
            lines: [

            ]
        }

        this.startInterval = this.startInterval.bind(this);
        this.toggleCursor = this.toggleCursor.bind(this);
    }

    _handleClick(event: any) {
        // Set focus to console
        console.log(event.target.value)
        console.log(event.keyCode)
    }

    startInterval() {
        setInterval(this.toggleCursor, this.interval);
    }

    toggleCursor() {
        let newState = {...this.state};
        console.log(this.state)
        if (newState.cursor.active) {
            newState.lines[newState.lines.length - 1].substr(0, newState.lines[newState.lines.length - 1].length - 1);
            newState.cursor.active = true;
        } else {
            newState.lines[newState.lines.length - 1] += this.state.cursor.char;
            newState.cursor.active = false;
        }
        this.setState(newState);
    }

    render() {
        this.startInterval();
        return (
            <section className={styles.console} onClick={this._handleClick}>
                <div className={styles.line}>
                    <p className={styles.userPrefix}>server@user:~$</p> 
                    <span>sudo npm install react-router-com     gsdgdsagadgasgdasgdsagdsagasgdasddg</span></div>
                <div className={styles.line}>
                    <p className={styles.userPrefix}>server@user:~$</p>
                    <input className={styles.consoleInput}></input></div>
            </section>
        )
    }
}

interface StateForComponent {
    cursor: {
        active: boolean,
        char: string
    },
    lines: Array<string>
}

export default Console
