import React from "react";
import ReactDom from "react-dom";

class Hello extends React.Component {
  render() {
    return (
      <h2>
        Hello, {this.props.name}
        {this.props.header}
        <button onClick={this.props.logout}>Logout</button>
      </h2>
    );
  }
}

export default Hello;
