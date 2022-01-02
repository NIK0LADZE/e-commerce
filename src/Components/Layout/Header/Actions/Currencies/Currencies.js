import React from "react";
import { gql } from "@apollo/client";
import { getData } from "../../../../../helpers/getData";
import CurrencyContext from "../../../../../store/CurrencyContext";
import CurrencySwitcher from "../../../../UI/CurrencySwitcher/CurrencySwitcher";
import Arrow from "../../../../../assets/arrow.svg";
import classes from "./Currencies.module.css";

const currencies = gql`
  query GetCurrenies {
    currencies {
      label
      symbol
    }
  }
`;

class Currencies extends React.Component {
  static contextType = CurrencyContext;

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      symbol: null,
    };
    this.wrapper = React.createRef();
  }

  // Sets state when data loads from Apollo
  static getDerivedStateFromProps(props, prevState) {
    if (props.data && !prevState.symbol) {
      if (!localStorage.getItem("currency")) {
        return { symbol: props.data.currencies[0].symbol };
      } else {
        return { symbol: JSON.parse(localStorage.getItem("currency")).symbol };
      }
    }
    return null;
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentDidUpdate() {
    // Sets states in CurrencyContext if initially they are null
    if (!this.context.selectedCurrency && !this.context.selectedCurrencySymbol) {
      this.context.selectCurrency(this.props.data.currencies[0]);
    }
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (!this.wrapper.current.contains(event.target)) {
      if (this.state.show) {
        this.setState({
          show: false,
        });
      }
    }
  };

  onSelect = (currency) => {
    this.setState({
      show: false,
      symbol: currency.symbol,
    });
  };

  clickHandler = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    return (
      <div className={classes.container} ref={this.wrapper}>
        <div onClick={this.clickHandler}>
          <span className={classes.currencySign}>
            {this.state.symbol}
            <img
              className={`${classes.arrow} ${this.state.show ? classes.arrowUp : ""}`}
              src={Arrow}
              alt="arrow"
            />
          </span>
        </div>
        {this.state.show && <CurrencySwitcher {...this.props} onSelect={this.onSelect} />}
      </div>
    );
  }
}

export default getData(Currencies, currencies);
