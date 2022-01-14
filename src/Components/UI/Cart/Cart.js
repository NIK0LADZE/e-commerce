import React from "react";
import { withRouter } from "../../../helpers/withRouter";
import CartProduct from "./CartProduct/CartProduct";
import classes from "./Cart.module.css";
import Button from "../Button/Button";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.products = props.cart.products;
    this.selectedCurrency = this.props.currency.selectedCurrency;
    this.totalPrice = this.calculateTotalPrice(this.products, this.selectedCurrency);
    this.state = { totalPrice: this.totalPrice };
  }

  shouldComponentUpdate(nextProps) {
    const { currency, cart } = nextProps;
    const { products, totalAmount: nextTotalAmount } = cart;
    const { selectedCurrency } = currency;

    const totalPrice = this.calculateTotalPrice(products, selectedCurrency);

    if (this.state.totalPrice !== totalPrice) {
      this.setState({ totalPrice });
    }

    if (nextTotalAmount !== this.props.cart.totalAmount) {
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
    const { totalPrice } = this.state;
    const { currency, cart, type } = this.props;
    const { selectedCurrency, selectedCurrencySymbol } = currency;
    const { products, totalAmount } = cart;
    const miniCart = type === "miniCart" ? true : false;
    const containerClass = `${classes.container} ${miniCart ? classes.miniCart : ""}`;

    const productList = products.map((product) => {
      const { id, attributesId, prices } = product;
      const price = prices.find((priceObj) => priceObj.currency.label === selectedCurrency).amount;

      return (
        <CartProduct
          key={`${id}-${attributesId}`}
          type={miniCart}
          product={product}
          currency={currency}
          cart={cart}
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
                  {selectedCurrencySymbol}
                  {totalPrice.toFixed(2)}
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
