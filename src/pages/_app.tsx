import { AppComponent } from "next/dist/next-server/lib/router/router";
import { Provider } from "next-auth/client";

import "../styles/globals.css";

const MyApp: AppComponent = ({ Component, pageProps }) => {
    return (
        <Provider session={pageProps.session}>
            <Component {...pageProps} />
        </Provider>
    );
};

export default MyApp;
