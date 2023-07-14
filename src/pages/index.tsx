import Head from 'next/head'
import Image from 'next/image'
import {Inter} from '@next/font/google'
import styles from '@/styles/Home.module.css'
import clsx from "clsx";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    return (
        <>
            <Head>
                <title>Users and Posts</title>
                <meta name="description" content="A simple web app that displays users and their posts"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={clsx([styles.main, inter.className])}>
                <h1>Users and Posts</h1>
            </main>
        </>
    )
}
