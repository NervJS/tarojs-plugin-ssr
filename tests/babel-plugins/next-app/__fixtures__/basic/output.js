import "../../app.scss";
import Head from "next/head";
import TaroApp from "./app";

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,user-scalable=no,viewport-fit=cover"
      />
    </Head>
    <TaroApp>
      <Component {...pageProps} />
    </TaroApp>
  </>
);

export default MyApp;
