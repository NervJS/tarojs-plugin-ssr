import { withRouter } from "next/router";
import Taro from "@tarojs/taro";

let _Index;

class Index extends Component {
  constructor(props) {
    super(props);
    const $instance = Taro.getCurrentInstance({
      type: "class",
      component: this,
    });
    console.log($instance);
  }

  render() {
    const $instance = Taro.getCurrentInstance({
      type: "class",
      component: this,
    });
    console.log($instance);
    return null;
  }
}

_Index = withRouter(Index);
export { _Index as default };
