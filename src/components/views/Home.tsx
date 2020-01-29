import React, { Component } from 'react'
import Intro from 'components/customs/home/Intro'
import About from 'components/customs/home/About'

export class Home extends Component {
    render() {
        return (
            <section className="master">
                <Intro />
                <About />
            </section>
        )
    }
}

export default Home
