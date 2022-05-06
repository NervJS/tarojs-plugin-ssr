import Head from 'next/head'
import {setCustomRoutes} from 'tarojs-plugin-platform-nextjs/taro'
import TaroApp from '../src/app'
import customRoutes from '../customRoutes.json'
import 'tarojs-plugin-platform-nextjs/components/dist/lilin.css'

setCustomRoutes(customRoutes)

const MyApp = ({Component, pageProps}) => (
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
)

export default MyApp
