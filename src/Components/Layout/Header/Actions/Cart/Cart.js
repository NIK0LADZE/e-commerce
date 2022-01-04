import React from "react";
import reactDom from "react-dom";
import { ClickOutside } from "../../../../UI/ClickOutside";
import cartIcon from "../../../../../assets/cart.svg";
import classes from "./Cart.module.css";

class Overlay extends React.Component {
  render() {
    return <div className={classes.overlay}></div>;
  }
}

class Cart extends React.Component {
  state = { isOpened: false };

  onClick = () => {
    this.setState({ isOpened: !this.state.isOpened });
  };

  render() {
    const portalTarget = document.getElementById("overlays");

    return (
      <ClickOutside show={this.state.isOpened} clickHandler={this.onClick}>
        {this.state.isOpened && reactDom.createPortal(<Overlay />, portalTarget)}
        <div className={classes.container}>
          <div onClick={this.onClick}>
            <img src={cartIcon} className={classes.cartIcon} alt="cart" />
            <div className={classes.circle}>
              <span>2</span>
            </div>
          </div>
          {this.state.isOpened && (
            <div className={classes.miniCart}>
              <p className={classes.myBag}>
                My Bag, <span>2 items</span>
              </p>
            </div>
          )}
        </div>
      </ClickOutside>
    );
  }
}

export default Cart;
