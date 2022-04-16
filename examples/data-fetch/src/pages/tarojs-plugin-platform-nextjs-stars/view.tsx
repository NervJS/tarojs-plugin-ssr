import {View, Navigator} from '@tarojs/components'

const TarojsPluginPlatformNextjsStarsView = ({stars}) => (
  <View>
    <View>tarojs-plugin-platform-nextjs has {stars} ⭐</View>
      <Navigator
        target='self'
        openType='navigate'
        url='/pages/index/index'
      >
        I bet tarojs has more stars (?)
      </Navigator>
  </View>
)

export default TarojsPluginPlatformNextjsStarsView
