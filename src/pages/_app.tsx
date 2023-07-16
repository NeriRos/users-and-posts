import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {Layout} from "@/core/components/Layout";
import {StrictMode} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
const queryClient = new QueryClient()

export default function App({Component, pageProps}: AppProps) {
    return <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </QueryClientProvider>
    </StrictMode>
}
