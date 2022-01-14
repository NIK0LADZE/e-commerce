import React from "react";
import CurrencyContext from "../../../../../../store/CurrencyContext";
import classes from "./CurrencySwitcher.module.css";

class CurrencySwitcher extends React.Component {
  static contextType = CurrencyContext;

  onSelect(currency) {
    this.context.selectCurrency(currency);
    this.props.onSelect();
  }

  render() {
    const { data, loading, error } = this.props;

    if (loading) return null;

    if (error)
      return (
        <div className={`${classes.container} shadow`}>
          <p className={classes.errorMessage}>{error.message}</p>
        </div>
      );

    if (data) {
      return (
        <ul className={`${classes.container} shadow`}>
          {data.currencies.map((currency) => {
            const { label, symbol } = currency;

            return (
              <li
                key={label}
                className={classes.currencyItem}
                onClick={() => this.onSelect(currency)}
              >
                {symbol} {label}
              </li>
            );
          })}
        </ul>
      );
    }
  }
}

export default CurrencySwitcher;
