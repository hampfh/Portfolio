import React, { Component } from 'react'
import ConsoleWindow from 'components/templates/Console'

import styles from './Intro.module.scss'

export class Intro extends Component {
    render() {
        return (
            <section className={styles.introContainer}>
                <div className={styles.textContainer}>
                    <h1 className={styles.fullname}>Hampus Hallkvist</h1>
                    <p className="slogan">A hobby developer doing stuff and things</p>
                </div>
                <aside className={styles.aside}>
                    <ConsoleWindow />
                </aside>
            </section>
        )
    }
}

export default Intro
