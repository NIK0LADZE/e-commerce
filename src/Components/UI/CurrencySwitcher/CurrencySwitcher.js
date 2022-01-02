import React from "react";
import classes from "./CurrencySwitcher.module.css";
import CurrencyContext from "../../../store/CurrencyContext";

class CurrencySwitcher extends React.Component {
  static contextType = CurrencyContext;

  onSelect(currency) {
    this.context.selectCurrency(currency);
    this.props.onSelect(currency);
  }

  render() {
    console.log(this.context);
    if (this.props.loading) return null;

    if (this.props.error) return <p>{this.props.error.message}</p>;

    if (this.props.data) {
      return (
        <ul className={classes.container}>
          {this.props.data.currencies.map((currency) => {
            return (
              <li
                key={currency.label}
                className={classes.currencyItem}
                onClick={() => this.onSelect(currency)}
              >
                {currency.symbol} {currency.label}
              </li>
            );
          })}
        </ul>
      );
    }
  }
}

export default CurrencySwitcher;
