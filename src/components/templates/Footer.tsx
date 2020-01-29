import React, { Component } from 'react'
import styles from './Footer.module.scss'

import moment from 'moment'

export class Footer extends Component {
    render() {
        return (
            <footer className={styles.footer}>
                <section className={styles.socialMedia}>
                    <h4>Social medias</h4>
                    <ul>
                        <a className="link" href="https://twitter.com/hampfh">Twitter</a>
                        <a className="link" href="https://www.linkedin.com/in/hampus-hallkvist-a9a208166">LinkedIn</a>
                    </ul>
                </section>
                <section className={styles.copyright}>
                    <p>© Copyright Hampus Hallkvist 2017 - {moment().format('YYYY')}</p>
                    <p>All rights reserved</p>
                </section>
            </footer>
        )
    }
}

export default Footer
