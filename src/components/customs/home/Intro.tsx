import React, { Component } from 'react'
import ConsoleWindow from 'components/utilities/Console'

import { connect } from 'react-redux'
import { State as ConsoleState } from 'state/reducers/console'

import { CSSTransition } from 'react-transition-group'
import transitionStyle from 'components/utilities/Console/ConsoleTransitions.module.scss'

import styles from './Intro.module.scss'

export class Intro extends Component<PropsForComponent> {
    render() {
        const animationDuration = 150;
        return (
            <section className={styles.introContainer}>
                <div className={styles.textContainer}>
                    <h1 className={styles.fullname}>Hampus Hallkvist</h1>
                    <p className={styles.slogan}>A hobby developer doing stuff and things</p>
                </div>
                <CSSTransition in={this.props.console.window.visible} classNames={{ ...transitionStyle }} unmountOnExit timeout={animationDuration}
                    style={{ transition: `transform ${animationDuration}ms` }}
                >
                    <aside className={styles.aside}>
                        <ConsoleWindow />
                    </aside>
                </CSSTransition>
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

export default connect(reduxSelect)(Intro);
