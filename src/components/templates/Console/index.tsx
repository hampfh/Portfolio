import React, { Component } from 'react'

import Toolbar from './Toolbar'
import Console, { OutputLine, OutputMode, LineType } from './Console'

import styles from './Console.module.scss'

export class ConsoleWindow extends Component {
    render() {
        return (
            <section className={styles.consoleWindow}>
                <Toolbar />
                <Console interactive={true} onLoadMessage={[
                        { 
                            type: LineType.input, mode: OutputMode.typing, 
                            text: [ "fetch webpage" ]
                        },
                        { 
                            type: LineType.info, mode: OutputMode.typing,
                            text: [
                                "Detecting visitor!",
                                "Polishing shoes...",
                                "Double check backslick...",
                                "Ironing clothes...",
                                "Straightening tie...",
                                "Double check backslick...",
                                "■■■■■■■■■■ Done!",
                                "Hello there dear visitor!",
                                "Welcome to the page :D"
                            ]
                        }
                    ]} 
                />
            </section>
        )
    }
}

export default ConsoleWindow
