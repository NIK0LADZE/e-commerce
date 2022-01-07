import React from "react";
import reactDom from "react-dom";
import { ClickOutside } from "../../../../UI/ClickOutside";
import cartIcon from "../../../../../assets/cart.svg";
import CartProduct from "./CartProduct/CartProduct";
import classes from "./Cart.module.css";
import Button from "../../../../UI/Button/Button";

class Overlay extends React.Component {
  render() {
    return <div className={classes.overlay}></div>;
  }
}

class Cart extends React.Component {
  state = { isOpened: false, totalPrice: 0, totalAmountChanged: false };
  products = this.props.cart.products;
  currentCurrency = this.props.currency.selectedCurrency;
  symbol = this.props.currency.selectedCurrencySymbol;

  shouldComponentUpdate(nextProps, nextState) {
    let totalPrice = 0;
    this.products = this.props.cart.products;
    this.currentCurrency = nextProps.currency.selectedCurrency;
    this.symbol = this.props.currency.selectedCurrencySymbol;

    const prices = this.products.map((product) => {
      const price = product.prices.find(
        (priceObj) => priceObj.currency.label === this.currentCurrency
      ).amount;
      return price * product.amount;
    });

    prices.map((price) => (totalPrice += price));

    if (this.state.totalPrice !== totalPrice) {
      this.setState({ totalPrice });
    }

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
    const totalAmount = this.props.cart.totalAmount;

    if (this.state.isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const productList = this.products.map((product) => {
      const price = product.prices.find(
        (priceObj) => priceObj.currency.label === this.currentCurrency
      ).amount;
      return (
        <CartProduct
          key={`${product.id}-${product.attributesId}`}
          product={product}
          currency={this.props.currency}
          cart={this.props.cart}
          price={price}
        />
      );
    });

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
              <div className={classes.cartProducts}>{productList}</div>
              <div className={classes.totalPrice}>
                <p>Total</p>
                <p>
                  {this.symbol}
                  {this.state.totalPrice.toFixed(2)}
                </p>
              </div>
              <div className={classes.buttons}>
                <Button type={"default"}>view bag</Button>
                <Button type={"green"}>check out</Button>
              </div>
            </div>
          )}
        </div>
      </ClickOutside>
    );
  }
}

export default Cart;
