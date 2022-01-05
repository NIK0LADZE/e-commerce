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
  state = { isOpened: false, totalAmountChanged: false };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.cart.totalAmount !== this.props.cart.totalAmount) {
      this.setState({ totalAmountChanged: true });

      const timer = setTimeout(() => {
        this.setState({ totalAmountChanged: false });
      }, 300);

      return () => clearTimeout(timer);
    }
    if (
      nextProps.cart.totalAmount !== this.props.cart.totalAmount &&
      nextState.totalAmountChanged === this.state.totalAmountChanged
    ) {
      return false;
    }
    return true;
  }

  onClick = () => {
    this.setState({ isOpened: !this.state.isOpened });
  };

  render() {
    const portalTarget = document.getElementById("overlays");
    const products = this.props.cart.products;
    const totalAmount = this.props.cart.totalAmount;
    if (this.state.isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return (
      <ClickOutside show={this.state.isOpened} clickHandler={this.onClick}>
        {this.state.isOpened && reactDom.createPortal(<Overlay />, portalTarget)}
        <div className={classes.container}>
          <div onClick={this.onClick}>
            <img src={cartIcon} className={classes.cartIcon} alt="cart" />
            {totalAmount > 0 && (
              <div
                className={`${classes.circle} ${this.state.totalAmountChanged ? classes.pop : ""}`}
              >
                <span>{totalAmount}</span>
              </div>
            )}
          </div>
          {this.state.isOpened && totalAmount === 0 && (
            <div className={classes.miniCart}>
              <p>Cart is empty</p>
            </div>
          )}
          {this.state.isOpened && totalAmount > 0 && (
            <div className={classes.miniCart}>
              <p className={classes.myBag}>
                My Bag, <span>{totalAmount} items</span>
              </p>
              {products.map((product) => {
                return (
                  <p key={product.id + "-" + product.attributesId}>
                    {product.id}: {product.amount}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </ClickOutside>
    );
  }
}

export default Cart;
