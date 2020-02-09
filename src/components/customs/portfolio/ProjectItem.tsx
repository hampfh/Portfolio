import React, { Component } from 'react'

import styles from './ProjectItem.module.scss'

export class ProjectItem extends Component<PropsForComponent> {
    render() {
        return (
            <div className={styles.projectContainer}>
                <img src={this.props.image} alt="" />
                <div className={styles.textContainer}>
                    <h3>{this.props.title}</h3>
                    {typeof this.props.description === 'string' ? <p>{this.props.description}</p> :
                        this.props.description.map(line => {
                            return (
                                <p>{line}</p>
                            )
                        })}
                </div>
            </div>
        )
    }
}

interface PropsForComponent {
    title: string,
    description: Array<string> | string,
    image?: string
}

export default ProjectItem
