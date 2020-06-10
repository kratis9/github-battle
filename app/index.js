import React from "react";
import ReactDom from "react-dom";
import "./index.css";

import Hello from "./Hello";

class App extends React.Component {
  render() {
    return (
      <Hello
        name='krati'
        auth={true}
        logout={() => alert("Logout")}
        header={<h1> 🖐</h1>}
      />
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));
