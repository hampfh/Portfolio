import React, { Component } from 'react'

import Toolbar from './Toolbar'
import Console from './Console'

import styles from './Console.module.scss'

export class ConsoleWindow extends Component {
    render() {
        return (
            <section className={styles.consoleWindow}>
                <Toolbar />
                <Console />
            </section>
        )
    }
}

export default ConsoleWindow
