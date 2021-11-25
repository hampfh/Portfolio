import { Link, useParams } from "react-router-dom"
import GithubRepository from 'components/utilities/Repository'
import { v4 as uuid } from "uuid"

import articles from 'assets/articles.json'

import styles from "./Project.module.scss"
import errorStyles from "./pageNotFound.module.scss"
import Aside from "./Aside"

export default function Project() {

    const projectParam = useParams<"project">() as unknown as { project: keyof (typeof articles) | undefined }

    if (projectParam.project == null || articles[projectParam.project] == null) {
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

    const article: IArticle | undefined = articles[projectParam.project] 

    return (
        <section className={styles.masterContainer}>
            <article className={styles.article}>
                {article.repositoryLink.length <= 0 ? 
                    <div className={styles.topPadding}></div> :
                    <GithubRepository align="center" />
                }
                
                { /* Create header paragraph */}
                <header className={styles.header + " " + styles.textSection}>
                    <div className={styles.mainText}>
                        <div className={styles.headerTop}>
                            <h1>{article.header.title}</h1>
                            <p className={styles.date}>{article.date}</p>
                        </div>
                        {article.header.text.map(line => {
                            return <p key={uuid()}>{line}</p>
                        })}
                    </div>
                    <Aside textSection={article.header} />
                </header>
                { /* Create body paragraphs */ }
                {article.sections.map(section => {
                    return (
                        <section key={uuid()} className={styles.textSection}>
                            <div className={styles.mainText}>
                                <h3>{section.title}</h3>
                                {section.text.map(text => {
                                    return <p key={uuid()}>{text}</p>
                                })}
                            </div>
                            <Aside textSection={section} />                            
                            <div className={styles.imageContainer}>
                                {section.image?.map(image => <img className={styles.textImage} key={uuid()} src={require(`assets/content/${image}`).default} alt="" />)}
                            </div>
                        </section>
                    )
                })}
            </article>
        </section>
    )
}

export interface TextSection {
    title: string,
    text: Array<string>,
    aside?: Array<{
        title: string,
        text: string,
        link?: string
    }>,
    image?: Array<string>
}

interface IArticle {
    url: string,
    repositoryLink: string,
    date: string,
    header: TextSection,
    sections: Array<TextSection>
}
