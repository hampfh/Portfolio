import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { CSSTransition } from 'react-transition-group'
import animationRight from './ExploreTransitionsRight.module.scss'
import animationLeft from './ExploreTransitionsLeft.module.scss'
import styles from './Explore.module.scss'

import erislaw from 'assets/erislawLogo.png'
import dotlibrary from 'assets/dotLib.png'
import pys from 'assets/physicsSimulator.png'
import createList from 'assets/cre8list.png'
import arrender from 'assets/arrender.svg'
import dataLinks from 'assets/datasektionenLogo.png'

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
                link: '/dotlibrary',
                active: false,
                title: "Dot library",
                image: dotlibrary
            },
            {
                id: 1,
                link: '/physicssimulator',
                active: false,
                title: "Physics simulator",
                image: pys
            }, 
            {
                id: 2,
                link: '/erislaw',
                active: false,
                title: "Erislaw webpage",
                image: erislaw
            },
            {
                id: 3,
                link: '/cre8list',
                active: false,
                title: "Cre8list",
                image: createList
            },
            {
                id: 4,
                link: '/arrender',
                active: true,
                title: "Arrender",
                image: arrender
			},
			{
				id: 5,
				link: "./datasektionen",
				active: false,
				title: "Data links",
				image: dataLinks
			}
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
                                        <div className={styles.btnContainer}>
                                            <Link className={styles.btnLink} to={project.link}>
                                                <div className={styles.readMoreBtn}>
                                                    <p className={styles.btnTextLink}>Read more</p>
                                                </div>
                                            </Link>
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
    link: string,
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
