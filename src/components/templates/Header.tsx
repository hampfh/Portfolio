import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import styles from './Header.module.scss'

export class Header extends Component {
    render() {
        return null;
        return (
            <div className={styles.headerContainer} >
                <header className={styles.header} >
                    <aside className={styles.aside}>
                        <Link to="/" style={{ textDecoration: "initial" }}><p className={styles.asideText}>Hampus Hallkvist</p></Link>
                    </aside>
                </header>
            </div>
        )
    }
}

export default Header
