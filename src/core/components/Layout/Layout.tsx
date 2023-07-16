import React from 'react';
import Styles from './Layout.module.css';
import {Header} from "@/core/components/Layout/Header";
import {Inter} from "@next/font/google";
import clsx from "clsx";
import Head from "next/head";

const inter = Inter({subsets: ['latin']})

export const Layout = ({children}: Props) => {
    return <>
        <Head>
            <title>Users and Posts</title>
            <meta name="description" content="A simple web app that displays users and their posts"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>

        <div className={clsx([Styles.layout, inter.className])}>
            <Header className={Styles.header}/>
            <main className={Styles.main}>{children}</main>
        </div>
    </>;
}