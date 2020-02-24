import React, { Component } from 'react'

import Toolbar from './Toolbar'
import { OutputMode, LineType } from 'state/reducers/console'
import Console from 'components/utilities/Console/Console'

import { State as ConsoleState } from 'state/reducers/console'
import { 
    moving, 
    setAll,
    setPosition, 
    setDimension, 
    setResize, 
    setInitialPosition,
    setInitialResizePosition, 
    setInitialDimension
} from 'state/actions/console'
import { connect } from 'react-redux'
import { Resize } from 'state/reducers/console'

import styles from './Console.module.scss'
import resizeStyles from './ConsoleResize.module.scss'

export class ConsoleWindow extends Component<PropsForComponent> {

    constructor(props: PropsForComponent) {
        super(props)
    
        this._handleMove = this._handleMove.bind(this);
        this._handleMoveEnd = this._handleMoveEnd.bind(this);
    }
    

    _handleMove(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        const initial = this.props.console.transform.initial;

        // Moving
        if (this.props.console.transform.isMoving) {
            // Calc offset
            const newX = event.pageX - initial.x;
            const newY = event.pageY - initial.y;
            this.props.setPosition(newX, newY);
        } // Resizing
        else if (this.props.console.transform.resize !== Resize.NONE) {
            const changeX = event.pageX - initial.resizeStartX;
            const changeY = event.pageY - initial.resizeStartY;
            const consoleWidth = initial.width;
            const consoleHeight = initial.height;

            // Set start values
            let newWidth = consoleWidth;
            let newHeight = consoleHeight;
            let newX = initial.x;
            let newY = initial.y;

            switch (this.props.console.transform.resize) {
                case Resize.BOTTOM:
                    newHeight += +changeY;
                    break;
                case Resize.TOP:
                    newY += +changeY;
                    newHeight -= +changeY;
                    break;
                case Resize.RIGHT:
                    newWidth += +changeX;
                    break;
                case Resize.LEFT:
                    newX += +changeX;
                    newWidth -= +changeX;
                    break;
                case Resize.BOTTOM_LEFT:
                    newX += +changeX;
                    newWidth -= changeX;
                    newHeight += changeY;
                    break;
                case Resize.BOTTOM_RIGHT:
                    newWidth += changeX;
                    newHeight += changeY;
                    break;
                case Resize.TOP_LEFT:
                    newX += +changeX;
                    newWidth -= changeX;
                    newY += +changeY;
                    newHeight -= changeY;
                    break;
                case Resize.TOP_RIGHT:
                    newWidth += changeX;
                    newY += +changeY;
                    newHeight -= changeY;
                    break;
            }

            this.props.setDimension(newWidth, newHeight);
            this.props.setPosition(newX, newY);
        }
    }

    _handleMoveEnd(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        if (this.props.console.transform.isMoving)
            this.props.moving(false);
        else if (this.props.console.transform.resize !== Resize.NONE)
            this.props.setResize(Resize.NONE);
            // Set initial dimension to latest dimension
            this.props.setInitialDimension(this.props.console.transform.width, this.props.console.transform.height);
            this.props.setInitialPosition(this.props.console.transform.x, this.props.console.transform.y)
    }

    _handleDragStart(resize: Resize, event: React.MouseEvent<HTMLElement, MouseEvent>) {
        let newState = { ...this.props.console };
        newState.transform.resize = resize;
        newState.transform.initial.resizeStartX = event.pageX;
        newState.transform.initial.resizeStartY = event.pageY;
        newState.transform.isEjected = true;
        this.props.setAll(newState);
    }

    getCursorType = () => {
        if (this.props.console.transform.isMoving)
            return 'move';
        if (this.props.console.transform.resize !== Resize.NONE) {
            switch (this.props.console.transform.resize) {
                case Resize.BOTTOM:
                case Resize.TOP:
                    return 'ns-resize';
                case Resize.RIGHT:
                case Resize.LEFT:
                    return 'ew-resize'
                case Resize.TOP_RIGHT:
                case Resize.BOTTOM_LEFT:
                    return 'nesw-resize'
                case Resize.BOTTOM_RIGHT:
                case Resize.TOP_LEFT:
                    return 'nwse-resize'
            }
        }
    }

    render() {

        const windowStyles = {
            position: (this.props.console.transform.isEjected ? "absolute" : "absolute") as any,
            width: `${this.props.console.transform.width}px`,
            height: `${this.props.console.transform.height}px`,
            top: `${this.props.console.transform.y}px`,
            left: `${this.props.console.transform.x}px`
        }

        const cursor = this.getCursorType();

        return (
            <>
                {(!!!this.props.console.transform.isMoving && this.props.console.transform.resize === Resize.NONE) ? null :
                    <span className={styles.draggable}
                        onMouseMove={this._handleMove}
                        onMouseUp={this._handleMoveEnd}
                        onMouseLeave={this._handleMoveEnd}
                        style={{ 
                            width: this.props.console.transform.width * 1.5,
                            height: this.props.console.transform.height * 2,
                            top: `${this.props.console.transform.y - (this.props.console.transform.height / 2)}px`,
                            left: `${this.props.console.transform.x - (this.props.console.transform.width / 4)}px`,
                            cursor
                        }}
                    />
                }
                
                <section className={styles.consoleWindow} style={windowStyles}>
                    <span onMouseDown={(event) => this._handleDragStart(Resize.BOTTOM, event)} className={resizeStyles.resizeBottom + " " + resizeStyles.resize} ></span>
                    <span onMouseDown={(event) => this._handleDragStart(Resize.BOTTOM_RIGHT, event)} className={resizeStyles.resizeBottom_right + " " + resizeStyles.resize}></span>
                    <span onMouseDown={(event) => this._handleDragStart(Resize.BOTTOM_LEFT, event)} className={resizeStyles.resizeBottom_left + " " + resizeStyles.resize}></span>
                    
                    <span onMouseDown={(event) => this._handleDragStart(Resize.TOP, event)} className={resizeStyles.resizeTop + " " + resizeStyles.resize}></span>
                    <span onMouseDown={(event) => this._handleDragStart(Resize.TOP_RIGHT, event)} className={resizeStyles.resizeTop_right + " " + resizeStyles.resize}></span>
                    <span onMouseDown={(event) => this._handleDragStart(Resize.TOP_LEFT, event)} className={resizeStyles.resizeTop_left + " " + resizeStyles.resize}></span>
                    
                    <span onMouseDown={(event) => this._handleDragStart(Resize.RIGHT, event)} className={resizeStyles.resizeRight + " " + resizeStyles.resize}></span>
                    <span onMouseDown={(event) => this._handleDragStart(Resize.LEFT, event)} className={resizeStyles.resizeLeft + " " + resizeStyles.resize}></span>
                    <Toolbar />
                    <Console interactive={true} onLoadMessage={[
                            { 
                                type: LineType.input, mode: OutputMode.typing, 
                                text: [ "fetch webpage" ]
                            },
                            { 
                                type: LineType.info, mode: OutputMode.line,
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
    setAll: Function,
    setPosition: Function,
    setDimension: Function,
    setResize: Function,
    setInitialPosition: Function,
    setInitialResizePosition: Function,
    setInitialDimension: Function
}

const reduxSelect = (state: any) => {
    return {
        console: state.console
    }
}

const reduxDispatch = () => {
    return {
        moving,
        setAll,
        setPosition,
        setDimension,
        setResize,
        setInitialPosition,
        setInitialResizePosition,
        setInitialDimension
    }
}

export default connect(reduxSelect, reduxDispatch())(ConsoleWindow);