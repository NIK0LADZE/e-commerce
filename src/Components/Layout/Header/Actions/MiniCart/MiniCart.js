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
    const { totalAmount: nextTotalAmount } = nextProps.cart;
    const { totalAmount: prevTotalAmount } = this.props.cart;
    const { totalAmountChanged: nextAmountState } = nextState;
    const { totalAmountChanged: prevAmountState } = this.state;

    if (nextTotalAmount !== prevTotalAmount) {
      this.setState({ totalAmountChanged: true });

      const timer = setTimeout(() => {
        this.setState({ totalAmountChanged: false });
      }, 300);

      return () => clearTimeout(timer);
    }
    if (nextTotalAmount !== prevTotalAmount && nextAmountState === prevAmountState) {
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
    const { isOpened, totalAmountChanged } = this.state;
    const { cart } = this.props;
    const { totalAmount } = cart;

    if (isOpened) {
      document.body.classList.add("noScroll");
    } else {
      document.body.classList.remove("noScroll");
    }

    return (
      <ClickOutside show={isOpened} clickHandler={this.onClick}>
        {isOpened && reactDom.createPortal(<Overlay />, portalTarget)}
        <div className={classes.container}>
          <div onClick={this.onClick}>
            <img src={cartIcon} className={classes.cartIcon} alt="cart" />
            {totalAmount > 0 && (
              <div className={`${classes.circle} ${totalAmountChanged ? classes.pop : ""}`}>
                <span>{totalAmount}</span>
              </div>
            )}
          </div>
          {isOpened && (
            <CurrencyContext.Consumer>
              {(currency) => (
                <Cart
                  type="miniCart"
                  cart={cart}
                  currency={currency}
                  isOpened={isOpened}
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
