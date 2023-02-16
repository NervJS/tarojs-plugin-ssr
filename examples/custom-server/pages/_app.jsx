import Head from 'next/head';
import {
    initTaroApp,
    initPxTransform,
    registerToastComponent,
    registerModalComponent,
    registerPreviewComponent,
    navigateTo,
    navigateBack
} from 'tarojs-plugin-platform-nextjs/taro';
import {Toast, Modal, Preview, initNavigatorComponent} from 'tarojs-plugin-platform-nextjs/components/lib';
import 'tarojs-plugin-platform-nextjs/components/lib/taror.css';
import TaroApp from '../src/app';
import customRoutes from '../customRoutes.json';

initTaroApp(customRoutes);
initPxTransform({designWidth: 375});
initNavigatorComponent({
    customRoutes,
    navigateTo,
    navigateBack
});
registerToastComponent(Toast);
registerModalComponent(Modal);
registerPreviewComponent(Preview);

const MyApp = (props) => (
    <>
        <Head>
            <meta
                name="viewport"
                content="width=device-width,initial-scale=1,user-scalable=no,viewport-fit=cover"
            />
        </Head>
        <TaroApp {...props} customRoutes={customRoutes}/>
    </>
)

export default MyApp;
