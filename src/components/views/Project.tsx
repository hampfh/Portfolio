import React, { Component } from 'react'
import GithubRepository from 'components/utilities/Repository'
import { Link } from 'react-router-dom'

export class Project extends Component<PropsForComponent, StateForComponent> {

    constructor(props: PropsForComponent) {
        super(props)
    
        this.state = {
            url: "string",
            repositoryLink: "",
            date: "",
            header: {
                title: "Test",
                text: [
                    "Hello there",
                    "TEST"
                ],
                aside: [
                    {
                        title: "Role",
                        text: "Back-end developer"
                    },
                    {
                        title: "Company",
                        text: "No company assoicated with this project"
                    },
                    {
                        title: "Associations",
                        text: "Project Github Page",
                        link: "https://github.com/Hampfh/PhysicsSimulator"
                    }
                ]
            },
            sections: [
                {
                    title: "Aim",
                    text: [ "The aim of this program was to simulate gravitational forces between objects in order to get a deeper understanding of the physics behind forces. The requirements for the program were to have a working physics engine that could handle all objects, have some form of graphics that could visually present the objects and display the properties of each object such as mass, dimensions, and velocity. " ]
                },
                {
                    title: "Method",
                    text: [
                        "The methods of this project were built on physics classes in high school. When developing the engine I used my knowledge I recently gained from the lessons and combined the relations between a position, a velocity, and an acceleration. When the engine worked between two objects I implemented the feature to add multiple objects, all interacting with each other. This was as simple as a nested for loop matching all objects with each other and applying the required equation.",
                        "When the base of the project was established I started working on a new feature which was the possibility to zoom in and out and move freely in the universe. Earlier when the objects moved out of screen there was no way of returning them unless teleporting them back. However, with the feature to zoom in and out, it enabled for a new specter of possibilities in the simulator. "
                    ]
                },
                {
                    title: "Result",
                    text: [
                        "The result was above expectation. I went from having two objects that could interact with each other to 50+. The zoom and moving algorithm were hard to establish but when they worked they literally gave the simulator a whole new dimension of possibilities. However, the frontend part of the application could have been executed better. The application does not scale and does not support different screen sizes. The graphical part of the program is only there to the functional part and there is no user experience at all neither any design to make the program look good. With that said the application still meets it's goals since it's original purpose was to simulate movement of objects which it does perfectly."
                    ]
                },
                {
                    title: "Disscussion",
                    text: [
                        "I learned a lot by doing this project, from different aspects. After I created the simple engine I better understood gravity and all objects in the universe helped me improve my OOP skills. For my next project I will try to either do something that I know I can finish by myself, or collaborate with someone to make the design part for me since it a little unfortunate that I can't finish the program fully because I do not want to work with the user experience."
                    ]
                }
            ]
        }
    }
    

    componentDidMount() {
        console.log(this.props.match.params.project)
    }

    render() {
        return (
            <section className="">
                <article>
                    <GithubRepository align="center" />
                    <header>
                        <h3>{this.state.header.title}</h3>
                        <p>{this.state.date}</p>
                        {this.state.header.text.map(line => {
                            return <p>{line}</p>
                        })}
                        {this.state.header.aside === undefined ? null :
                        <aside>
                            {this.state.header.aside.map(section => {
                                return (
                                    <section>
                                        <h4>{section.title}</h4>
                                        {section.link === undefined ?
                                            <p>{section.text}</p> :
                                            <Link to={section.link}>{section.text}</Link>
                                        }
                                    </section>
                                )
                            })}
                        </aside>}
                    </header>
                    {this.state.sections.map(section => {
                        return (
                            <section>
                                <div>
                                    <h3>{section.title}</h3>
                                    {section.text.map(text => {
                                        return <p>{text}</p>
                                    })}
                                </div>
                                {section.aside === undefined ? null :
                                <aside>
                                    {section.aside.map(section => {
                                        return (
                                            <section>
                                                <h4>{section.title}</h4>
                                                {section.link === undefined ?
                                                    <p>{section.text}</p> :
                                                    <Link to={section.link}>{section.text}</Link>
                                                }
                                            </section>
                                        )
                                    })}
                                </aside>}
                            </section>
                        )
                    })}
                </article>
            </section>
        )
    }
}

interface TextSection {
    title: string,
    text: Array<string>,
    aside?: Array<{
        title: string,
        text: string,
        link?: string
    }>
}

interface StateForComponent {
    url: string,
    repositoryLink: string,
    date: string,
    header: TextSection,
    sections: Array<TextSection>
}

interface PropsForComponent {
    match: any
}

export default Project
