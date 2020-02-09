import React, { Component } from 'react'

import Toolbar from './Toolbar'
import { OutputMode, LineType } from 'state/reducers/console'
import Console from 'components/utilities/Console/Console'

import { State as ConsoleState } from 'state/reducers/console'
import { moving, setPosition } from 'state/actions/console'
import { connect } from 'react-redux'

import styles from './Console.module.scss'

export class ConsoleWindow extends Component<PropsForComponent, ConsoleState> {

    constructor(props: PropsForComponent) {
        super(props)
    
        this._handleMove = this._handleMove.bind(this);
        this._handleMoveEnd = this._handleMoveEnd.bind(this);
    }
    

    _handleMove(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        if (!!!this.props.console.transform.isMoving)
            return;

        const initial = this.props.console.transform.initial;

        // Calc offset
        const newX = event.pageX - initial.x;
        const newY = event.pageY - initial.y;
        this.props.setPosition(newX, newY);
    }

    _handleMoveEnd(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        this.props.moving(false);
    }

    render() {

        const windowStyles = {
            width: `${this.props.console.transform.width}px`,
            height: `${this.props.console.transform.height}px`,
            top: `${this.props.console.transform.y}px`,
            left: `${this.props.console.transform.x}px`,
        }

        return (
            <>
                {(!!!this.props.console.transform.isMoving) ? null :
                    <span className={styles.draggable} onClick={() => console.log("ping")}
                        onMouseMove={this._handleMove}
                        onMouseUp={this._handleMoveEnd}
                        onMouseLeave={this._handleMoveEnd}
                        style={{ 
                            width: this.props.console.transform.width * 1.5,
                            height: this.props.console.transform.height * 2,
                            top: `${this.props.console.transform.y - (this.props.console.transform.height / 2)}px`,
                            left: `${this.props.console.transform.x - (this.props.console.transform.width / 4)}px`,
                        }}
                    />
                }
                
                <section className={styles.consoleWindow} style={windowStyles}>
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
            </>
        )
    }
}

interface PropsForComponent {
    console: ConsoleState,
    moving: Function,
    setPosition: Function
}

const reduxSelect = (state: any) => {
    return {
        console: state.console
    }
}

const reduxDispatch = () => {
    return {
        moving,
        setPosition
    }
}

export default connect(reduxSelect, reduxDispatch())(ConsoleWindow);