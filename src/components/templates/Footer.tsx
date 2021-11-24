import React, { Component } from 'react'
import styles from './Footer.module.scss'

import moment from 'moment'

export class Footer extends Component {
    render() {
        return (
            <footer className={styles.footer}>
                <section className={styles.copyright}>
                    <p>© Copyright Hampus Hallkvist 2017 - {moment().format('YYYY')}</p>
                    <p>All rights reserved</p>
                </section>
            </footer>
        )
    }
}

export default Footer
