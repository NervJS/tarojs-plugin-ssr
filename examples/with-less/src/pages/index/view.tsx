import {View} from '@tarojs/components'
import styles from './index.module.less';

const IndexView = () => (
    <>
        <View className={styles.a}>混合（Mixins）</View>
        <View className={styles.functions}>函数（Functions）</View>
    </>
);

export default IndexView
