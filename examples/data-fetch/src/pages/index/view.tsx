import {View, Navigator} from '@tarojs/components'

const IndexView = ({stars}) => (
  <View>
    <View>tarojs has {stars} ⭐️</View>
    <Navigator
      target='self'
      openType='navigate'
      url='/pages/tarojs-plugin-platform-nextjs-stars/index'
    >
      How about tarojs-plugin-platform-nextjs?
    </Navigator>
  </View>
)

export default IndexView
