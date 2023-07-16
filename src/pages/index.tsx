import Styles from '@/styles/Home.module.css'
import {useRouter} from "next/router";


export default function Home() {
    const router = useRouter()
    const getStartedClick = () => {
        router.push('/users')
    }

    return (
        <>
            <h1 className={Styles.projectName}>Users and Posts</h1>
            <div className={Styles.description}>
                <p>A simple web app that displays users and their posts</p>
            </div>
            <button className={Styles.getStarted} onClick={getStartedClick}>Get Started</button>
        </>
    )
}
