import "../styles/globals.css";
import { AppProps } from "next/app";
import { SWRConfig } from "swr";
function MyApp({ Component, pageProps }: AppProps) {
    return (
        // <SWRConfig value={{ refreshInterval: 10000 }}>
        <Component {...pageProps} />
        // </SWRConfig>
    );
}

export default MyApp;
