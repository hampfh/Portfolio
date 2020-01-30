import React, { Component } from 'react'
import me from 'assets/me.jpg'

import styles from './About.module.scss'

export class About extends Component {
    render() {
        return (
            <section className={styles.aboutContainer}>
                <aside className={styles.aside}>
                    <img className={styles.portrait} src={me} alt="" />
                </aside>
                <article className={styles.article}>
                    <h2>About me</h2>
                    <p>
                        Hi there! I'm Hampus, a student in my third year in high school. I work on small projects often associated with programming and sometimes 3D modeling. I am currently spending most of my programming time on languages such as C++ and Javascript for backend development in both web applications and programs. I do however like to play around in front end at times as well when I feel creative, creating websites such as this one.
                    </p>
                    <p>
                        Structure and mechanisms have always fascinated me, not always just in the sense of code but also in other aspects too. In all games I play I've always been interested in the part where you as a user can create things on your own. Today I spend less time playing video games and have instead found another way to express creativity, code. I love being able to build tools, applications, and libraries to help either ordinary people or other programmers like me. For me, most of the things in a project is interesting, even though I would consider myself a backend developer I still like to understand a project in its whole, not only one specific part.
                    </p>
                </article>
            </section>
        )
    }
}

export default About
