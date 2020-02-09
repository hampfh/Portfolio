import React, { Component } from 'react'

import githublogo from 'assets/github-logo.svg'
import githubmark from 'assets/github-mark.svg'

import styles from './Repository.module.scss'

export class Repository extends Component<PropsForComponent> {
    render() {
        return (
            <div className={styles.container} style={{ justifySelf: this.props.align }}>
                <h3>Available on</h3>
                <div className={styles.logoContainer}>
                    <img className={styles.logo} src={githublogo} alt="" />
                    <img className={styles.mark} src={githubmark} alt="" />
                </div>
            </div>
        )
    }
}

interface PropsForComponent {
    align: string
}

export default Repository
