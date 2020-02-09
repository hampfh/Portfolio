import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import styles from './Header.module.scss'
import landscape from 'assets/landscape.svg'

export class Header extends Component {
    render() {

        const headerStyle = {
            backgroundImage: `url(${landscape})`
        }
        return (
            <div className={styles.imageContainer} style={headerStyle}>
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
