import React, { Component } from "react"
import { Link } from "react-router-dom"
import GithubRepository from 'components/utilities/Repository'
import { v4 as uuid } from "uuid"

import articles from 'assets/articles.json'

import styles from "./Project.module.scss"
import errorStyles from "./pageNotFound.module.scss"

export class Project extends Component<PropsForComponent, StateForComponent> {

    constructor(props: PropsForComponent) {
        super(props)

        let project = this.props.match.params.project as string;
        switch (project) {
			case 'datasektionen':
				this.state = articles['datasektionen'];
				break;
            case 'dotlibrary':
                this.state = articles['dotlibrary'];
                break;
            case 'physicssimulator':
                this.state = articles['physicssimulator'];
                break;
            case 'erislaw':
                this.state = articles['erislaw'];
                break;
            case 'arrender':
                this.state = articles['arrender'];
                break;
        }
    }
    

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    image(props: { image: string | undefined }) {
        if (props.image === undefined) return null;
        return <img className={styles.textImage} src={require(`assets/${props.image}`)} alt="" />
    }

    aside(props: any) {
        let aside = (props.textSection as TextSection).aside;
        if (aside === undefined) return (<aside className={styles.aside}></aside>);

        return (
            <aside className={styles.aside}>
                {aside.map(section => {
                    return (
                        <section key={uuid()} className={styles.asideSection}>
                            <h4>{section.title}</h4>
                            {section.link === undefined ?
                                <p>{section.text}</p> :
                                <a href={section.link} className={styles.link}>{section.text}</a>
                            }
                        </section>
                    )
                })}
            </aside>
        )
    }

    render() {
        if (this.state === null) {
            return (
                <div className={errorStyles.container}>
                    <div className={errorStyles.textContainer}>
                        <h1 className={errorStyles.text}>404</h1>
                        <h4 className={errorStyles.text}>This page could not be found</h4>
                            <div className={errorStyles.buttonContainer}>
                                <Link to={"/"}>
                                    <h4>Go back to home page</h4>
                                </Link>
                            </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <section className={styles.masterContainer}>
                    <article className={styles.article}>
                        {this.state.repositoryLink.length <= 0 ? 
                            <div className={styles.topPadding}></div> :
                            <GithubRepository align="center" />
                        }
                        
                        { /* Create header paragraph */}
                        <header className={styles.header + " " + styles.textSection}>
                            <div className={styles.mainText}>
                                <div className={styles.headerTop}>
                                    <h1>{this.state.header.title}</h1>
                                    <p className={styles.date}>{this.state.date}</p>
                                </div>
                                {this.state.header.text.map(line => {
                                    return <p key={uuid()}>{line}</p>
                                })}
                            </div>
                            <this.aside textSection={this.state.header} />
                        </header>
                        { /* Create body paragraphs */ }
                        {this.state.sections.map(section => {
                            return (
                                <section key={uuid()} className={styles.textSection}>
                                    <div className={styles.mainText}>
                                        <h3>{section.title}</h3>
                                        {section.text.map(text => {
                                            return <p key={uuid()}>{text}</p>
                                        })}
                                    </div>
                                    <this.aside textSection={section} />
                                    <div className={styles.imageContainer}>
                                        {section.image?.map(image => {
                                            return (
                                                <this.image image={image} />
                                            )
                                        })}
                                    </div>
                                </section>
                            )
                        })}
                    </article>
                </section>
            )
        }
    }
}

interface TextSection {
    title: string,
    text: Array<string>,
    aside?: Array<{
        title: string,
        text: string,
        link?: string
    }>,
    image?: Array<string>
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
