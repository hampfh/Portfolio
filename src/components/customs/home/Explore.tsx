import React, { Component } from 'react'

import { CSSTransition } from 'react-transition-group'
import animationRight from './ExploreTransitionsRight.module.scss'
import animationLeft from './ExploreTransitionsLeft.module.scss'
import styles from './Explore.module.scss'
import cre8list from 'assets/cre8list.png'
import dotlibrary from 'assets/dotLib.png'

export class Explore extends Component<{}, StateForComponent> {

    constructor(props: {}) {
        super(props)
    
        this.state = {
            swapForward: true,
            doSwap: false,
            projects: [

            ]
        }

        this.resetSwipeAnimation = this.resetSwipeAnimation.bind(this);
    }
    
    async componentDidMount() {
        let data = [
            {
                id: 0,
                active: true,
                title: "Dot library",
                image: dotlibrary
            },
            {
                id: 1,
                active: false,
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
        newState.projects = data;
        this.setState(newState);
    }

    swipe(forward: boolean) {

        let newState = { ...this.state };
        let projects = newState.projects;

        newState.swapForward = forward;

        for (let i = 0; i < newState.projects.length; i++) {
            if (projects[i].active === true) {
                if (forward) {
                    let newTarget = projects[i + 1];
                    if (newTarget === undefined) {
                        newTarget = projects[0];
                    }
                    newTarget.active = true;
                } else if (!!!forward) {
                    let newTarget = projects[i - 1];
                    if (newTarget === undefined) {
                        newTarget = projects[projects.length - 1];
                    }
                    newTarget.active = true;
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
                        {this.state.projects.map(project => {
                            const animationDuration = 500;
                            return (
                                <CSSTransition key={project.id} in={project.active} 
                                    classNames={
                                        (this.state.swapForward ? 
                                            { ...animationRight } : 
                                            { ...animationLeft })
                                    }
                                    timeout={animationDuration}
                                    style={{ 
                                        transition: `all ${animationDuration}ms`,
                                        backgroundImage: `url(${project.image})`,
                                    }}
                                    unmountOnExit
                                    mountOnEnter
                                >
                                    <article key={project.id} className={styles.project}>
                                        <div className={styles.projectBanner}>
                                            <h3>{project.title}</h3>
                                        </div>
                                    </article>
                                </CSSTransition>
                            )
                        })}
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
    projects: Array<Project>
}

export default Explore
