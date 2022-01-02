import React from "react";

const CurrencyContext = React.createContext();

export class CurrencyProvider extends React.Component {
  state = {
    selectedCurrency: null,
    selectedCurrencySymbol: null,
  };

  onSelectCurrency = (currency) => {
    localStorage.setItem(
      "currency",
      JSON.stringify({
        label: currency.label,
        symbol: currency.symbol,
      })
    );
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
