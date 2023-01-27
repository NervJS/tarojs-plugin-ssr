const { createElement, Component } = require("react");

const { View } = require("tarojs-plugin-platform-nextjs/components/lib");

const Taro = require("tarojs-plugin-platform-nextjs/taro");

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
