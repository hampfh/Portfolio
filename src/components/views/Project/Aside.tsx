import React from 'react'
import { TextSection } from './Project';
import styles from "./Project.module.scss"
import { v4 as uuid } from "uuid"

export default function Aside(props: PropsForComponent) {
    let aside = (props.textSection).aside;
    if (aside === undefined) return (
        <aside className={styles.aside}></aside>
    );

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

interface PropsForComponent {
    textSection: TextSection
}
