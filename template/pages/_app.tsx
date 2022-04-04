import {FC} from 'react'
import {AppProps} from 'next/app'
import Head from 'next/head'

const MyApp: FC<AppProps> = ({Component, pageProps}) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,user-scalable=no,viewport-fit=cover"
      />
    </Head>
    <Component {...pageProps} />
  </>
)

export default MyApp
