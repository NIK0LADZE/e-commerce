import React from "react";
import CartContext from "../../../../store/CartContext";
import MiniCart from "./MiniCart/MiniCart";
import Currencies from "./Currencies/Currencies";
import classes from "./Actions.module.css";

class Actions extends React.Component {
  render() {
    return (
      <div className={classes.flex}>
        <Currencies />
        <CartContext.Consumer>{(cart) => <MiniCart cart={cart} />}</CartContext.Consumer>
      </div>
    );
  }
}

export default Actions;
