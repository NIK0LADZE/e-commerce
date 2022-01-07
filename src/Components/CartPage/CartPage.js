import React from "react";
import CartContext from "../../store/CartContext";
import CurrencyContext from "../../store/CurrencyContext";
import Cart from "../UI/Cart/Cart";
import classes from "./CartPage.module.css";

class CartPage extends React.Component {
  render() {
    return (
      <div className={classes.container}>
        <h1 className={classes.pageTitle}>Cart</h1>
        <CurrencyContext.Consumer>
          {(currency) => (
            <CartContext.Consumer>
              {(cart) => <Cart currency={currency} cart={cart} />}
            </CartContext.Consumer>
          )}
        </CurrencyContext.Consumer>
      </div>
    );
  }
}

export default CartPage;
