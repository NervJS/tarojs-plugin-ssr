import { withRouter } from "tarojs-plugin-platform-nextjs/router";
import Taro from "@tarojs/taro";
let _Index;
class Index extends Component {
  $instance = Taro.getCurrentInstance({
    type: "class",
    component: this,
  });
  render() {
    return null;
  }
}
_Index = withRouter(Index);
export { _Index as default };
