const { createElement, Component } = require("react");
const { View } = require("@tarojs/components");
const Taro = require("@tarojs/taro");

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
