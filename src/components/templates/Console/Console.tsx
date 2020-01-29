import React, { Component } from 'react'

import styles from './Console.module.scss'

export class Console extends Component {
    render() {
        return (
            <section className={styles.console}>
                <p className={styles.line}>
                    <p className={styles.userPrefix}>server@user:~$</p> 
                    sudo npm install react-router-com     gsdgdsagadgasgdasgdsagdsagasgdasddg</p>
            </section>
        )
    }
}

export default Console
