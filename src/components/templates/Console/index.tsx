import React, { Component } from 'react'

import Toolbar from './Toolbar'
import { OutputMode, LineType } from 'state/reducers/console'
import Console from 'components/templates/Console/Console'

import { State as ConsoleState } from 'state/reducers/console'
import { connect } from 'react-redux'

import styles from './Console.module.scss'

export class ConsoleWindow extends Component<PropsForComponent, ConsoleState> {

    render() {
        if (!!!this.props.console.window.visible)
            return null;

        return (
            <section className={styles.consoleWindow}>
                <Toolbar />
                <Console interactive={true} onLoadMessage={[
                        { 
                            type: LineType.input, mode: OutputMode.typing, 
                            text: [ "fetch webpage" ]
                        },
                        { 
                            type: LineType.info, mode: OutputMode.default,
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

interface PropsForComponent {
    console: ConsoleState
}

const reduxSelect = (state: any) => {
    return {
        console: state.console
    }
}

export default connect(reduxSelect)(ConsoleWindow);