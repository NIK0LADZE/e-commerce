import React from "react";
import { client } from "../ApolloClient/client";
import { currenciesQuery } from "../helpers/gqlQueries";

const CurrencyContext = React.createContext();

export class CurrencyProvider extends React.Component {
  state = {
    selectedCurrency: null,
    selectedCurrencySymbol: null,
    error: null,
  };

  componentDidMount() {
    client
      .query({ query: currenciesQuery })
      .then((result) => {
        if (!localStorage.getItem("currency")) {
          const currency = result.data.currencies[0];
          this.setState({
            selectedCurrency: currency.label,
            selectedCurrencySymbol: currency.symbol,
          });
        } else {
          const currency = this.getLocalStorage();
          this.setState({
            selectedCurrency: currency.label,
            selectedCurrencySymbol: currency.symbol,
          });
        }
      })
      .catch((error) => this.setState({ error: error.message }));
  }

  setLocalStorage = (currency) => {
    localStorage.setItem(
      "currency",
      JSON.stringify({
        label: currency.label,
        symbol: currency.symbol,
      })
    );
  };

  getLocalStorage = () => {
    return JSON.parse(localStorage.getItem("currency"));
  };

  onSelectCurrency = (currency) => {
    this.setLocalStorage(currency);
    this.setState({ selectedCurrency: currency.label, selectedCurrencySymbol: currency.symbol });
  };

  render() {
    return (
      <CurrencyContext.Provider value={{ ...this.state, selectCurrency: this.onSelectCurrency }}>
        {this.props.children}
      </CurrencyContext.Provider>
    );
  }
}

export default CurrencyContext;
