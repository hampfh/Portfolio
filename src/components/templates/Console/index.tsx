import React, { Component } from 'react'

import Toolbar from './Toolbar'
import { OutputMode, LineType } from 'state/reducers/console'
import Console from 'components/templates/Console/Console'

import { State as ConsoleState } from 'state/reducers/console'
import { connect } from 'react-redux'

import { CSSTransition } from 'react-transition-group'
import styles from './Console.module.scss'
import transitionStyle from './ConsoleTransitionStyle.module.scss'

export class ConsoleWindow extends Component<PropsForComponent, ConsoleState> {

    render() {
        const delay = 150;
        const style = {
            transition: `transform ${delay}ms`
        }

        return (
            <CSSTransition in={this.props.console.window.visible} classNames={{ ...transitionStyle }} unmountOnExit timeout={delay} 
                style={style}
            >
                <section className={styles.consoleWindow} style={style}>
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
            </CSSTransition>
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