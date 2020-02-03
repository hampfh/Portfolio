import React, { Component } from 'react'

import styles from './Explore.module.scss'
import cre8list from 'assets/cre8list.png'
import dotlibrary from 'assets/dotLib.png'

export class Explore extends Component<{}, StateForComponent> {

    constructor(props: {}) {
        super(props)
    
        this.state = {
            swapForward: true,
            doSwap: false,
            active: {
                id: 0,
                title: "",
                image: ""
            },
            projects: [

            ]
        }

        this.resetSwipeAnimation = this.resetSwipeAnimation.bind(this);
    }
    
    async componentDidMount() {
        let data = [
            {
                id: 0,
                title: "Dot library",
                image: dotlibrary
            },
            {
                id: 1,
                active: true,
                title: "Cre8list",
                image: cre8list
            }, 
            {
                id: 2,
                active: false,
                title: "TEST",
                image: cre8list
            },
        ]

        let newState = { ...this.state };
        newState.active = data[0];
        newState.projects = data;
        this.setState(newState);
    }

    swipe(forward: boolean) {

        let newState = { ...this.state };
        let projects = newState.projects;
        for (let i = 0; i < newState.projects.length; i++) {
            if (projects[i].active === true) {
                if (forward && projects[i + 1] !== undefined) {
                    projects[i + 1].active = true;
                    newState.active = projects[i + 1];
                } else if (!!!forward && projects[i - 1] !== undefined) {
                    projects[i - 1].active = true;
                    newState.active = projects[i - 1];
                } else
                    break;
                projects[i].active = false;
                newState.doSwap = true;
                break;
            }
        }
        this.setState(newState);
    }

    resetSwipeAnimation() {
        let newState = { ...this.state };
        newState.doSwap = false;
        this.setState(newState);
    }
    
    render() {
        return (
            <section className={styles.exploreContainer}>
                <h2 className={styles.title}>Explore my work</h2>
                <section className={styles.slider}>
                    <button className={styles.sliderButton} onClick={() => { this.swipe(true) }}></button>
                    <section className={styles.projectContainer}>
                        {this.state.active === undefined ? null :
                        <article key={this.state.active.id} className={styles.project}
                            style={{
                                backgroundImage: `url(${this.state.active.image})`
                            }}
                        >
                            <div className={styles.projectBanner}>
                                <h3>{this.state.active.title}</h3>
                            </div>
                        </article>}
                    </section>
                    <button className={styles.sliderButton} onClick={() => { this.swipe(false) }}></button>
                </section>
            </section>
        )
    }
}

interface Project {
    id: number,
    active?: boolean,
    title: string,
    image: string
}

interface StateForComponent {
    swapForward: boolean,
    doSwap: boolean,
    active?: Project,
    projects: Array<Project>
}

export default Explore
