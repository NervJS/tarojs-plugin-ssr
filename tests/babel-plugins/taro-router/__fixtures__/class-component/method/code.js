import Taro from "@tarojs/taro";

export default class Index extends Component {
  constructor(props) {
    super(props)
    const $instance = Taro.getCurrentInstance();
    console.log($instance);
  }

  render() {
    const $instance = Taro.getCurrentInstance();
    console.log($instance);
    return null;
  }
}
