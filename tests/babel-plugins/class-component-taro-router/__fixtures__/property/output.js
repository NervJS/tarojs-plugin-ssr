import { withRouter } from "next/router";
import Taro from "@tarojs/taro";

let _Index;

class Index extends Component {
  $instance = Taro.getCurrentInstance(this.props.router);

  render() {
    return null;
  }
}

_Index = withRouter(Index);
export { _Index as default };
