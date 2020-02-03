import React, { Component } from 'react'
import Intro from 'components/customs/home/Intro'
import About from 'components/customs/home/About'
import Explore from 'components/customs/home/Explore'

import styles from './Home.module.scss'

export class Home extends Component {
    render() {
        return (
            <section className={styles.master}>
                <Intro />
                <About />
                <Explore />
            </section>
        )
    }
}

export default Home
