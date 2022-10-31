import { Component } from "react";
import "./app.scss";
import "./app.less";

class App extends Component {
  render() {
    return this.props.children;
  }
}

export default App;
