import {View, Navigator} from '@tarojs/components'

const IndexView = ({ stars }) => (
    <>
        <View className='paragraph'>Tarojs has {stars} ⭐️</View>
        <Navigator
            target='self'
            openType='navigate'
            url='/pages/stars/index'
        >
            How about tarojs-plugin-platform-nextjs?
        </Navigator>
    </>
)

export default IndexView
