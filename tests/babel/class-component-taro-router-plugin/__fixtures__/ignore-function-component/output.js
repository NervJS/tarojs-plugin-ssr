import Taro from "@tarojs/taro";
function Index() {
  const $instance = Taro.getCurrentInstance();
  console.log($instance);
  return null;
}
export default Index;
