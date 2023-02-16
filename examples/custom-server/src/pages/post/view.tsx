import { useRouter } from "@tarojs/taro";
import { View } from "@tarojs/components";

const PostView = () => {
    const { id, comment } = useRouter().params;
    return (
        <>
            <View>Post: {id}</View>
            <View>Comment: {comment}</View>
        </>
    );
};

export default PostView;
