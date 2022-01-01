import React from "react";
import { gql } from "@apollo/client";
import classes from "./CurrencySwitcher.module.css";
import { getData } from "../../../helpers/getData";

const currencies = gql`
  query GetCurrenies {
    currencies {
      label
      symbol
    }
  }
`;

class CurrencySwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect() {
    this.props.onSelect();
  }

  render() {
    if (this.props.loading) return null;

    if (this.props.error) return <p>{this.props.error.message}</p>;

    if (this.props.data) {
      return (
        <ul className={classes.container}>
          {this.props.data.currencies.map((currency) => {
            return (
              <li key={currency.label} className={classes.currencyItem} onClick={this.onSelect}>
                {currency.symbol} {currency.label}
              </li>
            );
          })}
        </ul>
      );
    }
  }
}

export default getData(CurrencySwitcher, currencies);
