import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

class Layout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header {...this.props} />
        <main>
          <Outlet />
        </main>
      </React.Fragment>
    );
  }
}

export default Layout;
