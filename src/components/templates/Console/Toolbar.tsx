import React, { Component } from 'react'

import styles from './Console.module.scss'

export class Toolbar extends Component {
    render() {
        return (
            <header className={styles.toolbar}>
                <nav className={styles.toolbarButtonContainer}>
                    <span className={"exit " + styles.toolbarButton}></span>
                    <span className={"minimize " + styles.toolbarButton}></span>
                    <span className={"maximize " + styles.toolbarButton}></span>
                </nav>
                <p className={styles.currentUser}>server@user:~</p>
            </header>
        )
    }
}

export default Toolbar
