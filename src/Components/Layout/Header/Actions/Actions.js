import React from "react";
import Cart from "./Cart/Cart";
import Currencies from "./Currencies/Currencies";
import classes from "./Actions.module.css";

class Actions extends React.Component {
  render() {
    return (
      <div className={classes.flex}>
        <Currencies />
        <Cart />
      </div>
    );
  }
}

export default Actions;
