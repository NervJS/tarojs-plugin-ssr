import { View, Navigator } from "@tarojs/components";

const Index = () => {
    const id = "first";
    return (
        <>
            <View>Post: {id}</View>
            <View>
                <View>
                    <Navigator
                        target="self"
                        openType="navigate"
                        url={`/pages/post/index?id=${id}&comment=first-comment`}
                    >
                        First comment
                    </Navigator>
                </View>
                <View>
                    <Navigator
                        target="self"
                        openType="navigate"
                        url={`/pages/post/index?id=${id}&comment=second-comment`}
                    >
                        Second comment
                    </Navigator>
                </View>
            </View>
        </>
    );
};

export default Index;
