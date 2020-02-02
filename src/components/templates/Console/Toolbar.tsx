import React, { Component } from 'react'

import { connect } from 'react-redux'
import { State as ConsoleState } from 'state/reducers/console'
import { windowVisible } from 'state/actions/console'

import styles from './Console.module.scss'

export class Toolbar extends Component<PropsForComponent> {

    constructor(props: PropsForComponent) {
        super(props)
    
        this._handleExitClick = this._handleExitClick.bind(this);
    }
    

    _handleExitClick() {
        this.props.windowVisible(false);
    }

    render() {
        return (
            <header className={styles.toolbar}>
                <nav className={styles.toolbarButtonContainer}>
                    <span className={"exit " + styles.toolbarButton} onClick={this._handleExitClick}></span>
                    <span className={"minimize " + styles.toolbarButton}></span>
                    <span className={"maximize " + styles.toolbarButton}></span>
                </nav>
                <p className={styles.currentUser}>server@user:~</p>
            </header>
        )
    }
}

interface PropsForComponent {
    console: ConsoleState
    windowVisible: Function
}

const reduxSelect = (state: any) => {
    return {
        console: state.console
    }
}

const reduxDispatch = () => {
    return {
        windowVisible
    }
}

export default connect(reduxSelect, reduxDispatch())(Toolbar);