import Styles from '@/styles/Home.module.css'


export default function Home() {
    return (
        <>
            <h1 className={Styles.projectName}>Users and Posts</h1>
            <div className={Styles.description}>
                <p>A simple web app that displays users and their posts</p>
            </div>
            <button className={Styles.button}>Get Started</button>
        </>
    )
}
