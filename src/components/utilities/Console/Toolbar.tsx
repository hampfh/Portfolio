import React, { Component, createRef } from 'react'

import { connect } from 'react-redux'
import { IConsoleState } from 'state/reducers/console'
import { windowVisible, setPosition, setInitialPosition, moving } from 'state/actions/console'

import styles from './Console.module.scss'

export class Toolbar extends Component<PropsForComponent, StateForComponent> {
    exitBtn: React.RefObject<unknown>

    constructor(props: PropsForComponent) {
        super(props)

        this.state = {
            isMoving: false
        }

        this.exitBtn = createRef();
    
        this._handleExitClick = this._handleExitClick.bind(this);
        this._handleMoveStart = this._handleMoveStart.bind(this);
    }
    

    _handleExitClick() {
        this.props.windowVisible(false);
    }

    _handleMoveStart(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        if (event.target === this.exitBtn.current || !!!this.props.console.transform.isEjected)
            return;

        this.props.moving(true);

        const transform = this.props.console.transform;

        if (transform.initial.x === 0 && transform.initial.y === 0)
            this.props.setInitialPosition(event.pageX, event.pageY);
        else {
            const offsetX = (event.pageX - transform.initial.x) - transform.x;
            const offsetY = (event.pageY - transform.initial.y) - transform.y;
            this.props.setInitialPosition(transform.initial.x + offsetX, transform.initial.y + offsetY)
        }
    }

    render() {
        return (
            <header className={styles.toolbar} 
                onMouseDown={this._handleMoveStart} 
            >
                <nav className={styles.toolbarButtonContainer}>
                    <span ref={this.exitBtn as React.RefObject<any>} className={"exit " + styles.toolbarButton} onClick={this._handleExitClick}></span>
                    <span className={"minimize " + styles.toolbarButton}></span>
                    <span className={"maximize " + styles.toolbarButton}></span>
                </nav>
                <p className={styles.currentUser}>server@user:~</p>
            </header>
        )
    }
}

interface StateForComponent {
    isMoving: boolean
}

interface PropsForComponent {
    console: IConsoleState
    windowVisible: Function,
    setPosition: Function, 
    setInitialPosition: Function,
    moving: Function
}

const reduxSelect = (state: any) => {
    return {
        console: state.console
    }
}

const reduxDispatch = () => {
    return {
        windowVisible,
        setPosition, 
        setInitialPosition,
        moving
    }
}

export default connect(reduxSelect, reduxDispatch())(Toolbar);