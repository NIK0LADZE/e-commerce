import React from "react";
import { withRouter } from "../../../helpers/withRouter";
import CartProduct from "./CartProduct/CartProduct";
import classes from "./Cart.module.css";
import Button from "../Button/Button";

class Cart extends React.Component {
  state = { totalPrice: 0 };
  products = this.props.cart.products;
  currentCurrency = this.props.currency.selectedCurrency;
  symbol = this.props.currency.selectedCurrencySymbol;
  isOpened = this.props.isOpened;

  componentDidMount() {
    this.products = this.props.cart.products;
    this.currentCurrency = this.props.currency.selectedCurrency;
    this.symbol = this.props.currency.selectedCurrencySymbol;
    const totalPrice = this.calculateTotalPrice(this.products, this.currentCurrency);
    this.setState({ totalPrice });
  }

  shouldComponentUpdate(nextProps) {
    this.products = this.props.cart.products;
    this.currentCurrency = nextProps.currency.selectedCurrency;
    this.symbol = this.props.currency.selectedCurrencySymbol;

    const totalPrice = this.calculateTotalPrice(this.products, this.currentCurrency);

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
    return true;
  }

  calculateTotalPrice = (products, currentCurrency) => {
    let totalPrice = 0;

    const prices = products.map((product) => {
      const price = product.prices.find(
        (priceObj) => priceObj.currency.label === currentCurrency
      ).amount;
      return price * product.amount;
    });

    prices.map((price) => (totalPrice += price));
    return totalPrice;
  };

  navigate = () => {
    this.props.navigate("/cart");
    this.props.close();
  };

  render() {
    const totalAmount = this.props.cart.totalAmount;
    const type = this.props.type;
    const miniCart = type === "miniCart" ? true : false;
    const containerClass = `${classes.container} ${miniCart ? classes.miniCart : ""}`;

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
          type={miniCart}
          product={product}
          currency={this.props.currency}
          cart={this.props.cart}
          price={price}
        />
      );
    });

    return (
      <React.Fragment>
        {totalAmount === 0 && (
          <div className={containerClass}>
            <p className={`${!miniCart ? classes.emptyText : ""}`}>Cart is empty</p>
          </div>
        )}
        {totalAmount > 0 && (
          <div className={containerClass}>
            {miniCart && (
              <p className={classes.myBag}>
                My Bag, <span>{totalAmount} items</span>
              </p>
            )}
            <div className={classes.cartProducts}>{productList}</div>
            {miniCart && (
              <div className={classes.totalPrice}>
                <p>Total</p>
                <p>
                  {this.symbol}
                  {this.state.totalPrice.toFixed(2)}
                </p>
              </div>
            )}
            {miniCart && (
              <div className={classes.buttons}>
                <Button type={"default"} onClick={this.navigate}>
                  view bag
                </Button>
                <Button type={"green"}>check out</Button>
              </div>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(Cart);
