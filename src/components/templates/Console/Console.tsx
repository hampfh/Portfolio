import React, { Component } from 'react'

import styles from './Console.module.scss'

export class Console extends Component<{}, StateForComponent> {

    constructor(props: any) {
        super(props);

        this.state = {
            cursor: {

            },
            lines: [

            ]
        }
    }

    _handleClick(event: any) {
        // Set focus to console
        console.log(event.target.value)
        console.log(event.keyCode)
    }

    render() {
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
        
    },
    lines: Array<string>
}

export default Console
