import React from "react";
import CurrencyContext from "../../../../store/CurrencyContext";
import CartContext from "../../../../store/CartContext";
import Cart from "./Cart/Cart";
import Currencies from "./Currencies/Currencies";
import classes from "./Actions.module.css";

class Actions extends React.Component {
  render() {
    return (
      <div className={classes.flex}>
        <Currencies />
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

export default Actions;
