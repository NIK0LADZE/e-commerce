import React from "react";
import cartIcon from "../../../../../assets/cart.svg";
import classes from "./Cart.module.css";

class Cart extends React.Component {
  render() {
    return (
      <React.Fragment>
        <img src={cartIcon} className={classes.cartIcon} alt="cart" />
      </React.Fragment>
    );
  }
}

export default Cart;
