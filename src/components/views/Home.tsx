import React, { Component } from "react"
import Intro from "components/customs/home/Intro"
import About from "components/customs/home/About"
import Explore from "components/customs/home/Explore"

import styles from "./Home.module.scss"
import blob from "assets/blob-shape.svg"

export class Home extends Component {
    render() {
        return (
            <section className={styles.master} style={{ backgroundImage: `url(${blob})` }}>
                <Intro />
                <About />
                <Explore />
            </section>
        )
    }
}

export default Home
