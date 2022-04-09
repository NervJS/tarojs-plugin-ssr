import { createElement, Component } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";

class Index extends Component {
  handleClick() {
    Taro.navigateTo({
      url: "/home",
    });
  }

  render() {
    return createElement(
      View,
      {
        onClick: this.handleClick,
      },
      "hello, world!"
    );
  }
}

export default Index;
