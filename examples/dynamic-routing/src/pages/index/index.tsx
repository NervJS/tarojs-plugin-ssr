import {useRouter} from '@tarojs/taro'
import {View, Navigator} from '@tarojs/components'

const Index = () => {
  const {id} = useRouter().router.params

  return (
    <>
      <View>Post: {id}</View>
      <View>
        <View>
            <Navigator
                target='self'
                openType='navigate'
                url={`/pages/${id}/first-comment`}
            >
                First comment
            </Navigator>
        </View>
        <View>
            <Navigator
                target='self'
                openType='navigate'
                url={`/pages/${id}/second-comment`}
            >
                Second comment
            </Navigator>
        </View>
      </View>
    </>
  )
}

export default Index
