import React from "react";
import reactDom from "react-dom";
import CurrencyContext from "../../../../../store/CurrencyContext";
import { ClickOutside } from "../../../../UI/ClickOutside";
import cartIcon from "../../../../../assets/cart.svg";
import Cart from "../../../../UI/Cart/Cart";
import classes from "./MiniCart.module.css";

class Overlay extends React.Component {
  render() {
    return <div className={classes.overlay}></div>;
  }
}

class MiniCart extends React.Component {
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

  onClose = () => {
    this.setState({ isOpened: false });
  };

  render() {
    const portalTarget = document.getElementById("overlays");
    const totalAmount = this.props.cart.totalAmount;

    if (this.state.isOpened) {
      document.body.classList.add("noScroll");
    } else {
      document.body.classList.remove("noScroll");
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
          {this.state.isOpened && (
            <CurrencyContext.Consumer>
              {(currency) => (
                <Cart
                  type="miniCart"
                  cart={this.props.cart}
                  currency={currency}
                  isOpened={this.state.isOpened}
                  close={this.onClose}
                />
              )}
            </CurrencyContext.Consumer>
          )}
        </div>
      </ClickOutside>
    );
  }
}

export default MiniCart;
