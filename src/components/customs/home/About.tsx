import styles from './About.module.scss'

export default function About() {

    const collegeYear = new Date().getFullYear() - 2020
    
    function getSuffix(number: number) {
        switch (number % 10) {
            case 1:
                return "st"
            case 2:
                return "nd"
            case 3:
                return "rd"
            default:
                return "th"
        }

    }

    return (
        <section className={styles.aboutContainer}>
            <article className={styles.article}>
                <h2>About me</h2>
                <p>
                    Hi there! I'm Hampus, a student in my {collegeYear}{getSuffix(collegeYear)} year in college studying computer science at Sweden's Royal Institute of Technology. I work on a bunch of projects associated with programming. I am most proficient in the web tech stack using technologies such as NodeJS, Typescript, and MongoDB. I do however like to dive deeper into lower-level languages such as Rust and C/C++ too at times.
                </p>
                <p>
                    Structure and mechanisms have always fascinated me, not just in the sense of code but also in other aspects too. In all games I play I've always been interested in the part where it's possible to be creative. Now I spend less time playing video games and have instead found another way to express creativity, code! I love being able to build tools and applications to help either ordinary people or other programmers like me. 
                </p>
            </article>
        </section>
    )
}